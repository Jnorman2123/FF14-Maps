import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapCont from './containers/MapCont';

const store = configureStore();
const map_names = [
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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          {map_names.map(n => {
            return <Route key={n} path={`${n.split(" ").join('').toLowerCase()}`} element={<MapCont mapName={n} />} />
          })}
        </Route> 
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
