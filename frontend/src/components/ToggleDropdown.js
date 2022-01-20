import React, { Component } from 'react';

class ToggleDropdown extends Component {
    render() {
        return <Col>{this.props.renderDropdowns(this.props.selection)}</Col>
    }
}

export default ToggleDropdown