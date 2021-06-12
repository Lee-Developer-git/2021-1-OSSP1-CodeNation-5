import React from 'react';
import { Form, Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { post } from 'axios';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            user_pw: ""
        };
    }

    useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
        },
        },
    }));

    onSubmit = (e) => {
        e.preventDefault();
        alert("submit");
        fetch('http://localhost:5000/api/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                user_pw: this.state.user_pw
            })
        })
    };

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
            <>
            <Form name="login_form" className={this.useStyles.root} onSubmit={this.onSubmit}>
                <h2>자료조사 봇 로그인</h2>
                <Input type="text" id="user_id" placeholder="아이디" name="user_id" onChange={this.handleChange}/>
                <Input type="password" id="user_pw" placeholder="비밀번호" name="user_pw" onChange={this.handleChange}/><br/>
                <Button type="submit">로그인</Button>
                <Button onClick={this.handleOnRegister}>회원가입</Button>
            </Form>
            </>
        );
    }
}


export default Login;
