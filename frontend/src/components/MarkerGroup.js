import React, { Component } from 'react';
import { Marker, LayerGroup, Tooltip } from 'react-leaflet';

class MarkerGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marker_props: this.props.marker_props
        }
    }

    shouldComponentUpdate(nextState) {
        if (nextState !== this.state) {
            return true;
        } else {
            return false;
        }
    }

    raiseMarker = () => {
        console.log('hi')
        this.setState({
            marker_props: {...this.state.marker_props, z: 1000}
        })
    }

    resetMarker = () => {
        console.log('bye')
        this.setState({
            marker_props: {...this.state.marker_props, z: 50}
        })
    }

    render() {
        if (this.props.type === 'start') {
            return <LayerGroup >
                <Marker key={Math.random()} zIndexOffset={this.state.marker_props.z} 
                position={this.props.revertLat(this.state.marker_props.npc.npc_location_x, 
                this.state.marker_props.npc.npc_location_y)} 
                icon={this.props.color_icon} />
                <Marker key={Math.random()} zIndexOffset={this.state.marker_props.z} 
                position={this.props.revertLat(this.state.marker_props.npc.npc_location_x, 
                this.state.marker_props.npc.npc_location_y)} 
                icon={this.props.icon} eventHandlers={{ click: () => this.props.toggleQuest(this.state.marker_props, 
                this.props.active_quests), mouseout: () => this.resetMarker()}} >
                    <Tooltip>
                        <h6 className='text-center'>{this.state.marker_props.quest.quest_name}</h6>
                        <h6 className='text-center'>{this.state.marker_props.npc.npc_name}</h6>
                    </Tooltip>
                </Marker>
            </LayerGroup>
        }
    }
}

export default MarkerGroup;