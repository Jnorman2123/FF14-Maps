import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapCont from './containers/MapCont';
import Home from './containers/Home';
import { LatLngBounds } from 'leaflet';
import { connect } from 'react-redux';
import { fetchNpcs } from './store/actions/npcs/npcActions';
import { fetchQuests } from './store/actions/quests/questActions';
import { fetchItems } from './store/actions/items/itemActions';
import { fetchSteps } from './store/actions/steps/stepActions';
import { fetchRewards } from './store/actions/rewards/rewardActions';
import QuestContainer from './containers/QuestContainer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inside_zone_names: [
        'Limsa Lominsa Upper Decks', 'Limsa Lominsa Lower Decks',  
        'New Gridania','Old Gridania', "Ul'dah - Steps of Nald", "Ul'dah - Steps of Thal", 'Hustings Strip',  
        'The Gold Saucer', 'Foundation', 'The Pillars', 'Idyllshire', "Rhalgr's Reach",  
        'Kugane', 'Crystarium', 'Old Sharlayan', 'Labyrinthos', 'Radz-at-Han',  
      ], 
      outside_zone_names: [
        'Middle La Noscea', 'Lower La Noscea', 'Eastern La Noscea', 'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea',
        'Central Shroud', 'East Shroud', 'South Shroud', 'North Shroud', 'Western Thanalan', 'Eastern Thanalan', 
        'Central Thanalan', 'Southern Thanalan', 'Northern Thanalan', 'Coerthas Central Highlands', 'Coerthas Western Highlands', 
        'Mor Dhona', "The Sea of Clouds", "Azys Lla", 'The Dravanian Forelands', 'The Dravanian Hinterlands', 'The Churning Mists',
        'The Fringes', 'The Peaks', 'The Lochs', 'The Ruby Sea', 'Yanxia', 'The Azim Steppe', 'Lakeland', 'Eulmore', 'Kholusia', 
        'Amh Araeng', 'Il Mheg', "The Rak'tika Greatwood", 'The Tempest', 'Garlemald', 'Thavnair', 'Mare Lamentorum', 'Ultima Thule', 
        'Elpis'
      ],
      region_names: [
        'La Noscea', 'The Black Shroud', 'Thanalan', 'Heavensward', 'Stormblood', 'Shadowbringers', 'Endwalker'
      ],
      quest_id: null
    }
  }

  componentDidMount() {
    this.props.fetchNpcs();
    this.props.fetchQuests();
    this.props.fetchItems();
    this.props.fetchSteps();
    this.props.fetchRewards();
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
          <Route path='/' element={<Home />}>
            {this.state.inside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<MapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(21.4, 21.4))} zoom={5}
              minZoom={5} maxZoom={7} center={this.revertLat(10.7, 10.7)} mapUrl={n.split(" ").join("")} 
              revertLat={this.revertLat} npcs={this.props.npcs} quests={this.props.quests} items={this.props.items}
              steps={this.props.steps} rewards={this.props.rewards} setQuestId={this.setQuestId} />} />
            })}
            {this.state.outside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<MapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))} zoom={4}
              minZoom={4} maxZoom={6} center={this.revertLat(20.95, 20.95)} mapUrl={n.split(" ").join("")}
              revertLat={this.revertLat} npcs={this.props.npcs} quests={this.props.quests} items={this.props.items} 
              steps={this.props.steps} rewards={this.props.rewards} setQuestId={this.setQuestId} />} />
            })}
          </Route> 
          <Route index element={<QuestContainer q_id={this.state.quest_id} />}/>
          <Route path='*' element={<div><p>There is nothing here.</p></div>} />
        </Routes>
      </BrowserRouter>
    );
  } 
}

function mapStateToProps(state) {
  return {
      npcs: state.npcs,
      quests: state.quests,
      items: state.items,
      steps: state.steps,
      rewards: state.rewards,
      requesting: state.requesting,
  }
}

export default connect(mapStateToProps, { fetchNpcs, fetchQuests, fetchItems, fetchSteps, fetchRewards })(App);


