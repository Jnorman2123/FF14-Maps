import React, { Component } from 'react';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import Accordion from 'react-bootstrap/esm/Accordion';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { connect } from 'react-redux';
import QuestInfo from '../components/QuestInfo';

class QuestInfoContainer extends Component {

    renderQuestInfo = (toggled_quests) => {
        return <Container className='bg-primary'>
            {toggled_quests.map(quest => {
                let quest_reward = this.props.rewards.rewards.filter(reward => reward.id === quest.quest_reward);
                let quest_classes = [];
                let quest_steps = this.props.steps.steps.filter(step => step.quest_step === quest.id);
                let guaranteed_reward_items = [];
                let optional_reward_items = [];
                quest.quest_class.map(qc => {
                    return quest_classes.push(this.props.jobs.jobs.filter(job => job.id === qc))
                })
                quest_reward[0].reward_items.map(ri => {
                    if (ri.item_optional) {
                        optional_reward_items.push(this.props.items.items.filter(item => item.id === ri))
                    } else {
                        guaranteed_reward_items.push(this.props.items.items.filter(item => item.id === ri))
                    }
                    return optional_reward_items;
                })
                return <Accordion key={quest.quest_name} flush>
                    <Card>
                        <Card.Header className='text-center bg-primary'>
                            <Accordion.Button as={Card.Header} eventKey='0'>
                                {quest.quest_name}
                            </Accordion.Button>
                        </Card.Header>
                        <Accordion.Body>
                            <Row>
                                <h4 className='text-center'>Quest Details</h4>
                                <Col>Quest Class(es): 
                                    <ul>
                                        {quest_classes[0].map(qc => {
                                            return <li>{qc.job_name}</li>
                                        })}
                                    </ul>
                                </Col>
                                <Col>Quest Type: {quest.quest_type}</Col>
                                <Col>Quest Level: {quest.quest_level}</Col>
                            </Row>
                            <Row>
                                <h8>Previous Quest: {quest.previous_quest}</h8>
                                <h8>Next Quest: {quest.next_quest}</h8>
                            </Row>
                            <Row>
                                <h4 className='text-center'>Quest Steps</h4>
                                <Col> 
                                    <ul>
                                        {quest_steps.map(step => {
                                            return <li>{step.step_description}</li>
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                            <Row>
                                <h4 className='text-center'>Quest Rewards</h4>
                                <Row>
                                    <Col>Experience: {quest_reward[0].reward_experience}</Col>
                                    <Col>Gil: {quest_reward[0].reward_gil}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5>Guaranteed Items</h5>
                                        <ul>
                                            {guaranteed_reward_items.map(ri => {
                                                return <li>{ri[0].item_name}: {ri[0].item_quantity}</li>
                                            })}
                                        </ul>
                                    </Col>
                                    <Col>
                                        <h5>Optional Items</h5>
                                        <ul>
                                            {optional_reward_items.map(ri => {
                                                return <li>{ri[0].item_name}: {ri[0].item_quantity}</li>
                                            })}
                                        </ul>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Row>
                        </Accordion.Body>
                    </Card>
                </Accordion>
            })}
        </Container>
        
    }

    render() {

        return (
            <>
                <QuestInfo renderQuestInfo={this.renderQuestInfo} toggled_quests={this.props.toggled_quests} />
            </>
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