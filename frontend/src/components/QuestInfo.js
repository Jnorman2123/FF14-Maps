import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';


class QuestInfo extends Component {
    render() {
        return (
            <Container style={{padding: 0}}>
                {this.props.renderQuestInfo(this.props.toggled_quests)}
            </Container>    
        )
    }
}

export default QuestInfo;