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

    constructor(props) {
        super(props);
        this.state = {
            logo_number: 1
        }
    }

    changeLogo = () => {
        let logo_url = `../nav_bar/logos/HelperQuestLogo${this.state.logo_number}.jpg`;
        return logo_url;
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.logo_number >= 41) {
                this.setState({logo_number: 0});
            }
            this.setState({
                logo_number: this.state.logo_number + 1
            })
        }, 5000);
    }

    render() {

        let logo_url = this.changeLogo();

        return (
            <div>
                <WorldNav logo_url={logo_url} />
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
                        <Col md={6} sm={12} xs={12} style={{padding: 0}} className='bg-homepagebg'>
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