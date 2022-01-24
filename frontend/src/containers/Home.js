import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuestContainer from './QuestContainer';
import ToggleContainer from './ToggleContainer';
import WorldNav from './WorldNav';
import { Outlet } from 'react-router-dom';

class Home extends Component {

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
              type: [
                {name: 'Main Story', active: false}, {name: 'Class/Job', active: false}, {name: 'Side', active: false}, 
                {name: 'Hunting Log', active: false}
              ],
              level: [
                {lvl: 5, active: false}, {lvl: 10, active: false}, {lvl: 15, active: false}, {lvl: 20, active: false}, 
                {lvl: 25, active: false}, {lvl: 30, active: false}, {lvl: 35, active: false}, {lvl: 40, active: false}, 
                {lvl: 45, active: false}, {lvl: 50, active: false}, {lvl: 55, active: false}, {lvl: 60, active: false}, 
                {lvl: 65, active: false}, {lvl: 70, active: false}, {lvl: 75, active: false}, {lvl: 80, active: false}, 
                {lvl: 85, active: false}, {lvl: 90, active: false}
              ], 
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
                            <ToggleContainer classes={this.state.class}  types={this.state.type} levels={this.state.level} 
                            setClassActive={this.setClassActive} setTypeActive={this.setTypeActive} setLvlActive={this.setLvlActive} />         
                        </Col>
                        <Col md={6} >
                            <Outlet />
                        </Col>
                        <Col md={3} className='bg-dark'>
                            <QuestContainer />
                        </Col>
                    </Row>
                </Container>       
            </div>
        ) 
    }
}

export default Home;