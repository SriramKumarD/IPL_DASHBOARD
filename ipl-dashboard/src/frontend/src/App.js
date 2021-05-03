import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { TeamPage } from './Pages/TeamPage';
import { MatchPage } from './Pages/MatchPage';

/* function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/teams/:teamName">
            <TeamPage />
        </Route>
      </Router>
      
    </div>
  );
}

export default App; */

export const App = () => {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/teams/:teamName/matches/:year">
                <MatchPage />
            </Route>
            <Route path="/teams/:teamName">
                <TeamPage />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}
