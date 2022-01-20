import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuestContainer from './containers/QuestContainer';
import ToggleContainer from './containers/ToggleContainer';
import WorldNav from './containers/WorldNav';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      class: ['All', 'Gladiator', 'Marauder', 'Archer', 'Lancer', 'Pugilist', 'Rogue', 'Conjurer', 'Arcanist', 'Thaumaturge', 
                'Paladin', 'Warrior', 'Monk', 'Dragoon', 'Ninja', 'Bard', 'Black Mage', 'Summoner', 'Scholar', 'White Mage', 
                'Blue Mage', 'Dark Knight', 'Machinist', 'Astrologian', 'Samurai', 'Red Mage', 'Gunbreaker', 'Dancer', 'Reaper', 'Sage'],
      type: ['Main Story', 'Class', 'Side', 'Hunting Log']
    }
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <WorldNav />
          </Row>
          <Row>
            <Col md={3} className='bg-dark'>
              <ToggleContainer classes={this.state.class}  types={this.state.type} />         
            </Col>
            <Col md={{span: 3, offset: 6}} className='bg-dark'>
              <QuestContainer />
            </Col>
          </Row>
        </Container>
      </div>
    );
  } 
}

export default App;
