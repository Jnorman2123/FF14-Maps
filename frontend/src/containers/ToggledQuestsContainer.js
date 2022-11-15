import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleDropdown from '../components/ToggleDropdown';
import ButtonToggle from '../components/ButtonToggle';
import { connect } from 'react-redux';

class ToggledQuestsContainer extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} className='text-center'>Hello</Col>
                </Row>
            </Container>
        )
    }
}

export default ToggledQuestsContainer;