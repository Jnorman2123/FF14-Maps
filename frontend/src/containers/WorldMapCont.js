import React, { Component } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import WorldMapComponent from '../components/WorldMapComponent';

class WorldMapCont extends Component {
    constructor(props) {
        super(props);
        this.state = {la_noscea_key_markers:
            {
                legend_icon: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/QuestTotalsBox.png`, 
                    iconSize: [121.5, 90.5]}), position: [-32, 9], z_offset: 250},
                legend_arrow: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`, 
                    iconSize: [59.5, 42.5]}), position: [-29.5, 9], z_offset: 100},
                main_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-31.1, 8.5], z_offset: 500},
                class_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-32.75, 8.5], z_offset: 500},
                side_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-31.1, 10.75], z_offset: 500}, 
                hunting_log_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-32.75, 10.75], z_offset: 500},
            },
            thanalan_key_markers:
            {
                legend_icon: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/QuestTotalsBox.png`, 
                    iconSize: [121.5, 90.5]}), position: [-31, 29.5], z_offset: 250},
                legend_arrow: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`, 
                    iconSize: [42.5, 59.5]}), position: [-31, 26], z_offset: 100},
                main_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-7.4, 21.5], z_offset: 500},
                class_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-7.4, 21.5], z_offset: 500},
                side_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-7.4, 21.5], z_offset: 500}, 
                hunting_log_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-7.4, 21.5], z_offset: 500},
            },
            the_black_shroud_key_markers:
            {
                legend_icon: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/QuestTotalsBox.png`, 
                    iconSize: [121.5, 90.5]}), position: [-18, 36], z_offset: 250},
                legend_arrow: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`, 
                    iconSize: [59.5, 42.5]}), position: [-20.5, 36], z_offset: 100},
                main_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-7.4, 21.5], z_offset: 500},
                class_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-7.4, 21.5], z_offset: 500},
                side_quest_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-7.4, 21.5], z_offset: 500}, 
                hunting_log_number: {icon: new L.Icon({iconUrl: `./icons/quest_legend_icons/0.png`, 
                    iconSize: [30.5, 25]}), position: [-7.4, 21.5], z_offset: 500},
            },
            zone_marker: {icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegion.png`, iconSize: [205.7, 34.85]}),
                position: [-7.4, 21.5]},
            highlighted_markers: [],
            navigate: false,
            navigate_link: '',
        }
    };

    addMarker = (pos, icon) => {
        let marker = {icon: icon, position: pos};
        this.setState({ highlighted_markers: [...this.state.highlighted_markers, marker]});
    };

    removeMarker = () => {
        this.setState({highlighted_markers: []});
    };
    
    setZoneMarker = (region_icon) => {
        this.setState({zone_marker: {icon: new L.Icon({iconUrl: region_icon, iconSize: [205.7, 34.85]}), 
        position: [-7.4, 21.5]}})
    }

    resetZoneMarker = () => {
        this.setState({zone_marker: {icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegion.png`, 
            iconSize: [205.7, 34.85]}), position: [-7.4, 21.5]} 
        });
    };

    render () {
        let leg_attrs = this.props.legend_icon_attributes;

        let createHoverOverlay = (region, region_icon, region_name_icon, highlight_pos) => {
            let navLink = `/${region.split(" ").join('').toLowerCase()}`;
            let legend_overlay_pos = null;
            let legend_overlay_icon = `./icons/quest_legend_icons/QuestTotalsBoxHoverOverlay.png`;
            let legend_overlay = new L.Icon({iconUrl: legend_overlay_icon, 
                iconSize: leg_attrs.legend_size});
            if (region === 'La Noscea') {
                legend_overlay_pos = leg_attrs.la_noscea_legend_pos;
            } else if (region === 'Thanalan') {
                legend_overlay_pos = leg_attrs.thanalan_legend_pos;
            } else {
                legend_overlay_pos = leg_attrs.the_black_shroud_legend_pos;
            }

            return <Marker key={Math.random()} icon={legend_overlay} position={legend_overlay_pos} 
            zIndexOffset={1500} opacity={.1}  eventHandlers={{
                mouseover: () => {
                    if (this.state.highlighted_markers.length === 0) {
                        this.addMarker(highlight_pos, region_icon);
                    this.setZoneMarker(region_name_icon);
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

        let createRegionLegend = (quests, region) => {
            let legend_box_icon = `./icons/quest_legend_icons/QuestTotalsBox.png`;
            let legend_pos = null;
            let arrow_icon = null;
            let arrow_size = null;
            let arrow_offset = null;
            let arrow_pos = null;
            let main_quest_icon = `./icons/quest_legend_icons/${
                this.props.setStartersLength(quests.main_starters, region)}.png`;
            let class_quest_icon = `./icons/quest_legend_icons/${
                this.props.setStartersLength(quests.class_starters, region)}.png`;
            let side_quest_icon = `./icons/quest_legend_icons/${
                this.props.setStartersLength(quests.side_starters, region)}.png`;
            let hunting_quest_icon = `./icons/quest_legend_icons/${
                this.props.setStartersLength(quests.hunting_starters, region)}.png`;

            if (region === 'La Noscea') {
                legend_pos = leg_attrs.la_noscea_legend_pos;
                arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`;
                arrow_size = leg_attrs.vert_arrow_size;
                arrow_offset = leg_attrs.vert_arrow_offset;
                arrow_pos = [legend_pos[0] + arrow_offset, legend_pos[1]];
            } else if (region === 'Thanalan') {
                legend_pos = leg_attrs.thanalan_legend_pos;
                arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`;
                arrow_size = leg_attrs.hor_arrow_size;
                arrow_offset = -leg_attrs.hor_arrow_offset;
                arrow_pos = [legend_pos[0], legend_pos[1] + arrow_offset];
            } else {
                legend_pos = leg_attrs.the_black_shroud_legend_pos;
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

        let la_noscea_icon = this.props.createIcon(`./highlighted_maps/LaNosceaHighlighted.jpg`, [220.1, 234.05]);
        let thanalan_icon = this.props.createIcon(`./highlighted_maps/ThanalanHighlighted.jpg`, [283.65, 262.725]);
        let the_black_shroud_icon = this.props.createIcon(`./highlighted_maps/TheBlackShroudHighlighted.jpg`, [279.775, 257.3]);
        let la_noscea_name_icon = `./icons/region_names/LaNosceaRegionName.png`;
        let thanalan_name_icon = `./icons/region_names/ThanalanRegionName.png`;
        let the_black_shroud_name_icon = `./icons/region_names/TheBlackShroudRegionName.png`;
        let la_noscea_highlight_pos = [-23.46, 9.375];
        let thanalan_highlight_pos = [-30.51, 22.375];
        let the_black_shroud_highlight_pos = [-19.2, 28.45];
        let la_noscea_legend_icons = createRegionLegend(this.props.quest_starters, 'La Noscea');
        let thanalan_legend_icons = createRegionLegend(this.props.quest_starters, 'Thanalan')
        let the_black_shroud_legend_icons = createRegionLegend(this.props.quest_starters, 'The Black Shroud')
        let la_noscea_overlay = createHoverOverlay('La Noscea', la_noscea_icon, la_noscea_name_icon, la_noscea_highlight_pos);
        let thanalan_overlay = createHoverOverlay('Thanalan', thanalan_icon, thanalan_name_icon, thanalan_highlight_pos);
        let the_black_shroud_overlay = createHoverOverlay('The Black Shroud', the_black_shroud_icon, the_black_shroud_name_icon, 
        the_black_shroud_highlight_pos);
        let hover_overlays = [la_noscea_overlay, thanalan_overlay, the_black_shroud_overlay]

        return (
            <Container>
                <WorldMapComponent mapName={this.props.mapName} bounds={this.props.bounds} center={this.props.center} 
                zoom={this.props.zoom} props={this.state} createHoverOverlay={this.createHoverOverlay} 
                la_noscea_legend_icons={la_noscea_legend_icons} thanalan_legend_icons={thanalan_legend_icons} 
                the_black_shroud_legend_icons={the_black_shroud_legend_icons} hover_overlays={hover_overlays} />
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
    region_attributes: storeData.storeData.region_attributes, 
    legend_icon_attributes: storeData.storeData.legend_icon_attributes,
})

export default connect(mapStateToProps)(WorldMapCont);