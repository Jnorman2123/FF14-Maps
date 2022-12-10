import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import RegionMapComponent from '../components/RegionMapComponent';
import { useNavigate } from 'react-router-dom';

function RegionMapCont(props) {
    
    const [la_noscea_zone_marker, setLaNosceaZoneMarker] = useState({icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`, 
        iconSize: [205.7, 34.85]}), position: [-7.5, 33.2]});
    const [the_black_shroud_zone_marker, setBlackShroudZoneMarker] = useState({icon: 
        new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`, iconSize: [205.7, 34.85]}), position: [-7.3, 21.5]});
    const [thanalan_zone_marker, setThanalanZoneMarker] = useState({icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`, 
        iconSize: [205.7, 34.85]}), position: [-7.3, 10]});
    const [highlighted_markers, setHighlightedMarkers] = useState([]);

    const addMarker = (pos, icon) => {
        let marker = {icon: icon, position: pos};
        setHighlightedMarkers([...highlighted_markers, marker]);
    };

    const removeMarker = () => {
        setHighlightedMarkers([]);
    };

    const setZoneMarker = (zone_icon) => {
        if (props.mapName === "La Noscea") {
           setLaNosceaZoneMarker({icon: new L.Icon({iconUrl: zone_icon, iconSize: [205.7, 34.85]}),
                position: [-7.5, 33.2]});
        } else if (props.mapName === 'The Black Shroud') {
            setBlackShroudZoneMarker({icon: new L.Icon({iconUrl: zone_icon, iconSize: [205.7, 34.85]}),
                position: [-7.3, 21.5]});
        } else {
            setThanalanZoneMarker({icon: new L.Icon({iconUrl: zone_icon, iconSize: [205.7, 34.85]}),
                position: [-7.3, 10]});
        }

        
    }

    const resetZoneMarker = () => {
        if (props.mapName === "La Noscea") {
            setLaNosceaZoneMarker({icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`,
        iconSize: [205.7, 34.85]}), position: [-7.5, 33.2]});
        } else if (props.mapName === 'The Black Shroud') {
            setBlackShroudZoneMarker({icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`,
        iconSize: [205.7, 34.85]}), position: [-7.3, 21.5]});
        } else {
            setThanalanZoneMarker({icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`,
        iconSize: [205.7, 34.85]}), position: [-7.3, 10]});
        }
    }

    let nav = useNavigate();
    let mapName = props.mapName.split(' ').join('');
    let leg_attrs = props.leg_attrs;
    let la_nos_map_attrs = props.la_nos_map_attrs;
    let black_shroud_map_attrs = props.black_shroud_map_attrs;
    let than_map_attrs = props.than_map_attrs;
    let legend_icon_groups = [];

    let createHoverOverlay = (zone, zone_name_icon, zone_icon, highlight_pos, legend_overlay_pos) => {
        let navLink = `/${zone.split(" ").join('').toLowerCase()}`;
        let legend_overlay_icon = `./icons/quest_legend_icons/QuestTotalsBoxHoverOverlay.png`;
        let legend_overlay = new L.Icon({iconUrl: legend_overlay_icon, 
            iconSize: leg_attrs.legend_size});

        return <Marker key={Math.random()} icon={legend_overlay} position={legend_overlay_pos} 
            zIndexOffset={1500} opacity={.1}  eventHandlers={{
            mouseover: () => {
                if (highlighted_markers.length === 0) {
                    addMarker(highlight_pos, zone_icon);
                    setZoneMarker(zone_name_icon);
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

    let createZoneLegend = (region) => {
        let quests = props.quest_starters;
        let legend_box_icon = `./icons/quest_legend_icons/QuestTotalsBox.png`;
        let main_quest_icon = null;
        let class_quest_icon = null;
        let side_quest_icon = null;
        let hunting_quest_icon = null;
        let legend_pos = null;
        let arrow_icon = null;
        let arrow_size = null;
        let arrow_pos = null;
        let highlight_pos = null;
        let highlight_size = null;
        let map_attrs = null;
        let zones = null;
        

        if (region === 'La Noscea') {
            map_attrs = la_nos_map_attrs;
            zones = props.la_noscea_zone_names;
        } else if (region === 'The Black Shroud') {
            map_attrs = black_shroud_map_attrs;
            zones = props.the_black_shroud_zone_names;
        } else {
            map_attrs = than_map_attrs;
            zones = props.thanalan_zone_names;
        }

        zones.map(z => {
            let joined_zone_name = z.split(' ').join('')
            let zone_jpg = `./highlighted_maps/${joined_zone_name}Highlighted.jpg`;
            let attrs_name = z.toLowerCase().split(' ').filter(n => n !== `-`).map(k => {
                if (k.includes(`'`)) {
                    k = k.split('').filter(l => l !== `'`).join('');
                }
                return k;
            }).join('_').concat('_attributes');;
            
            Object.entries(map_attrs).map(([key, value]) => {
                if (key === attrs_name) {
                    legend_pos = value.legend_pos;
                    arrow_icon = value.arrow_icon;
                    arrow_size = value.arrow_size;
                    arrow_pos = value.arrow_pos;
                    highlight_pos = value.highlight_pos;
                    highlight_size = value.highlight_size;
                }
                return value;
            });
            
            main_quest_icon = `./icons/quest_legend_icons/${props.setStartersLength(quests.main_starters, z)}.png`;
            class_quest_icon = `./icons/quest_legend_icons/${props.setStartersLength(quests.class_starters, z)}.png`;
            side_quest_icon = `./icons/quest_legend_icons/${props.setStartersLength(quests.side_starters, z)}.png`;
            hunting_quest_icon = `./icons/quest_legend_icons/${props.setStartersLength(quests.hunting_starters, z)}.png`;
            let zone_icon = props.createIcon(zone_jpg, highlight_size);
            let zone_name_icon = `./icons/zone_names/${joined_zone_name}.png`
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
            let hover_overlay = createHoverOverlay(z, zone_name_icon, zone_icon, highlight_pos, legend_pos);
            let legend_icons = {legend_icon: legend_icon, legend_arrow: legend_arrow, main_quest_number: main_quest_number, 
                class_quest_number: class_quest_number, side_quest_number: side_quest_number,
                hunting_log_number: hunting_log_number, hover_overlay: hover_overlay};
            legend_icon_groups.push(legend_icons);
            return legend_icons;
        });
        return legend_icon_groups;
    }
    
    if (props.mapName === 'La Noscea') {
        createZoneLegend('La Noscea');
    } else if (props.mapName === 'The Black Shroud') {
        createZoneLegend('The Black Shroud');
    } else {
        createZoneLegend('Thanalan');
    }

    return (
        <Container>
            <RegionMapComponent mapName={mapName} bounds={props.bounds} center={props.center} 
                zoom={props.zoom} props={[la_noscea_zone_marker, the_black_shroud_zone_marker, thanalan_zone_marker, 
                highlighted_markers]} legend_icon_groups={legend_icon_groups} />
        </Container>
    )
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
    la_noscea_zone_names: storeData.storeData.la_noscea_zone_names,
    the_black_shroud_zone_names: storeData.storeData.the_black_shroud_zone_names,
    thanalan_zone_names: storeData.storeData.thanalan_zone_names,
    leg_attrs: storeData.storeData.legend_icon_attributes,
    la_nos_map_attrs: storeData.storeData.la_noscea_map_attributes,
    black_shroud_map_attrs: storeData.storeData.the_black_shroud_map_attributes,
    than_map_attrs: storeData.storeData.thanalan_map_attributes,
})

export default connect(mapStateToProps)(RegionMapCont);

