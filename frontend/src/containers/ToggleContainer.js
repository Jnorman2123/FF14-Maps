import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';

class ToggleContainer extends Component {

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
            <Container className='bg-primary' >
                <h1>Toggle Quests</h1>
                <h1>Dropdowns</h1>
            </Container>
        )
    }
}

export default ToggleContainer;