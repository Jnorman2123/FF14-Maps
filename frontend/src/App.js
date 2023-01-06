import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ZoneMapCont from './containers/ZoneMapCont';
import RegionMapCont from './containers/RegionMapCont';
import WorldMapCont from './containers/WorldMapCont';
import Home from './containers/Home';
import Info from './containers/Info';
import { LatLngBounds } from 'leaflet';
import L from 'leaflet';
import { connect } from 'react-redux';
import { fetchNpcs } from './store/actions/npcs/npcActions';
import { fetchQuests } from './store/actions/quests/questActions';
import { fetchItems } from './store/actions/items/itemActions';
import { fetchSteps } from './store/actions/steps/stepActions';
import { fetchRewards } from './store/actions/rewards/rewardActions';
import { fetchJobs } from './store/actions/jobs/jobActions';
import { updateClass, updateQuestLevel, updateQuestType } from './store/actions/filters/filterActionCreators';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quest_id: null,
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
      toggled_quests: [],
      active_quests: [],
    }
  }

  componentDidMount() {
    this.props.fetchNpcs();
    this.props.fetchQuests();
    this.props.fetchItems();
    this.props.fetchSteps();
    this.props.fetchRewards();
    this.props.fetchJobs();
  }

  revertLat = (x,y) => {
    return [-y, x];
  } 

  setQuestId = (e) => {
    this.setState({
      quest_id: Object.entries(e.target)[1][1].quest_id
    })
  }

  setActiveQuests = () => {
    let bg_colors = this.props.bg_colors;
    let quests = this.props.quests.quests;
    let active_classes = this.props.classes.filter(c => c.active === true).map(c => c.name);
    let active_quest_types = this.props.quest_types.filter(qt => qt.active === true).map(qt => qt.name);
    let active_quest_levels = this.props.quest_levels.filter(ql => ql.active === true).map(ql => {
      let lvl_ranges = ql.name.split('-');
        return [parseInt(lvl_ranges[0]), parseInt(lvl_ranges[1])]
    });
    let active_jobs = this.props.jobs.jobs.filter(j => active_classes.includes(j.job_name)).map(j => j.id);
    let active_quests = [];
    let i = 0;

    if (quests !== []) {
      quests.map(q => {
        if (active_quest_types.includes(q.quest_type)) {
            q.quest_class.map(qc => {
                if (active_jobs.includes(qc) || qc === 30) {
                    active_quest_levels.map(ql => {
                        if (q.quest_level >= ql[0] && q.quest_level <= ql[1]
                        && !active_quests.includes(q)) {
                            q.bg_color = bg_colors[i];
                            active_quests.push(q);
                            i ++;
                            if (i >= bg_colors.length) {
                              i = 0;
                            }
                        }
                        return ql;
                    })
                }
                return qc;
            })
        }
        return q;
      });
    }
    this.setState({active_quests: active_quests});
  }
  
  setClassActive = (event) => {
    let class_name = event.target.name;
    let col = this.props.classes;
    col.map(c => {
        if (c.name === class_name) {
          c.active = !c.active;
          this.props.updateClass(c);
        }
        return c.active
    })
    this.setActiveQuests();
  }

  setTypeActive = (event) => {
    let type_name = event.target.name;
    let col = this.props.quest_types;
    col.map(c => {
        if (c.name === type_name) {
          c.active = !c.active;
          this.props.updateQuestType(c);
        }
        return c.active
    })
    this.setActiveQuests();
  }

  setLevelActive = (event) => {
    let level_name = event.target.name;
    let col = this.props.quest_levels;
    col.map(c => {
        if (c.name === level_name) {
          c.active = !c.active;
          this.props.updateQuestLevel(c);
        }
        return c.active
    })
    this.setActiveQuests();
  }

  toggleQuest = (quest, quest_col) => {
    if (!this.state.toggled_quests.includes(quest) && quest_col.includes(quest)) {
        this.setState({
            toggled_quests: [...this.state.toggled_quests, quest],
        })
    } else {
        this.setState({
            toggled_quests: this.state.toggled_quests.filter(q => q !== quest),
        })
    }
  }

  deleteQuest = (quest, quest_col) => {
    this.setState({active_quests: quest_col.filter(q => q !== quest)})
  }

  render() {

    let setQuestType = (quests, type) => {
      return quests.filter(q => q.quest_type === type)
    }

    let setQuestStarters = (type) => {
        let quests = setQuestType(this.state.active_quests, type).map(aq => {
            let starter_npc = npcs.filter(npc => npc.id === aq.quest_npcs[0]);
            return starter_npc[0];
        });
        return quests;
    }

    let setStartersLength = (starters, area) => {
        return starters.filter(q => q.npc_zone.includes(area)).length
    }

    let createIcon = (url, size) => {
        let icon = new L.Icon({ iconUrl: url, iconSize: [size[0], size[1]]});
        return icon;
    } 

    let npcs = this.props.npcs.npcs;
    let quest_starters = {
      class_starters: setQuestStarters('Class'),
      main_starters: setQuestStarters('Main Story'),
      hunting_starters: setQuestStarters('Hunting Log'),
      side_starters: setQuestStarters('Side')
    };
    
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home setClassActive={this.setClassActive} setLevelActive={this.setLevelActive} 
          setTypeActive={this.setTypeActive} toggled_quests={this.state.toggled_quests} active_quests={this.state.active_quests} 
          toggleQuest={this.toggleQuest} deleteQuest={this.deleteQuest} setActiveQuests={this.setActiveQuests} />} >
            <Route index element={<Info />}/>
            <Route path='/world' element={<WorldMapCont mapName='World' 
            bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))}zoom={4.25} minZoom={4} maxZoom={4} 
            center={this.revertLat(20.95, 20.95)} revertLat={this.revertLat} active_quests={this.state.active_quests} 
            setStartersLength={setStartersLength} createIcon={createIcon} setQuestType={setQuestType} 
            quest_starters={quest_starters} />} />
            {this.props.region_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`}
              element={<RegionMapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))} 
              zoom={4.25} minZoom={4.25} maxZoom={7} center={this.revertLat(20.95, 20.95)} mapUrl={n.split(" ").join("")} 
              revertLat={this.revertLat} active_quests={this.state.active_quests} setStartersLength={setStartersLength} 
              createIcon={createIcon} setQuestType={setQuestType} quest_starters={quest_starters} />} />
            })}
            {this.props.inside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<ZoneMapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(21.4, 21.4))} 
              zoom={5.3} minZoom={5.3} maxZoom={7} center={this.revertLat(10.7, 10.7)} mapUrl={n.split(" ").join("")} 
              revertLat={this.revertLat} setQuestId={this.setQuestId} active_quests={this.state.active_quests} 
              toggled_quests={this.state.toggled_quests} toggleQuest={this.toggleQuest} inside={true} />} />
            })}
            {this.props.outside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<ZoneMapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))} 
              zoom={4.25} minZoom={4.25} maxZoom={7} center={this.revertLat(20.95, 20.95)} mapUrl={n.split(" ").join("")}
              revertLat={this.revertLat} setQuestId={this.setQuestId} active_quests={this.state.active_quests} 
              toggled_quests={this.state.toggled_quests} toggleQuest={this.toggleQuest} inside={false} />} />
            })}
            </Route>
          <Route path='*' element={<div><p>There is nothing here.</p></div>} />
        </Routes>
      </BrowserRouter>
    );
  } 
}

const mapStateToProps = (storeData) => {
  return {
      inside_zone_names: storeData.storeData.inside_zone_names,
      outside_zone_names: storeData.storeData.outside_zone_names,
      region_names: storeData.storeData.region_names,
      requesting: storeData.requesting,
      classes: storeData.storeData.classes,
      quest_levels: storeData.storeData.quest_levels,
      quest_types: storeData.storeData.quest_types,
      quests: storeData.quests,
      jobs: storeData.jobs,
      npcs: storeData.npcs,
      bg_colors: storeData.storeData.quest_icon_bg_colors,
  }
}

export default connect(mapStateToProps, { fetchNpcs, fetchQuests, fetchItems, fetchSteps, fetchRewards, fetchJobs,
  updateClass, updateQuestLevel, updateQuestType})(App);


