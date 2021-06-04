import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Keyword from '../components/Keyword';

const style = {
    main: {
        width: '400px',
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
        <div className={style.main}>
            <div>자료 조사 봇</div>
            <Search form={form}/>
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
    );
}

export default Main;
