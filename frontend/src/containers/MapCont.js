import React, { Component } from 'react';
import { MapContainer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';

class MapCont extends Component {

    setChecked = (id, quests) => {
        let quest_ids = quests.map(q => q.id);
        let isChecked = false;
        if (quest_ids.includes(id)) {
            isChecked = true;     
        }
        return isChecked;
    }

    handleClick = (e) => {
        console.log(e.target.checked);
        if (e.target.checked === false) {
            e.target.checked = true;
        }
        return e.target.checked;
    }

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
            if ((active_classes.includes(q.quest_class) || q.quest_class === 'All') 
            && active_quest_types.includes(q.quest_type)) {
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
        let activeInZoneQuests = [];
        let quest_starters = [];
        active_quests.map(aq => {
            let inZone = false;
            aq.quest_npcs.map(npc => {
                if (npc_ids.includes(npc)) {
                    inZone = true;
                }
                return inZone
            })
            if (inZone) {
                activeInZoneQuests.push(aq);
            }
            return activeInZoneQuests;
        })

        

        return (    
            <div>
                <div className='text-center' >{this.props.mapName} </div>
                <DropdownButton as={ButtonGroup} id='dropdown-button-drop-end' drop='end' title='List of available quests'>
                    {activeInZoneQuests.map(quest => {
                        return <Dropdown key={quest.quest_name} >
                            <Dropdown.Item id='dropdown-basic'>
                                <input type='checkbox' id='quest' onChange={this.handleClick}
                                checked={this.setChecked(quest.id, activeInZoneQuests)}></input>
                                {quest.quest_name} 
                            </Dropdown.Item>
                            <p>{quest.quest_name}</p>
                        </Dropdown>;
                    })}
                </DropdownButton>
                <MapContainer key={Math.random()} crs={L.CRS.Simple} center={this.props.center} zoom={this.props.zoom} 
                minZoom={this.props.minZoom} maxZoom={this.props.maxZoom} maxBounds={this.props.bounds} 
                maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '800px', width: '935px'}}>
                    <ImageOverlay url={`./maps/${joinedName}.png`} bounds={this.props.bounds} opacity={1} />
                    {active_quests.map(quest => {   
                        this.props.steps.steps.filter(step => step.quest_step === quest.id).map(s => {
                            if (s.step_npc === quest.quest_npcs[0]) {
                                quest_starters.push(s);
                            }
                            return quest_starters;
                        })
                        return quest_starters.map(step => {
                            let step_npc = npcs.filter(npc => npc.id === step.step_npc);
                            if (step_npc[0] !== undefined) {
                                return <Marker key={Math.random()} 
                                position={this.props.revertLat(step_npc[0].npc_location_x, step_npc[0].npc_location_y)}>
                                    <Popup>
                                        {step_npc[0].npc_name}
                                        <ol>
                                            {quest_starters.filter(step => step.step_npc === step_npc[0].id).map(s => {
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