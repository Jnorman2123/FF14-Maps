import { MapContainer, ImageOverlay, Marker, LayerGroup, Tooltip } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { getQuestDetailsState, getToggledQuestState, updateToggledQuest } from "@/store/slices/dataStoreSlice";
import { TypeQuestDetail, TypeQuest, TypeStarterMarker, TypeTurnInMarker, TypeNumberedStepMarker } from "@/types";

const ZoneMap = () => {
    interface ClusteredMarkerData {
        [key: string]: any[];
    }

    const router = useRouter();
    const { asPath } = router;
    const dispatch = useDispatch();
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    let zoneName: string = splitPathName.split('-').filter((word: string) => word !== '-').join('');
    let questDetails: TypeQuestDetail[] = useSelector(getQuestDetailsState);
    let toggledQuest: TypeQuest = useSelector(getToggledQuestState)[0];
    let markerData: any[] = [];

    questDetails.map((questDetailObject: TypeQuestDetail) => {
        let startMarker: TypeStarterMarker | undefined = {
            position: [],
            colorIcon: '',
            startIcon: '',
            activeStartIcon: '',
            npcName: '',
            questName: '',
            stepDescription: '',
        };
        let turnInMarker: TypeTurnInMarker | undefined = {
            position: [],
            colorIcon: '',
            turnInIcon: '',
            activeTurnInIcon: '',
            npcName: '',
            questName: '',
            stepDescription: '',
        };
        let numberedStepMarker: TypeNumberedStepMarker | undefined = {
            position: [],
            colorIcon: '',
            stepContainerIcon: '',
            activeStepContainerIcon: '',
            questTypeIcon: '',
            activeQuestTypeIcon: '',
            stepNumberIcon: '',
            activeStepNumberIcon: '',
            npcName: '',
            questName: '',
            stepDescription: '',
        };
        if (questDetailObject.questSteps.questStarter.starterIcon !== '' && startMarker) {
            let startMarkerLoc: number[] = [
                -questDetailObject.questSteps.questStarter.starterLocY,
                questDetailObject.questSteps.questStarter.starterLocX
            ];
            startMarker = {
                position: startMarkerLoc,
                colorIcon: questDetailObject.questBgColorIcon,
                startIcon: questDetailObject.questSteps.questStarter.starterIcon,
                activeStartIcon: questDetailObject.questSteps.questStarter.activeStarterIcon,
                npcName: questDetailObject.questSteps.questStarter.tooltipDetails.npcName,
                questName: questDetailObject.questSteps.questStarter.tooltipDetails.questName,
                stepDescription: questDetailObject.questSteps.questStarter.tooltipDetails.stepDescription,
            }
            markerData.push(startMarker);
        }
        if (questDetailObject.questSteps.questTurnIn.turnInIcon !== '' && turnInMarker) {
            let turnInMarkerLoc: number[] = [
                -questDetailObject.questSteps.questTurnIn.turnInLocY,
                questDetailObject.questSteps.questTurnIn.turnInLocX
            ];
            turnInMarker = {
                position: turnInMarkerLoc,
                colorIcon: questDetailObject.questBgColorIcon,
                turnInIcon: questDetailObject.questSteps.questTurnIn.turnInIcon,
                activeTurnInIcon: questDetailObject.questSteps.questTurnIn.activeTurnInIcon,
                npcName: questDetailObject.questSteps.questTurnIn.tooltipDetails.npcName,
                questName: questDetailObject.questSteps.questTurnIn.tooltipDetails.questName,
                stepDescription: questDetailObject.questSteps.questTurnIn.tooltipDetails.stepDescription,
            }
            markerData.push(turnInMarker);
        }
        questDetailObject.questSteps.questNumberedSteps.map(
            (numberedStep: {stepContainerIcon: string, activeStepContainerIcon: string, stepNumberIcon: string, 
            activeStepNumberIcon: string, stepLocX: number, stepLocY: number, tooltipDetails: {
                npcName: string, questName: string, stepDescription: string
            }}) => {
            if (numberedStepMarker) {
                let numberedStepMarkerLoc: number[] = [
                    -numberedStep.stepLocY,
                    numberedStep.stepLocX
                ];
                numberedStepMarker = {
                    position: numberedStepMarkerLoc,
                    colorIcon: questDetailObject.questBgColorIcon,
                    stepContainerIcon: numberedStep.stepContainerIcon,
                    activeStepContainerIcon: numberedStep.activeStepContainerIcon,
                    questTypeIcon: questDetailObject.questTypeIcon,
                    activeQuestTypeIcon: questDetailObject.activeQuestTypeIcon,
                    stepNumberIcon: numberedStep.stepNumberIcon,
                    activeStepNumberIcon: numberedStep.activeStepNumberIcon,
                    npcName: numberedStep.tooltipDetails.npcName,
                    questName: numberedStep.tooltipDetails.questName,
                    stepDescription: numberedStep.tooltipDetails.stepDescription,
                }
                markerData.push(numberedStepMarker);
            }
        })
        return markerData;
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

    let clusteredMarkerData = groupMarkerDataByPosition(markerData, 'position');
    let unclusteredMarkerData: any[] = [];

    Object.entries(clusteredMarkerData).map(([key, value]: [string, any[]]) => {
        if (value.length > 1) {
            let offset = 0;
            value.map(markerData => {
                let newMarkerData = {};
                let newY = parseFloat(markerData.position[0]);
                newY += offset;
                newMarkerData = {...markerData, position: [newY, markerData.position[1]]};
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
        <MapContainer crs={L.CRS.Simple} center={[-20.95, 20.95]} zoom={4.25} minZoom={4.25} maxZoom={7} scrollWheelZoom={true} 
        style={{height: '825px', width: '100%'}} maxBoundsViscosity={1} >
            <ImageOverlay url={`/maps/${zoneName}.jpg`} bounds={[[-1,1], [-41.9, 41.9]]} />
            {unclusteredMarkerData.map((markerObject: any) => {
                let colorIcon = new L.Icon({iconUrl: markerObject.colorIcon, iconSize: [35, 35]});
                if (markerObject.startIcon) {
                    let startIconUrl: string = markerObject.startIcon;
                    if (toggledQuest && markerObject.questName === toggledQuest.quest_name) {
                        startIconUrl = markerObject.activeStartIcon;
                    }
                    let startIcon = new L.Icon({iconUrl: startIconUrl, iconSize: [35, 35]});
                    return <LayerGroup key={Math.random()} >
                        <Marker key={Math.random()} position={markerObject.position} icon={colorIcon} />
                        <Marker key={Math.random()} position={markerObject.position} icon={startIcon}>
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
                }
                if (markerObject.turnInIcon) {
                    let turnInIconUrl: string = markerObject.turnInIcon;
                    if (toggledQuest && markerObject.questName === toggledQuest.quest_name) {
                        turnInIconUrl = markerObject.activeTurnInIcon;
                    }
                    let turnInIcon = new L.Icon({iconUrl: turnInIconUrl, iconSize: [35, 35]});
                    return <LayerGroup key={Math.random()} >
                        <Marker key={Math.random()} position={markerObject.position} icon={colorIcon} />
                        <Marker key={Math.random()} position={markerObject.position} icon={turnInIcon}>
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
                }
                if (markerObject.stepNumberIcon) {
                    let stepNumberIconUrl: string = markerObject.stepNumberIcon;
                    let questTypeIconUrl: string = markerObject.questTypeIcon;
                    let stepContainerIconUrl: string = markerObject.stepContainerIcon;
                    if (toggledQuest && markerObject.questName === toggledQuest.quest_name) {
                        stepNumberIconUrl = markerObject.activeStepNumberIcon;
                        questTypeIconUrl = markerObject.activeQuestTypeIcon;
                        stepContainerIconUrl = markerObject.activeStepContainerIcon;
                    }
                    let stepNumberIcon = new L.Icon({iconUrl: stepNumberIconUrl, iconSize: [35, 35]});
                    let questTypeIcon = new L.Icon({iconUrl: questTypeIconUrl, iconSize: [35, 35]});
                    let stepContainerIcon = new L.Icon({iconUrl: stepContainerIconUrl, iconSize: [35, 35]})
                    return <LayerGroup key={Math.random()} >
                        <Marker key={Math.random()} position={markerObject.position} icon={colorIcon} />
                        <Marker key={Math.random()} position={markerObject.position} icon={stepContainerIcon} />
                        <Marker key={Math.random()} position={markerObject.position} icon={questTypeIcon} />
                        <Marker key={Math.random()} position={markerObject.position} icon={stepNumberIcon}>
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
                }
            })}

                        {/* <Marker key={Math.random()} position={[stepIconLocX, stepIconLocY]} icon={stepNumberIcon} >
                            <Tooltip>
                                <h6 className='text-center'>
                                    {numberedStep.tooltipDetails.npcName}
                                </h6>
                                <h6 className='text-center'>
                                    {numberedStep.tooltipDetails.questName}
                                </h6>
                                <h6 className='text-center'>
                                    {numberedStep.tooltipDetails.stepDescription}
                                </h6>
                            </Tooltip>
                        </Marker> */}
        </MapContainer>
    )
}

export default ZoneMap;
