import React from 'react';
import { Form, Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

class Register extends React.Component{

    user_name_ok = false;
    is_username_overlap = true;
    user_id_ok = false;
    is_userid_overlap = true;
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

    handleGoLogin = (e) => {
        this.props.removeCookie("is_register_page");
    }

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
    }

    handleCheckNick = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/register/checknickname', {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                user_name: this.state.user_name})
        })
        .then(response => response.json())
        .then(response => {
            if(response.state === "fail")
                this.is_username_overlap = true;
            else if(response.state === "success")
                this.is_username_overlap = false;
            alert(response.message);
        });
        this.forceUpdate();
    }

    handleCheckId = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/register/checkid', {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                user_id: this.state.user_id})
        })
        .then(response => response.json())
        .then(response => {
            if(response.state === "fail")
                this.is_userid_overlap = true;
            else if(response.state === "success")
                this.is_userid_overlap = false;
            alert(response.message);
        });
        this.forceUpdate();
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
        })
        .then(response => response.json())
        .then(response => {
            alert(response.message);
            this.props.removeCookie("is_register_page");
        });
    }

    onChangeForm = (e) => {
        if(this.user_name_ok && this.user_id_ok && this.user_pw_ok && this.confirm_user_pw_ok &&
            !this.is_userid_overlap && !this.is_username_overlap)
            this.setState({isDisabled: false});
        else
            this.setState({isDisabled: true});
    }
    
    render(){
        return(
            <>
            <Form name="register_form" className={this.useStyles.root} onSubmit={this.onSubmit} onChange={this.onChangeForm} onClick={this.onChangeForm} onMouseMove={this.onChangeForm}>
                <h2>자료조사 봇 회원가입</h2>
                <Input type="text" autocomplete="off" id="user_name" placeholder="닉네임(2~30자)" name="user_name" onChange={this.handleChange}/><Button onClick={this.handleCheckNick}>중복확인</Button>
                <Input type="text" autocomplete="off" id="user_id" placeholder="아이디(6~30자)" name="user_id" onChange={this.handleChange}/><Button onClick={this.handleCheckId}>중복확인</Button>
                <Input type="password" autocomplete="off" id="user_pw" placeholder="비밀번호(8~30자)" name="user_pw" onChange={this.handleChange}/>
                <Input type="password" autocomplete="off" id="confirm_user_pw" placeholder="비밀번호 확인" name="confirm_user_pw" onChange={this.handleChange}/><br/>
                <Button disabled={this.state.isDisabled} type="submit">회원가입</Button>
                <Button onClick={this.handleGoLogin}>뒤로가기</Button>
            </Form>
            </>
        );
    }
}


export default Register;
