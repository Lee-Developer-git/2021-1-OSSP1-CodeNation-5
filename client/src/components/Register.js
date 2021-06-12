import React from 'react';
import { Form, Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
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

    useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
        },
        },
    }));

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

        if(e.target.id === "user_name")
        {
            if(e.target.value.length < 6 || e.target.value.length > 30)
                e.target.style.backgroundColor = '#DB5D4F';
            else
                e.target.style.backgroundColor = 'white';
        }

        if(e.target.id === "user_id")
        {
            if(e.target.value.length < 6 || e.target.value.length > 30)
                e.target.style.backgroundColor = '#DB5D4F';
            else
                e.target.style.backgroundColor = 'white';
        }

        if(e.target.id === "user_pw")
        {
            if(e.target.value.length < 8 || e.target.value.length > 30)
                e.target.style.backgroundColor = '#DB5D4F';
            else
                e.target.style.backgroundColor = 'white';
        }

        if(e.target.id === "confirm_user_pw")
        {
            if(this.state.user_pw !== e.target.value)
                e.target.style.backgroundColor = '#DB5D4F';
            else
                e.target.style.backgroundColor = 'white';
        }
    }

    OnSubmit = (e) => { 
        //this.props.removeCookie('is_register_page');
        alert(this.state.user_name + " " + this.state.user_id + " " + this.state.user_pw + " " + this.state.confirm_user_pw);
    }

    render(){
        return(
            <>
            <Form name="register_form" className={this.useStyles.root} onSubmit={this.onSubmit}>
                <h2>자료조사 봇 회원가입</h2>
                <Input type="text" id="user_name" placeholder="닉네임" name="user_name" onChange={this.handleChange}/>
                <Input type="text" id="user_id" placeholder="아이디" name="user_id" onChange={this.handleChange}/>
                <Input type="password" id="user_pw" placeholder="비밀번호" name="user_pw" onChange={this.handleChange}/>
                <Input type="password" id="confirm_user_pw" placeholder="비밀번호 확인" name="confirm_user_pw" onChange={this.handleChange}/><br/>
                <Button type="submit">회원가입</Button>
            </Form>
            </>
        );
    }
}


export default Register;
