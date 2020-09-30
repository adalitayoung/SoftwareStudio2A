import React from 'react';
import background from './updatedbackground.jpg';
import { Link } from 'react-router-dom';
import '../style/style.css';

console.log(background);

function Home() {
  return (
    <div className='home'>
      <img class='img-fluid' alt='Responsive image' src={background} />
      <div class='text-block'>
        <div className='box title-container'>
          <h1 class='font-weight-light'></h1>
          <div className='fontgradon'>GRADONLINE</div>
          <div className='fontauto'>Automatic Student Group Allocation</div>
        </div>
        <div className='box button-container'>
          <Link to='Signin'>
            <button type='button' className='btn btn-primary'>
              Sign in
            </button>
          </Link>
          <Link to='Register'>
            <button type='button' className='btn btn-primary'>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
