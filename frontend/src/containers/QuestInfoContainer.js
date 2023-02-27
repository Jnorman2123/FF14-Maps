import React, { Component } from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { connect } from 'react-redux';
import QuestInfo from '../components/QuestInfo';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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

class QuestInfoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded_accordion: null,
            delete_hover: false,
            button_name: '',
        }
    }

    renderQuestInfo = (toggled_quests) => {
        let delete_image = 'DeleteQuest';
        let npcs = this.props.npcs.npcs;
        let accordion_expand_icon = 'Plus';
        let i = -1;
        return <Accordion key={i}>
            {toggled_quests.map(quest => {
                i++;
                let quest_reward = this.props.rewards.rewards.filter(reward => reward.id === quest.quest_reward);
                let quest_classes = [];
                let quest_steps = this.props.steps.steps.filter(step => step.quest_step === quest.id);
                let guaranteed_reward_items = [];
                let optional_reward_items = [];
                let bg_color = quest.bg_color.toLowerCase();
                quest.quest_class.map(qc => {
                    return quest_classes.push(this.props.jobs.jobs.filter(job => job.id === qc))
                })
                quest_reward[0].reward_items.map(ri => {
                    let item = this.props.items.items.filter(item => item.id === ri);
                    if (item[0].item_optional) {
                        optional_reward_items.push(item[0])
                    } else {
                        guaranteed_reward_items.push(item[0])
                    }
                    return optional_reward_items;
                })

                this.state.expanded_accordion === quest ? accordion_expand_icon = 'Minus' : 
                accordion_expand_icon = 'Plus';

                this.state.delete_hover && this.state.button_name === `${quest.quest_name} delete`
                ? delete_image = 'DeleteQuestHover' : delete_image = 'DeleteQuest';

                return <div>
                    <Card className={`bg-${bg_color}`} style={{padding: 5}}>
                        <CustomToggle eventKey={i}>
                            <Card.Img src={`../icons/ui_components/QuestInfoHeader${accordion_expand_icon}.jpg`} 
                            alt='header image' 
                            style={{height: '100%'}} />
                            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'
                            onClick={(event) => {
                                if (this.state.expanded_accordion === quest) {
                                    this.setState({expanded_accordion: null});
                                } else {
                                    this.setState({expanded_accordion: quest});
                                }
                            }}>
                                <Col className='quest-info-header text-headertext'>
                                    {quest.quest_name}
                                </Col>
                            </Card.ImgOverlay>
                        </CustomToggle>
                    </Card>
                    <Accordion.Collapse eventKey={i} style={{paddingLeft: 5, paddingRight: 5}}>
                        <Card className='bg-lightbg text-accordiontext' style={{padding: 15}}>
                            <Row >
                                <h4 className='text-center quest-detail-headers'>Quest Details</h4>
                            </Row>
                            <Row  >
                                <Col>
                                    <Row className='quest-detail-subheaders text-center'>
                                        <div>Quest Class(es)</div>
                                    </Row>
                                    <Row className='text-center' >
                                        <ul className='quest-detail-text'>
                                            {quest_classes[0].map(qc => {
                                                return <li key={Math.random()} >
                                                    {qc.job_name}
                                                </li>
                                            })}
                                        </ul>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row className='quest-detail-subheaders text-center'>
                                        <div>Quest Type</div>
                                    </Row>
                                    <Row className='text-center quest-detail-text'>
                                        <div>{quest.quest_type}</div>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row className='quest-detail-subheaders text-center'>
                                        <div>Quest Level</div>
                                    </Row>
                                    <Row className='text-center quest-detail-text'>
                                        <div>{quest.quest_level}</div>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className='quest-detail-subheaders'> 
                                Previous Quest: {quest.previous_quest}
                            </Row>
                            <Row className='quest-detail-subheaders'>
                                Next Quest: {quest.next_quest}
                            </Row>
                            <Row>
                                <h4 className='text-center quest-detail-headers'>Quest Steps</h4>
                                <Col> 
                                    <ol>
                                        {quest_steps.map(step => {
                                            let full_zone_name = npcs.filter(npc => npc.id === step.step_npc)[0].npc_zone;
                                            let split_zone_name = full_zone_name.split('(');
                                            let link_name = split_zone_name[0].split(' ').join('').toLowerCase();
                                            return <li key={step.step_description} className='quest-detail-text' >
                                                {`${step.step_description}`} <Link to={`/${link_name}`}>
                                                    {`(${split_zone_name[0]})`}
                                                </Link>
                                            </li>
                                        })}
                                    </ol>
                                </Col>
                            </Row>
                            <Row className='text-center quest-detail-headers'>
                                <div>Quest Rewards</div>
                            </Row>
                            <Row>
                                <Col className='text-center quest-detail-subheaders'>
                                    <div>Experience: {quest_reward[0].reward_experience}</div>
                                </Col>
                                <Col className='text-center quest-detail-subheaders'>
                                    <div>Gil: {quest_reward[0].reward_gil}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row className='text-center quest-detail-item-headers'>
                                        <div>Guaranteed Items</div>
                                    </Row>
                                    <ul style={{padding: 5}}>
                                        {guaranteed_reward_items.map(ri => {
                                            return <li key={Math.random()} className='quest-detail-text'>
                                                {ri.item_name}: {ri.item_quantity}
                                            </li>
                                        })}
                                    </ul>
                                </Col>
                                <Col>
                                <Row className='text-center quest-detail-item-headers'>
                                        <div>Optional Items</div>
                                    </Row>
                                    <ul style={{padding: 5}}>
                                        {optional_reward_items.map(ri => {
                                            return <li key={Math.random()} className='quest-detail-text'>
                                                {ri.item_name}: {ri.item_quantity}
                                            </li>
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{span: 1, offset: 10}}>
                                    <OverlayTrigger placement='top' overlay={
                                    <Tooltip id="button-tooltip-2" >Remove Quest</Tooltip>}>
                                        <Button key={Math.random()} id='toggle-check' type='checkbox' 
                                        name={quest.quest_name} 
                                        onClick={() => {;
                                            this.props.toggleQuest(quest, toggled_quests);
                                            if (this.state.expanded_accordion === quest) {
                                                this.setState({expanded_accordion: null});
                                            }
                                        }} 
                                        style={{width: 35, padding: 1, boxShadow: 'none'}}  className='border-0'
                                        active='false'
                                        onMouseEnter={(event) => {
                                            this.setState({delete_hover: true, button_name: event.target.name});
                                        }}
                                        onMouseLeave={() => {
                                            this.setState({delete_hover: false})
                                        }}>
                                            <Image fluid src={`../icons/available_quest_icons/${delete_image}.png`} 
                                            name={`${quest.quest_name} delete`} />                                  
                                        </Button>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </Card>
                    </Accordion.Collapse>
                </div>
            })}
        </Accordion>
        
    }

    render() {

        return (
            <Container style={{overflowY: 'scroll', padding: 0, height: '100%'}} >
                <Image style={{width: '100%'}} src='../icons/ui_components/QuestJournalHeader.jpg' alt='quest journal header' />
                <QuestInfo renderQuestInfo={this.renderQuestInfo} toggled_quests={this.props.toggled_quests} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.items,
    npcs: state.npcs,
    quests: state.quests,
    rewards: state.rewards,
    steps: state.steps,
    jobs: state.jobs,
})

export default connect(mapStateToProps)(QuestInfoContainer);