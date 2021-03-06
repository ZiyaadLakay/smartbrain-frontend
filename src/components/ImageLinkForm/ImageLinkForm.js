import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
       <div>

           <p className='f5'>
                {'Paste The Link to any image you like.'}
           </p>
           <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib bg-light-green' onClick={onSubmit}>Detect</button>
                </div>
            </div>
       </div>
    );
}

export default ImageLinkForm;