import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';


class QuestInfo extends Component {
    render() {
        return (
            <Accordion flush style={{paddingTop: 5, paddingLeft: 5, paddingRight: 5}}>
                {this.props.renderQuestInfo(this.props.toggled_quests)}
            </Accordion>  
        )
    }
}

export default QuestInfo;