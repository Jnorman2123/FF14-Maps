import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/esm/Accordion';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/esm/Image';

class ToggledQuestsContainer extends Component {
    
    render() {
        let toggled_quests = this.props.toggled_quests;
        let image = 'ToggleQuestOn';
        let tooltip_message = 'Toggle quest steps on';
        return (
            <Accordion >
                <Accordion.Header className='bg-primary text-center' >
                    Active Quests
                </Accordion.Header>
                <Accordion.Body className='bg-secondary'>
                    <Container style={{overflowY: 'scroll', maxHeight: '275px'}} >
                        <Row className='justify-content-end'>
                            <OverlayTrigger placement='top' overlay={
                            <Tooltip id="button-tooltip-2" >Refresh Available Quest List</Tooltip>} >
                                <Button id='toggle-check' type='checkbox' name='refresh' onClick={this.props.setActiveQuests} 
                                    style={{width: 50, padding: 1}} >
                                    <Image fluid='true' src='../icons/available_quest_icons/RefreshAvailableQuestList.png' 
                                    name='refresh' />
                                </Button>
                            </OverlayTrigger>
                        </Row>
                        {this.props.active_quests.map(aq => {
                            if (toggled_quests.includes(aq)) {
                                image = '/ToggleQuestOff';
                                tooltip_message = 'Toggle quest steps off';
                            } else {
                                image = 'ToggleQuestOn';
                                tooltip_message = 'Toggle quest steps on';
                            }

                            return <Row key={aq.quest_name} >
                                <Col md={1}>
                                    <Button key={Math.random()} id='toggle-check' type='checkbox' variant='primary' 
                                    name='Delete' size='sm' onClick={() => this.props.deleteQuest(aq, this.props.active_quests)} >
                                        X                                   
                                    </Button>
                                </Col>
                                <Col md={9} >
                                    <p>{aq.quest_name}</p>
                                </Col>
                                <Col md={1}>
                                    <OverlayTrigger placement='top' overlay={
                                    <Tooltip id="button-tooltip-2" >{tooltip_message}</Tooltip>}>
                                        <Button key={aq.quest_name} id='toggle-check' type='checkbox' name={aq.quest_name} 
                                        onClick={() => this.props.toggleQuest(aq, this.props.active_quests)} 
                                        style={{width: 50, padding: 1}} >
                                            <Image fluid='true' src={`../icons/available_quest_icons/${image}.png`} 
                                            name='toggle steps' />                                   
                                        </Button>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        })}
                    </Container>
                </Accordion.Body>
            </Accordion>
        )
    }
}

export default ToggledQuestsContainer;