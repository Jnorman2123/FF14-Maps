import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Info extends Component {
    render() {
        return (
            <Container fluid>
                <Row className='text-center'>
                    <Link to={`/world`}>
                        Navigate to World Map
                    </Link>
                </Row>
            </Container>
        )
    }
}

export default Info;