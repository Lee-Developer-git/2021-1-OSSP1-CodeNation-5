import React, { useState } from 'react';
import { Form } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Keywordfilter from './Keywordfilter';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
    },
    },
    input: {
        display: 'none',
    },
}));

function Inputfilter() {
    const initialState = [{
        filepath: ''
    }]

    const Value = [{
        filepath: '1',
        keyword1: '프로그램',
        keyword2: '정보',
        keyword3: '데이터',
        keyword4: '시스템',
        keyword5: '터미널'
    },
    {
        filepath: '2',
        keyword1: '익스텐션',
        keyword2: '자료조사',
        keyword3: 'drive',
        keyword4: '데이터',
        keyword5: 'https'
    },
    {
        filepath: '3',
        keyword1: '전략',
        keyword2: '사람',
        keyword3: '공중',
        keyword4: '미디어',
        keyword5: '메세지'
    }
    ]
    
    const classes = useStyles();
    const [state, setstate] = useState(initialState)
    const [filter, setfilter] = useState(Value);

    const onChange =(e) => {
        setstate({
            filepath: e.target.value
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        editstate();
        setstate({
            filepath: ''
        })
    }

    const editstate = (e) => {
        const filepath = state.filepath;
        const value = filter.filepath;
        if(e.target.value == '1.사무자동화산업기사필기_핵심요점정리.pdf'){
            setstate({
                ...state,
                
            })
        } else if (e.target.value == '2.codenation_발표자료.pptx'){

        } else if (e.target.value == '3.홍보전략론'){
            
        }
    }

    return(
        <>
        <div>
            <Form onSubmit={onSubmit}>
                <input
                    className={classes.input}
                    multiple
                    type="file"
                    id="filepath"
                    name="filepath"
                    onChange={onChange}
                />
                <label htmlFor="button-file">
                    <input type="file" />
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="submit" variant="outlined">봇</Button>
            </Form><br/>
            <div>
                {filter ? (
                    <div>
                        {filter.map(f => {
                            return <Keywordfilter filepath={f.filepath} keyword1={f.keyword1} keyword2={f.keyword2} keyword3={f.keyword3} keyword4={f.keyword4} keyword5={f.keyword5}/>
                        })}
                    </div>
                ):("")}
            </div>
        </div>
        </>
    );
}

export default Inputfilter;
