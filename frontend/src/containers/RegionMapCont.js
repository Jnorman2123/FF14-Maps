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
        let purpleOptions = { color: 'purple'}

        return (
            <Container>
                <div className="text-center" >{this.props.mapName}</div>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                    minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
                    maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url={`./maps/${mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    <Polygon positions={westernLaNoscea} pathOptions={purpleOptions} />
                    <Polygon positions={upperLaNoscea} pathOptions={purpleOptions} />
                    <Polygon positions={outerLaNoscea} pathOptions={purpleOptions} />
                    <Polygon positions={middleLaNoscea} pathOptions={purpleOptions} />
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