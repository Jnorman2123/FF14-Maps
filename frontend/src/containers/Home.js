import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QuestInfoContainer from './QuestInfoContainer';
import ToggleContainer from './ToggleContainer';
import WorldNav from './WorldNav';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateClass, updateQuestLevel, updateQuestType } from '../store/actions/filters/filterActionCreators';

class Home extends Component {

    setClassActive = (event) => {
        let class_name = event.target.name;
        let col = this.props.classes;
        col.map(c => {
            if (c.name === class_name) {
              c.active = !c.active;
              this.props.updateClass(c);
            }
            return c.active
        })
      }

      setTypeActive = (event) => {
        let type_name = event.target.name;
        let col = this.props.quest_types;
        col.map(c => {
            if (c.name === type_name) {
              c.active = !c.active;
              this.props.updateQuestType(c);
            }
            return c.active
        })
      }

      setLevelActive = (event) => {
        let level_name = event.target.name;
        let col = this.props.quest_levels;
        col.map(c => {
            if (c.name === level_name) {
              c.active = !c.active;
              this.props.updateQuestLevel(c);
            }
            return c.active
        })
      }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <WorldNav />
                    </Row>
                    <Row>
                        <Col className='bg-dark'>
                            <ToggleContainer setClassActive={this.setClassActive} 
                            setLevelActive={this.setLevelActive} setTypeActive={this.setTypeActive} />         
                        </Col>
                        <Col md={6} >
                            <Outlet />
                        </Col>
                        <Col className='bg-dark'>
                            <QuestInfoContainer q_id={this.props.q_id} />
                        </Col>
                    </Row>
                </Container>       
            </div>
        ) 
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types,
})

export default connect(mapStateToProps, { updateClass, updateQuestLevel, updateQuestType })(Home);