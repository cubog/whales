import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/userAuth';
import Login from './components/Login';
import UserHome from './components/UserHome';
import Auth from './components/Auth';
import Register from './components/Register';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends React.Component {
  state = {
    logout: () => {
      localStorage.clear('isAuthenticated');
      this.setState({
        authenticated: false,
      });
    },
  };
  render() {
    return (
      <Router>
        <AuthProvider value={this.state}>
          <Route
            render={({ location }) => {
              return (
                <TransitionGroup component={null}>
                  <CSSTransition
                    in={true}
                    timeout={500}
                    classNames='background'
                    key={location.key}
                  >
                    <Switch location={location}>
                      <Route exact path='/' component={Login} />
                      <Route path='/register' component={Register} />
                      <Auth>
                        <Route path='/userhome' component={UserHome} />
                      </Auth>
                      <Route render={() => <h1>404</h1>} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          />
        </AuthProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
