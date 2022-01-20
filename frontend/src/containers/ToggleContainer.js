import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';

class ToggleContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            class: '',
            type: ''
        }
    }

    render() {
        return (
            <Container className='bg-primary' >
                <h1>Toggle Quests</h1>
                <h1>Dropdowns</h1>
            </Container>
        )
    }
}

export default ToggleContainer;