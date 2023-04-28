import './App.css';
import AssignRoles from './AssignRoles';
import Home from './Home';
import AddFer from './AddFer';
import Supply from './Supply';
import Track from './Track';
import Certificate from './Certificate';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderFertilizer from './OrderFertilizer';
import SendSubsidy from './SendSubsidy'

function App() {
  return (
    <div className="App container-fluid" >
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/roles" component={AssignRoles} />
          <Route path="/addfer" component={AddFer} />
          <Route path="/supply" component={Supply} />
          <Route path="/track" component={Track} />
          <Route path="/certificate" component={Certificate} />
          <Route path="/orderFertilizer"  component={OrderFertilizer}/>
          <Route path="/sendSubsidy" component={SendSubsidy} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
