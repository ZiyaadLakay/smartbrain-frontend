import React from 'react';

const Navigation = ({onRouteChange,isSignedIn,onChoose}) => {
   
        if(isSignedIn){
            return(
                <div>
                    <nav style={{display:'flex', justifyContent:'flex-end'}}>
                        <p onClick={() => {onRouteChange('home');onChoose('')}} className="f3 link dim black underline pa4 pointer">Back</p>
                        <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa4 pointer">Sign Out</p>
                    </nav>
                </div> 
            )
           
        }else {
            return(
                <div>
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa4 pointer">Sign In</p>
                    <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa4 pointer">Register</p>
                </nav>
            </div> 
            )
            
        }
        
        
  
}

export default Navigation;