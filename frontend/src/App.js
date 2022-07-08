import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapCont from './containers/MapCont';
import RegionMapCont from './containers/RegionMapCont';
import WorldMapCont from './containers/WorldMapCont';
import Home from './containers/Home';
import Info from './containers/Info';
import { LatLngBounds } from 'leaflet';
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
      quest_id: null
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
  }

  render() {
    let quests = this.props.quests.quests;
    let active_classes = this.props.classes.filter(c => c.active === true).map(c => c.name);
    let active_quest_types = this.props.quest_types.filter(qt => qt.active === true).map(qt => qt.name);
    let active_quest_levels = this.props.quest_levels.filter(ql => ql.active === true).map(ql => {
      let lvl_ranges = ql.name.split('-');
        return [parseInt(lvl_ranges[0]), parseInt(lvl_ranges[1])]
    });
    let active_jobs = this.props.jobs.jobs.filter(j => active_classes.includes(j.job_name)).map(j => j.id);
    let active_quests = [];
    
    if (quests !== []) {
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
    }
    
    
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home q_id={this.state.quest_id} setClassActive={this.setClassActive} 
          setLevelActive={this.setLevelActive} setTypeActive={this.setTypeActive} />} >
            <Route index element={<Info />}/>
            <Route path='/world' element={<WorldMapCont mapName='World' 
            bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))}zoom={4.25} minZoom={4} maxZoom={4} 
            center={this.revertLat(20.95, 20.95)} revertLat={this.revertLat} active_quests={active_quests} />} />
            {this.props.region_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`}
              element={<RegionMapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))} 
              zoom={4.25} minZoom={4} maxZoom={7} center={this.revertLat(20.95, 20.95)} mapUrl={n.split(" ").join("")} 
              revertLat={this.revertLat} active_quests={active_quests} />} />
            })}
            {this.props.inside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<MapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(21.4, 21.4))} zoom={5}
              minZoom={5} maxZoom={7} center={this.revertLat(10.7, 10.7)} mapUrl={n.split(" ").join("")} 
              revertLat={this.revertLat} setQuestId={this.setQuestId} active_quests={active_quests} />} />
            })}
            {this.props.outside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<MapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))} zoom={4}
              minZoom={4} maxZoom={7} center={this.revertLat(20.95, 20.95)} mapUrl={n.split(" ").join("")}
              revertLat={this.revertLat} setQuestId={this.setQuestId} active_quests={active_quests} />} />
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
  }
}

export default connect(mapStateToProps, { fetchNpcs, fetchQuests, fetchItems, fetchSteps, fetchRewards, fetchJobs,
  updateClass, updateQuestLevel, updateQuestType})(App);


