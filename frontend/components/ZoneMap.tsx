import { MapContainer, ImageOverlay, Marker, LayerGroup, Tooltip } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { getQuestDetailsState, getToggledQuestState, updateToggledQuest } from "@/store/slices/dataStoreSlice";
import { TypeQuestDetail, TypeQuest } from "@/types";

const ZoneMap = () => {
    const router = useRouter();
    const { asPath } = router;
    const dispatch = useDispatch();
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    let zoneName: string = splitPathName.split('-').filter((word: string) => word !== '-').join('');
    let questDetails: TypeQuestDetail[] = useSelector(getQuestDetailsState);
    let toggledQuest: TypeQuest = useSelector(getToggledQuestState)[0];

    const renderMarkers = (questDetailsArray: TypeQuestDetail[]) => {
        
    }

    return (
        <MapContainer crs={L.CRS.Simple} center={[-20.95, 20.95]} zoom={4.25} minZoom={4.25} maxZoom={7} scrollWheelZoom={true} 
        style={{height: '825px', width: '100%'}} maxBoundsViscosity={1} >
            <ImageOverlay url={`/maps/${zoneName}.jpg`} bounds={[[-1,1], [-41.9, 41.9]]} />
            {questDetails.map((questDetailObject: TypeQuestDetail) => {
                let colorIcon = new L.Icon({iconUrl: questDetailObject.questBgColorIcon, iconSize: [35, 35] });
                if (questDetailObject.questSteps.questStarter.starterIcon !== '') {
                    console.log('starter');
                    let startIconUrl: string = questDetailObject.questSteps.questStarter.starterIcon;
                    if (toggledQuest && questDetailObject.quest.id === toggledQuest.id) {
                        startIconUrl = questDetailObject.questSteps.questStarter.activeStarterIcon;
                    }
                    let startIcon = new L.Icon({iconUrl: startIconUrl, iconSize: [35, 35]});
                    let startLocX = -questDetailObject.questSteps.questStarter.starterLocX;
                    let startLocY = questDetailObject.questSteps.questStarter.starterLocY
                    console.log(startIconUrl);
                    return <LayerGroup key={Math.random()} >
                        <Marker key={Math.random()} position={[startLocX, startLocY]} 
                        icon={colorIcon} />
                        <Marker key={Math.random()} position={[startLocX, startLocY]} 
                        icon={startIcon} eventHandlers={{ click: () => dispatch(updateToggledQuest({tQuest: questDetailObject.quest}))}} >
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
                }
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

//         } else if (marker.turn_in_icon) {
//             icon = new L.Icon  ({iconUrl: marker.turn_in_icon, iconSize: [35, 35]});
//             return <LayerGroup key={Math.random()} >
//                 <Marker key={Math.random()} 
//                 position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
//                 icon={color_icon} />
//                 <Marker key={Math.random()} 
//                 position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
//                 icon={icon} eventHandlers={{ click: () => this.props.toggleQuest(marker.quest, 
//                 this.props.active_quests) }} >
//                     <Tooltip>
//                         <h6 className='text-center'>{marker.quest.quest_name}</h6>
//                         <h6 className='text-center'>{marker.npc.npc_name}</h6>
//                     </Tooltip>
//                 </Marker>
//             </LayerGroup>
//         } else {
//             icon = new L.Icon  ({iconUrl: marker.quest_type_icon, iconSize: [35, 35]});
//             step_icon = new L.Icon  ({iconUrl: marker.quest_step_icon, iconSize: [35, 35]});
//             let container_icon = new L.Icon ({iconUrl: './icons/first_layer/IconContainer.png', iconSize: [35, 35]})
//             return <LayerGroup key={Math.random()} >
//                 <Marker key={Math.random()} 
//                 position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
//                 icon={color_icon} />
//                 <Marker key={Math.random()} 
//                 position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
//                 icon={container_icon} />
//                 <Marker key={Math.random()} 
//                 position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
//                 icon={icon} />
//                 <Marker key={Math.random()} 
//                 position={this.props.revertLat(marker.npc.npc_location_x, marker.npc.npc_location_y)} 
//                 icon={step_icon} eventHandlers={{ click: () => this.props.toggleQuest(marker.quest, 
//                 this.props.active_quests) }} >
//                     <Tooltip>
//                         <h6 className='text-center'>{marker.quest.quest_name}</h6>
//                         <h6 className='text-center'>{marker.npc.npc_name}</h6>
//                     </Tooltip>
//                 </Marker>
//             </LayerGroup>
//         }
//     })
// }
