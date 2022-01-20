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
            
        }
    }

    renderDropdowns = (selection) => {
        let selection_name = '';
        if (selection === this.props.classes) {
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
                    {this.renderDropdowns(this.props.types)}
                    {this.renderDropdowns(this.props.classes)}
                </Row>               
            </Container>
        )
    }
}

export default ToggleContainer;