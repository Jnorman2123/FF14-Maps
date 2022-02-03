import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';

class QuestContainer extends Component {

    render() {
        return (
            <Container key={Math.random()} className='bg-primary' >
                <h1>Quest</h1>
                <h2>{this.props.q_id}</h2>
            </Container>
        )
    }
}

export default QuestContainer;