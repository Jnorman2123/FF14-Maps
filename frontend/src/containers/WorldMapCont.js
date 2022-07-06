import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import { Navigate } from 'react-router-dom';

class WorldMapCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key_markers: [
                {icon: new L.Icon({iconUrl: `./icons/RegionKey.png`, iconSize: [195, 288]}), 
                position: [-34, 36.25]}
            ],
            zone_markers: [
                {icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegionName.png`, iconSize: [143, 38.5]}), 
                position: [-28.6, 36.3]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-31.9, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-34.7, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-37.4, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-40.15, 39.1]
                }
            ],
            highlighted_markers: [],
            popup_markers: [],
            navigate: false,
            navigate_link: '',
        }
    };

    addMarker = (pos, icon, type) => {
        let marker = {icon: icon, position: pos};
        if (type === 'highlighted') {
            this.setState({ highlighted_markers: [...this.state.highlighted_markers, marker]})
        } else if (type === 'popup') {
            this.setState({ popup_markers: [...this.state.popup_markers, marker]})
        } else {
            this.setState({ zone_markers: [...this.state.zone_markers, marker]})
        }
    };

    removeMarker = (type) => {
        if (type === 'highlighted') {
            this.setState({highlighted_markers: []});
        } else if (type === 'popup') {
            this.setState({popup_markers: []});
        } else {
            this.setState({zone_markers: []});
        }
        
    };

    resetZoneMarkers = () => {
        this.setState({zone_markers: 
            [
                {icon: new L.Icon({iconUrl: `./icons/region_names/SelectRegionName.png`, iconSize: [143, 38.5]}),
                position: [-28.6, 36.3]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-31.9, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-34.7, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-37.4, 39.1]
                },
                {icon: new L.Icon({iconUrl: `./icons/quest_numbers/Hyphen.png`, iconSize: [33.5, 33.5]}),
                position: [-40.15, 39.1]
                }
            ],
        });
    };

    makeMarkerIcon = (iconUrl, iconSize) => {
        let icon = new L.Icon({iconUrl: iconUrl, iconSize: [iconSize[0], iconSize[1]],
        })
        return icon;
    }


    render () {

        let setQuestType = (quests, type) => {
            return quests.filter(q => q.quest_type === type)
        }

        let setQuestStarters = (type) => {
            let quests = setQuestType(active_quests, type).map(aq => {
                let starter_npc = npcs.filter(npc => npc.id === aq.quest_npcs[0]);
                return starter_npc[0];
            });
            return quests;
        }

        let setStartersLength = (quests, region) => {
            return quests.filter(q => q.npc_zone.includes(region)).length
        }

        let createIcon = (url, size) => {
            let icon = new L.Icon({
                iconUrl: url,
                iconSize: [size[0], size[1]],
            });
            return icon;
        } 

        let createPolygon = (region, region_pos, region_icon, region_name_popup_pos, region_name_icon, region_popup_pos) => {
            let navLink = `/${region.split(" ").join('').toLowerCase()}`;
            return <Polygon positions={region_pos} pathOptions={polyOptions} opacity={.1} eventHandlers={{
                mouseover: () => {
                    this.removeMarker('zone');
                    let main_quest_count_icon = this.makeMarkerIcon(`./icons/quest_numbers/${setStartersLength
                        (main_starters, region)}.png`, quest_count_icon_size);
                    let side_quest_count_icon = this.makeMarkerIcon(`./icons/quest_numbers/${setStartersLength
                        (side_starters, region)}.png`, quest_count_icon_size);
                    let hunting_quest_count_icon = this.makeMarkerIcon(`./icons/quest_numbers/${setStartersLength
                        (hunting_starters, region)}.png`, quest_count_icon_size);
                    let class_quest_count_icon = this.makeMarkerIcon(`./icons/quest_numbers/${setStartersLength
                        (class_starters, region)}.png`, quest_count_icon_size);
                    this.addMarker(highlight_pos, region_icon, 'highlighted');
                    this.addMarker(region_name_popup_pos, region_name_icon, 'zone');
                    this.addMarker(region_name_pos, region_name_icon, 'zone');
                    this.addMarker(main_quest_count_icon_pos, main_quest_count_icon, 'zone');
                    this.addMarker(side_quest_count_icon_pos, side_quest_count_icon, 'zone');
                    this.addMarker(hunting_quest_count_icon_pos, hunting_quest_count_icon, 'zone');
                    this.addMarker(class_quest_count_icon_pos, class_quest_count_icon, 'zone');
                    this.addMarker(region_popup_pos, popup_marker, 'popup');
                },
                mouseout: () => {
                    this.removeMarker('highlighted');
                    this.removeMarker('popup');
                    this.resetZoneMarkers();
                }, 
                click: () => {
                    this.setState({ navigate: true });
                    this.setState({ navigate_link: navLink });
                }
            }} />
        }

        let quests = this.props.quests.quests;
        let npcs = this.props.npcs.npcs;
        let active_classes = this.props.classes.filter(c => c.active === true).map(c => c.name);
        let active_quest_types = this.props.quest_types.filter(qt => qt.active === true).map(qt => qt.name);
        let active_quest_levels = this.props.quest_levels.filter(ql => ql.active === true).map(ql => {
            let lvl_ranges = ql.name.split('-');
            return [parseInt(lvl_ranges[0]), parseInt(lvl_ranges[1])]
        });
        let active_jobs = this.props.jobs.jobs.filter(j => active_classes.includes(j.job_name)).map(j => j.id);
        let active_quests = [];
        
        quests.map(q => {
            if (active_quest_types.includes(q.quest_type)) {
                q.quest_class.map(qc => {
                    if (active_jobs.includes(qc) || qc === 30) {
                        active_quest_levels.map(ql => {
                            if (q.quest_level >= ql[0] && q.quest_level <= ql[1]
                            && !active_quests.includes(q)) {
                                active_quests.push(q);
                            }
                            return active_quests;
                        })
                    }
                    return active_quests;
                })
            }
            return active_quests;
        });

        let class_starters = setQuestStarters('Class');
        let main_starters = setQuestStarters('Main Story');
        let hunting_starters = setQuestStarters('Hunting Log');
        let side_starters = setQuestStarters('Side');
        
        let la_noscea = [
            [-28.5, 4.75], [-28.6, 12], [-24.7, 14.2], [-22.5, 13.7], [-19.75, 12.25], [-19.75, 10.5], [-22, 6],
            [-24, 6], [-26.5, 4.75]
        ];
        let thanalan = [
            [-29, 15.5], [-37.5, 20], [-37.5, 22.5], [-34, 25.5], [-26, 25.5], [-26, 15.5]
        ];
        let the_black_shroud = [
            [-25, 26], [-21, 22], [-16, 22], [-14, 27], [-14, 30], [-16, 32], [-20, 32], [-24, 31]
        ];

        let polyOptions = { color: 'tan' }
        let la_noscea_icon = createIcon(`./maps/LaNosceaHighlighted.png`, [775.775, 773.45]);
        let thanalan_icon = createIcon(`./maps/ThanalanHighlighted.png`, [775.775, 773.45]);
        let the_black_shroud_icon = createIcon(`./maps/TheBlackShroudHighlighted.png`, [775.775, 773.45]);
        let la_noscea_name_icon = createIcon(`./icons/region_names/LaNosceaRegionName.png`, [143, 38.5]);
        let thanalan_name_icon = createIcon(`./icons/region_names/ThanalanRegionName.png`, [143, 38.5]);
        let the_black_shroud_name_icon = createIcon(`./icons/region_names/TheBlackShroudRegionName.png`, [143, 38.5]);
        let popup_marker = createIcon(`./icons/zone_names/PopupContainer.png`, [182, 112]);
        
        let main_quest_count_icon_pos = [-34.7, 39.1];
        let side_quest_count_icon_pos = [-40.15, 39.1];
        let hunting_quest_count_icon_pos = [-37.4, 39.1];
        let class_quest_count_icon_pos = [-31.9, 39.1];
        let quest_count_icon_size = [33.5, 33.5];
    

        let region_name_pos = [-28.6, 36.3];
        let highlight_pos = [-21.5, 21.4];
        let la_noscea_popup_pos = [-18, 10];
        let thanalan_popup_pos = [-24, 21];
        let the_black_shroud_popup_pos = [-12, 28];
        let la_noscea_name_popup_pos = [-17.75, 10];
        let thanalan_name_popup_pos = [-23.75, 21];
        let the_black_shroud_name_popup_pos = [-11.75, 28];

        return (
            <Container>
                <MapContainer maxBounds={this.props.bounds} center={this.props.center} zoom={this.props.zoom}
                crs={L.CRS.Simple} maxBoundsViscosity='1' scrollWheelZoom={false} maxZoom={this.props.zoom}
                minZoom={this.props.zoom} style={{height: '800px', width: '100%'}} >
                    {createPolygon('La Noscea', la_noscea, la_noscea_icon, 
                    la_noscea_name_popup_pos, la_noscea_name_icon, la_noscea_popup_pos)};
                    {createPolygon('Thanalan', thanalan, thanalan_icon,  thanalan_name_popup_pos, 
                    thanalan_name_icon, thanalan_popup_pos)};
                    {createPolygon('The Black Shroud', the_black_shroud, the_black_shroud_icon, 
                    the_black_shroud_name_popup_pos, the_black_shroud_name_icon, the_black_shroud_popup_pos)};
                    <ImageOverlay url={`./maps/${this.props.mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    {this.state.key_markers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={250}/>
                    })}
                    {this.state.zone_markers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={1000}/>
                    })}
                    {this.state.highlighted_markers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={0} 
                        opacity={1} interactive={false} />
                    })}
                    {this.state.popup_markers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={750} />
                    })}
                    {this.state.navigate && <Navigate to={this.state.navigate_link} replace={true} />}
                </MapContainer>
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    npcs: storeData.npcs,
    quests: storeData.quests,
    jobs: storeData.jobs,
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(WorldMapCont);