import React from 'react';
import { Input, Form, Button } from 'reactstrap';
import { post } from 'axios';

const style = {
    search: {
        width: '80%',
    },
};

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            keyword: ''
        }
    }

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
            <Form onSubmit={this.onSubmit}>
                <Input
                    id="keyword"
                    name="keyword"
                    className="keyword"
                    style={style.search}
                    onChange={this.onChange}
                />
                <Button type="submit">봇</Button>
                <Button>검색</Button>
            </Form>
        </>
        );
    }
}


export default Search;
