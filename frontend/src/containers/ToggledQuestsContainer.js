import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/esm/Accordion';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/esm/Image';
import Card from 'react-bootstrap/Card';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
  
    return (
      <button
        type="button" onClick={decoratedOnClick} style={{padding: 0}} className='border-0'>
        {children}
      </button>
    );
}

class ToggledQuestsContainer extends Component {
    
    render() {
        let toggled_quests = this.props.toggled_quests;
        let image = 'ToggleQuestOn';
        let tooltip_message = 'Toggle quest steps on';
        return (
            <Accordion style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10}}>
                <Card>
                    <CustomToggle eventKey="0">
                        <Card.Img src='../icons/ui_components/AvailableQuestsHeader.jpg' alt='header image'/>
                        <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
                            <h5>Available Quests</h5>
                        </Card.ImgOverlay>
                    </CustomToggle>
                </Card>
                <Accordion.Collapse eventKey="0" style={{padding: 0}}>
                    <Card style={{padding: 0, height: '320px'}}>
                        <Card.Img src='../icons/ui_components/AvailableQuestsBg.jpg' alt='bg image' style={{height: '100%'}}/>
                        <Card.ImgOverlay style={{padding: 0}}>
                            <Container style={{overflowY: 'scroll', maxHeight: '99%', padding: 12}} >
                                <Row style={{padding: 0}}>
                                    <Col></Col>
                                    <Col md='auto'>
                                        <OverlayTrigger placement='top' overlay={
                                        <Tooltip id="button-tooltip-2" >Refresh List</Tooltip>} >
                                            <Button id='toggle-check' type='checkbox' name='refresh' 
                                                onClick={this.props.setActiveQuests} active='false'
                                                style={{width: 40, padding: 0, boxShadow: 'none'}} className='border-0' >
                                                <Image fluid='true' 
                                                src='../icons/available_quest_icons/RefreshAvailableQuestList.png' 
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

                                    return <Row key={aq.quest_name} style={{padding: 2}}>
                                        <Col md='auto' style={{padding: 0}}>
                                            <OverlayTrigger placement='top' overlay={
                                            <Tooltip id="button-tooltip-2" >{tooltip_message}</Tooltip>}>
                                                <Button key={aq.quest_name} id='toggle-check' type='checkbox' name={aq.quest_name} 
                                                onClick={() => this.props.toggleQuest(aq, this.props.active_quests)} 
                                                style={{width: 32.5, padding: 0, boxShadow: 'none'}} className='border-0'
                                                active='false'>
                                                    <Image fluid src={`../icons/available_quest_icons/${image}.png`} 
                                                    name='toggle steps' />                                   
                                                </Button>
                                            </OverlayTrigger>
                                        </Col>
                                        <Col >
                                            <h5>{aq.quest_name}</h5>
                                        </Col>
                                        <Col md='auto' >
                                            <OverlayTrigger placement='top' overlay={
                                            <Tooltip id="button-tooltip-2" >Remove Quest</Tooltip>}>
                                                <Button key={Math.random()} id='toggle-check' type='checkbox' name='Delete' 
                                                onClick={() => this.props.deleteQuest(aq, this.props.active_quests)} 
                                                style={{width: 35, padding: 1, boxShadow: 'none'}}  className='border-0'
                                                active='false'>
                                                    <Image fluid src={`../icons/available_quest_icons/DeleteQuest.png`} 
                                                    name='toggle steps' />                                  
                                                </Button>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                })}
                            </Container>
                        </Card.ImgOverlay>
                    </Card>
                </Accordion.Collapse>
            </Accordion>
        )
    }
}

export default ToggledQuestsContainer;