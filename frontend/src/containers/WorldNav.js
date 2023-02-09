import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RegionDropdown from '../components/RegionDropdown';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/esm/Image';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';

class WorldNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            button_name: '',
        }
    }

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
                let region_link = r.split(' ').join('').toLowerCase();
                return <NavDropdown key={r} title={r} id='basic-nav-dropdown' style={{paddingLeft: 15, paddingRight: 15}}>
                    <NavDropdown.Item as='div' key={r}>
                        <Link to={`/${region_link}`} >
                            {r} Region
                        </Link>
                    </NavDropdown.Item>
                    {this.props.zones.filter(zone => zone.includes(r)).map(zone => {
                        let split_name = zone.split(' ');
                        let splice_index = split_name.findIndex(l => l.includes('('));
                        split_name.splice(splice_index);
                        return <NavDropdown.Item as='div' key={zone}>
                            <Link to={`/${split_name.join('').toLowerCase()}`} >
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
        let home_icon = 'HomeButton';
        let world_icon = 'WorldButton';

        this.state.hovered && this.state.button_name === 'home' ? home_icon = 'HomeButtonHover' : home_icon = 'HomeButton';
        this.state.hovered && this.state.button_name === 'world' ? world_icon = 'WorldButtonHover' : world_icon = 'WorldButton';

        return (
            <Container fluid style={{paddingTop: 0, paddingBottom: 0}}>
                <Row> 
                    <Col md={3} className='bg-darkbg' style={{padding: 0}}>
                        <Image src='../icons/ui_components/HelperQuestLogo.jpg' />
                    </Col>
                    <Col md={6} className='bg-navbarbg'>
                        <Row style={{height: 44}}></Row>
                        <Row style={{height: 44}}></Row>
                        <Row>
                            <Navbar>
                                <OverlayTrigger placement='top' overlay={<Tooltip id="button-tooltip-2" >
                                    Navigate to Home Page
                                    </Tooltip>} >
                                    <Link to='/'
                                    onMouseEnter={(event) => {
                                        this.setState({hovered: true, button_name: event.target.name});
                                    }}
                                    onMouseLeave={() => {
                                        this.setState({hovered: false});
                                    }}>
                                        <Image src={`../icons/nav_icons/${home_icon}.png`} style={{width: 40, paddingRight: 5}}
                                         name='home' />
                                    </Link>
                                </OverlayTrigger>
                                <OverlayTrigger placement='top' overlay={<Tooltip id="button-tooltip-2" >
                                    Navigate to World Map
                                    </Tooltip>} >
                                    <Link to='/world'
                                    onMouseEnter={(event) => {
                                        this.setState({hovered: true, button_name: event.target.name});
                                    }}
                                    onMouseLeave={() => {
                                        this.setState({hovered: false});
                                    }}>
                                        <Image src={`../icons/nav_icons/${world_icon}.png`} style={{width: 40, paddingLeft: 5}}
                                         name='world' />
                                    </Link>
                                </OverlayTrigger>
                                <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='original' />
                                {/* <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='heavensward' />
                                <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='stormblood' />
                                <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='shadowbringers' />
                                <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='endwalker' /> */}
                            </Navbar>
                        </Row>
                    </Col>
                    <Col md={3} className='bg-darkbg'>hi</Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    zones: storeData.storeData.zones,
    original_regions: storeData.storeData.original_regions,
    // heavensward_regions: storeData.storeData.heavensward_regions,
    // stormblood_regions: storeData.storeData.stormblood_regions,
    // shadowbringers_regions: storeData.storeData.shadowbringers_regions,
    // endwalker_regions: storeData.storeData.endwalker_regions,
})

export default connect(mapStateToProps)(WorldNav);