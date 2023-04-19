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
        console.log(questDetailObject)
        let startMarker: TypeStarterMarker | undefined = {
            position: [],
            colorIcon: '',
            startIcon: '',
            activeStartIcon: '',
        };
        let turnInMarker: TypeTurnInMarker | undefined = {
            position: [],
            colorIcon: '',
            turnInIcon: '',
            activeTurnInIcon: '',
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
        };
        if (questDetailObject.questSteps.questStarter.starterIcon !== '' && startMarker) {
            let startMarkerLoc: number[] = [
                -questDetailObject.questSteps.questStarter.starterLocX,
                questDetailObject.questSteps.questStarter.starterLocY
            ];
            startMarker = {
                position: startMarkerLoc,
                colorIcon: questDetailObject.questBgColorIcon,
                startIcon: questDetailObject.questSteps.questStarter.starterIcon,
                activeStartIcon: questDetailObject.questSteps.questStarter.activeStarterIcon
            }
            console.log(startMarker)
            markerData.push(startMarker);
        }
        if (questDetailObject.questSteps.questTurnIn.turnInIcon !== '' && turnInMarker) {
            let turnInMarkerLoc: number[] = [
                -questDetailObject.questSteps.questTurnIn.turnInLocX,
                questDetailObject.questSteps.questTurnIn.turnInLocY
            ];
            turnInMarker = {
                position: turnInMarkerLoc,
                colorIcon: questDetailObject.questBgColorIcon,
                turnInIcon: questDetailObject.questSteps.questTurnIn.turnInIcon,
                activeTurnInIcon: questDetailObject.questSteps.questTurnIn.activeTurnInIcon
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
                    -numberedStep.stepLocX,
                    numberedStep.stepLocY
                ];
                numberedStepMarker = {
                    position: numberedStepMarkerLoc,
                    colorIcon: questDetailObject.questBgColorIcon,
                    stepContainerIcon: numberedStep.stepContainerIcon,
                    activeStepContainerIcon: numberedStep.activeStepContainerIcon,
                    questTypeIcon: questDetailObject.questTypeIcon,
                    activeQuestTypeIcon: questDetailObject.activeQuestTypeIcon,
                    stepNumberIcon: numberedStep.stepNumberIcon,
                    activeStepNumberIcon: numberedStep.activeStepNumberIcon
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

    // console.log(markerData);
    let clusteredMarkerData = groupMarkerDataByPosition(markerData, 'position');
    console.log(clusteredMarkerData);
    let unclusteredMarkerData: any[] = [];

    Object.entries(clusteredMarkerData).map(([key, value]: [string, any[]]) => {
        console.log(value);
        if (value.length > 1) {
            let offset = 0;
            value.map(markerData => {
                let newMarkerData = {};
                let newY = parseFloat(markerData.position[1]);
                newY += offset;
                newMarkerData = {...markerData, position: [markerData.position[0], newY]};
                unclusteredMarkerData.push(newMarkerData);
                offset += 0.2;
                return unclusteredMarkerData;
            })
        } else {
            unclusteredMarkerData.push(value[0]);
        }
        return unclusteredMarkerData;
    });

    console.log(unclusteredMarkerData);
    
        // let unclustered_markers = [];
        // Object.entries(clustered_markers).map(([key, value]) => {
            
        // })

    return (
        <MapContainer crs={L.CRS.Simple} center={[-20.95, 20.95]} zoom={4.25} minZoom={4.25} maxZoom={7} scrollWheelZoom={true} 
        style={{height: '825px', width: '100%'}} maxBoundsViscosity={1} >
            <ImageOverlay url={`/maps/${zoneName}.jpg`} bounds={[[-1,1], [-41.9, 41.9]]} />
            {questDetails.map((questDetailObject: TypeQuestDetail) => {
                let colorIcon = new L.Icon({iconUrl: questDetailObject.questBgColorIcon, iconSize: [35, 35] });
                if (questDetailObject.questSteps.questStarter.starterIcon !== '') {
                    let startIconUrl: string = questDetailObject.questSteps.questStarter.starterIcon;
                    if (toggledQuest && questDetailObject.quest.id === toggledQuest.id) {
                        startIconUrl = questDetailObject.questSteps.questStarter.activeStarterIcon;
                    }
                    let startIcon = new L.Icon({iconUrl: startIconUrl, iconSize: [35, 35]});
                    let startLocX = -questDetailObject.questSteps.questStarter.starterLocX;
                    let startLocY = questDetailObject.questSteps.questStarter.starterLocY;
                    return <LayerGroup key={Math.random()} >
                        <Marker key={Math.random()} position={[startLocX, startLocY]} icon={colorIcon} />
                        <Marker key={Math.random()} position={[startLocX, startLocY]} icon={startIcon} 
                        eventHandlers={{ click: () => dispatch(updateToggledQuest({tQuest: questDetailObject.quest}))}} >
                            <Tooltip>
                                <h6 className='text-center'>
                                    {questDetailObject.questSteps.questStarter.tooltipDetails.npcName}
                                    </h6>
                                <h6 className='text-center'>
                                    {questDetailObject.questSteps.questStarter.tooltipDetails.questName}
                                    </h6>
                                <h6 className='text-center'>
                                    {questDetailObject.questSteps.questStarter.tooltipDetails.stepDescription}
                                    </h6>
                            </Tooltip>
                        </Marker>
                    </LayerGroup>
                }   else if (questDetailObject.questSteps.questTurnIn.turnInIcon !== '') {
                    let turnInIconUrl: string = questDetailObject.questSteps.questTurnIn.turnInIcon;
                    if (toggledQuest && questDetailObject.quest.id === toggledQuest.id) {
                        turnInIconUrl = questDetailObject.questSteps.questTurnIn.activeTurnInIcon;
                    }
                    let turnInIcon = new L.Icon({iconUrl: turnInIconUrl, iconSize: [35, 35]});
                    let turnInLocx = -questDetailObject.questSteps.questTurnIn.turnInLocX;
                    let turnInLocY = questDetailObject.questSteps.questTurnIn.turnInLocY;
                    return <LayerGroup key={Math.random()} >
                        <Marker key={Math.random()} position={[turnInLocx, turnInLocY]} icon={colorIcon} />
                        <Marker key={Math.random()} position={[turnInLocx, turnInLocY]} icon={turnInIcon}  >
                            <Tooltip>
                                <h6 className='text-center'>
                                    {questDetailObject.questSteps.questTurnIn.tooltipDetails.npcName}
                                </h6>
                                <h6 className='text-center'>
                                    {questDetailObject.questSteps.questTurnIn.tooltipDetails.questName}
                                </h6>
                                <h6 className='text-center'>
                                    {questDetailObject.questSteps.questTurnIn.tooltipDetails.stepDescription}
                                </h6>
                            </Tooltip>
                        </Marker>
                    </LayerGroup>
                }  
                
                questDetailObject.questSteps.questNumberedSteps.map(
                    (numberedStep: {stepContainerIcon: string, activeStepContainerIcon: string, stepNumberIcon: string, 
                    activeStepNumberIcon: string, stepLocX: number, stepLocY: number, tooltipDetails: {
                        npcName: string, questName: string, stepDescription: string
                    }}) => {
                    let stepNumberIconUrl: string = numberedStep.stepNumberIcon;
                    let stepContainerIconUrl: string = numberedStep.stepContainerIcon;
                    let questTypeIconUrl: string = questDetailObject.questTypeIcon;
                    if (toggledQuest && questDetailObject.quest.id === toggledQuest.id) {
                        stepNumberIconUrl = numberedStep.activeStepNumberIcon;
                        stepContainerIconUrl = numberedStep.activeStepContainerIcon;
                        questTypeIconUrl = questDetailObject.activeQuestTypeIcon;
                    }
                    let stepNumberIcon = new L.Icon ({iconUrl: stepNumberIconUrl, iconSize: [35, 35]});
                    let stepContainerIcon = new L.Icon ({iconUrl: stepContainerIconUrl, iconSize: [35, 35]});
                    let questTypeIcon = new L.Icon ({iconUrl: questTypeIconUrl, iconSize: [35, 35]});
                    let stepIconLocX = -numberedStep.stepLocX;
                    let stepIconLocY = numberedStep.stepLocY;
                    return <LayerGroup key={Math.random()} >
                        <Marker key={Math.random()} position={[stepIconLocX, stepIconLocY]} icon={colorIcon} />
                        <Marker key={Math.random()} position={[stepIconLocX, stepIconLocY]} icon={stepContainerIcon} />
                        <Marker key={Math.random()} position={[stepIconLocX, stepIconLocY]} icon={questTypeIcon} />
                        <Marker key={Math.random()} position={[stepIconLocX, stepIconLocY]} icon={stepNumberIcon} >
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
                        </Marker>
                    </LayerGroup>
                })
            })}
        </MapContainer>
    )
}

export default ZoneMap;

// renderMarkers = (markers) => {
//     return markers.map(marker => {
//         let icon = null;
//         let color_icon = new L.Icon  ({iconUrl: marker.bg_color, iconSize: [35, 35]});
//         let step_icon = null;
//         if (marker.start_icon) {
//             let start = null;
//                 if (this.props.toggled_quests.includes(marker.quest)) {
//                     start = marker.active_start_icon;
//                 } else {
//                     start = marker.start_icon;
//                 }
//             icon = new L.Icon  ({iconUrl: start, iconSize: [35, 35]});


// }
