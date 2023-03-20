import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from "next/link";
import { Image, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { getOriginalRegionsState, getZonesState } from '../../store/slices/dataStoreSlice'
// import RegionDropdown from '../components/RegionDropdown';

interface WorldNavProps {
    title: string,
}

const WorldNav: React.FC<WorldNavProps> = ({title}) => {
    const [hovered, setHovered] = useState(false);
    const [buttonName, setButtonName] = useState('');

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const renderNavDropdowns = (region: string) => {
        let expansion = useSelector(getOriginalRegionsState);
        let zones = useSelector(getZonesState)
        return expansion.map(r => {
            let region_nav_icon = `/nav_bar/${r.split(' ').join('')}NavTab.png`
            let region_link = r.split(' ').join('').toLowerCase();

            return <Navbar key={r} bg='light' expand='lg'>
                <Container>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav' >
                        <Nav className='me-auto' >
                            <NavDropdown title={<Image src={region_nav_icon}/>} id='basc-nav-dropdown' >
                                <NavDropdown.Item href={region_link} >{r} Region</NavDropdown.Item>
                                {zones.filter(zone => zone.includes(r)).map(zone => {
                                    let split_name = zone.split(' ');
                                    let splice_index = split_name.findIndex(l => l.includes('('));
                                    split_name.splice(splice_index);
                                    return <NavDropdown.Item key={zone} href={`/${split_name.join('').toLowerCase()}`}>
                                        {zone}
                                    </NavDropdown.Item>
                                })}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            return <div className='dropdown' key={r} >
                <button className='dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' 
                aria-haspopup="true" aria-expanded="false">
                    <Image src={region_nav_icon} alt='nav-bar-title' width={100} height={100} /> 
                </button>
                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    <a className='dropdown-item' href={region_link}>{r} Region</a>
                    {zones.filter(zone => zone.includes(r)).map(zone => {
                        let split_name = zone.split(' ');
                        let splice_index = split_name.findIndex(l => l.includes('('));
                        split_name.splice(splice_index);
                        return <div className='dropdown-item' key={zone}>
                            <Link href={`/${split_name.join('').toLowerCase()}`} >
                                {zone}
                            </Link>
                        </div>
                    })}
                </div>
            </div>
            // return <div class='dropdown' key={r}>
                
            // id='basic-nav-dropdown' style={{padding: 0}} >
            //     <div class='dropdown-item' key={r}>
            //         <Link to={`/${region_link}`} >
            //             {r} Region
            //         </Link>
            //     </div>
            //     {this.props.zones.filter(zone => zone.includes(r)).map(zone => {
            //         let split_name = zone.split(' ');
            //         let splice_index = split_name.findIndex(l => l.includes('('));
            //         split_name.splice(splice_index);
            //         return <div class='dropdown-item' key={zone}>
            //             <Link to={`/${split_name.join('').toLowerCase()}`} >
            //                 {zone}
            //             </Link>
            //         </div>
            //     })}
            // </div>
        })
        // if (region === "original") {
        //     expansion = original_regions
        // } else if (region === "heavensward") {
        //     expansion = heavensward_regions
        // } else if (region === 'stormblood') {
        //     expansion = stormblood_regions
        // } else if (region === 'shadowbringers') {
        //     expansion = shadowbringers_regions
        // } else {
        //     expansion = endwalker_regions
        // }
        // if (expansion === this.props.original_regions) {
            
        //     })
        // }  else {
        //     return <NavDropdown key={region} title={this.capitalize(region)} id='basic-nav-dropdown'>
        //             {expansion.map(r => this.props.zones.filter(zone => zone.includes(r)).map(zone => {
        //                 let split_name = zone.split(' ');
        //                 let splice_index = split_name.findIndex(l => l.includes('('));
        //                 split_name.splice(splice_index);
        //                 return <NavDropdown.Item as='div' key={zone}>
        //                     <Link to={`/${split_name.join('').toLowerCase()}`}>
        //                         {zone}
        //                     </Link>
        //                 </NavDropdown.Item>
        //             }))}
        //         </NavDropdown>
        // }
    }

    return (
        <h1>{renderNavDropdowns('original')}</h1>
    )

    
}

export default WorldNav

// import React, { Component } from 'react';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Image from 'react-bootstrap/Image';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
// import Card from 'react-bootstrap/Card';

// class WorldNav extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             hovered: false,
//             button_name: '',
//         }
//     }

//     

//     

//     render() {
//         let home_icon = 'HomeButton';
//         let world_icon = 'WorldButton';

//         this.state.hovered && this.state.button_name === 'home' ? home_icon = 'HomeButtonHover' : home_icon = 'HomeButton';
//         this.state.hovered && this.state.button_name === 'world' ? world_icon = 'WorldButtonHover' : world_icon = 'WorldButton';

//         return (
//             <Container fluid style={{padding: 0}}>
//                 <Card className='border-0' style={{width: '100%', padding: 0}}> 
//                     <Card.Img src='../nav_bar/NavBar.jpg' alt='toggle' style={{padding: 0, width: '100%'}} />
//                     <Card.ImgOverlay style={{padding: 0, width: '100%', height: '100%'}} className='d-flex align-items-end'>
//                         <Row  style={{width: '100%', padding: 0}} >
//                             <Col md={3} style={{width: '25%', padding: 0}}>
//                                 <Image src='../nav_bar/logos/HelperQuest_Logo.png' style={{width: '100%'}}/>
//                             </Col>
//                             <Col md={6} className='d-flex align-items-end' style={{paddingLeft: 30}}>
//                                 <Navbar className='d-flex align-items-end' style={{padding: 0}}>
//                                     <OverlayTrigger placement='top' overlay={<Tooltip id="button-tooltip-2" >
//                                         Navigate to Home Page
//                                         </Tooltip>} >
//                                         <Link to='/'
//                                         onMouseEnter={(event) => {
//                                             this.setState({hovered: true, button_name: event.target.name});
//                                         }}
//                                         onMouseLeave={() => {
//                                             this.setState({hovered: false});
//                                         }}>
//                                             <Image src={`../icons/nav_icons/${home_icon}.png`} 
//                                             style={{width: '2.5vw', paddingRight: 5}} name='home' />
//                                         </Link>
//                                     </OverlayTrigger>
//                                     <OverlayTrigger placement='top' overlay={<Tooltip id="button-tooltip-2" >
//                                         Navigate to World Map
//                                         </Tooltip>} >
//                                         <Link to='/world'
//                                         onMouseEnter={(event) => {
//                                             this.setState({hovered: true, button_name: event.target.name});
//                                         }}
//                                         onMouseLeave={() => {
//                                             this.setState({hovered: false});
//                                         }}>
//                                             <Image src={`../icons/nav_icons/${world_icon}.png`} 
//                                             style={{width: '2.5vw', paddingLeft: 5}} name='world' />
//                                         </Link>
//                                     </OverlayTrigger>
//                                     <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='original' />
//                                     {/* <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='heavensward' />
//                                     <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='stormblood' />
//                                     <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='shadowbringers' />
//                                     <RegionDropdown renderDropdowns={this.renderNavDropdowns}  region='endwalker' /> */}
//                                 </Navbar>
//                             </Col>
//                         </Row>
//                     </Card.ImgOverlay>
//                 </Card>
//             </Container>
//         )
//     }
// }