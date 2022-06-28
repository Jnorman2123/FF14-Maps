import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapCont from './containers/MapCont';
import RegionMapCont from './containers/RegionMapCont';
import WorldMapCont from './containers/WorldMapCont';
import Home from './containers/Home';
import { LatLngBounds } from 'leaflet';
import { connect } from 'react-redux';
import { fetchNpcs } from './store/actions/npcs/npcActions';
import { fetchQuests } from './store/actions/quests/questActions';
import { fetchItems } from './store/actions/items/itemActions';
import { fetchSteps } from './store/actions/steps/stepActions';
import { fetchRewards } from './store/actions/rewards/rewardActions';
import { fetchJobs } from './store/actions/jobs/jobActions';

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

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home q_id={this.state.quest_id} />} >
            <Route path='/world' element={<WorldMapCont mapName='World' 
            bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))}zoom={4.25} minZoom={4} maxZoom={4} 
            center={this.revertLat(20.95, 20.95)} revertLat={this.revertLat} />} />
            {this.props.region_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`}
              element={<RegionMapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))} 
              zoom={4.25} minZoom={4} maxZoom={7} center={this.revertLat(20.95, 20.95)} mapUrl={n.split(" ").join("")} 
              revertLat={this.revertLat} />} />
            })}
            {this.props.inside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<MapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(21.4, 21.4))} zoom={5}
              minZoom={5} maxZoom={7} center={this.revertLat(10.7, 10.7)} mapUrl={n.split(" ").join("")} 
              revertLat={this.revertLat} setQuestId={this.setQuestId} />} />
            })}
            {this.props.outside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<MapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))} zoom={4}
              minZoom={4} maxZoom={7} center={this.revertLat(20.95, 20.95)} mapUrl={n.split(" ").join("")}
              revertLat={this.revertLat} setQuestId={this.setQuestId} />} />
            })}
          </Route>
          <Route path='*' element={<div><p>There is nothing here.</p></div>} />
        </Routes>
      </BrowserRouter>
    );
  } 
}

const mapStateToProps = (state) => {
  return {
      inside_zone_names: state.storeData.inside_zone_names,
      outside_zone_names: state.storeData.outside_zone_names,
      region_names: state.storeData.region_names,
      requesting: state.requesting,
  }
}

export default connect(mapStateToProps, { fetchNpcs, fetchQuests, fetchItems, fetchSteps, fetchRewards, fetchJobs })(App);


