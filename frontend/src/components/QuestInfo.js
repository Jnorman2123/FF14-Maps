import React, { Component } from 'react';

class QuestInfo extends Component {
    render() {
        return (
            <>
                {this.props.renderQuestInfo(this.props.toggled_quests)}
            </>
        )
    }
}

export default QuestInfo;