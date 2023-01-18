import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuestInfoContainer from './QuestInfoContainer';
import ToggleContainer from './ToggleContainer';
import WorldNav from './WorldNav';
import { Outlet } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

class Home extends Component {

    render() {
        return (
            <div>
                <WorldNav />
                <Container fluid >
                    <Row>
                        <Col className='bg-beige' style={{padding: 0, height: '825px'}} md={3} sm={12} xs={12}>
                            <Card style={{height: '100%'}}>
                                <Card.Img src='../icons/ui_components/ToggleContainerBg.jpg' alt='toggle'style={{height: '100%'}}/>
                                <Card.ImgOverlay style={{padding: 0}} >
                                    <ToggleContainer setClassActive={this.props.setClassActive} 
                                    setLevelActive={this.props.setLevelActive} setTypeActive={this.props.setTypeActive} 
                                    active_quests={this.props.active_quests} toggled_quests={this.props.toggled_quests} 
                                    toggleQuest={this.props.toggleQuest} deleteQuest={this.props.deleteQuest} 
                                    setActiveQuests={this.props.setActiveQuests} />
                                </Card.ImgOverlay>
                            </Card>  
                        </Col>
                        <Col md={6} sm={12} xs={12} style={{padding: 0}}>
                            <Outlet />
                        </Col>
                        <Col className='bg-questinfobg' style={{overflowY: 'scroll', height: '825px', padding: 0}} xs={12}
                        sm={12} md={3} >
                            <Card style={{height: '100%'}}> 
                                <Card.Img src='../icons/ui_components/QuestInfoContainerBg.jpg' alt='toggle'
                                style={{height: '100%'}}/>
                                <Card.ImgOverlay style={{padding: 0, height: '100%'}} >
                                    <QuestInfoContainer toggled_quests={this.props.toggled_quests} 
                                    toggleQuest={this.props.toggleQuest}/>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    </Row>
                </Container>     
            </div>
        ) 
    }
}

export default Home;