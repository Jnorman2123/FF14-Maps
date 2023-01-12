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
                <Accordion.Header style={{backgroundColor: 'custom'}} >
                    Active Quests
                </Accordion.Header>
                <Accordion.Body className='bg-clear' style={{padding: 0}}>
                    <Container style={{overflowY: 'scroll', maxHeight: '425px', padding: 12, backgroundColor: 'custom'}} >
                        <Row style={{padding: 0, backgroundColor: 'custom'}}>
                            <Col></Col>
                            <Col md='auto'>
                                <OverlayTrigger placement='top' overlay={
                                <Tooltip id="button-tooltip-2" >Refresh List</Tooltip>} >
                                    <Button id='toggle-check' type='checkbox' name='refresh' onClick={this.props.setActiveQuests} 
                                        style={{width: 40, padding: 0}} className='bg-clear'>
                                        <Image fluid='true' src='../icons/available_quest_icons/RefreshAvailableQuestList.png' 
                                        name='refresh' />
                                    </Button>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        {this.props.active_quests.map(aq => {
                            if (toggled_quests.includes(aq)) {
                                image = '/ToggleQuestOff';
                                tooltip_message = 'Toggle quest steps off';
                            } else {
                                image = 'ToggleQuestOn';
                                tooltip_message = 'Toggle quest steps on';
                            }

                            return <Row key={aq.quest_name} className='bg-clear' >
                                <Col md='auto' className='bg-clear' style={{padding: 5}}>
                                    <OverlayTrigger placement='top' overlay={
                                    <Tooltip id="button-tooltip-2" >{tooltip_message}</Tooltip>}>
                                        <Button key={aq.quest_name} id='toggle-check' type='checkbox' name={aq.quest_name} 
                                        onClick={() => this.props.toggleQuest(aq, this.props.active_quests)} 
                                        style={{width: 32.5, padding: 0}} className='bg-clear'>
                                            <Image fluid='true' src={`../icons/available_quest_icons/${image}.png`} 
                                            name='toggle steps' />                                   
                                        </Button>
                                    </OverlayTrigger>
                                </Col>
                                <Col className='bg-clear' >
                                    <h5>{aq.quest_name}</h5>
                                </Col>
                                <Col md='auto' className='bg-clear' >
                                    <OverlayTrigger placement='top' overlay={
                                    <Tooltip id="button-tooltip-2" >Remove Quest</Tooltip>}>
                                        <Button key={Math.random()} id='toggle-check' type='checkbox' name='Delete' 
                                        onClick={() => this.props.deleteQuest(aq, this.props.active_quests)} 
                                        style={{width: 35, padding: 1}} >
                                            <Image fluid='true' src={`../icons/available_quest_icons/DeleteQuest.png`} 
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