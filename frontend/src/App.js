//import routes from './routes';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav>
        <Link to='quests'>Quests</Link>
      </nav>
    </div>
  );
}

export default App;
