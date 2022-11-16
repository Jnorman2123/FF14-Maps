import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/esm/Accordion';
import ButtonToggle from '../components/ButtonToggle';
import { connect } from 'react-redux';

class ToggledQuestsContainer extends Component {
    render() {
        console.log(this.props)
        return (
            <Container style={{overflowY: 'scroll', maxHeight: '325px'}} >
                <Accordion >
                    <Accordion.Header className='bg-primary text-center' >
                        Toggled Quests
                    </Accordion.Header>
                    <Accordion.Body className='bg-secondary'>
                        {this.props.active_quests.map(aq => {
                            return <p>{aq.quest_name}</p>
                        })}
                    </Accordion.Body>
                </Accordion>
            </Container>
        )
    }
}

export default ToggledQuestsContainer;