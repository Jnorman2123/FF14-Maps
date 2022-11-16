import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/esm/Accordion';

class ToggledQuestsContainer extends Component {
    render() {
        let theme = 'danger'
        return (
            <Container style={{overflowY: 'scroll', maxHeight: '325px'}} >
                <Accordion >
                    <Accordion.Header className='bg-primary text-center' >
                        Toggled Quests
                    </Accordion.Header>
                    <Accordion.Body className='bg-secondary'>
                        {this.props.active_quests.map(aq => {
                            if (this.props.toggled_quests.includes(aq)) {
                                theme = 'primary';
                            } else {
                                theme = 'danger';
                            }
                            return <Row>
                                <Col md={9} >
                                    <p>{aq.quest_name}</p>
                                </Col>
                                <Col>
                                    <Button key={aq.name} id='toggle-check' type='checkbox' variant={theme} name={aq.name} >
                                            Active                                   
                                    </Button>
                                </Col>
                            </Row>
                        })}
                    </Accordion.Body>
                </Accordion>
            </Container>
        )
    }
}

export default ToggledQuestsContainer;