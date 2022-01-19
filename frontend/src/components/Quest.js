import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuests} from '../actions/quests/questActions';
import Npc from './Npc';

class Quest extends Component {

    componentDidMount() {
        this.props.fetchQuests();
    }

    renderQuests= () => {
        if (this.props.quests.requesting === true) {
            return <h1>Loading...</h1>;
        } else {
            return (
                <ul>
                    {this.props.quests.quests.map((quest) => {
                        return (
                            <li key={quest.id}>
                                <ul>
                                {quest.quest_name}
                                {quest.quest_npcs.map((npc, index) => {
                                    return (
                                        <li key={index}>
                                            <Npc npc_id={npc} />
                                        </li>
                                    )
                                })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    render() {
        return (
            <main>
                <h2>quests</h2>
                {this.renderQuests()}
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        quests: state.quests,
        requesting: state.requesting,
    }
}

export default connect(mapStateToProps, { fetchQuests })(Quest);