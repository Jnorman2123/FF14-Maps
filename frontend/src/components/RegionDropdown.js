import React, { Component } from 'react';

class RegionDropdown extends Component {
    render() {
        return (
            <>
            {this.props.renderDropdowns(this.props.region)}
            </>
        )
    }
}

export default RegionDropdown;