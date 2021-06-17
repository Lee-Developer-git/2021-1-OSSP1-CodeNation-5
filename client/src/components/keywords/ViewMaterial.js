import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

function ViewMaterial({key, material_name, material_link, user_id, sel1, sel2 }){
    const classes = useStyles();

    var onClickSave = (e) => {
        fetch('http://localhost:5000/api/material/common/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "material_name": material_name,
                "material_link": material_link,
                "user_id": user_id,
                "sel1": sel1,
                "sel2": sel2,
            }),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        });
    }

    return(
        <div >
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.pos} color="textSecondary" gutterBottom>
                        title: {material_name}
                    </Typography>
                    <Typography className={classes.pos}>
                        url: {material_link}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={onClickSave}>저장</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default ViewMaterial;