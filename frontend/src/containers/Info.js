import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import Card from 'react-bootstrap/Card';

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        }
    }

    render() {
        let world_map_button = ' ';

        this.state.hovered ? world_map_button = '../home_page/WorldButtonHover.png' 
        : world_map_button = '../home_page/WorldButton.png';

        return (
            <Container style={{padding: 0, width: '100%', height: '100%'}} 
                className='d-flex align-items-center justify-content-center'>
                <Card className='border-0' style={{width: '90%'}}>
                <Card.Img src='../home_page/HomePageComic.jpg' alt='toggle' />
                    <Card.ImgOverlay style={{padding: 0}} className='d-flex align-items-end justify-content-center'>
                    <Col style={{padding: 0}} className='d-flex align-items-end justify-content-center'>
                        <OverlayTrigger placement='left' overlay={<Tooltip id="button-tooltip-2" >
                            Navigate to World Map
                            </Tooltip>} >
                            <Link to='/world'
                            onMouseEnter={() => {
                                this.setState({hovered: true});
                            }}
                            onMouseLeave={() => {
                                this.setState({hovered: false});
                            }}>
                                <Image src={world_map_button} name='world' style={{width: '9.5vw'}} />
                            </Link>
                        </OverlayTrigger>
                    </Col>
                    </Card.ImgOverlay>
                </Card>
                
            </Container>
        )
    }
}

export default Info;