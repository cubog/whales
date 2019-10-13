import React from 'react';
import { AuthConsumer } from '../contexts/userAuth';

const style = {
  color: ' #3f51b5',
  marginBottom: 100,
};

export default function UserHome() {
  return (
    <React.Fragment>
      <AuthConsumer>
        {({ logout }) => (
          <div className='center main-container'>
            <div className='center form-container'>
              <div className='column form'>
                <h1 style={style}>Welcome</h1>
                <button className='button' onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </AuthConsumer>
    </React.Fragment>
  );
}
