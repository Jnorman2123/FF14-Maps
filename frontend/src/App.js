import { Link } from 'react-router-dom';
import WorldNav from './containers/WorldNav';

function App() {
  return (
    <div>
      <WorldNav />
      <p>---</p>
      <nav>
        <Link to='quests'>Quests</Link>
        <p>--</p>
        <Link to='npcs'>Npcs</Link>
      </nav>
    </div>
  );
}

export default App;
