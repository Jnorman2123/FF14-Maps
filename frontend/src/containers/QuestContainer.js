import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';

class QuestContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            steps: [],
            reward: {}
        }
    }

    render() {
        return (
            <Container className='bg-primary' >
                <h1>Quest</h1>
            </Container>
        )
    }
}

export default QuestContainer;