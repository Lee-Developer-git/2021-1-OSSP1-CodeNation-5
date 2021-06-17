import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
});

function StoredCommonMaterial({id}){

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/material/common/' + id)
            .then(response => response.json())
            .then(response => {
                setData(response);
            });
    }, []);

    const dataList = data.map(e => 
        <Card className={useStyles.root} variant="outlined">
            <CardContent>
                <Typography className={useStyles.pos} color="textSecondary" gutterBottom>
                    title : {e.material_name}
                </Typography>
                <Typography className={useStyles.pos}>
                    url : {e.material_link}
                </Typography>
            </CardContent>
        </Card>);
        

    return(
        <div>
            <br/>
            <div>
                {(dataList.length === 0) ?
                    <h4>저장된 자료가 없습니다.</h4>
                    : <h4>자료목록</h4>
                }
            </div>
            <ul>{dataList}</ul>
        </div>
    );
}

export default StoredCommonMaterial;