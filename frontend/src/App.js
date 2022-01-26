import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapCont from './containers/MapCont';
import Home from './containers/Home';
import { LatLngBounds } from 'leaflet';

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
      ]
    }
  }

  revertLat = (x,y) => {
    return [-y, x];
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
              revertLat={this.revertLat}/>} />
            })}
            {this.state.outside_zone_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} 
              element={<MapCont mapName={n} bounds={new LatLngBounds(this.revertLat(1,1), this.revertLat(41.9, 41.9))} zoom={4}
              minZoom={4} maxZoom={6} center={this.revertLat(20.95, 20.95)} mapUrl={n.split(" ").join("")}
              revertLat={this.revertLat} />} />
            })}
          </Route> 
        </Routes>
      </BrowserRouter>
    );
  } 
}

export default App;


