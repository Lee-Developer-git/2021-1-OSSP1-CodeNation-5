import React, { useState, useEffect,  } from 'react';
import Search from '../components/Search';
import Keyword from '../components/Keyword';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
    main: {
        width: '400px',
    },
    container: {
        border: '1px black solid',
        
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));

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

    const classes = useStyles();

    const [keywords, setKeywords] = useState(initialValue);
    const [form, setValues] = useState(initialValue.keyword);
    const [completed, setCompleted] = useState(0);

    const callApi = async () => {
        const response = await fetch('http://localhost:5000/api/search');
        const body = await response.json();
        return body;
    };

    useEffect(() => {
        try {
            callApi().then((res) => setKeywords(res));
            if(!completed) return 0;
            const tick = setTimeout(()=>{
                setCompleted({completed: completed>= 100 ? 0 : completed+1})
            }, 20);
            return ()=>clearTimeout(tick);
        } catch (e) {
            console.log(e);
        }
    }, [completed]);

    return (
        <div style={style.main}>
            <div>자료 조사 봇</div>
            <div style={style.container}>
                <Search form={form}/>
                <div>
                    {keywords ? (
                        <div>
                            {keywords.map(c => {
                            return <Keyword key={c.id} one={c.one} two={c.two} trd={c.trd} four={c.four} five={c.five} six={c.six}/>
                            })}
                        </div>
                    ):(
                        <div>
                            <CircularProgress className={classes.root} variant="determinate" value={completed}/>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default Main;
