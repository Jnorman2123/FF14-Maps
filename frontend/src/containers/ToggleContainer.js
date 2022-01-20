import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ToggleContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            class: ['All', 'Gladiator', 'Marauder', 'Archer', 'Lancer', 'Pugilist', 'Rogue', 'Conjurer', 'Arcanist', 'Thaumaturge', 
                'Paladin', 'Warrior', 'Monk', 'Dragoon', 'Ninja', 'Bard', 'Black Mage', 'Summoner', 'Scholar', 'White Mage', 
                'Blue Mage', 'Dark Knight', 'Machinist', 'Astrologian', 'Samurai', 'Red Mage', 'Gunbreaker', 'Dancer', 'Reaper', 'Sage'],
            type: ['Main Story', 'Class', 'Side', 'Hunting Log']
        }
    }

    renderDropdowns = (selection) => {
        let selection_name = '';
        if (selection === this.state.class) {
            selection_name = 'Class';
        } else {
            selection_name = 'Type';
        }

        return <Col>
            <Dropdown>
                <Dropdown.Toggle id='dropdown-basic'>Toggle Quest {selection_name}</Dropdown.Toggle>
                <ButtonGroup>
                    <Dropdown.Menu>
                        {selection.map(t => {
                            return <Dropdown.Item key={t} >
                            <ToggleButton key={t} id='toggle-check' type='checkbox' >
                                {t}                                   
                            </ToggleButton>
                        </Dropdown.Item>
                        })}
                    </Dropdown.Menu> 
                </ButtonGroup>
            </Dropdown> 
        </Col>
    }

    render() {
        return (
            <Container className='bg-primary' >
                <Row>
                    <h1>Toggle Quests</h1>
                </Row>
                <Row>
                    {this.renderDropdowns(this.state.type)}
                    {this.renderDropdowns(this.state.class)}
                </Row>               
            </Container>
        )
    }
}

export default ToggleContainer;