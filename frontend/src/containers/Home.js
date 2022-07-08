import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuestInfoContainer from './QuestInfoContainer';
import ToggleContainer from './ToggleContainer';
import WorldNav from './WorldNav';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

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
                            <QuestInfoContainer q_id={this.props.q_id} />
                        </Col>
                    </Row>
                </Container>       
            </div>
        ) 
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types,
})

export default connect(mapStateToProps)(Home);