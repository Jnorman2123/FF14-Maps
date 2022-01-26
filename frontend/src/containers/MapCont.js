import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class MapCont extends Component {

    render() {

        let npcs = this.props.npcs.npcs.filter(npc => npc.npc_zone.includes(this.props.mapName))
        //let quests = this.props.quests.filter(quest => )
        return (    

            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <Container>
                    <Row>
                        <Col>
                            <ul>
                                {npcs.map(n => {
                                    return <li key={n.npc_name}>{n.npc_name} </li>
                                })}
                            </ul>
                        </Col>
                        <Col>
                            <ul>
                                {this.props.quests.quests.map(quest => {
                                    return <li key={quest.quest_name}>{quest.quest_name}</li>
                                })}
                            </ul>      
                        </Col>
                        <Col>
                            <ul>
                                {this.props.items.items.map(item => {
                                    return <li key={item.id}>{item.item_name}</li>
                                })}
                            </ul>
                        </Col>
                        <Col>
                            <ul>
                                {this.props.steps.steps.map(step => {
                                    return <li key={step.step_description}>{step.step_description}</li>
                                })}
                            </ul>
                        </Col>
                    </Row>
                </Container>
                
                {/* <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} minZoom={this.props.minZoom}
                maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} maxBoundsViscosity='1' scrollWheelZoom={true}
                style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url='./maps/NewGridania_Base_v3.jpg' bounds={this.props.bounds} opacity={1} />
                    {this.props.npcs.npcs.filter(npc => npc.npc_zone.includes(this.props.mapName)).map(n => {
                        return <Marker key={n.npc_name} position={this.props.revertLat(n.npc_location_x, n.npc_location_y)}>
                            <Popup>
                                {n.npc_name}
                            </Popup>
                        </Marker>
                    })}
                </MapContainer> */}
            </div>
            
        );
    }
}

export default MapCont;