import React from 'react';
import { Form } from 'reactstrap';
import { post } from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const style = {
    search: {
        width: '80%',
    },
    submit: {
        width: '20px',
    },
};


class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            keyword: ''
        }
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

        this.addSearch()
            .then((response) => {
                console.log(response.data);
            })
        this.setState({
            keyword: ''
        })
    };

    onChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addSearch = () => {
        const keyword = this.state.keyword;
        const url = 'http://localhost:5000/api/search';
        let data = {
            "keyword": keyword,
            "one": "",
            "two": "",
            "trd": "",
            "four": "",
            "five": "",
            "six": ""
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return post(url, JSON.stringify(data), config);
    };


    
    render(){
        return(
        <>
            <Form onSubmit={this.onSubmit} className={this.useStyles.root} noValidate autoComplete="off">
                <Input
                    id="keyword"
                    name="keyword"
                    className="keyword"
                    placeholder="검색"
                    style={style.search}
                    onChange={this.onChange}
                    inputProps={{ 'aria-label': 'description' }}
                />
                <Button type="submit" variant="outlined" className={style.submit}>봇</Button>
            </Form>
        </>
        );
    }
}


export default Search;
