import React, { Component } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import RegionMapComponent from '../components/RegionMapComponent';

class RegionMapCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            la_noscea_zone_marker: {icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`, iconSize: [205.7, 34.85]}),
                position: [-7.6, 33.2]},
            the_black_shroud_zone_marker: {icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`, iconSize: [205.7, 34.85]}),
                position: [-7.6, 33.2]},
            thanalan_zone_marker: {icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`, iconSize: [205.7, 34.85]}),
                position: [-7.6, 33.2]},
            highlighted_markers: [],
            navigate: false,
            navigateLink: '',
        };
    };

    addMarker = (pos, icon) => {
        let marker = {icon: icon, position: pos};
        this.setState({ highlighted_markers: [...this.state.highlighted_markers, marker]});
    };

    removeMarker = () => {
        this.setState({highlighted_markers: []});
        
    };

    setZoneMarker = (zone_icon) => {
        if (this.props.mapName === "La Noscea") {
            this.setState({la_noscea_zone_marker: {icon: new L.Icon({iconUrl: zone_icon, iconSize: [205.7, 34.85]}),
                position: [-7.6, 33.2]}});
        } else if (this.props.mapName === 'The Black Shroud') {
            this.setState({the_black_shroud_zone_marker: {icon: new L.Icon({iconUrl: zone_icon, iconSize: [205.7, 34.85]}),
                position: [-7.6, 33.2]}});
        } else {
            this.setState({thanalan_zone_marker: {icon: new L.Icon({iconUrl: zone_icon, iconSize: [205.7, 34.85]}),
                position: [-7.6, 33.2]}});
        }

        
    }

    resetZoneMarker = () => {
        if (this.props.mapName === "La Noscea") {
            this.setState({la_noscea_zone_marker: {icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`,
        iconSize: [205.7, 34.85]}), position: [-7.6, 33.2]}});
        } else if (this.props.mapName === 'The Black Shroud') {
            this.setState({the_black_shroud_zone_marker: {icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`,
        iconSize: [205.7, 34.85]}), position: [-7.6, 33.2]}});
        } else {
            this.setState({thanalan_zone_marker: {icon: new L.Icon({iconUrl: `./icons/zone_names/SelectAZone.png`,
        iconSize: [205.7, 34.85]}), position: [-7.6, 33.2]}});
        }
    }

    render () {
        let mapName = this.props.mapName.split(' ').join('');
        let leg_attrs = this.props.leg_attrs;
        let la_nos_map_attrs = this.props.la_nos_map_attrs;
        let black_shroud_map_attrs = this.props.black_shroud_map_attrs;
        let than_map_attrs = this.props.than_map_attrs;

        let createHoverOverlay = (zone, zone_name_icon) => {
            let navLink = `/${zone.split(" ").join('').toLowerCase()}`;
            let legend_overlay_pos = null;
            let legend_overlay_icon = `./icons/quest_legend_icons/QuestTotalsBoxHoverOverlay.png`;
            let legend_overlay = new L.Icon({iconUrl: legend_overlay_icon, 
                iconSize: leg_attrs.legend_size});
            
            if (this.props.mapName === 'La Noscea') {
                switch (zone) {
                    case 'Limsa Lominsa Upper Decks':
                        legend_overlay_pos = la_nos_map_attrs.limsa_lominsa_upper_decks_legend_pos;
                        break
                    case 'Limsa Lominsa Lower Decks':
                        legend_overlay_pos = la_nos_map_attrs.limsa_lominsa_lower_decks_legend_pos;
                        break
                    case 'Middle La Noscea':
                        legend_overlay_pos = la_nos_map_attrs.middle_la_noscea_legend_pos;
                        break
                    case 'Lower La Noscea':
                        legend_overlay_pos = la_nos_map_attrs.lower_la_noscea_legend_pos;
                        break
                    case 'Eastern La Noscea':
                        legend_overlay_pos = la_nos_map_attrs.eastern_la_noscea_legend_pos;
                        break
                    case 'Western La Noscea':
                        legend_overlay_pos = la_nos_map_attrs.western_la_noscea_legend_pos;
                        break
                    case 'Upper La Noscea':
                        legend_overlay_pos = la_nos_map_attrs.upper_la_noscea_legend_pos;
                        break
                    case 'Outer La Noscea':
                        legend_overlay_pos = la_nos_map_attrs.outer_la_noscea_legend_pos;
                        break
                    default: 
                        break
                }
            } else if (this.props.mapName === 'The Black Shroud') {
                switch (zone) {
                    case 'Old Gridania':
                        legend_overlay_pos = black_shroud_map_attrs.old_gridania_legend_pos;
                        break
                    case 'New Gridania':
                        legend_overlay_pos = black_shroud_map_attrs.new_gridania_legend_pos;
                        break
                    case 'East Shroud':
                        legend_overlay_pos = black_shroud_map_attrs.east_shroudlegend_pos;
                        break
                    case 'North Shroud':
                        legend_overlay_pos = black_shroud_map_attrs.north_shroud_legend_pos;
                        break
                    case 'Central Shroud':
                        legend_overlay_pos = black_shroud_map_attrs.central_shroud_legend_pos;
                        break
                    case 'South Shroud':
                        legend_overlay_pos = black_shroud_map_attrs.south_shroud_legend_pos;
                        break
                    default: 
                        break
                }
            } else {
                switch (zone) {
                    case `Ul'dah - Steps of Nald`:
                        legend_overlay_pos = than_map_attrs.uldah_steps_of_nald_legend_pos;
                        break
                    case `Ul'dah - Steps of Thal`:
                        legend_overlay_pos = than_map_attrs.uldah_steps_of_thal_legend_pos;
                        break
                    case 'Hustings Strip':
                        legend_overlay_pos = than_map_attrs.hustings_strip_legend_pos;
                        break
                    case 'Western Thanalan':
                        legend_overlay_pos = than_map_attrs.western_thanalan_legend_pos;
                        break
                    case 'Eastern Thanalan':
                        legend_overlay_pos = than_map_attrs.eastern_thanalan_legend_pos;
                        break
                    case 'Central Thanalan':
                        legend_overlay_pos = than_map_attrs.central_thanalan_legend_pos;
                        break
                    case 'Southern Thanalan':
                        legend_overlay_pos = than_map_attrs.southern_thanalan_legend_pos;
                        break
                    case 'Northern Thanalan':
                        legend_overlay_pos = than_map_attrs.northern_thanalan_legend_pos;
                        break
                    default: 
                        break
                }
            }
            

            return <Marker key={Math.random()} icon={legend_overlay} position={legend_overlay_pos} 
            zIndexOffset={1500} opacity={.1}  eventHandlers={{
                mouseover: () => {
                    if (this.state.highlighted_markers.length === 0) {
                        // change this to actual values later
                        this.addMarker([0,0], `./icons/zone_names/SelectAZone.png`);
                        this.setZoneMarker(zone_name_icon);
                    }
                },
                mouseout: () => {
                    this.removeMarker();
                    this.resetZoneMarker();
                }, 
                click: () => {
                    this.setState({ navigate: true });
                    this.setState({ navigate_link: navLink });
                }
            }} />
        }

        let createZoneLegend = (quests, zone) => {
            let legend_box_icon = `./icons/quest_legend_icons/QuestTotalsBox.png`;
            let legend_pos = null;
            let arrow_icon = null;
            let arrow_size = null;
            let arrow_offset = null;
            let arrow_pos = null;
            let main_quest_icon = `./icons/quest_legend_icons/${
                this.props.setStartersLength(quests.main_starters, zone)}.png`;
            let class_quest_icon = `./icons/quest_legend_icons/${
                this.props.setStartersLength(quests.class_starters, zone)}.png`;
            let side_quest_icon = `./icons/quest_legend_icons/${
                this.props.setStartersLength(quests.side_starters, zone)}.png`;
            let hunting_quest_icon = `./icons/quest_legend_icons/${
                this.props.setStartersLength(quests.hunting_starters, zone)}.png`;

            switch (zone) {
                case 'Limsa Lominsa Upper Decks':
                    legend_pos = la_nos_map_attrs.limsa_lominsa_upper_decks_legend_pos;
                    arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`;
                    arrow_size = leg_attrs.hor_arrow_size;
                    arrow_offset = leg_attrs.hor_arrow_offset;
                    arrow_pos = [legend_pos[0], legend_pos[1] + arrow_offset];
                    break
                case 'Limsa Lominsa Lower Decks':
                    legend_pos = la_nos_map_attrs.limsa_lominsa_lower_decks_legend_pos;
                    arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`;
                    arrow_size = leg_attrs.vert_arrow_size;
                    arrow_offset = leg_attrs.vert_arrow_offset;
                    arrow_pos = [legend_pos[0] + arrow_offset, legend_pos[1]];
                    break
                case 'Middle La Noscea':
                    legend_pos = la_nos_map_attrs.middle_la_noscea_legend_pos;
                    arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`;
                    arrow_size = leg_attrs.vert_arrow_size;
                    arrow_offset = leg_attrs.vert_arrow_offset;
                    arrow_pos = [legend_pos[0] - arrow_offset, legend_pos[1]];
                    break
                case 'Lower La Noscea':
                    legend_pos = la_nos_map_attrs.lower_la_noscea_legend_pos;
                    arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`;
                    arrow_size = leg_attrs.hor_arrow_size;
                    arrow_offset = leg_attrs.hor_arrow_offset;
                    arrow_pos = [legend_pos[0], legend_pos[1] - arrow_offset];
                    break
                case 'Eastern La Noscea':
                    legend_pos = la_nos_map_attrs.eastern_la_noscea_legend_pos;
                    arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`;
                    arrow_size = leg_attrs.vert_arrow_size;
                    arrow_offset = leg_attrs.vert_arrow_offset;
                    arrow_pos = [legend_pos[0] - arrow_offset, legend_pos[1]];
                    break
                case 'Western La Noscea':
                    legend_pos = la_nos_map_attrs.western_la_noscea_legend_pos;
                    arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`;
                    arrow_size = leg_attrs.vert_arrow_size;
                    arrow_offset = leg_attrs.vert_arrow_offset;
                    arrow_pos = [legend_pos[0] + arrow_offset, legend_pos[1]];
                    break
                case 'Upper La Noscea':
                    legend_pos = la_nos_map_attrs.upper_la_noscea_legend_pos;
                    arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`;
                    arrow_size = leg_attrs.hor_arrow_size;
                    arrow_offset = leg_attrs.hor_arrow_offset;
                    arrow_pos = [legend_pos[0], legend_pos[1] + arrow_offset];
                    break
                case 'Outer La Noscea':
                    legend_pos = la_nos_map_attrs.outer_la_noscea_legend_pos;
                    arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`;
                    arrow_size = leg_attrs.hor_arrow_size;
                    arrow_offset = leg_attrs.hor_arrow_offset;
                    arrow_pos = [legend_pos[0], legend_pos[1] + arrow_offset];
                    break
                default:
                    break
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

        // let la_noscea_icon = this.props.createIcon(`./highlighted_maps/LaNosceaHighlighted.jpg`, [220.1, 234.05]);
        // let thanalan_icon = this.props.createIcon(`./highlighted_maps/ThanalanHighlighted.jpg`, [283.65, 262.725]);
        // let the_black_shroud_icon = this.props.createIcon(`./highlighted_maps/TheBlackShroudHighlighted.jpg`, [279.775, 257.3]);
        let limsa_lominsa_upper_decks_name_icon = `./icons/zone_names/LimsaLominsaUpperDecks.png`;
        let limsa_lominsa_lower_decks_name_icon = `./icons/zone_names/LimsaLominsaLowerDecks.png`;
        let middle_la_noscea_name_icon = `./icons/zone_names/MiddleLaNoscea.png`;
        let lower_la_noscea_name_icon = `./icons/zone_names/LowerLaNoscea.png`;
        let eastern_la_noscea_name_icon = `./icons/zone_names/EasternLaNoscea.png`;
        let western_la_noscea_name_icon = `./icons/zone_names/WesternLaNoscea.png`;
        let upper_la_noscea_name_icon = `./icons/zone_names/UpperLaNoscea.png`;
        let outer_la_noscea_name_icon = `./icons/zone_names/OuterLaNoscea.png`;
        // let la_noscea_highlight_pos = [-23.46, 9.375];
        // let thanalan_highlight_pos = [-30.51, 22.375];
        // let the_black_shroud_highlight_pos = [-19.2, 28.45];
        let limsa_lominsa_upper_decks_legend_icons = createZoneLegend(this.props.quest_starters, 'Limsa Lominsa Upper Decks');
        let limsa_lominsa_lower_decks_legend_icons = createZoneLegend(this.props.quest_starters, 'Limsa Lominsa Lower Decks');
        let middle_la_noscea_legend_icons = createZoneLegend(this.props.quest_starters, 'Middle La Noscea');
        let lower_la_noscea_legend_icons = createZoneLegend(this.props.quest_starters, 'Lower La Noscea');
        let eastern_la_noscea_legend_icons = createZoneLegend(this.props.quest_starters, 'Eastern La Noscea');
        let western_la_noscea_legend_icons = createZoneLegend(this.props.quest_starters, 'Western La Noscea');
        let upper_la_noscea_legend_icons = createZoneLegend(this.props.quest_starters, 'Upper La Noscea');
        let outer_la_noscea_legend_icons = createZoneLegend(this.props.quest_starters, 'Outer La Noscea');
        let limsa_lominsa_upper_decks_overlay = createHoverOverlay('Limsa Lominsa Upper Decks', limsa_lominsa_upper_decks_name_icon);
        let limsa_lominsa_lower_decks_overlay = createHoverOverlay('Limsa Lominsa Lower Decks', limsa_lominsa_lower_decks_name_icon);
        let middle_la_noscea_overlay = createHoverOverlay('Middle La Noscea', middle_la_noscea_name_icon);
        let lower_la_noscea_overlay = createHoverOverlay('Lower La Noscea', lower_la_noscea_name_icon);
        let eastern_la_noscea_overlay = createHoverOverlay('Eastern La Noscea', eastern_la_noscea_name_icon);
        let western_la_noscea_overlay = createHoverOverlay('Western La Noscea', western_la_noscea_name_icon);
        let upper_la_noscea_overlay = createHoverOverlay('Upper La Noscea', upper_la_noscea_name_icon);
        let outer_la_noscea_overlay = createHoverOverlay('Outer La Noscea', outer_la_noscea_name_icon);
        let zone_legend_icons = [limsa_lominsa_upper_decks_legend_icons, limsa_lominsa_lower_decks_legend_icons, 
            middle_la_noscea_legend_icons, lower_la_noscea_legend_icons, eastern_la_noscea_legend_icons,
            western_la_noscea_legend_icons, upper_la_noscea_legend_icons, outer_la_noscea_legend_icons];
        let hover_overlays = [limsa_lominsa_upper_decks_overlay, limsa_lominsa_lower_decks_overlay, middle_la_noscea_overlay, 
            lower_la_noscea_overlay, eastern_la_noscea_overlay, western_la_noscea_overlay, upper_la_noscea_overlay, 
            outer_la_noscea_overlay]; 

        return (
            <Container>
                <RegionMapComponent mapName={mapName} bounds={this.props.bounds} center={this.props.center} 
                zoom={this.props.zoom} props={this.state} createHoverOverlay={this.createHoverOverlay} 
                zone_legend_icons={zone_legend_icons} hover_overlays={hover_overlays} />
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
    leg_attrs: storeData.storeData.legend_icon_attributes,
    la_nos_map_attrs: storeData.storeData.la_noscea_map_attributes,
    black_shroud_map_attrs: storeData.storeData.the_black_shroud_map_attributes,
    than_map_attrs: storeData.storeData.thanalan_map_attributes,
})

export default connect(mapStateToProps)(RegionMapCont);

