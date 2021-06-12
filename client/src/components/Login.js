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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleOnClick = (e) => {
        this.props.setCookie('auth_state', true, {maxAge: 3600});
        alert(this.state.user_id + " " + this.state.user_pw);
    }

    handleOnRegister = (e) => {
        this.props.setCookie('is_register_page', true, {maxAge: 120});
    }

    render(){
        return(
            <form className="login_form">
                <h2>자료조사 봇 로그인</h2>
                <input type="text" id="input_id" placeholder="아이디" name="user_id" onChange={this.handleChange}/>
                <input type="password" id="input_pw" placeholder="비밀번호" name="user_pw" onChange={this.handleChange}/><br/>
                <button onClick={this.handleOnClick}>로그인</button>
                <button onClick={this.handleOnRegister}>회원가입</button>
            </form>
        );
    }
}


export default Login;
