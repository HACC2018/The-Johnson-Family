/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import AddListBag from '../pages/AddListBag';
import EditBag from '../pages/EditBag';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Dashboard from '../pages/Dashboard';
import AdminPage from '../pages/AdminPage';
import PendingAudits from '../pages/PendingAudits';
import SubmitData from '../pages/SubmitData';
import EditLocations from '../pages/EditLocations';
import giantestpage from '../pages/giantestpage';
import samtestpage from '../pages/samtestpage';
import glentestpage from '../pages/glentestpage';
import View from '../pages/View';
import AddCategories from '../pages/AddCategories';
import AddViewLocations from '../pages/AddViewLocations';
import VerifyForms from '../pages/VerifyForms';
import ViewStudies from '../pages/ViewStudies';
import AddBuildings from '../pages/AddBuildings';
import ViewMembers from '../pages/ViewMembers';
import ViewBags from '../pages/ViewBags';

// import AddLocations from '../pages/AddLocations';
// import ListLocations from '../pages/ListLocations';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/giantestpage" component={giantestpage}/>
              <Route path="/samtestpage" component={samtestpage}/>
              <Route path="/glentestpage" component={glentestpage}/>
              <ProtectedRoute path="/pending" component={PendingAudits}/>
              <ProtectedRoute path="/submitdata" component={SubmitData}/>
              <ProtectedRoute path="/editlocations" component={EditLocations}/>
              <ProtectedRoute path="/admin" component={AdminPage}/>
              <ProtectedRoute path="/view" component={View}/>
              <ProtectedRoute path="/addcategories" component={AddCategories}/>
              <ProtectedRoute path="/addviewlocations" component={AddViewLocations}/>
              <ProtectedRoute path="/verifyforms" component={VerifyForms}/>
              <ProtectedRoute path="/viewstudies" component={ViewStudies}/>
              <ProtectedRoute path="/addbuildings" component={AddBuildings}/>
              <ProtectedRoute path="/viewmembers" component={ViewMembers}/>
              <ProtectedRoute path="/viewbags" component={ViewBags}/>
              <ProtectedRoute path="/addlist" component={AddListBag}/>
              <ProtectedRoute path="/dash" component={Dashboard}/>
              <ProtectedRoute path="/Home" component={Landing}/>
              <ProtectedRoute path="/edit/:_id" component={EditBag}/>
              {/* <ProtectedRoute path="/edit/:_id" component={EditStuff}/> */}
              {/* <AdminProtectedRoute path="/listlocations" component={ListLocations}/> */}
              {/* <AdminProtectedRoute path="/addlocations" component={AddLocations}/> */}
              {/* <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/> */}
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          return isLogged ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
