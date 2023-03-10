import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import WorldMapComponent from '../components/WorldMapComponent';
import { useNavigate } from 'react-use-navigate';
import { LatLngBounds } from 'react-leaflet';

function WorldMapCont(props) {
    const [zone_marker, setZoneMarker] = useState({icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegion.png`, 
        iconSize: [205.7, 34.85]}), position: [-7.4, 21.5]},);
    const [highlighted_markers, setHighlightedMarkers] = useState([]);
    const addMarker = (pos, icon) => {
        let marker = {icon: icon, position: pos};
        setHighlightedMarkers([...highlighted_markers, marker]);
    };

    const removeMarker = () => {
        setHighlightedMarkers([]);
    };
    
    const newZoneMarker = (region_icon) => {
        setZoneMarker({icon: new L.Icon({iconUrl: region_icon, iconSize: [205.7, 34.85]}), 
        position: [-7.4, 21.5]})
    };

    const resetZoneMarker = () => {
        setZoneMarker({icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegion.png`, 
            iconSize: [205.7, 34.85]}), position: [-7.4, 21.5]});
    };

    const createIcon = (url, size) => {
        let icon = new L.Icon({ iconUrl: url, iconSize: [size[0], size[1]]});
        return icon;
    } 

    let nav = useNavigate();

    let leg_attrs = props.leg_attrs;
    let world_map_attrs = props.world_map_attrs;

    let createHoverOverlay = (region, region_icon, region_name_icon, highlight_pos) => {
        let navLink = `/${region.split(" ").join('').toLowerCase()}`;
        let legend_overlay_pos = null;
        let legend_overlay_icon = `./icons/quest_legend_icons/QuestTotalsBoxHoverOverlay.png`;
        let legend_overlay = new L.Icon({iconUrl: legend_overlay_icon, 
            iconSize: leg_attrs.legend_size});
        if (region === 'La Noscea') {
            legend_overlay_pos = world_map_attrs.la_noscea_legend_pos;
        } else if (region === 'Thanalan') {
            legend_overlay_pos = world_map_attrs.thanalan_legend_pos;
        } else {
            legend_overlay_pos = world_map_attrs.the_black_shroud_legend_pos;
        }

        return <Marker key={Math.random()} icon={legend_overlay} position={legend_overlay_pos} 
        zIndexOffset={1500} opacity={.1}  eventHandlers={{
            mouseover: () => {
                if (highlighted_markers.length === 0) {
                    addMarker(highlight_pos, region_icon);
                    newZoneMarker(region_name_icon);
                }
            },
            mouseout: () => {
                removeMarker();
                resetZoneMarker();
            }, 
            click: () => {
                nav(navLink);
            }
        }} />
    }

    let createRegionLegend = (quests, region) => {
        let legend_box_icon = `./icons/quest_legend_icons/QuestTotalsBox.png`;
        let legend_pos = null;
        let arrow_icon = null;
        let arrow_size = null;
        let arrow_offset = null;
        let arrow_pos = null;
        let main_quest_icon = `./icons/quest_legend_icons/${
            props.setStartersLength(quests.main_starters, region)}.png`;
        let class_quest_icon = `./icons/quest_legend_icons/${
            props.setStartersLength(quests.class_starters, region)}.png`;
        let side_quest_icon = `./icons/quest_legend_icons/${
            props.setStartersLength(quests.side_starters, region)}.png`;
        let hunting_quest_icon = `./icons/quest_legend_icons/${
            props.setStartersLength(quests.hunting_starters, region)}.png`;

        if (region === 'La Noscea') {
            legend_pos = world_map_attrs.la_noscea_legend_pos;
            arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`;
            arrow_size = leg_attrs.vert_arrow_size;
            arrow_offset = leg_attrs.vert_arrow_offset;
            arrow_pos = [legend_pos[0] + arrow_offset, legend_pos[1]];
        } else if (region === 'Thanalan') {
            legend_pos = world_map_attrs.thanalan_legend_pos;
            arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`;
            arrow_size = leg_attrs.hor_arrow_size;
            arrow_offset = -leg_attrs.hor_arrow_offset;
            arrow_pos = [legend_pos[0], legend_pos[1] + arrow_offset];
        } else {
            legend_pos = world_map_attrs.the_black_shroud_legend_pos;
            arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`;
            arrow_size = leg_attrs.hor_arrow_size;
            arrow_offset = -leg_attrs.hor_arrow_offset;
            arrow_pos = [legend_pos[0], legend_pos[1] + arrow_offset];
        }

        let legend_icon = {icon: new L.Icon({iconUrl: legend_box_icon, 
            iconSize: leg_attrs.legend_size}), position: legend_pos, z_offset: leg_attrs.legend_z_offset};
        let legend_arrow = {icon: new L.Icon({iconUrl: arrow_icon, iconSize: arrow_size}), 
            position: arrow_pos, z_offset: leg_attrs.arrow_z_offset};
        let main_quest_number = {icon: new L.Icon({iconUrl: main_quest_icon, iconSize: leg_attrs.legend_num_size}), 
            position: [legend_pos[0] + leg_attrs.top_num_offset, legend_pos[1] + leg_attrs.left_num_offset], 
            z_offset: leg_attrs.legend_num_z_offset};
        let class_quest_number = {icon: new L.Icon({iconUrl: class_quest_icon, iconSize: leg_attrs.legend_num_size}), 
            position: [legend_pos[0] + leg_attrs.bot_num_offset, legend_pos[1] + leg_attrs.left_num_offset], 
            z_offset: leg_attrs.legend_num_z_offset};
        let side_quest_number = {icon: new L.Icon({iconUrl: side_quest_icon, iconSize: leg_attrs.legend_num_size}), 
            position: [legend_pos[0] + leg_attrs.top_num_offset, legend_pos[1] + leg_attrs.right_num_offset], 
            z_offset: leg_attrs.legend_num_z_offset};
        let hunting_log_number = {icon: new L.Icon({iconUrl: hunting_quest_icon, iconSize: leg_attrs.legend_num_size}), 
            position: [legend_pos[0] + leg_attrs.bot_num_offset, legend_pos[1] + leg_attrs.right_num_offset], 
            z_offset: leg_attrs.legend_num_z_offset};
        let legend_icons = [legend_icon, legend_arrow, main_quest_number, class_quest_number, side_quest_number,
            hunting_log_number]
            
        return legend_icons;
    }

    let la_noscea_icon = createIcon(`./highlighted_maps/LaNosceaHighlighted.jpg`, [220.1, 234.05]);
    let thanalan_icon = createIcon(`./highlighted_maps/ThanalanHighlighted.jpg`, [283.65, 262.725]);
    let the_black_shroud_icon = createIcon(`./highlighted_maps/TheBlackShroudHighlighted.jpg`, [279.775, 257.3]);
    let la_noscea_name_icon = `./icons/region_names/LaNosceaRegionName.png`;
    let thanalan_name_icon = `./icons/region_names/ThanalanRegionName.png`;
    let the_black_shroud_name_icon = `./icons/region_names/TheBlackShroudRegionName.png`;
    let la_noscea_highlight_pos = [-23.46, 9.375];
    let thanalan_highlight_pos = [-30.51, 22.375];
    let the_black_shroud_highlight_pos = [-19.2, 28.45];
    let la_noscea_legend_icons = createRegionLegend(props.quest_starters, 'La Noscea');
    let thanalan_legend_icons = createRegionLegend(props.quest_starters, 'Thanalan')
    let the_black_shroud_legend_icons = createRegionLegend(props.quest_starters, 'The Black Shroud')
    let la_noscea_overlay = createHoverOverlay('La Noscea', la_noscea_icon, la_noscea_name_icon, la_noscea_highlight_pos);
    let thanalan_overlay = createHoverOverlay('Thanalan', thanalan_icon, thanalan_name_icon, thanalan_highlight_pos);
    let the_black_shroud_overlay = createHoverOverlay('The Black Shroud', the_black_shroud_icon, the_black_shroud_name_icon, 
        the_black_shroud_highlight_pos);
    let hover_overlays = [la_noscea_overlay, thanalan_overlay, the_black_shroud_overlay]

    let bounds= new LatLngBounds(this.props.revertLat(1,1), this.props.revertLat(41.9, 41.9));

    return (
        <Container style={{padding: 0}}>
            <WorldMapComponent mapName={props.mapName} bounds={bounds} center={props.center} 
            zoom={props.zoom} props={[zone_marker, highlighted_markers]} la_noscea_legend_icons={la_noscea_legend_icons} 
            thanalan_legend_icons={thanalan_legend_icons} the_black_shroud_legend_icons={the_black_shroud_legend_icons} 
            hover_overlays={hover_overlays} />
        </Container>
    )
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
    world_map_attrs: storeData.storeData.world_map_attributes,
    leg_attrs: storeData.storeData.legend_icon_attributes,
})

export default connect(mapStateToProps)(WorldMapCont);