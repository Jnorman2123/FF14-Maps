import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
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
                selection_name = 'Base Classes'
                break

            case this.props.classes.tank_jobs:
                selection_name = 'Tank Jobs'
                break
            
            case this.props.classes.healer_jobs:
                selection_name = 'Healer Jobs'
                break

            case this.props.classes.melee_dps_jobs:
                selection_name = 'Melee Dps Jobs'
                break

            case this.props.classes.physical_ranged_dps_jobs:
                selection_name = 'Ranged Dps Jobs'
                break

            case this.props.classes.magical_ranged_dps_jobs:
                selection_name = 'Magic Dps Jobs'
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
                                    <Button key={t.name} id='toggle-check' type='checkbox' name={t.name}
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
        return <Button id='toggle-check' type='checkbox' name={selection} onClick={this.props.setActive} >
            {selection}
        </Button>
    }

    render() {
        return (
            <Container className='bg-primary' >
                <Row>
                    <h5 className='text-center'>Toggle Quests by Class/Job</h5>
                </Row>
                <br/>
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
                    <h5 className='text-center'>Toggle Quests by Type</h5>
                </Row>
                <br/>
                <Row>
                    {this.props.types.map(t => {
                        return <ButtonToggle key={t.name} renderButton={this.renderButtons} selection={t.name} />
                    })}   
                </Row>   
                <br/>
                <Row>
                    <h5 className='text-center'>Toggle Quests by Level</h5>
                </Row> 
                <br/>    
                <Row>
                    {this.props.levels.map(l => {
                        return <ButtonToggle key={l.lvl} renderButton={this.renderButtons} selection={l.lvl} />
                    })}    
                </Row>  
            </Container>
        )
    }
}

export default ToggleContainer;