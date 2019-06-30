import React from 'react';
import './style.css';

function Signup() {
    return (
        <div className="jumbotron jumbotron-fluid" id="sign">
            <div className="container">
                <h2 className="display-4">Sign Up Now!</h2>
                <form>
                    <label>
                        Name:
                    <input type="text" name="name" />
                    </label><br />
                    <label>
                        Username:
                    <input type="text" name="username" />
                    </label><br />
                    <label>
                        Password:
                    <input type="password" name="password" />
                    </label><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Signup;