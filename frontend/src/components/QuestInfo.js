import React, { Component } from 'react';

class QuestInfo extends Component {
    render() {
        return (
            <>
                {this.props.renderQuestInfo(this.props.active_quest)}
            </>
        )
    }
}

export default QuestInfo;