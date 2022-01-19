import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to='quests'>Quests</Link>
        <p>--</p>
        <Link to='npcs'>Npcs</Link>
      </nav>
    </div>
  );
}

export default App;
