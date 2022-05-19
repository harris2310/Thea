import React from 'react';
import '../App.css';

const LandingPage = props => {
  return (
    <div className='spacing-button'>
      <button className='button' onClick={props.handleClicked}>Go!</button>
    </div>
  )
}

export default LandingPage;
