import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function ErrorAlert({ show, clearError, message }) {
  const [showMessage, setShowMessage] = useState(show);
  return (
    <CSSTransition
      in={showMessage}
      timeout={1000}
      classNames='alert'
      unmountOnExit
      onExited={clearError}
    >
      <div className='alert-box'>
        <div
          className='close-btn'
          onClick={() => {
            setShowMessage(false);
          }}
        >
          &times;
        </div>
        {message}
      </div>
    </CSSTransition>
  );
}
