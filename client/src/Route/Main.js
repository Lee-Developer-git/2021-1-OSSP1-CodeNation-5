import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Keyword from '../components/Keyword';

const style = {
    main: {
        width: 400,
    },
    title:{
        textAlign:"center",
    },
    container: {
        border: '1px black solid',
        padding: "30px",
    },
};
function Main() {
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
    });

    return (
        <div style={style.main}>
            <div style={style.title}>자료 조사 봇</div>
            <div style={style.container}>
                <Search style={style.searchbar} form={form}/> <br/>
                <div>
                    {keywords ? (
                        <div>
                            {keywords.map(c => {
                            return <Keyword key={c.id} one={c.one} two={c.two} trd={c.trd} four={c.four} five={c.five} six={c.six}/>
                            })}
                        </div>
                    ):("")}
                </div>
            </div>
        </div>
    );
}

export default Main;