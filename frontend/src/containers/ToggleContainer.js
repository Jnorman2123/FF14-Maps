import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ToggledQuestsContainer from './ToggledQuestsContainer';
import ButtonToggle from '../components/ButtonToggle';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';

class ToggleContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            base_classes: this.props.classes.slice(0, 9),
            tank_jobs: this.props.classes.slice(9, 13),
            healer_jobs: this.props.classes.slice(13, 17),
            melee_dps_jobs: this.props.classes.slice(17, 22),
            physical_ranged_dps_jobs: this.props.classes.slice(22, 25),
            magical_ranged_dps_jobs: this.props.classes.slice(25),
        }
    }

    renderButton = (item, type) => {
        let icon_name = null;
        let setActive = null;
        let icon_group = null;
        let width = 50;
        let padding = 1;
        if (type === 'quest class') {
            setActive = this.props.setClassActive;
            icon_group = 'class_icons';
        } else if (type === 'quest type') {
            setActive = this.props.setTypeActive;
            icon_group = 'quest_type_icons';
            item.name = item.name.split(' ').join('');
        } else {
            setActive = this.props.setLevelActive;
            icon_group = 'quest_level_icons';
        }

        item.active ? icon_name = item.name + 'Active' : icon_name = item.name;
        
        return <OverlayTrigger placement='top' overlay={<Tooltip id="button-tooltip-2" >{item.name}</Tooltip>} >
            <Button id='toggle-check' type='checkbox' key={item.name} name={item.name} onClick={setActive} 
            style={{width: width, padding: padding}}>
                <Image fluid='true' src={`../icons/${icon_group}/${icon_name}.png`} name={item.name} />
            </Button>
        </OverlayTrigger>
    }

    render() {
        return (
            <> 
                <Card className='text-center'>
                    <Card.Img src='../icons/ui_components/ToggleHeader.jpg' alt='header image' />
                    <Card.ImgOverlay>
                        <h5>Toggle Quests by Class</h5>
                    </Card.ImgOverlay>
                </Card>
                <Row className='justify-content-left'>
                    {this.state.base_classes.map(c => {
                        return <ButtonToggle key={c.name} renderButton={this.renderButton} selection={c} type='quest class' />
                    })}
                </Row>         
                <Row>
                    <h5 className='text-center'>Toggle Quests by Type</h5>
                </Row>
                <Row>
                    {this.props.quest_types.map(t => {
                        return <ButtonToggle key={t.name} renderButton={this.renderButton} selection={t} type='quest type' />
                    })}   
                </Row>  
                <Row>
                    <h5 className='text-center'>Toggle Quests by Level</h5>
                </Row> 
                <Row>
                    {this.props.quest_levels.map(l => {
                        return <ButtonToggle key={l.name} renderButton={this.renderButton} selection={l} type='quest level' />
                    })}    
                </Row> 
                <br/>
                <Row>
                    <ToggledQuestsContainer toggled_quests={this.props.toggled_quests} active_quests={this.props.active_quests} 
                    toggleQuest={this.props.toggleQuest} deleteQuest={this.props.deleteQuest} 
                    setActiveQuests={this.props.setActiveQuests}/>
                </Row>
            </>
        )
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(ToggleContainer);