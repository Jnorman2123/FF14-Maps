import { MapContainer, ImageOverlay, Marker, LayerGroup, Tooltip } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { getQuestDetailsState, getToggledQuestState, updateToggledQuest, 
getOutsideZoneNamesState, getQuestsState } from "@/store/slices/dataStoreSlice";
import { TypeQuestDetail, TypeQuest, TypeMarkerObject } from "@/types";
import ZoneLegend from "./ZoneLegend";

export default function ZoneMap() {
    interface ClusteredMarkerData {
        [key: string]: any[];
    }

    const router = useRouter();
    const { asPath } = router;
    const dispatch = useDispatch();
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    let spacedZoneName: string;
    let zoneMapUrl: string;
    let outsideZoneNames: string[] = useSelector(getOutsideZoneNamesState);
    let questDetails: TypeQuestDetail[] = useSelector(getQuestDetailsState);
    let toggledQuest: TypeQuest | undefined;
    let bounds: any;
    let center: any;
    let zoom: number;
    let maxZoom: number = 7;
    let markerData: TypeMarkerObject[] = [];
    let quests: TypeQuest[] = useSelector(getQuestsState);
    let questName: string = asPath.split('/').slice(-1)[0].split('+')[1].split(/(?=[A-Z])/).join(' ');
    toggledQuest = quests.find((quest: TypeQuest) => quest.quest_name === questName);

    if (asPath.split('/')[1] === 'quest') {
        spacedZoneName = splitPathName.split('+')[0].split(/(?=[A-Z])/).join(' ');
        zoneMapUrl = splitPathName.split('+')[0];
    } else {
        spacedZoneName = splitPathName.split(/(?=[A-Z])/).join(' '); 
        zoneMapUrl = splitPathName; 
    }

    if (outsideZoneNames.includes(spacedZoneName)) {
        bounds = L.latLngBounds([[-1,1], [-41.9, 41.9]]);
        center = L.latLng([-20.95, 20.95]);
        zoom = 4.25;
    } else {
        bounds = L.latLngBounds([[-1,1], [-21.4, 21.4]]);
        center = L.latLng([-10.7, 10.7]);
        zoom = 5.3;
    }

    questDetails.map((questDetailObject: TypeQuestDetail) => {
        questDetailObject.questSteps.map((questStep: any) => {
            let markerObject = {
                quest: questDetailObject.quest,
                questBgColorIcon: questDetailObject.questBgColorIcon,
                stepContainerIcon: questDetailObject.stepContainerIcon,
                activeStepContainerIcon: questDetailObject.activeStepContainerIcon,
                questTypeIcon: questDetailObject.questTypeIcon,
                activeQuestTypeIcon: questDetailObject.activeQuestTypeIcon,
                stepIcon: questStep.stepIcon,
                activeStepIcon: questStep.activeStepIcon,
                npcPosition: questStep.npcPosition,
                npcZone: questStep.npcZone,
                npcName: questStep.tooltipDetails.npcName,
                questName: questStep.tooltipDetails.questName,
                stepDescription: questStep.tooltipDetails.stepDescription,
            };
            if (questStep.npcZone.includes(spacedZoneName)) {
                markerData.push(markerObject);
            }
        })
    })

    const groupMarkerDataByPosition = (array: any[], property: string): ClusteredMarkerData => {
        return array.reduce((acc: ClusteredMarkerData, obj) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    let clusteredMarkerData = groupMarkerDataByPosition(markerData, 'npcPosition');
    let unclusteredMarkerData: any[] = [];

    Object.entries(clusteredMarkerData).map(([key, value]: [string, any[]]) => {
        if (value.length > 1) {
            let offset = 0;
            value.map(markerData => {
                let newMarkerData = {};
                let newY = markerData.npcPosition[0];
                newY += offset;
                newMarkerData = {...markerData, npcPosition: [newY, markerData.npcPosition[1]]};
                unclusteredMarkerData.push(newMarkerData);
                offset += 0.2;
                return unclusteredMarkerData;
            })
        } else {
            unclusteredMarkerData.push(value[0]);
        }
        return unclusteredMarkerData;
    });

    return (
        <MapContainer crs={L.CRS.Simple} center={center} zoom={zoom} minZoom={zoom} maxZoom={maxZoom} scrollWheelZoom={true} 
        style={{height: '825px', width: '100%'}} maxBounds={bounds} maxBoundsViscosity={1} zoomControl={false}>
            <ImageOverlay url={`/maps/${zoneMapUrl}.jpg`} bounds={bounds} />
            {unclusteredMarkerData.map((markerObject: any) => {
                let colorIcon = new L.Icon({iconUrl: markerObject.questBgColorIcon, iconSize: [35, 35]});
                let stepIconUrl: string = markerObject.stepIcon;
                let questTypeIconUrl: string = markerObject.questTypeIcon;
                let stepContainerIconUrl: string = markerObject.stepContainerIcon;
                if (toggledQuest && markerObject.questName === toggledQuest.quest_name) {
                    stepIconUrl = markerObject.activeStepIcon;
                    questTypeIconUrl = markerObject.activeQuestTypeIcon;
                    stepContainerIconUrl = markerObject.activeStepContainerIcon;
                }
                let stepNumberIcon = new L.Icon({iconUrl: stepIconUrl, iconSize: [35, 35]});
                let questTypeIcon = new L.Icon({iconUrl: questTypeIconUrl, iconSize: [35, 35]});
                let stepContainerIcon = new L.Icon({iconUrl: stepContainerIconUrl, iconSize: [35, 35]});
                return <LayerGroup key={Math.random()} >
                    <Marker key={Math.random()} position={markerObject.npcPosition} icon={colorIcon} />
                    <Marker key={Math.random()} position={markerObject.npcPosition} icon={stepContainerIcon} />
                    <Marker key={Math.random()} position={markerObject.npcPosition} icon={questTypeIcon} />
                    <Marker key={Math.random()} position={markerObject.npcPosition} icon={stepNumberIcon}
                    eventHandlers={{ click: () => dispatch(updateToggledQuest({tQuest: markerObject.quest}))}} >
                        <Tooltip>
                            <h6 className='text-center'>
                                {markerObject.npcName}
                            </h6>
                            <h6 className='text-center'>
                                {markerObject.questName}
                            </h6>
                            <h6 className='text-center'>
                                {markerObject.stepDescription}
                            </h6>
                        </Tooltip>
                    </Marker>
                </LayerGroup>
            })}
            <ZoneLegend />
        </MapContainer>
    )
}
