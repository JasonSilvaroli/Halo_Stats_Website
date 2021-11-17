import './App.css';
import Calculator from './calculator';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PlayerPage from './playerPage';
import NavBar from './topNavBar';
import HaloDataGrid from './dataGrid';
import PlayerPageInfinite from './playerPageInfinite';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
      <div>
          <NavBar></NavBar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route name="about" path="/about">
            <Calculator />
          </Route>
          <Route name="user" path="/mcc/user/">
            <PlayerPage />
          </Route>
          <Route name="userHI" path="/hi/user/">
            <PlayerPageInfinite />
          </Route>
          <Route name="home" path="/">
            <HaloDataGrid />
          </Route>
          
        </Switch>
      </div>
    </Router>
      </header>
    </div>
  );
}

export default App;
