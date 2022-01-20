import React, { Component } from 'react';

class MapContainer extends Component {
    render() {
        return <h1 className='text-center'>{this.props.mapName} Map</h1>
    }
}

export default MapContainer;