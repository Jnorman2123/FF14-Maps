import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay, LayerGroup } from 'react-leaflet';
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

        return (
            <Container>
                <div className="text-center" >{this.props.mapName}</div>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                    minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
                    maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url={`./maps/${mapName}.png`} bounds={this.props.bounds} opacity={1} />
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