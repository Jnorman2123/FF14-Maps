import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';

class MapCont extends Component {

    render() {
        let mapName = this.props.mapName.split(' ');
        let joinedName = mapName.join('');
        let active_classes = this.props.classes.filter(c => c.active).map(ac => ac.name);
        let active_quest_types = this.props.quest_types.filter(t => t.active).map(at => at.name);
        let active_quest_levels = this.props.quest_levels.filter(l => l.active);
        let lvls = active_quest_levels.map(l => l.name);
        let lvl_ranges = lvls.map(l => l.split("-").map(i => parseInt(i)));
        let active_quests = [];
        this.props.quests.quests.map(q => {
            if ((active_classes.includes(q.quest_class) || q.quest_class === 'All') && active_quest_types.includes(q.quest_type)) {
                lvl_ranges.map(lr => {
                    if (q.quest_level >= lr[0] && q.quest_level <= lr[1]) {
                        active_quests.push(q);
                    }
                    return active_quests;
                })
                return active_quests;
            }
            return active_quests;
        })
        let npcs = this.props.npcs.npcs.filter(npc => npc.npc_zone.includes(this.props.mapName))
        let npc_ids = npcs.map(n => n.id);
        return (    

            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <Accordion>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>List of available quests based on filter</Accordion.Header>
                        <Accordion.Body>
                            {active_quests.map(aq => {
                                let inZone = false;
                                aq.quest_npcs.map(npc => {
                                    if (npc_ids.includes(npc)) {
                                        inZone = true;
                                    }
                                    return inZone
                                })
                                if (inZone) {
                                    return <p key={aq.quest_name} >{aq.quest_name}</p>
                                }
                                return null;
                            })}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} minZoom={this.props.minZoom}
                maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} maxBoundsViscosity='1' scrollWheelZoom={true}
                style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url={`./maps/${joinedName}.png`} bounds={this.props.bounds} opacity={1} />
                    {active_quests.map(quest => {
                        let quest_steps = [];
                        this.props.steps.steps.filter(step => step.quest_step === quest.id).map(s => {
                            if (s.step_npc === quest.quest_npcs[0]) {
                                quest_steps.push(s);
                            }
                            return quest_steps;
                        })
                        return quest_steps.map(step => {
                            let step_npc = npcs.filter(npc => npc.id === step.step_npc);
                            if (step_npc[0] !== undefined) {
                                return <Marker key={Math.random()} 
                                position={this.props.revertLat(step_npc[0].npc_location_x, step_npc[0].npc_location_y)}>
                                    <Popup>
                                        {step_npc[0].npc_name}
                                        <ol>
                                            {quest_steps.filter(step => step.step_npc === step_npc[0].id).map(s => {
                                                return <li key={s.step_description} quest_id={s.quest_step} 
                                                onClick={this.props.setQuestId}>
                                                    {s.step_description}
                                                </li>
                                            })}
                                        </ol>                                       
                                    </Popup>
                                </Marker>
                            }
                            return null;
                        });
                    })}
                </MapContainer>
            </div>
            
        );
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(MapCont);