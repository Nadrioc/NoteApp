import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Notes from './components/Notes/Notes';
import NewNote from './components/Forms/NewNote';
import EditNote from './components/Forms/EditNote';
import Login from './components/Login/Login';
import * as auth from './services/auth';
//hello
// hi there
// howdy
class App extends Component {

  state = {
    isAuthenticated: false,
    ready: false,
    loginIncorrect: null
  }

  componentDidMount = async () => {
    auth.setup((isAuthenticated) => {
      this.setState({
        isAuthenticated,
      })
    });
    await auth.verifyExistingAuthToken();
    this.setState({
      ready: true,
    })
    // await auth.doAuth("jerome", "gattaca")
    // await auth.doAuth("jerome", "gattaca")
  }

  login = async (username, password) => {
    await auth.doAuth(username, password)
    if(!auth.isAuthenticated()){
      this.setState({
        loginIncorrect: "Invalid login"
      })  
    } else {
      this.setState({
        loginIncorrect:null
      })  
    }
  }

  render(){

    if (!this.state.ready) { return null; }

    if(!this.state.isAuthenticated) {
      return(
        <BrowserRouter>
          <Redirect to='/login'/>
          <Route path="/login" exact render={() => <Login incorrectLogin={this.state.loginIncorrect} startAuth={this.login}/>} />
        </BrowserRouter>
      )
    }

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/notes/:noteId" component={EditNote}/>
            <Route path="/new-note" component={NewNote}/>
            <Route path="/" component={Notes}/>
            <Route path="/"><Redirect to="/" /></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
