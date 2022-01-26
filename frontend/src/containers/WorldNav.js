import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RegionDropdown from '../components/RegionDropdown';
import { Link } from 'react-router-dom';

class WorldNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            regions: {
                original: ["La Noscea", "The Black Shroud", "Thanalan"],
                heavensward: ["Coerthas", "Mor Dhona", "Abalathia's Spine", "Dravania"],
                stormblood: ["Gyr Abania", "Hingashi", "Othard"],
                shadowbringers: ["Norvandt"],
                endwalker: ["The Northern Empty", "Ilsabard", "The Sea of Stars", "The World Unsundered"],
            },
            zones: ['Limsa Lominsa Upper Decks (La Noscea)', 'Limsa Lominsa Lower Decks (La Noscea)', 'Middle La Noscea (La Noscea)', 
            'Lower La Noscea (La Noscea)', 'Eastern La Noscea (La Noscea)', 'Western La Noscea (La Noscea)', 'Upper La Noscea (La Noscea)', 
            'Outer La Noscea (La Noscea)', 'New Gridania (The Black Shroud)', 'Old Gridania (The Black Shroud)', 
            'Central Shroud (The Black Shroud)', 'East Shroud (The Black Shroud)', 'South Shroud (The Black Shroud)', 
            'North Shroud (The Black Shroud)', "Ul'dah - Steps of Nald (Thanalan)", "Ul'dah - Steps of Thal (Thanalan)", 
            'Hustings Strip (Thanalan)', 'The Gold Saucer (Thanalan)', 'Western Thanalan (Thanalan)', 'Eastern Thanalan (Thanalan)', 
            'Central Thanalan (Thanalan)', 'Southern Thanalan (Thanalan)', 'Northern Thanalan (Thanalan)', 'Foundation (Coerthas)', 
            'The Pillars (Coerthas)', 'Coerthas Central Highlands (Coerthas)', 'Coerthas Western Highlands (Coerthas)', 
            'Mor Dhona (Mor Dhona)', "The Sea of Clouds (Abalathia's Spine)", "Azys Lla (Abalathia's Spine)", 'Idyllshire (Dravania)', 
            'The Dravanian Forelands (Dravania)', 'The Dravanian Hinterlands (Dravania)', 'The Churning Mists (Dravania)', 
            "Rhalgr's Reach (Gyr Abania)", 'The Fringes (Gyr Abania)', 'The Peaks (Gyr Abania)', 'The Lochs (Gyr Abania)', 
            'Kugane (Hingashi)', 'The Ruby Sea (Othard)', 'Yanxia (Othard)', 'The Azim Steppe (Othard)', 
            'Crystarium (Norvandt)', 'Lakeland (Norvandt)', 'Eulmore (Norvandt)', 'Kholusia (Norvandt)', 'Amh Araeng (Norvandt)', 
            'Il Mheg (Norvandt)', "The Rak'tika Greatwood (Norvandt)", 'The Tempest (Norvandt)', 'Old Sharlayan (The Northern Empty)', 
            'Labyrinthos (The Northern Empty)', 'Garlemald (Ilsabard)', 'Radz-at-Han (Ilsabard)', 'Thavnair (Ilsabard)', 
            'Mare Lamentorum (The Sea of Stars)', 'Ultima Thule (The Sea of Stars)', 'Elpis (The World Unsundered)']
        }
    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    renderNavDropdowns = (region) => {
        let expansion = null;
        if (region === "original") {
            expansion = this.state.regions.original
        } else if (region === "heavensward") {
            expansion = this.state.regions.heavensward
        } else if (region === 'stormblood') {
            expansion = this.state.regions.stormblood
        } else if (region === 'shadowbringers') {
            expansion = this.state.regions.shadowbringers
        } else {
            expansion = this.state.regions.endwalker
        }
        if (expansion === this.state.regions.original) {
            return expansion.map(r => {
                return <NavDropdown key={r} title={r} id='basic-nav-dropdown'>
                    {this.state.zones.filter(zone => zone.includes(r)).map(zone => {
                        let split_name = zone.split(' ');
                        let splice_index = split_name.findIndex(l => l.includes('('));
                        split_name.splice(splice_index);
                        return <NavDropdown.Item as='div' key={zone}>
                            <Link to={`/${split_name.join('').toLowerCase()}`}>
                                {zone}
                            </Link>
                        </NavDropdown.Item>
                    })}
                </NavDropdown>
            })
        }  else {
            return <NavDropdown key={region} title={this.capitalize(region)} id='basic-nav-dropdown'>
                    {expansion.map(r => this.state.zones.filter(zone => zone.includes(r)).map(zone => {
                        let split_name = zone.split(' ');
                        let splice_index = split_name.findIndex(l => l.includes('('));
                        split_name.splice(splice_index);
                        return <NavDropdown.Item as='div' key={zone}>
                            <Link to={`/${split_name.join('').toLowerCase()}`}>
                                {zone}
                            </Link>
                        </NavDropdown.Item>
                    }))}
                </NavDropdown>
        }
    }

    render() {
        return (
            <Col md={{span: 6, offset: 3}}>
                <Navbar bg='light' >
                    <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='original' />
                    <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='heavensward' />
                    <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='stormblood' />
                    <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='shadowbringers' />
                    <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='endwalker' />
                </Navbar>
            </Col>
        )
    }
}

export default WorldNav;