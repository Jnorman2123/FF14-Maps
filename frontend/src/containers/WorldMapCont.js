import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay, Polygon, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import { Navigate } from 'react-router-dom';

class WorldMapCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyMarkers: [
                {icon: new L.Icon({
                    iconUrl: `./icons/RegionKey.png`,
                    iconRetinaUrl: `./icons/RegionKey.png`,
                    popupAnchor: [0, 0],
                    iconSize: [195, 288],
                    }),
                    position: [-34, 36.25]
                }
            ],
            zoneMarkers: 
            [
                {icon: new L.Icon({
                    iconUrl: `./icons/zone_names/SelectZoneName.png`,
                    iconRetinaUrl: `./icons/zone_names/SelectZoneName.png`,
                    popupAnchor: [0, 0],
                    iconSize: [143, 38.5],
                }),
                position: [-28.6, 36.3]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-31.9, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-34.7, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-37.4, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-40.15, 39.1]
                }
            ],
            highlightedMarkers: [],
        }
    };

    addHighlightedMarker = (pos, icon) => {
        let marker = {icon: icon, position: pos};
        this.setState({ highlightedMarkers: [...this.state.highlightedMarkers, marker]})
    }

    removeHighlightedMarker = () => {
        this.setState({highlightedMarkers: []});
    }


    render () {

        let laNoscea = [
            [-28.5, 4.75], [-28.6, 12], [-24.7, 14.2], [-22.5, 13.7], [-19.75, 12.25], [-19.75, 10.5], [-22, 6],
            [-24, 6], [-26.5, 4.75]
        ];
        let thanalan = [
            [-29, 15.5], [-37.5, 20], [-37.5, 22.5], [-34, 25.5], [-26, 25.5], [-26, 15.5]
        ];
        let theBlackShroud = [
            [-25, 26], [-21, 22], [-16, 22], [-14, 27], [-14, 30], [-16, 32], [-20, 32], [-24, 31]
        ];
        let polyOptions = { color: 'purple' }
        let laNosceaIcon = new L.Icon({
            iconUrl: `./maps/LaNosceaHighlighted.png`,
            iconRetinaUrl: `./maps/LaNosceaHighlighted.png`,
            popupAnchor: [0, 0],
            iconSize: [775.775, 773.45],
        });
        let thanalanIcon = new L.Icon({
            iconUrl: `./maps/ThanalanHighlighted.png`,
            iconRetinaUrl: `./maps/ThanalanHighlighted.png`,
            popupAnchor: [0, 0],
            iconSize: [775.775, 773.45],
        });
        let theBlackShroudIcon = new L.Icon({
            iconUrl: `./maps/TheBlackShroudHighlighted.png`,
            iconRetinaUrl: `./maps/TheBlackShroudHighlighted.png`,
            popupAnchor: [0, 0],
            iconSize: [775.775, 773.45],
        });
        let highlightPos = [-21.5, 21.4];

        return (
            <Container>
                <MapContainer maxBounds={this.props.bounds} center={this.props.center} zoom={this.props.zoom}
                crs={L.CRS.Simple} maxBoundsViscosity='1' scrollWheelZoom={false} maxZoom={this.props.zoom}
                minZoom={this.props.zoom} style={{height: '800px', width: '900px'}} >
                    <Polygon positions={laNoscea} pathOptions={polyOptions} opacity={1} eventHandlers={{
                        mouseover: () => {
                            this.addHighlightedMarker(highlightPos, laNosceaIcon);
                        },
                        mouseout: () => {
                            this.removeHighlightedMarker();
                        }
                    }} />
                    <Polygon positions={thanalan} pathOptions={polyOptions} opacity={1} eventHandlers={{
                        mouseover: () => {
                            this.addHighlightedMarker(highlightPos, thanalanIcon);
                        },
                        mouseout: () => {
                            this.removeHighlightedMarker();
                        }
                    }}/>
                    <Polygon positions={theBlackShroud} pathOptions={polyOptions} opacity={1} eventHandlers={{
                        mouseover: () => {
                            this.addHighlightedMarker(highlightPos, theBlackShroudIcon);
                        },
                        mouseout: () => {
                            this.removeHighlightedMarker();
                        }
                    }}/>
                    <ImageOverlay url={`./maps/${this.props.mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    {this.state.keyMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={250}/>
                    })}
                    {this.state.zoneMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={500}/>
                    })}
                    {this.state.highlightedMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={0} 
                        opacity={.5} interactive={false} />
                    })}
                </MapContainer>
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(WorldMapCont);