import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RegionDropdown from '../components/RegionDropdown';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class WorldNav extends Component {

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    renderNavDropdowns = (region) => {
        let expansion = null;
        if (region === "original") {
            expansion = this.props.original_regions
        } else if (region === "heavensward") {
            expansion = this.props.heavensward_regions
        } else if (region === 'stormblood') {
            expansion = this.props.stormblood_regions
        } else if (region === 'shadowbringers') {
            expansion = this.props.shadowbringers_regions
        } else {
            expansion = this.props.endwalker_regions
        }
        if (expansion === this.props.original_regions) {
            return expansion.map(r => {
                return <NavDropdown key={r} title={<Link to={`/${r.split(' ').join('').toLowerCase()}`} >{r}</Link>} 
                id='basic-nav-dropdown'>
                    {this.props.zones.filter(zone => zone.includes(r)).map(zone => {
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
                    {expansion.map(r => this.props.zones.filter(zone => zone.includes(r)).map(zone => {
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

const mapStateToProps = (storeData) => ({
    zones: storeData.storeData.zones,
    original_regions: storeData.storeData.original_regions,
    heavensward_regions: storeData.storeData.heavensward_regions,
    stormblood_regions: storeData.storeData.stormblood_regions,
    shadowbringers_regions: storeData.storeData.shadowbringers_regions,
    endwalker_regions: storeData.storeData.endwalker_regions,
})

export default connect(mapStateToProps)(WorldNav);