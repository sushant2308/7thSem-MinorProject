import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import Readings from './components/Readings';
function App() {
  return (
    <div className="App">
        <main> 
        <Router>
            <Switch>
                  <Route path='/' component={()=><Home/>} exact/>
                  <Route path='/readings/:id' component={Readings} exact/>
            </Switch>
        </Router>
        </main>
    </div>
  );
}

export default App;
