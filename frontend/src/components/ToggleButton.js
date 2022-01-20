import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class ToggleButton extends Component {
    render() {
        return <Col><Button>{this.props.type}</Button></Col>
    }
}

export default ToggleButton;