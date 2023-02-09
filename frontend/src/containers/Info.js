import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image';

class Info extends Component {
    render() {
        return (
            <Container style={{padding: 0}}>
                <Row>
                    <Image style={{height: 650}} src='../home_page/HomePageTop.jpg' />
                </Row>
                <Row>
                    <Col className='bg-primary' style={{paddingTop: 0, paddingLeft: 12, paddingRight: 0}}>
                        <Image style={{height: 175, width: '100%'}} src='../home_page/HomePageTriston.jpg' />
                    </Col>
                    <Col md={2} className='bg-warning' style={{padding: 0}}>
                        <Image style={{height: 175, width: '100%'}} src='../home_page/WorldButton.jpg' />
                    </Col>
                    <Col style={{paddingLeft: 0, paddingTop: 0, paddingRight: 12}} className='bg-danger'>
                        <Image style={{height: 175, width: '100%'}} src='../home_page/HomePageEadin.jpg' />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Info;