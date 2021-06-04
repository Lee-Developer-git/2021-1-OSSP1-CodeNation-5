import React, { useState, useEffect, useRef } from 'react';
import { Input, Form, Button } from 'reactstrap';
import Keyword from './Keyword';
import { post } from 'axios';

const style = {
    search: {
        width: '80%',
    },
};


function Search() {
    const initialValue =[{
        id: '',
        keyword:'',
        one:'',
        two:'',
        trd: '', 
        four: '', 
        five:'', 
        six:''
    }];

    const [keywords, setKeywords] = useState(initialValue);
    const [form, setValues] = useState(initialValue.keyword);

    function onChange(e) {
        setValues({
            ...form,
            [e.target.name]: [e.target.value],
        });
    }

    const addSearch = () => {
        const { keyword } = form;
        const url = 'http://localhost:5000/api/search';
        const formData = new FormData();
        formData.append('keyword', keyword);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    };

    const onSubmit = async (e) => {
        await e.preventDefault();

        addSearch()
            .then((response) => {
                console.log(response.formData);
                setValues(null);
            })
        resetValue.current.value = "";
    };

    const resetValue = useRef(null);

    const callApi = async () => {
        const response = await fetch('http://localhost:5000/api/search');
        const body = await response.json();
        return body;
    };

    useEffect(() => {
        try {
            callApi().then((res) => setKeywords(res));
        } catch (e) {
            console.log(e);
        }
    }, [onSubmit]);

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Input
                    id="keyword"
                    name="keyword"
                    className="keyword"
                    style={style.search}
                    onChange={onChange}
                    innerRef={resetValue}
                />
                <Button type="submit">봇</Button>
                <Button>검색</Button>
            </Form>
            <div>
                {keywords ? (
                    <div>
                        {keywords.map(c => {
                        return <Keyword key={c.id} one={c.one} two={c.two} trd={c.trd} four={c.four} five={c.five} six={c.six}/>
                        })}
                    </div>
                ):(<div></div>)}
            </div>
        </>
    );
}

export default Search;
