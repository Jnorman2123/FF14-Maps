import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

class QuestContainer extends Component {

    renderQuestInfo = (active_quest) => {
        let quest_reward = null;
        let quest_steps = [];
        if (active_quest.length > 0) {
            quest_reward = this.props.rewards.rewards.filter(r => r.id === active_quest[0].quest_reward);
            quest_steps = this.props.steps.steps.filter(s => s.quest_step === active_quest[0].id);
            console.log(quest_steps);

            return <Container key={Math.random()} className='bg-primary' >
                <Row><h1 className='text-center'>{active_quest[0].quest_name}</h1></Row>
                <Row><h2 className='text-center'>Quest Reward</h2></Row>
                <Row>
                    <Col md={6} >
                        <h4>Experience: {quest_reward[0].reward_experience}</h4>
                        <h4>Gil: {quest_reward[0].reward_gil}</h4>
                    </Col>
                    <Col md={6} >
                        <h4>
                            Item Rewards: <ul>
                                {quest_reward[0].reward_items.map(ri => {
                                    let item = this.props.items.items.filter(i => i.id === ri);
                                    return <li key={ri}><h6>{item[0].item_name}: {item[0].item_quantity}</h6></li>
                                })}
                            </ul>
                        </h4>
                    </Col>
                </Row>
                <Row><h4>Other: {quest_reward[0].reward_other}</h4></Row>
                <Row className='text-center'><h2>Quest Steps</h2></Row>
                <Row>
                    <ol>
                        {quest_steps.map(s => {
                            let npc = this.props.npcs.npcs.filter(n => n.id === s.step_npc)
                            return <li key={s.step_description}><h6>{s.step_description}-{npc[0].npc_name}-{npc[0].npc_zone}</h6></li>
                        })}
                    </ol>
                </Row>
            </Container>
        } else {
            return <Container key={Math.random()} className='bg-primary' >
                <Row><h1>No Selected Quest</h1></Row>
            </Container>
        }
    }

    render() {
        let active_quest = this.props.quests.quests.filter(q => q.id === this.props.q_id);

        return (
            <div>
                {this.renderQuestInfo(active_quest)}
            </div>
        )
    }
}

export default QuestContainer;