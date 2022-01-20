import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import ToggleDropdown from '../components/ToggleDropdown';
import ButtonToggle from '../components/ButtonToggle';

class ToggleContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    renderDropdowns = (selection) => {
        let selection_name = '';
        switch (selection) {
            case this.props.classes.base_classes:
                selection_name = 'Base Class'
                break

            case this.props.classes.tank_jobs:
                selection_name = 'Tank Job'
                break
            
            case this.props.classes.healer_jobs:
                selection_name = 'Healer Job'
                break

            case this.props.classes.melee_dps_jobs:
                selection_name = 'Melee Dps Job'
                break

            case this.props.classes.physical_ranged_dps_jobs:
                selection_name = 'Ranged Dps Job'
                break

            case this.props.classes.magical_ranged_dps_jobs:
                selection_name = 'Magic Dps Job'
                break

            default: 
                selection_name = ''
                break
        }

        return <Dropdown>
                    <Dropdown.Toggle id='dropdown-basic'>{selection_name} </Dropdown.Toggle>
                        <ButtonGroup>
                            <Dropdown.Menu>
                                {selection.map(t => {
                                    return <Dropdown.Item key={t.name} >
                                    <ToggleButton key={t.name} id='toggle-check' type='checkbox' >
                                        {t.name}                                   
                                    </ToggleButton>
                                </Dropdown.Item>
                                })}
                            </Dropdown.Menu> 
                        </ButtonGroup>
                </Dropdown> 
    }

    renderButtons = (type) => {
        return <ToggleButton id='toggle-check' type='checkbox' >{type}</ToggleButton>
    }

    render() {
        return (
            <Container className='bg-primary' >
                <Row>
                    <h1>Toggle Quests</h1>
                </Row>
                <Row>
                    <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.props.classes.base_classes}/>
                    <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.props.classes.tank_jobs}/>                
                </Row>  
                <br/>   
                <Row>
                    <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.props.classes.healer_jobs}/> 
                    <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.props.classes.magical_ranged_dps_jobs}/>                
                </Row> 
                <br/>            
                <Row>
                    <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.props.classes.melee_dps_jobs}/>
                    <ToggleDropdown renderDropdown={this.renderDropdowns} selection={this.props.classes.physical_ranged_dps_jobs}/>                
                </Row>   
                <br/>    
                <Row>
                    {this.props.types.map(t => {
                        return <ButtonToggle key={t} renderButton={this.renderButtons} type={t}/>
                    })}   
                </Row>          
            </Container>
        )
    }
}

export default ToggleContainer;