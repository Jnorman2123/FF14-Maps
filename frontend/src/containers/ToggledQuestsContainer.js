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
            <Container style={{overflowY: 'scroll', maxHeight: '275px'}} >
                <Accordion >
                    <Accordion.Header className='bg-primary text-center' >
                        Toggled Quests
                    </Accordion.Header>
                    <Accordion.Body className='bg-secondary'>
                        {this.props.active_quests.map(aq => {
                            if (this.props.toggled_quests.includes(aq)) {
                                theme = 'success';
                            } else {
                                theme = 'danger';
                            }
                            return <Row key={aq.quest_name} >
                                <Col md={1}>
                                    <Button key={Math.random()} id='toggle-check' type='checkbox' variant='primary' 
                                    name='Delete' size='sm' onClick={() => this.props.deleteQuest(aq, this.props.active_quests)} >
                                        X                                   
                                    </Button>
                                </Col>
                                <Col md={9} >
                                    <p>{aq.quest_name}</p>
                                </Col>
                                <Col md={1}>
                                    <Button key={aq.quest_name} id='toggle-check' type='checkbox' variant={theme} 
                                    name={aq.quest_name} onClick={() => this.props.toggleQuest(aq, this.props.active_quests)} 
                                    size='sm'>
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