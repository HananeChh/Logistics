import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from "./components/HomePage"
import TransporteurSignup from "./components/TransporteurSignup"
import  ExpediteurSignup from "./components/ExpediteurSignup"
import Login from "./components/Login"
import TransporteurDashboard from "./components/TransporteurDashboard"
import TransporteurBestmatch from "./components/TransporteurBestmatch"
import Firstpage from "./components/Firstpage"
import Ajouterexp from "./components/Ajouterexp"
import ExpediteurDashboard from "./components/ExpediteurDashboard"
import AjouterVehicule from "./components/AjouterVehicule"

import {TPrivateRoute, EPrivateRoute} from "./private/PrivateRoute"

import './App.css';
import Navbar from './components/Navbar';
import Expediteurexps from './components/Expediteurexps';
import UpdateExpeditionForm from './components/updateExp';
import TransporteurMissions from './components/TransporteurMissions';
import TransporteurCalendrier from './components/TransporteurCalendrier';
import ProfileExpediteur from './components/ExpediteurProfile';
import Profile from './components/transporteurProfile';
import statistique from './components/TransporteurStat';
import UpdateVehicule from './components/UpdateVehicule';
import VerificationSuccess from './components/VerificationSuccess';
import VerificationFailed from './components/VerificationFailed';



function App() {
  return (
      <Router>
      <div className="App">
        {/* <Navbar/> */}
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/transporteur/signup" component={TransporteurSignup}/>
            <Route exact path="/expediteur/signup" component={ExpediteurSignup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/firstpage" component={Firstpage}/>
            <Route path="/verification-success" component={VerificationSuccess} />
            <Route path="/verification-failed" component={VerificationFailed} />
            <TPrivateRoute exact path="/transporteur/dashboard" component={TransporteurDashboard} />
            <TPrivateRoute exact path="/transporteur/TransporteurBestmatch" component={TransporteurBestmatch} />          
            <TPrivateRoute exact path="/transporteur/AjouterVehicule" component={AjouterVehicule} />
            <TPrivateRoute exact path="/transporteur/Missions" component={TransporteurMissions} />
            <TPrivateRoute exact path="/transporteur/Calendrier" component={TransporteurCalendrier} />
            <TPrivateRoute exact path="/transporteur/profile" component={Profile} />
            <TPrivateRoute exact path="/transporteur/statistique" component={statistique} />
            <TPrivateRoute exact path="/transporteur/UpdateVehicule/:vehiculeId" component={UpdateVehicule} />


            <EPrivateRoute exact path="/expediteur/profile" component={ProfileExpediteur} />
            <EPrivateRoute exact path="/expediteur/Expeditions" component={Expediteurexps} />
            <EPrivateRoute exact path="/expediteur/dashboard"  component={ExpediteurDashboard} />     
            <EPrivateRoute exact path="/expediteur/Ajouterexp"  component={Ajouterexp} />   
            <EPrivateRoute exact path="/expediteur/UpdateExpeditionForm/:expeditionId" component={UpdateExpeditionForm} />
  

        </Switch> 
      </div>
      </Router>
      
    
  );
}

export default App;
