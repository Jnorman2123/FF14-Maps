import React, { Component } from 'react';
import Npc from './Npc';

class Quest extends Component {

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
                <h2>{this.props.q_id}</h2>
            </main>
        )
    }
}


export default Quest;