import React from 'react';
import './ChooseForm.css'
const ChooseForm = ({onRouteChange,onChoose}) => {
    return(
        <div>
            <h1>Choose Which API to Use</h1><br></br>
            <button onClick={() => {onRouteChange('home');onChoose('Face')}} className='w-30 grow f4 link ph3 pv2 dib bg-light-green'>Face</button>
            <br></br>
            <button onClick={() => {onRouteChange('home');onChoose('Celeb')}} className='w-30 grow f4 link ph3 pv2 dib bg-light-green'>Celeb</button>
        </div>
    );
}

export default ChooseForm;