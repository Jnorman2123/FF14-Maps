import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class MapCont extends Component {

    render() {

        let npcs = this.props.npcs.npcs.filter(npc => npc.npc_zone.includes(this.props.mapName))
        return (    

            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <Container>
                    <Row>
                        <Col>
                            <ul>
                                {this.props.quests.quests.map(quest => {
                                    let quest_steps = [];
                                    this.props.steps.steps.filter(step => step.quest_step === quest.id).map(s => {
                                        quest_steps.push(s);
                                        return quest_steps;
                                    })
                                    return <li key={quest.quest_name}>
                                        {quest.quest_name}-{quest.quest_type}-{quest.quest_class}-{quest.quest_level}
                                        <ul>
                                            {quest_steps.map(step => {
                                                let step_npc = npcs.filter(npc => npc.id === step.step_npc);
                                                if (step_npc[0] !== undefined) {
                                                    return <li key={step.step_description}>{step.step_description}<p>{step_npc[0].npc_name}</p></li>
                                                }
                                            })}
                                        </ul>
                                    </li>
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