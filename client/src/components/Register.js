import React from 'react';
import { post } from 'axios';

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            user_id: "",
            user_pw: "",
            confirm_user_pw: ""
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleOnClick = (e) => { 
        this.props.removeCookie('is_register_page');
        alert(this.state.user_name + " " + this.state.user_id + " " + this.state.user_pw + " " + this.state.confirm_user_pw);
    }

    render(){
        return(
            <form className="register_form">
                <h2>자료조사 봇 회원가입</h2>
                <input type="text" id="input_name" placeholder="닉네임" name="user_name" onChange={this.handleChange}/>
                <input type="text" id="input_id" placeholder="아이디" name="user_id" onChange={this.handleChange}/>
                <input type="password" id="input_pw" placeholder="비밀번호" name="user_pw" onChange={this.handleChange}/>
                <input type="password" id="input_confirm_pw" placeholder="비밀번호 확인" name="confirm_user_pw" onChange={this.handleChange}/><br/>
                <button onClick={this.handleOnClick}>회원가입</button>
            </form>
        );
    }
}


export default Register;
