import './App.css';
import Calculator from './calculator';
import DisplayPlayer from './displayPlayer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PlayerPage from './playerPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <Calculator />
          </Route>
          <Route path="/user/">
            <PlayerPage />
          </Route>
          <Route path="/">
            <DisplayPlayer />
          </Route>
        </Switch>
      </div>
    </Router>
      </header>
    </div>
  );
}

export default App;
