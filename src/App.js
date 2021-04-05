import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Home from './Notebook/home';
import Login from './Notebook/login';
import SignUp from './Notebook/signup';
import Notebook from './Notebook/notebook';
export default class App extends React.Component{
  render(){
    return(
      <div>
        <Switch grid={{xs:12}}>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login"  component={Login}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route 
        exact path="/notebook" 
        render={(props)=><Notebook {...props} />} 
        // component={Notebook}
        ></Route>
        <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}
