import React from 'react';
import './style.css';
import axios from 'axios'; 

class Bio extends React.Component {
    state = {
        name:"",
        userName: "",
        email: ""
    }

    componentWillMount(){
        axios.get("/api/user").then(
            function(response) {
            
                const name = response.data.firstName + response.data.lastName 
                this.setState({name}); 

                const userName = response.data.userName
                this.setState({userName}); 

                const email = response.data.email
                this.setState({email}); 
        

              console.log("Name: " + response.data.firstName + response.data.lastName);
              console.log("User Name: " + response.data.userName);
              console.log("Email: " + response.data.email);
            }
        );
    };


    render(){
        return (
            <div className="bio">
                <div className="card">
                    <img src="noob-logo.png" className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">Name:{this.state.name}</p>
                    <p className="card-text">User Name:{this.state.userName}</p>
                    <p className="card-text">Email:{this.state.email}</p>
                </div>
                </div>
            </div>
        )
    }
    
}


export default Bio;











