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
      class:  {
        base_classes: [
          {name: 'Gladiator', active: false}, {name: 'Marauder', active: false}, {name: 'Archer', active: false},
          {name: 'Lancer', active: false}, {name: 'Pugilist', active: false}, {name: 'Rogue', active: false}, 
          {name: 'Conjurer', active: false}, {name: 'Arcanist', active: false}, {name: 'Thaumaturge', active: false}
        ],
        tank_jobs: [
          {name: 'Paladin', active: false}, {name: 'Warrior', active: false}, {name: 'Dark Knight', active: false}, 
          {name: 'Gunbreaker', active: false}
        ],
        healer_jobs: [
          {name: 'White Mage', active: false}, {name: 'Scholar', active: false}, {name: 'Astrologian', active: false}, 
          {name: 'Sage', active: false}
        ],
        melee_dps_jobs: [
          {name: 'Monk', active: false}, {name: 'Dragoon', active: false}, {name: 'Ninja', active: false},
          {name: 'Samurai', active: false}, {name: 'Reaper', active: false}
        ],
        physical_ranged_dps_jobs: [
          {name: 'Bard', active: false}, {name: 'Machinist', active: false}, {name: 'Dancer', active: false}
        ],
        magical_ranged_dps_jobs: [
          {name: 'Black Mage', active: false}, {name: 'Summoner', active: false}, {name: 'Red Mage', active: false}, 
          {name: 'Blue Mage', active: false}
        ],
      },
      type: ['Main Story', 'Class/Job', 'Side', 'Hunting Log']
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
