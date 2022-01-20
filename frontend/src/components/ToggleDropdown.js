import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';

class ToggleDropdown extends Component {
    render() {
        return <Col>{this.props.renderDropdown(this.props.selection)}</Col>
    }
}

export default ToggleDropdown