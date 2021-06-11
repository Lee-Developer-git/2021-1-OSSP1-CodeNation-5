import React from 'react';
import { post } from 'axios';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            user_pw: ""
        };
    }

    render(){
        return(
            <form className="login_form">
                
            </form>
        );
    }
}


export default Login;
