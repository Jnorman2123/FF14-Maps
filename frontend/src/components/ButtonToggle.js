import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';

class ButtonToggle extends Component {
    render() {
        return <Col>{this.props.renderButton(this.props.selection)}</Col>
    }
}

export default ButtonToggle;