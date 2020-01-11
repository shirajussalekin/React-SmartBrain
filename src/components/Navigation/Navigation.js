import React from 'react';


const Navigation = ({ onRouteChange, isSignedIn }) => {
    
        if(isSignedIn) {
            return(
                <div style={{display: 'flex', justifyContent: 'flex-end'}} className="pa3 lh-copy mt3">
                    <input
                      onClick= {() => onRouteChange('profile')}
                      className="b ph3 pv1 input-reset ba b--black bg-transparent grow pointer f6 dib right" 
                      type="submit" 
                      value="Profile"
                    />
                    <input
                      onClick= {() => onRouteChange('signout')}
                      className="b ph3 pv1 input-reset ba b--black bg-transparent grow pointer f6 dib right" 
                      type="submit" 
                      value="Sign-out"
                    />
                </div>
                );
        } else {
            return null;
        }
}

export default Navigation;