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
          <Route name="user" path="/user/">
            <PlayerPage />
          </Route>
          <Route name="home" path="/">
            <HaloDataGrid></HaloDataGrid>
          </Route>
        </Switch>
      </div>
    </Router>
      </header>
    </div>
  );
}

export default App;
