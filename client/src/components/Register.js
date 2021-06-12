import React, { createRef } from 'react';
import { Form, Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { post } from 'axios';

var complete = false;

class Register extends React.Component{

    user_name_ok = false;
    user_id_ok = false;
    user_pw_ok = false;
    confirm_user_pw_ok = false;

    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            user_id: "",
            user_pw: "",
            confirm_user_pw: "",
            isDisabled: true
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
            if(e.target.value.length < 2 || e.target.value.length > 30)
            {
                this.user_name_ok = false;
                e.target.style.backgroundColor = '#DB5D4F';
            }
            else
            {
                this.user_name_ok = true;
                e.target.style.backgroundColor = 'white';
            }
        }

        if(e.target.id === "user_id")
        {
            if(e.target.value.length < 6 || e.target.value.length > 30)
            {
                this.user_id_ok = false;
                e.target.style.backgroundColor = '#DB5D4F';
            }
            else
            {
                this.user_id_ok = true;
                e.target.style.backgroundColor = 'white';
            }
        }

        if(e.target.id === "user_pw")
        {
            if(e.target.value.length < 8 || e.target.value.length > 30)
            {
                this.user_pw_ok = false;
                e.target.style.backgroundColor = '#DB5D4F';
            }
            else
            {
                this.user_pw_ok = true;
                e.target.style.backgroundColor = 'white';
            }
        }

        if(e.target.id === "confirm_user_pw")
        {
            if(this.state.user_pw !== e.target.value)
            {
                this.confirm_user_pw = false;
                e.target.style.backgroundColor = '#DB5D4F';
            }
            else
            {
                this.confirm_user_pw_ok = true;
                e.target.style.backgroundColor = 'white';
            }
        }

        if(this.user_name_ok && this.user_id_ok && this.user_pw_ok && this.confirm_user_pw_ok)
            this.setState({isDisabled: false});
    }

    onSubmit = (e) => { 
        e.preventDefault();

        fetch('http://localhost:5000/api/register', {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                user_name: this.state.user_name,
                user_id: this.state.user_id,
                user_pw: this.state.user_pw
            })
        });

        //alert(this.state.user_name + " " + this.state.user_id + " " + this.state.user_pw + " " + this.state.confirm_user_pw);
    }

    render(){
        return(
            <>
            <Form name="register_form" className={this.useStyles.root} onSubmit={this.onSubmit}>
                <h2>자료조사 봇 회원가입</h2>
                <Input type="text" autocomplete="off" id="user_name" placeholder="닉네임(2~30자)" name="user_name" onChange={this.handleChange}/>
                <Input type="text" autocomplete="off" id="user_id" placeholder="아이디(6~30자)" name="user_id" onChange={this.handleChange}/>
                <Input type="password" autocomplete="off" id="user_pw" placeholder="비밀번호(8~30자)" name="user_pw" onChange={this.handleChange}/>
                <Input type="password" autocomplete="off" id="confirm_user_pw" placeholder="비밀번호 확인" name="confirm_user_pw" onChange={this.handleChange}/><br/>
                <Button disabled={this.state.isDisabled} type="submit">회원가입</Button>
            </Form>
            </>
        );
    }
}


export default Register;
