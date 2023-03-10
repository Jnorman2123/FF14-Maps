import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNpcs} from '../store/actions/npcs/npcActions';

class Npc extends Component {

    componentDidMount() {
        this.props.fetchNpcs();
    }

    renderNpc = () => {
        if (this.props.npcs.requesting === true) {
            return <h1>Loading...</h1>;
        } else {
            return (
                <ul>
                    {this.props.npcs.npcs.filter(npc => npc.id === this.props.npc_id).map((npc) => {
                        return (
                            <li key={npc.npc_name}>
                                {npc.npc_name}
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderNpc()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        npcs: state.npcs,
        requesting: state.requesting,
    }
}

export default connect(mapStateToProps, { fetchNpcs })(Npc);