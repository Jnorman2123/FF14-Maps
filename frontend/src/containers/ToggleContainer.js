import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import ToggleDropdown from '../components/ToggleDropdown';
import ToggledQuestsContainer from './ToggledQuestsContainer';
import ButtonToggle from '../components/ButtonToggle';
import { connect } from 'react-redux';

class ToggleContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            base_classes: this.props.classes.slice(0, 9),
            tank_jobs: this.props.classes.slice(9, 13),
            healer_jobs: this.props.classes.slice(13, 17),
            melee_dps_jobs: this.props.classes.slice(17, 22),
            physical_ranged_dps_jobs: this.props.classes.slice(22, 25),
            magical_ranged_dps_jobs: this.props.classes.slice(25),
        }
    }

    setSelectionName = (selection) => {
        let selectionName = '';

        switch (selection) {
            case this.state.base_classes:
                selectionName = 'Base Classes';
                break;
            case this.state.tank_jobs:
                selectionName = 'Tank Jobs';
                break;
            case this.state.healer_jobs: 
                selectionName = 'Healer Jobs';
                break;
            case this.state.melee_dps_jobs: 
                selectionName = 'Melee Dps Jobs'; 
                break;
            case this.state.physical_ranged_dps_jobs: 
                selectionName = 'Physical Ranged Dps Jobs'; 
                break;
            case this.state.magical_ranged_dps_jobs: 
                selectionName = 'Magical Ranged Dps Jobs'; 
                break;
            default:
                break;   
        }
        
        return selectionName;
    }

    renderDropdowns = (selection) => {
        let selection_name = this.setSelectionName(selection);
        return <Dropdown autoClose='outside' >
                    <Dropdown.Toggle id='dropdown-basic' >{selection_name} </Dropdown.Toggle>
                        <ButtonGroup>
                            <Dropdown.Menu>    
                                {selection.map(t => {
                                    let theme = '';
                                    t.active ? theme = 'btn-primary' : theme = 'btn-secondary';
                                    return <Dropdown.Item key={t.name} >
                                        <Button key={t.name} id='toggle-check' className={theme} type='checkbox' name={t.name}
                                        onClick={this.props.setClassActive}>
                                            {t.name}                                   
                                        </Button>
                                    </Dropdown.Item>
                                })}
                            </Dropdown.Menu> 
                        </ButtonGroup>
                </Dropdown> 
    }

    renderButtons = (selection) => {
        let setActive = null;
        let isActive = false;
        let theme = '';

        if (selection.name === 'Main Story' || selection.name === 'Class' || selection.name === 'Side'
        || selection.name === 'Hunting Log') {
            setActive = this.props.setTypeActive;
        } else {
            setActive = this.props.setLevelActive;
        }

        selection.active ? isActive = true : isActive = false;
        selection.active ? theme = 'btn-primary' : theme = 'btn-secondary';
        
        return <Button id='toggle-check' type='checkbox' name={selection.name} onClick={setActive} 
        className={theme} active={isActive} >
            {selection.name}
        </Button>
    }

    render() {
        return (
            <div> 
                <Row>
                    <h5 className='text-center'>Toggle Quests by Class/Job</h5>
                </Row>
                <br/>
                <Row>
                    <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.state.base_classes}/>
                    {/* <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.state.tank_jobs}/>                 */}
                </Row>  
                <br/>   
                <Row>
                    {/* <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.state.healer_jobs}/>  */}
                    {/* <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.state.magical_ranged_dps_jobs}/>                 */}
                </Row> 
                <br/>            
                <Row>
                    {/* <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.state.melee_dps_jobs}/> */}
                    {/* <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.state.physical_ranged_dps_jobs}/>                 */}
                </Row>   
                <br/>   
                <Row>
                    <h5 className='text-center'>Toggle Quests by Type</h5>
                </Row>
                <br/>
                <Row>
                    {this.props.quest_types.map(t => {
                        return <ButtonToggle key={t.name} renderButton={this.renderButtons} selection={t} />
                    })}   
                </Row>   
                <br/>
                <Row>
                    <h5 className='text-center'>Toggle Quests by Level</h5>
                </Row> 
                <br/>    
                <Row>
                    {this.props.quest_levels.map(l => {
                        return <ButtonToggle key={l.name} renderButton={this.renderButtons} selection={l} />
                    })}    
                </Row> 
                <br/> 
                <Row>
                    <Button id='toggle-check' type='checkbox' name='refresh' onClick={this.props.setActiveQuests} className='btn-secondary'>
                        Refresh Active Quests 
                    </Button>
                </Row>
                <br/>
                <Row>
                    <ToggledQuestsContainer toggled_quests={this.props.toggled_quests} active_quests={this.props.active_quests} 
                    toggleQuest={this.props.toggleQuest} deleteQuest={this.props.deleteQuest} />
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(ToggleContainer);