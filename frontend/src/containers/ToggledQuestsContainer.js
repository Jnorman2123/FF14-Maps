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
        type="button" onClick={decoratedOnClick} style={{padding: 0}} className='border-0
        d-flex justify-content-center align-items-center'>
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
            accordion_expand: true,
        }
    }

    renderAvailableQuests = (quests) => {
        let toggled_quests = this.props.toggled_quests;
        let quest_classes = this.props.classes;
        let quest_levels = this.props.quest_levels;
        let quest_types = this.props.quest_types;
        let active_quest_classes = quest_classes.filter(c => c.active).length;
        let active_quest_levels = quest_levels.filter(c => c.active).length;
        let active_quest_types = quest_types.filter(c => c.active).length;
        let quest_type = '';
        let toggle_image = '';
        let delete_image = 'DeleteQuest';
        let tooltip_message = 'Toggle quest steps on';
        let start_message = null;
        let quest_type_warning = null;
        let quest_class_warning = null;
        let quest_level_warning = null;
        let no_quests_warning = null;

        if (quests.length === 0) {
            if (active_quest_types === 0 && active_quest_levels === 0 && active_quest_classes === 0) {
                start_message = <Row className='text-accordiontext available-quests-warning text-center'>
                    <Col>Make Your Selections, Quester.</Col>
                </Row>;
            }
            if (active_quest_types !== 0) {
                if (active_quest_levels === 0) {
                    quest_level_warning = <Row className='text-accordiontext available-quests-warning text-center'>
                        <Col>Select Your Level.</Col>
                    </Row>;
                }
                if (quest_types[1].active && active_quest_classes === 0) {
                    quest_class_warning = <Row className='text-accordiontext available-quests-warning text-center'> 
                        <Col>Select Your Class.</Col>
                    </Row>;
                }
            }
            if (active_quest_levels !== 0) {
                if (active_quest_types === 0) {
                    if (active_quest_classes === 0) {
                        quest_class_warning = <Row className='text-accordiontext available-quests-warning text-center'> 
                            <Col>Select Your Class.</Col>
                        </Row>;
                    }
                    quest_type_warning = <Row className='text-accordiontext available-quests-warning text-center'>
                        <Col>Select Your Quest.</Col>
                    </Row>;
                }
                if (quest_types[0].active) {
                    no_quests_warning = <Row className='text-accordiontext available-quests-warning text-center'> 
                        <Col>No Quests Meet Your Criteria.</Col>
                    </Row>;
                }
                if (quest_types[1].active && active_quest_classes === 0) {
                    quest_class_warning = <Row className='text-accordiontext available-quests-warning text-center'> 
                        <Col>Select Your Class.</Col>
                    </Row>;
                }
                if (quest_types[3].active) {
                    no_quests_warning = <Row className='text-accordiontext available-quests-warning text-center'> 
                        <Col>No Quests Meet Your Criteria.</Col>
                    </Row>;
                }
            }
            if (active_quest_classes !== 0) {
                if (active_quest_levels === 0) {
                    quest_level_warning = <Row className='text-accordiontext available-quests-warning text-center'>
                        <Col>Select Your Level.</Col>
                    </Row>;
                } 
                if (active_quest_types === 0) {
                    quest_type_warning = <Row className='text-accordiontext available-quests-warning text-center'>
                        <Col>Select Your Quest.</Col>
                    </Row>;
                }
            }
            if (active_quest_classes !== 0 && active_quest_types !== 0 && active_quest_levels !== 0) {
                no_quests_warning = <Row className='text-accordiontext available-quests-warning text-center'>
                    <Col>No Quests Meet Your Criteria.</Col>
                </Row>;
            }
            return <>
                <br></br>
                <br></br>
                {start_message}
                {no_quests_warning}
                {quest_type_warning}
                {quest_class_warning}
                {quest_level_warning}
                <br></br>
                <br></br>
            </>

        }  else {
            return quests.map(aq => {
                quest_type = aq.quest_type.split(' ').join('_').toLowerCase().concat('_icons') ;

                if (toggled_quests.includes(aq)) {
                    this.state.toggle_hover && this.state.button_name === `${aq.quest_name} toggle` 
                    ? toggle_image = `${aq.bg_color}Active` : toggle_image = `${aq.bg_color}Active`;
                    tooltip_message = 'Toggle quest steps off';
                } else {
                    this.state.toggle_hover && this.state.button_name === `${aq.quest_name} toggle`
                    ? toggle_image = `${aq.bg_color}Hover` : toggle_image = `${aq.bg_color}`;
                    tooltip_message = 'Toggle quest steps on';
                }

                this.state.delete_hover && this.state.button_name === `${aq.quest_name} delete`
                ? delete_image = 'DeleteQuestHover' : delete_image = 'DeleteQuest';

                return <Row key={aq.quest_name} style={{padding: 2}}>
                    <Col md='auto' style={{padding: 0}}>
                        <OverlayTrigger placement='top' overlay={
                        <Tooltip id="button-tooltip-2" >{tooltip_message}</Tooltip>}>
                            <Button key={aq.quest_name} id='toggle-check' type='checkbox' 
                            name={aq.quest_name} onClick={() => this.props.toggleQuest(aq, this.props.active_quests)} 
                            style={{width: 30, padding: 0, boxShadow: 'none'}} className='border-0'
                            active='false'
                            onMouseEnter={(event) => {
                                this.setState({toggle_hover: true, button_name: event.target.name});
                            }}
                            onMouseLeave={() => {
                                this.setState({toggle_hover: false})
                            }}
                            >
                                <Image fluid src={`../icons/available_quest_icons/${quest_type}/${toggle_image}.png`} 
                                name={`${aq.quest_name} toggle`} />                                   
                            </Button>
                        </OverlayTrigger>
                    </Col>
                    <Col >
                        <Button key={aq.quest_name} id='toggle-check' type='checkbox' 
                            name={aq.quest_name} onClick={() => this.props.toggleQuest(aq, this.props.active_quests)} 
                            style={{width: '100%', padding: 0, boxShadow: 'none'}} className='border-0'
                            active='false'> 
                            <div className='text-accordiontext quest-info-header gothic-century text-start'>{aq.quest_name}</div>
                        </Button>
                    </Col>
                    <Col md='auto'>
                        <OverlayTrigger placement='top' overlay={
                        <Tooltip id="button-tooltip-2" >Remove Quest</Tooltip>}>
                            <Button key={Math.random()} id='toggle-check' type='checkbox' 
                            name={aq.quest_name} 
                            onClick={() => this.props.deleteQuest(aq, this.props.active_quests)} 
                            style={{width: 30, padding: 0,
                                boxShadow: 'none'}}  className='border-0'
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
            })
        }
    }
    
    render() {
        
        let refresh_image = 'RefreshAvailableQuestList'
        let accordion_expand_icon = 'Minus'

        this.state.accordion_expand ? accordion_expand_icon = 'Minus' : accordion_expand_icon = 'Plus';

        this.state.refresh_hover ? refresh_image = 'RefreshAvailableQuestListHover' : 
        refresh_image = 'RefreshAvailableQuestList';

        return (
            <Accordion style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10}} defaultActiveKey='0'>
                <Card className='border-0'>
                    <CustomToggle eventKey="0">
                        <Card.Img src={`../icons/ui_components/AvailableQuestsHeader${accordion_expand_icon}.jpg`} 
                        alt='header image' style={{height: '100%'}} onClick={() => 
                        {this.setState({accordion_expand: !this.state.accordion_expand})}}/>
                    </CustomToggle>
                </Card>
                <Accordion.Collapse eventKey="0" style={{paddingRight: 10, paddingLeft: 10}} >
                    <Card style={{padding: 0}}>
                        <Container style={{overflowY: 'scroll', maxHeight: '19vw', paddingLeft: 12, paddingRight: 12, 
                        position: 'relative'}} 
                        className='bg-lightbg'>
                            <Row className='bg-darkbg' style={{padding: 0}}>
                                <Col></Col>
                                <Col md='auto'>
                                    <OverlayTrigger placement='top' overlay={
                                    <Tooltip id="button-tooltip-2" >Refresh List</Tooltip>} >
                                        <Button id='toggle-check' type='checkbox' name='refresh' 
                                            onClick={this.props.setActiveQuests} active='false'
                                            style={{width: 30, padding: 0, boxShadow: 'none'}} className='border-0'
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
                            {this.renderAvailableQuests(this.props.active_quests)}
                        </Container>
                    </Card>
                </Accordion.Collapse>
            </Accordion>
        )
    }
}

export default ToggledQuestsContainer;