import React, { Component } from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { connect } from 'react-redux';
import QuestInfo from '../components/QuestInfo';

class QuestInfoContainer extends Component {

    renderQuestInfo = (toggled_quests) => {
        let npcs = this.props.npcs.npcs;
        let i = 0;
        return <div>
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
                    if (ri.item_optional) {
                        optional_reward_items.push(this.props.items.items.filter(item => item.id === ri))
                    } else {
                        guaranteed_reward_items.push(this.props.items.items.filter(item => item.id === ri))
                    }
                    return optional_reward_items;
                })
                return <Accordion key={Math.random()} flush >
                    <Card>
                        <Card.Header className={`bg-${bg_color}`} >
                            <Accordion.Button as={Card.Header} eventkey={i}>
                                {quest.quest_name}
                            </Accordion.Button>
                        </Card.Header>
                        <Accordion.Body>
                            <Row>
                                <h4 className='text-center'>Quest Details</h4>
                                <Col>Quest Class(es): 
                                    <ul>
                                        {quest_classes[0].map(qc => {
                                            return <li key={Math.random()} >{qc.job_name}</li>
                                        })}
                                    </ul>
                                </Col>
                                <Col>Quest Type: {quest.quest_type}</Col>
                                <Col>Quest Level: {quest.quest_level}</Col>
                            </Row>
                            <Row>
                                <h6>Previous Quest: {quest.previous_quest}</h6>
                                <h6>Next Quest: {quest.next_quest}</h6>
                            </Row>
                            <Row>
                                <h4 className='text-center'>Quest Steps</h4>
                                <Col> 
                                    <ul>
                                        {quest_steps.map(step => {
                                            let full_zone_name = npcs.filter(npc => npc.id === step.step_npc)[0].npc_zone;
                                            let split_zone_name = full_zone_name.split('(');
                                            return <li key={step.step_description} >{`${step.step_description} 
                                            (${split_zone_name[0]})`}</li>
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
                                                return <li key={Math.random()} >{ri[0].item_name}: {ri[0].item_quantity}</li>
                                            })}
                                        </ul>
                                    </Col>
                                    <Col>
                                        <h5>Optional Items</h5>
                                        <ul>
                                            {optional_reward_items.map(ri => {
                                                return <li key={Math.random()} >{ri[0].item_name}: {ri[0].item_quantity}</li>
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
        </div>
        
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