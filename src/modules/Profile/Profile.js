import React from 'react';

class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            rank: 'Gold, Silver, Bronze'
        }
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/profile/:id', {
          method: 'get',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
          })
        })
        .then(response => response.json())
        .then()
    }

    render(){

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pa4 black-80">
                  <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                        
                      </div>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        
                      </div>
                      <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        
                      </div>
                    </fieldset>
                    <div className="">
                      
                    </div>
                    <div className="mt3">
                       
                    </div>
                  </div>
                </main>
            </article>
        );
      }


}


export default Profile;