import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'

class WorldNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            regions: {
                original: ["La Noscea", "The Black Shroud", "Thanalan"],
                heavensward_regions: ["Coerthas", "Mor Dhona", "Abalathia's Spine", "Dravania"],
                stormblood_regions: ["Gyr Abania", "Hingashi", "Othard"],
                shadowbringers_regions: ["Norvandt"],
                endwalker_regions: ["The Northern Empty", "Ilsabard", "The Sea of Stars", "The World Unsundered"],
            },
            zones: ['Limsa Lominsa Upper Decks (La Noscea)', 'Limsa Lominsa Lower Decks (La Noscea)', 'Mist (La Noscea)',
            "Wolve's Den Pier (La Noscea)", 'Middle La Noscea (La Noscea)', 'Lower La Noscea (La Noscea)', 
            'Eastern La Noscea (La Noscea)', 'Western La Noscea (La Noscea)', 'Upper La Noscea (La Noscea)', 
            'Outer La Noscea (La Noscea)', 'New Gridania (The Black Shroud)', 'Old Gridania (The Black Shroud)', 
            'The Lavender Beds (The Black Shroud)', 'Central Shroud (The Black Shroud)', 'East Shroud (The Black Shroud)', 
            'South Shroud (The Black Shroud)', 'North Shroud (The Black Shroud)', "Ul'dah - Steps of Nald (Thanalan)", 
            "Ul'dah - Steps of Thal (Thanalan)", 'Hustings Strip (Thanalan)', 'The Goblet (Thanalan)', 'The Gold Saucer (Thanalan)', 
            'Western Thanalan (Thanalan)', 'Eastern Thanalan (Thanalan)', 'Central Thanalan (Thanalan)', 'Southern Thanalan (Thanalan)', 
            'Northern Thanalan (Thanalan)', 'Foundation (Coerthas)', 'The Pillars (Coerthas)', 'Empyreum (Coerthas)', 
            'Coerthas Central Highlands (Coerthas)', 'Coerthas Western Highlands (Coerthas)', 'Mor Dhona (Mor Dhona)', 
            "The Sea of Clouds (Abalathia's Spine)", "Azys Lla (Abalathia's Spine)", 'Idyllshire (Dravania)', 
            'The Dravanian Forelands (Dravania)', 'The Dravanian Hinterlands (Dravania)', 'The Churning Mists (Dravania)', 
            "Rhalgr's Reach (Gyr Abania)", 'The Fringes (Gyr Abania)', 'The Peaks (Gyr Abania)', 'The Lochs (Gyr Abania)', 
            'Kugane (Hingashi)', 'Shirogane (Hingashi)', 'The Ruby Sea (Othard)', 'Yanxia (Othard)', 'The Azim Steppe (Othard)', 
            'Crystarium (Norvandt)', 'Lakeland (Norvandt)', 'Eulmore (Norvandt)', 'Kholusia (Norvandt)', 'Amh Araeng (Norvandt)', 
            'Il Mheg (Norvandt)', "The Rak'tika Greatwood (Norvandt)", 'The Tempest (Norvandt)', 'Old Sharlayan (The Northern Empty)', 
            'Labyrinthos (The Northern Empty)', 'Garlemald (Ilsabard)', 'Radz-at-Han (Ilsabard)', 'Thavnair (Ilsabard)', 
            'Mare Lamentorum (The Sea of Stars)', 'Ultima Thule (The Sea of Stars)', 'Elpis (The World Unsundered)']
        }
    }

    render() {
        return (
            <Container fluid>
                <Navbar bg='light' >
                    {this.state.regions.map(region => {
                        return <NavDropdown key={region} title={region} id='basic-nav-dropdown'>
                            {this.state.zones.filter(zone => zone.includes(region)).map(zone => {
                                return <NavDropdown.Item>{zone}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                    })}
                </Navbar> 
            </Container>    
        )
    }
}

export default WorldNav;