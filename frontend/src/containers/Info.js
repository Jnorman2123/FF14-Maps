import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        }
    }

    render() {
        let world_map_button = ' ';

        this.state.hovered ? world_map_button = '../home_page/WorldButtonHover.jpg' 
        : world_map_button = '../home_page/WorldButton.jpg';

        return (
            <Container style={{padding: 0, width: '90%'}}>
                <br></br>
                <Row>
                    <Image style={{height: '100%', padding: 0}} src='../home_page/HomePageTop.jpg' />
                </Row>
                <Row>
                    <Col style={{padding: 0}}>
                        <Image style={{height: '100%', width: '100%'}} src='../home_page/HomePageTriston.jpg' />
                    </Col>
                    <Col md={2} style={{padding: 0}}>
                        <OverlayTrigger placement='left' overlay={<Tooltip id="button-tooltip-2">
                            Navigate to World Map
                            </Tooltip>} >
                            <Link to='/world'
                            onMouseEnter={() => {
                                this.setState({hovered: true});
                            }}
                            onMouseLeave={() => {
                                this.setState({hovered: false});
                            }}>
                                <Image src={world_map_button} style={{height: '100%', width: '100%'}} name='world' />
                            </Link>
                        </OverlayTrigger>
                    </Col>
                    <Col style={{padding: 0}} >
                        <Image style={{height: '100%', width: '100%'}} src='../home_page/HomePageEadin.jpg' />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Info;