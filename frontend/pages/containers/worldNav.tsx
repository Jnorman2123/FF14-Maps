import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from "next/link";
import { Image, Container, Nav, Navbar, NavDropdown, Col, Row, OverlayTrigger, Card, Tooltip } from 'react-bootstrap';
import { getOriginalRegionsState, getZonesState } from '../../store/slices/dataStoreSlice'
import RegionDropdown from '../components/regionDropdown';


const WorldNav: React.FC = () => {
    const [hovered, setHovered] = useState(false);
    const [buttonName, setButtonName] = useState('');

    // const capitalize = (str: string) => {
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // }

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
                            <NavDropdown title={<Image src={region_nav_icon} width='100vw' />} id='basc-nav-dropdown' >
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
        })
    }

    let home_icon = 'HomeButton';
    let world_icon = 'WorldButton';

    hovered && buttonName === 'home' ? home_icon = 'HomeButtonHover' : home_icon = 'HomeButton';
    hovered && buttonName === 'world' ? world_icon = 'WorldButtonHover' : world_icon = 'WorldButton';

    return (
        <Container fluid style={{padding: 0}}>
            <Card className='border-0' style={{width: '100%', padding: 0}}> 
                <Card.Img src='../nav_bar/NavBar.jpg' alt='toggle' style={{padding: 0, width: '100%'}} />
                <Card.ImgOverlay style={{padding: 0, width: '100%', height: '100%'}} className='d-flex align-items-end'>
                    <Row  style={{width: '100%', padding: 0}} >
                        <Col md={3} style={{width: '25%', padding: 0}}>
                            <Image src='../nav_bar/logos/HelperQuest_Logo.png' style={{width: '100%'}}/>
                        </Col>
                        <Col md={6} className='d-flex align-items-end' style={{paddingLeft: 30}}>
                            <Navbar className='d-flex align-items-end' style={{padding: 0}}>
                                <OverlayTrigger placement='top' overlay={<Tooltip id="button-tooltip-2" >
                                    Navigate to Home Page
                                    </Tooltip>} >
                                    <Link href='/'
                                    onMouseEnter={() => {
                                        setHovered(true);
                                        setButtonName('home');
                                    }}
                                    onMouseLeave={() => {
                                        setHovered(false);
                                        setButtonName('');
                                    }}>
                                        <Image src={`../icons/nav_icons/${home_icon}.png`} 
                                        style={{width: '2.5vw', paddingRight: 5}} />
                                    </Link>
                                </OverlayTrigger>
                                <OverlayTrigger placement='top' overlay={<Tooltip id="button-tooltip-2" >
                                    Navigate to World Map
                                    </Tooltip>} >
                                    <Link href='/world'
                                    onMouseEnter={() => {
                                        setHovered(true);
                                        setButtonName('world');
                                    }}
                                    onMouseLeave={() => {
                                        setHovered(false);
                                        setButtonName('world');
                                    }}>
                                        <Image src={`../icons/nav_icons/${world_icon}.png`} 
                                        style={{width: '2.5vw', paddingLeft: 5}} />
                                    </Link>
                                </OverlayTrigger>
                                <RegionDropdown renderDropdowns={renderNavDropdowns}  region='original' />
                            </Navbar>
                        </Col>
                    </Row>
                </Card.ImgOverlay>
            </Card>
        </Container>
    ) 
}

export default WorldNav