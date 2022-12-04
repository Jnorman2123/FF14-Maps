import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuestInfoContainer from './QuestInfoContainer';
import ToggleContainer from './ToggleContainer';
import WorldNav from './WorldNav';
import { Outlet } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div>
                <WorldNav />
                <Container fluid >
                    <Row>
                        <Col className='bg-primary' >
                            <ToggleContainer setClassActive={this.props.setClassActive} 
                            setLevelActive={this.props.setLevelActive} setTypeActive={this.props.setTypeActive} 
                            active_quests={this.props.active_quests} toggled_quests={this.props.toggled_quests} 
                            toggleQuest={this.props.toggleQuest} deleteQuest={this.props.deleteQuest} 
                            setActiveQuests={this.props.setActiveQuests} />         
                        </Col>
                        <Col md={6} >
                            <Outlet />
                        </Col>
                        <Col className='bg-primary' style={{overflowY: 'scroll', maxHeight: '800px'}} >
                            <QuestInfoContainer toggled_quests={this.props.toggled_quests} />
                        </Col>
                    </Row>
                </Container>     
            </div>
        ) 
    }
}

export default Home;