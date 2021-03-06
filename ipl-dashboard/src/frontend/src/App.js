import './App.css';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import { TeamPage } from './Pages/TeamPage';
import { MatchPage } from './Pages/MatchPage';
import { HomePage } from './Pages/HomePage';

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
            <Route path="/">
                <HomePage />
            </Route>
          
          </Switch>
        </Router>
    </div>
  );
}
