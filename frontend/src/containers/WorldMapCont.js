import React, { Component } from 'react';
import { Polygon } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import WorldMapComponent from '../components/WorldMapComponent';

class WorldMapCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key_markers: [
                {icon: new L.Icon({iconUrl: `./icons/RegionKey.png`, iconSize: [195, 288]}), 
                position: [-34, 36.25]}
            ],
            zone_markers: [
                {icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegionName.png`, iconSize: [143, 38.5]}), 
                position: [-28.6, 36.3]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-31.9, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-34.7, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-37.4, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-40.15, 39.1]
                }
            ],
            highlighted_markers: [],
            popup_markers: [],
            navigate: false,
            navigate_link: '',
        }
    };

    addMarker = (pos, icon, type) => {
        let marker = {icon: icon, position: pos};
        if (type === 'highlighted') {
            this.setState({ highlighted_markers: [...this.state.highlighted_markers, marker]})
        } else if (type === 'popup') {
            this.setState({ popup_markers: [...this.state.popup_markers, marker]})
        } else {
            this.setState({ zone_markers: [...this.state.zone_markers, marker]})
        }
    };

    removeMarker = (type) => {
        if (type === 'highlighted') {
            this.setState({highlighted_markers: []});
        } else if (type === 'popup') {
            this.setState({popup_markers: []});
        } else {
            this.setState({zone_markers: []});
        }
        
    };

    resetZoneMarkers = () => {
        this.setState({zone_markers: 
            [
                {icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegionName.png`, iconSize: [143, 38.5]}),
                position: [-28.6, 36.3]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-31.9, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-34.7, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-37.4, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-40.15, 39.1]
                }
            ],
        });
    };

    render () {

        let createPolygon = (region, region_pos, region_icon, region_name_popup_pos, region_name_icon, region_popup_pos) => {
            let navLink = `/${region.split(" ").join('').toLowerCase()}`;
            return <Polygon positions={region_pos} pathOptions={polyOptions} opacity={.1} eventHandlers={{
                mouseover: () => {
                    this.removeMarker('zone');
                    let main_quest_count_icon = this.props.createIcon(`./icons/quest_numbers/${this.props.setStartersLength
                        (this.props.quest_starters.main_starters, region)}.png`, quest_count_icon_size);
                    let side_quest_count_icon = this.props.createIcon(`./icons/quest_numbers/${this.props.setStartersLength
                        (this.props.quest_starters.side_starters, region)}.png`, quest_count_icon_size);
                    let hunting_quest_count_icon = this.props.createIcon(`./icons/quest_numbers/${this.props.setStartersLength
                        (this.props.quest_starters.hunting_starters, region)}.png`, quest_count_icon_size);
                    let class_quest_count_icon = this.props.createIcon(`./icons/quest_numbers/${this.props.setStartersLength
                        (this.props.quest_starters.class_starters, region)}.png`, quest_count_icon_size);
                    this.addMarker(highlight_pos, region_icon, 'highlighted');
                    this.addMarker(region_name_popup_pos, region_name_icon, 'zone');
                    this.addMarker(region_name_pos, region_name_icon, 'zone');
                    this.addMarker(main_quest_count_icon_pos, main_quest_count_icon, 'zone');
                    this.addMarker(side_quest_count_icon_pos, side_quest_count_icon, 'zone');
                    this.addMarker(hunting_quest_count_icon_pos, hunting_quest_count_icon, 'zone');
                    this.addMarker(class_quest_count_icon_pos, class_quest_count_icon, 'zone');
                    this.addMarker(region_popup_pos, popup_marker, 'popup');
                },
                mouseout: () => {
                    this.removeMarker('highlighted');
                    this.removeMarker('popup');
                    this.resetZoneMarkers();
                }, 
                click: () => {
                    this.setState({ navigate: true });
                    this.setState({ navigate_link: navLink });
                }
            }} />
        }

        let polyOptions = { color: 'tan' }
        let la_noscea_icon = this.props.createIcon(`./maps/LaNosceaHighlighted.png`, [775.775, 773.45]);
        let thanalan_icon = this.props.createIcon(`./maps/ThanalanHighlighted.png`, [775.775, 773.45]);
        let the_black_shroud_icon = this.props.createIcon(`./maps/TheBlackShroudHighlighted.png`, [775.775, 773.45]);
        let la_noscea_name_icon = this.props.createIcon(`./icons/region_names/LaNosceaRegionName.png`, [143, 38.5]);
        let thanalan_name_icon = this.props.createIcon(`./icons/region_names/ThanalanRegionName.png`, [143, 38.5]);
        let the_black_shroud_name_icon = this.props.createIcon(`./icons/region_names/TheBlackShroudRegionName.png`, [143, 38.5]);
        let popup_marker = this.props.createIcon(`./icons/zone_names/PopupContainer.png`, [182, 112]);
        let main_quest_count_icon_pos = [-34.7, 39.1];
        let side_quest_count_icon_pos = [-40.15, 39.1];
        let hunting_quest_count_icon_pos = [-37.4, 39.1];
        let class_quest_count_icon_pos = [-31.9, 39.1];
        let quest_count_icon_size = [33.5, 33.5];
        let region_name_pos = [-28.6, 36.3];
        let highlight_pos = [-21.5, 21.4];
        let la_noscea_polygon = createPolygon(this.props.region_attributes[0].name, this.props.region_attributes[0].polygon,
        la_noscea_icon, this.props.region_attributes[0].popupNamePos, la_noscea_name_icon,
        this.props.region_attributes[0].popupPos);
        let thanalan_polygon = createPolygon(this.props.region_attributes[1].name, this.props.region_attributes[1].polygon, 
        thanalan_icon, this.props.region_attributes[1].popupNamePos, thanalan_name_icon, 
        this.props.region_attributes[1].popupPos);
        let the_black_shroud_polygon = createPolygon(this.props.region_attributes[2].name, this.props.region_attributes[2].polygon, 
        the_black_shroud_icon, this.props.region_attributes[2].popupNamePos, the_black_shroud_name_icon, 
        this.props.region_attributes[2].popupPos)

        return (
            <Container>
                <WorldMapComponent mapName={this.props.mapName} bounds={this.props.bounds} center={this.props.center} 
                zoom={this.props.zoom} props={this.state} la_noscea={la_noscea_polygon} thanalan={thanalan_polygon}
                the_black_shroud={the_black_shroud_polygon}/>
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
    region_attributes: storeData.storeData.region_attributes, 
})

export default connect(mapStateToProps)(WorldMapCont);