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
    constructor(props) {
        super(props);
        this.state = {
            refresh_hover: false,
            delete_hover: false,
            toggle_hover: false,
            button_name: '',
            accordion_expand: false,
        }
    }
    
    render() {
        let toggled_quests = this.props.toggled_quests;
        let toggle_image = 'ToggleQuestOn';
        let delete_image = 'DeleteQuest'
        let refresh_image = 'RefreshAvailableQuestList'
        let tooltip_message = 'Toggle quest steps on';
        let accordion_expand_icon = 'Expand';

        this.state.accordion_expand ? accordion_expand_icon = 'Collapse' : accordion_expand_icon = 'Expand';

        this.state.refresh_hover ? refresh_image = 'RefreshAvailableQuestListHover' : 
        refresh_image = 'RefreshAvailableQuestList';

        return (
            <Accordion style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10}} >
                <Card>
                    <CustomToggle eventKey="0">
                        <Card.Img src='../icons/ui_components/AvailableQuestsHeader.jpg' alt='header image'/>
                        <Card.ImgOverlay className='d-flex' onClick={() => {
                            this.setState({accordion_expand: !this.state.accordion_expand})
                        }}>
                            <Col md={10} style={{padding: 0}} >
                                <h5 className='text-headertext'>Available Quests</h5>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Image fluid src={`../icons/ui_components/${accordion_expand_icon}.png`} atl='toggle accordion' 
                                style={{width: 30, height: 30}} />
                            </Col>
                        </Card.ImgOverlay>
                    </CustomToggle>
                </Card>
                <Accordion.Collapse eventKey="0" style={{paddingRight: 10, paddingLeft: 10}} >
                    <Card style={{padding: 0}}>
                        <Container style={{overflowY: 'scroll', maxHeight: '300px', padding: 12, position: 'relative'}} 
                        className='bg-lightbg'>
                            <Row style={{padding: 0}}>
                                <Col></Col>
                                <Col md='auto'>
                                    <OverlayTrigger placement='top' overlay={
                                    <Tooltip id="button-tooltip-2" >Refresh List</Tooltip>} >
                                        <Button id='toggle-check' type='checkbox' name='refresh' 
                                            onClick={this.props.setActiveQuests} active='false'
                                            style={{width: 40, padding: 0, boxShadow: 'none'}} className='border-0'
                                            onMouseEnter={() => {
                                                this.setState({refresh_hover: true});
                                            }}
                                            onMouseLeave={() => {
                                                this.setState({refresh_hover: false})
                                            }}
                                            >
                                            <Image fluid='true' 
                                            src={`../icons/available_quest_icons/${refresh_image}.png`} 
                                            name='refresh' />
                                        </Button>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            {this.props.active_quests.map(aq => {
                                if (toggled_quests.includes(aq)) {
                                    this.state.toggle_hover && this.state.button_name === `${aq.quest_name} toggle` 
                                    ? toggle_image = 'ToggleQuestOffHover' : toggle_image = 'ToggleQuestOff';
                                    tooltip_message = 'Toggle quest steps off';
                                } else {
                                    this.state.toggle_hover && this.state.button_name === `${aq.quest_name} toggle`
                                    ? toggle_image = 'ToggleQuestOnHover' : toggle_image = 'ToggleQuestOn';
                                    tooltip_message = 'Toggle quest steps on';
                                }

                                this.state.delete_hover && this.state.button_name === `${aq.quest_name} delete`
                                ? delete_image = 'DeleteQuestHover' : delete_image = 'DeleteQuest';

                                return <Row key={aq.quest_name} style={{padding: 2}}>
                                    <Col md='auto' style={{padding: 0}}>
                                        <OverlayTrigger placement='top' overlay={
                                        <Tooltip id="button-tooltip-2" >{tooltip_message}</Tooltip>}>
                                            <Button key={aq.quest_name} id='toggle-check' type='checkbox' 
                                            name={aq.quest_name} 
                                            onClick={() => this.props.toggleQuest(aq, this.props.active_quests)} 
                                            style={{width: 32.5, padding: 0, boxShadow: 'none'}} className='border-0'
                                            active='false'
                                            onMouseEnter={(event) => {
                                                this.setState({toggle_hover: true, button_name: event.target.name});
                                            }}
                                            onMouseLeave={() => {
                                                this.setState({toggle_hover: false})
                                            }}
                                            >
                                                <Image fluid src={`../icons/available_quest_icons/${toggle_image}.png`} 
                                                name={`${aq.quest_name} toggle`} />                                   
                                            </Button>
                                        </OverlayTrigger>
                                    </Col>
                                    <Col >
                                        <h5 className='text-accordiontext' >{aq.quest_name}</h5>
                                    </Col>
                                    <Col md='auto' >
                                        <OverlayTrigger placement='top' overlay={
                                        <Tooltip id="button-tooltip-2" >Remove Quest</Tooltip>}>
                                            <Button key={Math.random()} id='toggle-check' type='checkbox' 
                                            name={aq.quest_name} 
                                            onClick={() => this.props.deleteQuest(aq, this.props.active_quests)} 
                                            style={{width: 35, padding: 1, boxShadow: 'none'}}  className='border-0'
                                            active='false'
                                            onMouseEnter={(event) => {
                                                this.setState({delete_hover: true, button_name: event.target.name});
                                            }}
                                            onMouseLeave={() => {
                                                this.setState({delete_hover: false})
                                            }}>
                                                <Image fluid src={`../icons/available_quest_icons/${delete_image}.png`} 
                                                name={`${aq.quest_name} delete`} />                                  
                                            </Button>
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            })}
                        </Container>
                    </Card>
                </Accordion.Collapse>
            </Accordion>
        )
    }
}

export default ToggledQuestsContainer;