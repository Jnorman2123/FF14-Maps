import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapCont from './containers/MapCont';
import Home from './containers/Home';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map_names: [
        'World', 'Limsa Lominsa Upper Decks', 'Limsa Lominsa Lower Decks', 'Mist', "Wolve's Den Pier", 'Middle La Noscea', 
        'Lower La Noscea', 'Eastern La Noscea', 'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea', 
        'New Gridania', 'Old Gridania', 'The Lavender Beds', 'Central Shroud', 'East Shroud', 'South Shroud', 
        'North Shroud', "Ul'dah - Steps of Nald", "Ul'dah - Steps of Thal", 'Hustings Strip', 'The Goblet', 
        'The Gold Saucer', 'Western Thanalan', 'Eastern Thanalan', 'Central Thanalan', 'Southern Thanalan', 
        'Northern Thanalan', 'Foundation', 'The Pillars', 'Empyreum', 'Coerthas Central Highlands', 
        'Coerthas Western Highlands', 'Mor Dhona', "The Sea of Clouds", "Azys Lla", 'Idyllshire', 'The Dravanian Forelands', 
        'The Dravanian Hinterlands', 'The Churning Mists', "Rhalgr's Reach", 'The Fringes', 'The Peaks', 'The Lochs', 
        'Kugane', 'Shirogane', 'The Ruby Sea', 'Yanxia', 'The Azim Steppe', 'Crystarium', 'Lakeland', 'Eulmore', 'Kholusia', 
        'Amh Araeng', 'Il Mheg', "The Rak'tika Greatwood", 'The Tempest', 'Old Sharlayan', 'Labyrinthos', 'Garlemald', 
        'Radz-at-Han', 'Thavnair', 'Mare Lamentorum', 'Ultima Thule', 'Elpis'
      ]
    }
  }

  setClassActive = (event) => {
    let class_name = event.target.name;
    Object.entries(this.state.class).map(class_type => {
      return class_type[1].map(job => {
        if (job.name === class_name) {
          job.active = !job.active;
          this.setState({[job.active]: job.active})
        }
        return job.active
      })
    })
  }

  setTypeActive = (event) => {
    let type_name = event.target.name;
    this.state.type.map(type => {
      if (type.name === type_name) {
        type.active = !type.active;
        this.setState({[type.active]: type.active});
      }
      return type.active
    })
  }

  setLvlActive = (event) => {
    let lvl_name = event.target.name;
    this.state.level.map(lvl => {
      if (lvl.lvl === Number.parseInt(lvl_name)) {
        lvl.active = !lvl.active;
        this.setState({[lvl.active]: lvl.active});
      }
      return lvl.active
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            {this.state.map_names.map(n => {
              return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} element={<MapCont mapName={n} />} />
            })}
          </Route> 
        </Routes>
      </BrowserRouter>
    );
  } 
}

export default App;


