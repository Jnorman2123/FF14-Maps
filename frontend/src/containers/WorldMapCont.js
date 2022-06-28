import React, { Component } from 'react';
import { MapContainer, Marker, ImageOverlay, Polygon, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import { Navigate } from 'react-router-dom';

class WorldMapCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyMarkers: [
                {icon: new L.Icon({
                    iconUrl: `./icons/RegionKey.png`,
                    iconRetinaUrl: `./icons/RegionKey.png`,
                    popupAnchor: [0, 0],
                    iconSize: [195, 288],
                    }),
                    position: [-34, 36.25]
                }
            ],
            zoneMarkers: 
            [
                {icon: new L.Icon({
                    iconUrl: `./icons/zone_names/SelectZoneName.png`,
                    iconRetinaUrl: `./icons/zone_names/SelectZoneName.png`,
                    popupAnchor: [0, 0],
                    iconSize: [143, 38.5],
                }),
                position: [-28.6, 36.3]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-31.9, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-34.7, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-37.4, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-40.15, 39.1]
                }
            ],
            highlightedMarkers: [],
            popupMarkers: [],
            navigate: false,
            navigateLink: '',
        }
    };

    addHighlightedMarker = (pos, icon) => {
        let marker = {icon: icon, position: pos};
        this.setState({ highlightedMarkers: [...this.state.highlightedMarkers, marker]})
    };

    removeHighlightedMarker = () => {
        this.setState({highlightedMarkers: []});
    };

    addPopupMarker = (pos, icon) => {
        let marker = {icon: icon, position: pos};
        this.setState({ popupMarkers: [...this.state.popupMarkers, marker]})
    };

    removePopupMarker = () => {
        this.setState({popupMarkers: []});
    };

    addZoneMarker = (pos, icon) => {
        let marker = {icon: icon, position: pos};
        this.setState({ zoneMarkers: [...this.state.zoneMarkers, marker]})
    };

    removeZoneMarkers = () => {
        this.setState({zoneMarkers: []});
    };

    resetZoneMarkers = () => {
        this.setState({zoneMarkers: 
            [
                {icon: new L.Icon({
                    iconUrl: `./icons/zone_names/SelectZoneName.png`,
                    iconRetinaUrl: `./icons/zone_names/SelectZoneName.png`,
                    popupAnchor: [0, 0],
                    iconSize: [143, 38.5],
                }),
                position: [-28.6, 36.3]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-31.9, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-34.7, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-37.4, 39.1]
                },
                {icon: new L.Icon({
                    iconUrl: `./icons/quest_numbers/Hyphen.png`,
                    iconRetinaUrl: `./icons/quest_numbers/Hyphen.png`,
                    popupAnchor: [0, 0],
                    iconSize: [33.5, 33.5],
                }),
                position: [-40.15, 39.1]
                }
            ],
        });
    };

    makeMarkerIcon = (iconUrl, iconSize) => {
        let icon = new L.Icon({
            iconUrl: iconUrl,
            iconRetinaUrl: iconUrl,
            popupAnchor: [0, 0],
            iconSize: [iconSize[0], iconSize[1]],
        })
        return icon;
    }


    render () {

        let quests = this.props.quests.quests;
        let jobs = this.props.jobs.jobs;
        let activeQuests = [];
        let activeClasses = [];
        let activeQuestTypes = [];
        let activeQuestLevels = [];
        let activeJobs = [];
        let classQuests = [];
        let mainQuests = [];
        let huntingQuests = [];
        let sideQuests = [];
        let classQuestStarters = [];
        let mainQuestStarters = [];
        let huntingQuestStarters = [];
        let sideQuestStarters = [];
        let blackShroudMainStarters = [];
        let blackShroudSideStarters = [];
        let blackShroudHuntingStarters = [];
        let blackShroudClassStarters = [];
        let thanalanMainStarters = [];
        let thanalanSideStarters = [];
        let thanalanHuntingStarters = [];
        let thanalanClassStarters = [];
        let laNosceaMainStarters = [];
        let laNosceaSideStarters = [];
        let laNosceaHuntingStarters = [];
        let laNosceaClassStarters = [];

        this.props.classes.map(c => {
            if (c.active === true) {
                activeClasses.push(c.name);
            }
            return activeClasses;
        });

        this.props.quest_types.map(qt => {
            if (qt.active === true) {
                activeQuestTypes.push(qt.name);
            }
            return activeQuestTypes;
        });

        this.props.quest_levels.map(ql => {
            if (ql.active === true) {
                let lvlRanges = ql.name.split('-');
                activeQuestLevels.push([parseInt(lvlRanges[0]), parseInt(lvlRanges[1])]);
            }
            return activeQuestLevels;
        });

        jobs.map(j => {
            if (activeClasses.includes(j.job_name)) {
                activeJobs.push(j.id);
            }
            return activeJobs;
        })

        quests.map(q => {
            if (activeQuestTypes.includes(q.quest_type)) {
                q.quest_class.map(qc => {
                    if (activeJobs.includes(qc) || qc === 30) {
                        activeQuestLevels.map(ql => {
                            if (q.quest_level >= ql[0] && q.quest_level <= ql[1]
                            && !activeQuests.includes(q)) {
                                activeQuests.push(q);
                            }
                            return activeQuests;
                        })
                    }
                    return activeQuests;
                })
            }
            return activeQuests;
        });

        activeQuests.map(aq => {
            if (aq.quest_type === "Main Story") {
                mainQuests.push(aq);
            } else if (aq.quest_type === "Side") {
                sideQuests.push(aq);
            } else if (aq.quest_type === "Hunting Log") {
                huntingQuests.push(aq);
            } else if (aq.quest_type === "Class") {
                classQuests.push(aq);
            }
            return mainQuests;
        })

        mainQuests.map(aq => {
            let starterNpc = this.props.npcs.npcs.filter(npc => npc.id === aq.quest_npcs[0]);
            mainQuestStarters.push(starterNpc[0]);
            return mainQuestStarters;
        });

        sideQuests.map(aq => {
            let starterNpc = this.props.npcs.npcs.filter(npc => npc.id === aq.quest_npcs[0]);
            sideQuestStarters.push(starterNpc[0]);
            return sideQuestStarters;
        });

        huntingQuests.map(aq => {
            let starterNpc = this.props.npcs.npcs.filter(npc => npc.id === aq.quest_npcs[0]);
            huntingQuestStarters.push(starterNpc[0]);
            return huntingQuestStarters;
        });

        classQuests.map(aq => {
            let starterNpc = this.props.npcs.npcs.filter(npc => npc.id === aq.quest_npcs[0]);
            classQuestStarters.push(starterNpc[0]);
            return classQuestStarters;
        });

        mainQuestStarters.map(qs => {
            if (qs.npc_zone.includes('The Black Shroud')) {
                blackShroudMainStarters.push(qs);
            } else if (qs.npc_zone.includes('Thanalan')) {
                thanalanMainStarters.push(qs);
            } else if (qs.npc_zone.includes('La Noscea')) {
                laNosceaMainStarters.push(qs);
            }
            return blackShroudMainStarters;
        })

        sideQuestStarters.map(qs => {
            if (qs.npc_zone.includes('The Black Shroud')) {
                blackShroudSideStarters.push(qs);
            } else if (qs.npc_zone.includes('Thanalan')) {
                thanalanSideStarters.push(qs);
            } else if (qs.npc_zone.includes('La Noscea')) {
                laNosceaSideStarters.push(qs);
            }
            return blackShroudSideStarters;
        })

        huntingQuestStarters.map(qs => {
            if (qs.npc_zone.includes('The Black Shroud')) {
                blackShroudHuntingStarters.push(qs);
            } else if (qs.npc_zone.includes('Thanalan')) {
                thanalanHuntingStarters.push(qs);
            } else if (qs.npc_zone.includes('La Noscea')) {
                laNosceaHuntingStarters.push(qs);
            }
            return blackShroudHuntingStarters;
        })

        classQuestStarters.map(qs => {
            if (qs.npc_zone.includes('The Black Shroud')) {
                blackShroudClassStarters.push(qs);
            } else if (qs.npc_zone.includes('Thanalan')) {
                thanalanClassStarters.push(qs);
            } else if (qs.npc_zone.includes('La Noscea')) {
                laNosceaClassStarters.push(qs);
            }
            return blackShroudClassStarters;
        })


        let laNoscea = [
            [-28.5, 4.75], [-28.6, 12], [-24.7, 14.2], [-22.5, 13.7], [-19.75, 12.25], [-19.75, 10.5], [-22, 6],
            [-24, 6], [-26.5, 4.75]
        ];
        let thanalan = [
            [-29, 15.5], [-37.5, 20], [-37.5, 22.5], [-34, 25.5], [-26, 25.5], [-26, 15.5]
        ];
        let theBlackShroud = [
            [-25, 26], [-21, 22], [-16, 22], [-14, 27], [-14, 30], [-16, 32], [-20, 32], [-24, 31]
        ];
        let polyOptions = { color: 'tan' }

        let laNosceaIcon = new L.Icon({
            iconUrl: `./maps/LaNosceaHighlighted.png`,
            iconRetinaUrl: `./maps/LaNosceaHighlighted.png`,
            popupAnchor: [0, 0],
            iconSize: [775.775, 773.45],
        });

        let thanalanIcon = new L.Icon({
            iconUrl: `./maps/ThanalanHighlighted.png`,
            iconRetinaUrl: `./maps/ThanalanHighlighted.png`,
            popupAnchor: [0, 0],
            iconSize: [775.775, 773.45],
        });

        let theBlackShroudIcon = new L.Icon({
            iconUrl: `./maps/TheBlackShroudHighlighted.png`,
            iconRetinaUrl: `./maps/TheBlackShroudHighlighted.png`,
            popupAnchor: [0, 0],
            iconSize: [775.775, 773.45],
        });

        let laNosceaNameIcon = new L.Icon({
            iconUrl: `./icons/region_names/LaNosceaRegionName.png`,
            iconRetinaUrl: `./icons/region_names/LaNosceaRegionName.png`,
            popupAnchor: [0, 0],
            iconSize: [143, 38.5],
        });

        let thanalanNameIcon = new L.Icon({
            iconUrl: `./icons/region_names/ThanalanRegionName.png`,
            iconRetinaUrl: `./icons/region_names/ThanalanRegionName.png`,
            popupAnchor: [0, 0],
            iconSize: [143, 38.5],
        });

        let theBlackShroudNameIcon = new L.Icon({
            iconUrl: `./icons/region_names/TheBlackShroudRegionName.png`,
            iconRetinaUrl: `./icons/region_names/TheBlackShroudRegionName.png`,
            popupAnchor: [0, 0],
            iconSize: [143, 38.5],
        });

        let popupMarker = new L.Icon({
            iconUrl: `./icons/zone_names/PopupContainer.png`,
            iconRetinaUrl: `./icons/zone_names/PopupContainer.png`,
            popupAnchor: [0, 0],
            iconSize: [182, 112],
        });

        let mainQuestCountIcon = null;
        let sideQuestCountIcon = null;
        let huntingQuestCountIcon = null;
        let classQuestCountIcon = null;
        let mainQuestCountIconPos = [-34.7, 39.1];
        let sideQuestCountIconPos = [-40.15, 39.1];
        let huntingQuestCountIconPos = [-37.4, 39.1];
        let classQuestCountIconPos = [-31.9, 39.1];
        let questCountIconSize = [33.5, 33.5];
    

        let regionNamePos = [-28.6, 36.3];
        let highlightPos = [-21.5, 21.4];
        let laNosceaPopupPos = [-18, 10];
        let thanalanPopupPos = [-24, 21];
        let theBlackShroudPopupPos = [-12, 28];
        let laNosceaNamePopupPos = [-17.75, 10];
        let thanalanNamePopupPos = [-23.75, 21];
        let theBlackShroudNamePopupPos = [-11.75, 28];

        return (
            <Container>
                <MapContainer maxBounds={this.props.bounds} center={this.props.center} zoom={this.props.zoom}
                crs={L.CRS.Simple} maxBoundsViscosity='1' scrollWheelZoom={false} maxZoom={this.props.zoom}
                minZoom={this.props.zoom} style={{height: '800px', width: '900px'}} >
                    <Polygon positions={laNoscea} pathOptions={polyOptions} opacity={.1} eventHandlers={{
                        mouseover: () => {
                            this.removeZoneMarkers();
                            mainQuestCountIcon = `./icons/quest_numbers/${laNosceaMainStarters.length}.png`;
                            sideQuestCountIcon = `./icons/quest_numbers/${laNosceaSideStarters.length}.png`;
                            huntingQuestCountIcon = `./icons/quest_numbers/${laNosceaHuntingStarters.length}.png`;
                            classQuestCountIcon = `./icons/quest_numbers/${laNosceaClassStarters.length}.png`;
                            mainQuestCountIcon = this.makeMarkerIcon(mainQuestCountIcon, questCountIconSize);
                            sideQuestCountIcon = this.makeMarkerIcon(sideQuestCountIcon, questCountIconSize);
                            huntingQuestCountIcon = this.makeMarkerIcon(huntingQuestCountIcon, questCountIconSize);
                            classQuestCountIcon = this.makeMarkerIcon(classQuestCountIcon, questCountIconSize);
                            this.addHighlightedMarker(highlightPos, laNosceaIcon);
                            this.addZoneMarker(laNosceaNamePopupPos, laNosceaNameIcon);
                            this.addZoneMarker(regionNamePos, laNosceaNameIcon);
                            this.addZoneMarker(mainQuestCountIconPos, mainQuestCountIcon);
                            this.addZoneMarker(sideQuestCountIconPos, sideQuestCountIcon);
                            this.addZoneMarker(huntingQuestCountIconPos, huntingQuestCountIcon);
                            this.addZoneMarker(classQuestCountIconPos, classQuestCountIcon);
                            this.addPopupMarker(laNosceaPopupPos, popupMarker);
                        },
                        mouseout: () => {
                            this.removeHighlightedMarker();
                            this.removePopupMarker();
                            this.resetZoneMarkers();
                        }, 
                        click: () => {
                            this.setState({ navigate: true });
                            this.setState({ navigateLink: `/lanoscea` });
                        }
                    }} />
                    <Polygon positions={thanalan} pathOptions={polyOptions} opacity={.1} eventHandlers={{
                        mouseover: () => {
                            this.removeZoneMarkers();
                            mainQuestCountIcon = `./icons/quest_numbers/${thanalanMainStarters.length}.png`;
                            sideQuestCountIcon = `./icons/quest_numbers/${thanalanSideStarters.length}.png`;
                            huntingQuestCountIcon = `./icons/quest_numbers/${thanalanHuntingStarters.length}.png`;
                            classQuestCountIcon = `./icons/quest_numbers/${thanalanClassStarters.length}.png`;
                            mainQuestCountIcon = this.makeMarkerIcon(mainQuestCountIcon, questCountIconSize);
                            sideQuestCountIcon = this.makeMarkerIcon(sideQuestCountIcon, questCountIconSize);
                            huntingQuestCountIcon = this.makeMarkerIcon(huntingQuestCountIcon, questCountIconSize);
                            classQuestCountIcon = this.makeMarkerIcon(classQuestCountIcon, questCountIconSize);
                            this.addHighlightedMarker(highlightPos, thanalanIcon);
                            this.addZoneMarker(thanalanNamePopupPos, thanalanNameIcon);
                            this.addZoneMarker(regionNamePos, thanalanNameIcon);
                            this.addZoneMarker(mainQuestCountIconPos, mainQuestCountIcon);
                            this.addZoneMarker(sideQuestCountIconPos, sideQuestCountIcon);
                            this.addZoneMarker(huntingQuestCountIconPos, huntingQuestCountIcon);
                            this.addZoneMarker(classQuestCountIconPos, classQuestCountIcon);
                            this.addPopupMarker(thanalanPopupPos, popupMarker);
                        },
                        mouseout: () => {
                            this.removeHighlightedMarker();
                            this.removePopupMarker();
                            this.resetZoneMarkers();
                        }, 
                        click: () => {
                            this.setState({ navigate: true });
                            this.setState({ navigateLink: `/thanalan` });
                        }
                    }}/>
                    <Polygon positions={theBlackShroud} pathOptions={polyOptions} opacity={.1} eventHandlers={{
                        mouseover: () => {
                            this.removeZoneMarkers();
                            mainQuestCountIcon = `./icons/quest_numbers/${blackShroudMainStarters.length}.png`;
                            sideQuestCountIcon = `./icons/quest_numbers/${blackShroudSideStarters.length}.png`;
                            huntingQuestCountIcon = `./icons/quest_numbers/${blackShroudHuntingStarters.length}.png`;
                            classQuestCountIcon = `./icons/quest_numbers/${blackShroudClassStarters.length}.png`;
                            mainQuestCountIcon = this.makeMarkerIcon(mainQuestCountIcon, questCountIconSize);
                            sideQuestCountIcon = this.makeMarkerIcon(sideQuestCountIcon, questCountIconSize);
                            huntingQuestCountIcon = this.makeMarkerIcon(huntingQuestCountIcon, questCountIconSize);
                            classQuestCountIcon = this.makeMarkerIcon(classQuestCountIcon, questCountIconSize);
                            this.addHighlightedMarker(highlightPos, theBlackShroudIcon);
                            this.addZoneMarker(theBlackShroudNamePopupPos, theBlackShroudNameIcon);
                            this.addZoneMarker(regionNamePos, theBlackShroudNameIcon);
                            this.addZoneMarker(mainQuestCountIconPos, mainQuestCountIcon);
                            this.addZoneMarker(sideQuestCountIconPos, sideQuestCountIcon);
                            this.addZoneMarker(huntingQuestCountIconPos, huntingQuestCountIcon);
                            this.addZoneMarker(classQuestCountIconPos, classQuestCountIcon);
                            this.addPopupMarker(theBlackShroudPopupPos, popupMarker);
                        },
                        mouseout: () => {
                            this.removeHighlightedMarker();
                            this.removePopupMarker();
                            this.resetZoneMarkers();
                        }, 
                        click: () => {
                            this.setState({ navigate: true });
                            this.setState({ navigateLink: `/theblackshroud` });
                        }
                    }}/>
                    <ImageOverlay url={`./maps/${this.props.mapName}.png`} bounds={this.props.bounds} opacity={1} />
                    {this.state.keyMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={250}/>
                    })}
                    {this.state.zoneMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={1000}/>
                    })}
                    {this.state.highlightedMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={0} 
                        opacity={1} interactive={false} />
                    })}
                    {this.state.popupMarkers.map(mar => {
                        return <Marker key={Math.random()} icon={mar.icon} position={mar.position} zIndexOffset={750} />
                    })}
                    {this.state.navigate && <Navigate to={this.state.navigateLink} replace={true} />}
                </MapContainer>
            </Container>
        )
    }
}

const mapStateToProps = (storeData) => ({
    classes: storeData.storeData.classes,
    quest_levels: storeData.storeData.quest_levels,
    quest_types: storeData.storeData.quest_types
})

export default connect(mapStateToProps)(WorldMapCont);