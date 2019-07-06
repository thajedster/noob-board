import React from 'react';
import './style.css';
import axios from 'axios'; 

class Bio extends React.Component() {

    componentWillMount(){
        axios.get().then(
            function(response) {
              console.log("Name: " + response.firstName + response.lastName);
              console.log("User Name: " + response.userName);
              console.log("Email: " + response.email);
            }
        );
    };


    render(){
        return (
            <div className="bio">
                <div class="card" style="width: 18rem;">
                    <img src="noob-logo.png" class="card-img-top" alt="..." />
                <div class="card-body">
                    <p class="card-text">Name:{}</p>
                    <p class="card-text">User Name:{}</p>
                    <p class="card-text">Email:{}</p>
                </div>
                </div>
            </div>
        )
    }
    
}


export default Bio;











