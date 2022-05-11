import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay, LayerGroup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


class RegionMapCont extends Component {
    render () {
        let mapName = this.props.mapName.split(' ').join('');
        let active_classes = this.props.classes.filter(c => c.active).map(ac => ac.name);
        let active_quest_types = this.props.quest_types.filter(t => t.active).map(at => at.name);
        let active_quest_levels = this.props.quest_levels.filter(l => l.active);
        let lvls = active_quest_levels.map(l => l.name);
        let lvl_ranges = lvls.map(l => l.split("-").map(i => parseInt(i)));
        let in_zone_quests = [];
        let active_in_zone_quests = [];
        let polygon1 = [];
        let polygon2 = [];
        let polygon3 = [];
        let polygon4 = [];
        let polygon5 = [];
        let polygon6 = [];
        let polygon7 = [];
        let polygon8 = [];

        let westernLaNoscea = [
            this.props.revertLat(8.2, 15.1), this.props.revertLat(7.7, 13.5), this.props.revertLat(9.4, 12.9), 
            this.props.revertLat(11.2, 14.0), this.props.revertLat(13.3, 16.0), this.props.revertLat(15.9, 16.6), 
            this.props.revertLat(17.3, 18.9), this.props.revertLat(19.1, 19.4), this.props.revertLat(19.5, 20.0),
            this.props.revertLat(17.9, 21.8), this.props.revertLat(15.9, 20.9), this.props.revertLat(13.8, 19.6),
            this.props.revertLat(13.0, 18.4), this.props.revertLat(11.0, 20.8), this.props.revertLat(11.1, 20.8),
            this.props.revertLat(10.8, 23.3), this.props.revertLat(8.3, 23.5), this.props.revertLat(7.8, 23.0),
            this.props.revertLat(8.6, 22.1), this.props.revertLat(8.6, 20.4), this.props.revertLat(9.9, 19.9),
            this.props.revertLat(10.5, 20.4), this.props.revertLat(12.5, 17.9), this.props.revertLat(10.2, 17.6),
            this.props.revertLat(9.9, 15.5)
        ];
        let upperLaNoscea = [
            this.props.revertLat(15.5, 12.8), this.props.revertLat(15.6, 12.3), this.props.revertLat(16.1, 12.0), 
            this.props.revertLat(16.9, 12.4), this.props.revertLat(18.3, 12.2), this.props.revertLat(18.6, 12.5), 
            this.props.revertLat(18.9, 13.5), this.props.revertLat(23.5, 13.7), this.props.revertLat(22.8, 13.4),
            this.props.revertLat(22.9, 12.9), this.props.revertLat(23.2, 12.0), this.props.revertLat(23.2, 11.1),
            this.props.revertLat(23.7, 10.7), this.props.revertLat(24.8, 11.3), this.props.revertLat(24.9, 12.3),
            this.props.revertLat(25.9, 12.8), this.props.revertLat(26.1, 13.3), this.props.revertLat(27.1, 13.2),
            this.props.revertLat(27.8, 13.9), this.props.revertLat(27.8, 14.5), this.props.revertLat(26.2, 14.7),
            this.props.revertLat(23.1, 15.0), this.props.revertLat(22.8, 14.7), this.props.revertLat(23.4, 14.1),
            this.props.revertLat(18.8, 14.1), this.props.revertLat(17.5, 15.3), this.props.revertLat(16.4, 13.6)
        ];
        let outerLaNoscea = [
            this.props.revertLat(17.8, 11.0), this.props.revertLat(18.0, 10.0), this.props.revertLat(17.4, 9.6), 
            this.props.revertLat(17.3, 9.1), this.props.revertLat(18.0, 8.3), this.props.revertLat(18.1, 7.4), 
            this.props.revertLat(18.1, 6.9), this.props.revertLat(19.0, 6.5), this.props.revertLat(19.0, 8.7),
            this.props.revertLat(20.7, 8.7), this.props.revertLat(21.2, 8.0), this.props.revertLat(20.8, 6.2),
            this.props.revertLat(20.9, 4.7), this.props.revertLat(23.8, 4.6), this.props.revertLat(24.2, 6.1),
            this.props.revertLat(22.2, 9.2), this.props.revertLat(22.9, 9.0), this.props.revertLat(23.5, 9.6),
            this.props.revertLat(22.8, 10.9), this.props.revertLat(21.3, 10.6), this.props.revertLat(19.1, 10.6),
            this.props.revertLat(18.8, 11.4)
        ];
        let middleLaNoscea = [
            this.props.revertLat(23.2, 19.9), this.props.revertLat(23.2, 21.2), this.props.revertLat(22.8, 21.9), 
            this.props.revertLat(23.0, 22.5), this.props.revertLat(24.3, 22.1), this.props.revertLat(24.3,22.9), 
            this.props.revertLat(26.0, 23.4), this.props.revertLat(26.7, 24.2), this.props.revertLat(25.6, 25.6),
            this.props.revertLat(26.1, 27.0), this.props.revertLat(26.0, 29.1), this.props.revertLat(25.0, 29.1),
            this.props.revertLat(24.5, 28.8), this.props.revertLat(23.2, 27.8), this.props.revertLat(22.0, 26.0),
            this.props.revertLat(22.0, 25.2), this.props.revertLat(21.4, 24.8), this.props.revertLat(21.0, 23.8),
            this.props.revertLat(20.4, 24.4), this.props.revertLat(18.7, 23.9), this.props.revertLat(19.5, 22.8),
            this.props.revertLat(20.4, 22.9), this.props.revertLat(20.8, 20.9), this.props.revertLat(22.6, 19.6)
        ];
        let easternLaNoscea = [
            this.props.revertLat(26.1, 19.1), this.props.revertLat(27.1, 17.2), this.props.revertLat(28.1, 16.3), 
            this.props.revertLat(33.4, 16.5), this.props.revertLat(36.3, 20.1), this.props.revertLat(36.1, 21.9), 
            this.props.revertLat(35.3, 23.8), this.props.revertLat(33.3, 24.8), this.props.revertLat(31.3, 25.1),
            this.props.revertLat(27.9, 24.3), this.props.revertLat(25.9, 21.5)
        ];
        let lowerLaNoscea = [
            this.props.revertLat(27.1, 28.6), this.props.revertLat(30.3, 27.0), this.props.revertLat(31.5, 28.1), 
            this.props.revertLat(31.9, 29.5), this.props.revertLat(30.5, 31.7), this.props.revertLat(27.7, 32.7), 
            this.props.revertLat(28.0, 33.7), this.props.revertLat(25.7, 36.0), this.props.revertLat(27.6, 36.1),
            this.props.revertLat(28.7, 37.1), this.props.revertLat(26.4, 39.8), this.props.revertLat(24.1, 39.0),
            this.props.revertLat(22.8, 37.3), this.props.revertLat(25.7, 33.4), this.props.revertLat(24.6, 32.5),
            this.props.revertLat(26.2, 31.2), this.props.revertLat(27.6, 31.2), this.props.revertLat(26.8, 29.2)
        ];
        let limsaLominsaLowerDecks = [
            this.props.revertLat(17.5, 27.8), this.props.revertLat(20.2, 27.3), this.props.revertLat(20.2, 29.9), 
            this.props.revertLat(19.5, 30.0), this.props.revertLat(18.3, 29.5), this.props.revertLat(17.4, 28.5)
        ];
        let limsaLominsaUpperDecks = [
            this.props.revertLat(20.1, 26.3), this.props.revertLat(21.0, 25.3), this.props.revertLat(21.4, 25.5), 
            this.props.revertLat(22.0, 28.2), this.props.revertLat(21.9, 29.0), this.props.revertLat(20.7, 29.7),
            this.props.revertLat(20.6, 26.9), this.props.revertLat(20.2, 26.5)
        ];
        let newGridania = [
            this.props.revertLat(16.8, 16.7), this.props.revertLat(16.8, 15.9), this.props.revertLat(17.1, 15.6), 
            this.props.revertLat(17.6, 15.5), this.props.revertLat(18.0, 15.6), this.props.revertLat(18.4, 15.8), 
            this.props.revertLat(18.7, 15.8), this.props.revertLat(19.1, 16.3), this.props.revertLat(19.4, 16.0),
            this.props.revertLat(19.9, 15.9), this.props.revertLat(19.9, 16.2), this.props.revertLat(19.6, 16.6),
            this.props.revertLat(18.8, 16.6), this.props.revertLat(19.2, 17.0), this.props.revertLat(19.2, 17.3),
            this.props.revertLat(18.9, 17.3), this.props.revertLat(17.9, 17.1)
        ]

        let purpleOptions = { color: 'purple'}

        let keyContainer = new L.Icon({
            iconUrl: `./icons/RegionMapKey.PNG`,
            iconRetinaUrl: `./icons/RegionMapKey.PNG`,
            popupAnchor: [0, 0],
            iconSize: [125, 125],
        })
        if (this.props.mapName === 'La Noscea') {
            polygon1 = westernLaNoscea;
            polygon2 = upperLaNoscea;
            polygon3 = outerLaNoscea;
            polygon4 = easternLaNoscea;
            polygon5 = middleLaNoscea;
            polygon6 = lowerLaNoscea;
            polygon7 = limsaLominsaLowerDecks;
            polygon8 = limsaLominsaUpperDecks;
        } else if (this.props.mapName === 'The Black Shroud') {
            polygon1 = newGridania;
        }

        return (
            <Container>
                <div className="text-center" >{this.props.mapName}</div>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                    minZoom={this.props.zoom} maxZoom={this.props.zoom} maxBounds={this.props.bounds} 
                    maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url={`./maps/${mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    <Polygon positions={polygon1} pathOptions={purpleOptions}  eventHandlers={{
                        mouseover: () => {
                            console.log('mouse over western la noscea');
                        }
                    }} />
                    <Polygon positions={polygon2} pathOptions={purpleOptions} eventHandlers={{
                        mouseover: () => {
                            console.log('mouse over upper la noscea');
                        }
                    }} />
                    <Polygon positions={polygon3} pathOptions={purpleOptions} />
                    <Polygon positions={polygon5} pathOptions={purpleOptions} />
                    <Polygon positions={polygon4} pathOptions={purpleOptions} />
                    <Polygon positions={polygon6} pathOptions={purpleOptions} />
                    <Polygon positions={polygon7} pathOptions={purpleOptions} />
                    <Polygon positions={polygon8} pathOptions={purpleOptions} />
                    <Marker key={Math.random()} position={this.props.revertLat(5.5, 37.5)}
                                icon={keyContainer}/>
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

export default connect(mapStateToProps)(RegionMapCont);