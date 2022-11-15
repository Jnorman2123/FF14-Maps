import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuestInfoContainer from './QuestInfoContainer';
import ToggleContainer from './ToggleContainer';
import WorldNav from './WorldNav';
import { Outlet } from 'react-router-dom';
import ToggledQuestsContainer from './ToggledQuestsContainer';

class Home extends Component {

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <WorldNav />
                    </Row>
                    <Row>
                        <Col className='bg-dark'>
                            <ToggleContainer setClassActive={this.props.setClassActive} 
                            setLevelActive={this.props.setLevelActive} setTypeActive={this.props.setTypeActive} />         
                        </Col>
                        <Col md={6} >
                            <Outlet />
                        </Col>
                        <Col className='bg-dark'>
                            <QuestInfoContainer toggled_quests={this.props.toggled_quests} />
                        </Col>
                    </Row>
                    <Row>
                        <ToggledQuestsContainer />
                    </Row>
                </Container>       
            </div>
        ) 
    }
}

export default Home;