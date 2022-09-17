import React, { Component } from 'react';
import { Polygon } from 'react-leaflet';
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

        let createPolygon = (region, region_pos, region_icon, region_name_icon, highlight_pos) => {
            let navLink = `/${region.split(" ").join('').toLowerCase()}`;
            return <Polygon positions={region_pos} pathOptions={polyOptions} opacity={.1} eventHandlers={{
                mouseover: () => {
                    this.addMarker(highlight_pos, region_icon);
                    this.setZoneMarker(region_name_icon);
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
            let arrow_icon = null;
            let main_quest_icon = null;
            let class_quest_icon = null;
            let side_quest_icon = null;
            let hunting_quest_icon = null;

            if (region === 'La Noscea') {
                arrow_icon = `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`;
                main_quest_icon = `./icons/quest_legend_icons/${
                    this.props.setStartersLength(quests.main_starters, region)}.png`;
                class_quest_icon = `./icons/quest_legend_icons/${
                    this.props.setStartersLength(quests.class_starters, region)}.png`;
                side_quest_icon = `./icons/quest_legend_icons/${
                    this.props.setStartersLength(quests.side_starters, region)}.png`;
                hunting_quest_icon = `./icons/quest_legend_icons/${
                    this.props.setStartersLength(quests.hunting_starters, region)}.png`;
            }

            let legend_icon = {icon: new L.Icon({iconUrl: legend_box_icon, 
                iconSize: [121.5, 90.5]}), position: [-32, 9], z_offset: 250};
            let legend_arrow = {icon: new L.Icon({iconUrl: arrow_icon, 
                iconSize: [59.5, 42.5]}), position: [-29.5, 9], z_offset: 100};
            let main_quest_number = {icon: new L.Icon({iconUrl: main_quest_icon, 
                iconSize: [30.5, 25]}), position: [-31.1, 8.5], z_offset: 500};
            let class_quest_number = {icon: new L.Icon({iconUrl: class_quest_icon, 
                iconSize: [30.5, 25]}), position: [-32.75, 8.5], z_offset: 500};
            let side_quest_number = {icon: new L.Icon({iconUrl: side_quest_icon, 
                iconSize: [30.5, 25]}), position: [-31.1, 10.75], z_offset: 500};
            let hunting_log_number = {icon: new L.Icon({iconUrl: hunting_quest_icon, 
                iconSize: [30.5, 25]}), position: [-32.75, 10.75], z_offset: 500};
            let legend_icons = [legend_icon, legend_arrow, main_quest_number, class_quest_number, side_quest_number,
                hunting_log_number]
            
            return legend_icons;
        }
        console.log(this.props)

        let reg_attrs = this.props.region_attributes;
        let polyOptions = { color: 'tan' }
        let la_noscea_icon = this.props.createIcon(`./highlighted_maps/LaNosceaHighlighted.jpg`, [220.1, 234.05]);
        let thanalan_icon = this.props.createIcon(`./highlighted_maps/ThanalanHighlighted.jpg`, [283.65, 262.725]);
        let the_black_shroud_icon = this.props.createIcon(`./highlighted_maps/TheBlackShroudHighlighted.jpg`, [279.775, 257.3]);
        let la_noscea_name_icon = `./icons/region_names/LaNosceaRegionName.png`;
        let thanalan_name_icon = `./icons/region_names/ThanalanRegionName.png`;
        let the_black_shroud_name_icon = `./icons/region_names/TheBlackShroudRegionName.png`;
        let la_noscea_highlight_pos = [-23.46, 9.375];
        let thanalan_highlight_pos = [-30.51, 22.375];
        let the_black_shroud_highlight_pos = [-19.2, 28.45];
        let la_noscea_polygon = createPolygon(reg_attrs[0].name, reg_attrs[0].polygon, la_noscea_icon, la_noscea_name_icon, 
            la_noscea_highlight_pos);
        let thanalan_polygon = createPolygon(reg_attrs[1].name, reg_attrs[1].polygon, thanalan_icon, thanalan_name_icon, 
            thanalan_highlight_pos);
        let the_black_shroud_polygon = createPolygon(reg_attrs[2].name, reg_attrs[2].polygon, the_black_shroud_icon, 
            the_black_shroud_name_icon, the_black_shroud_highlight_pos)
        let la_noscea_legend_icons = createRegionLegend(this.props.quest_starters, 'La Noscea')

        return (
            <Container>
                <WorldMapComponent mapName={this.props.mapName} bounds={this.props.bounds} center={this.props.center} 
                zoom={this.props.zoom} props={this.state} la_noscea={la_noscea_polygon} thanalan={thanalan_polygon}
                the_black_shroud={the_black_shroud_polygon} la_noscea_legend_icons={la_noscea_legend_icons} />
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