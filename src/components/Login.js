import React from 'react';
import { login } from '../services/authService';
import Loading from './Loading';
import { Redirect, Link } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    authenticated: false,
  };
  handleChange = e => {
    const id = e.target.id;
    this.setState({
      [id]: e.target.value,
    });
  };

  handleSubmit = async e => {
    this.setState({ isLoading: true });
    e.preventDefault();
    try {
      await login(this.state.username, this.state.password);
      localStorage.setItem('isAuthenticated', true);
      this.setState({
        isLoading: true,
        authenticated: true,
      });
    } catch (e) {
      this.setState({
        isLoading: false,
        authenticated: e,
        wrongPassword: true,
      });
    }
  };
  render() {
    const { isLoading, authenticated, wrongPassword } = this.state;
    if (authenticated) {
      return <Redirect to='/userhome' />;
    }
    return (
      <div className='center main-container'>
        {isLoading && <Loading />}
        {wrongPassword && (
          <ErrorAlert
            show={true}
            clearError={() => {
              this.setState({ wrongPassword: false });
            }}
            message='Wrong password was entered'
          />
        )}
        <div className='center form-container'>
          <form className='column form' onSubmit={this.handleSubmit}>
            <div className='input-parent'>
              <input
                type='text'
                id='username'
                value={this.state.username}
                onChange={this.handleChange}
                placeholder='Username'
              />
            </div>
            <div className='input-parent'>
              <input
                type='password'
                id='password'
                value={this.state.password}
                onChange={this.handleChange}
                placeholder='Password'
              />
            </div>
            <button
              className='button'
              disabled={
                !(this.state.username.length && this.state.password.length)
              }
            >
              Login
            </button>
            <Link className='link' to='/register'>
              Create an account
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
