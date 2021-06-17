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
    photo: {
        width: "120px"
    }
});

function ImageMaterial({key, image_link, user_id, sel1, sel2}){
    const classes = useStyles();

    var onClickSave = (e) => {
        fetch('http://localhost:5000/api/material/image/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "image_link": image_link,
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
                    <Typography className={classes.pos}>
                        <img src={image_link} alt="img_tag"/>
                        <img className={classes.photo} src="https://image.bugsm.co.kr/album/images/500/203114/20311460.jpg" alt="image"/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>저장</Button>
                </CardActions>
            </Card>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.pos}>
                        <img className={classes.photo} src="https://i.ytimg.com/vi/Dj_2oFL8NMk/maxresdefault.jpg" alt="image"/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>저장</Button>
                </CardActions>
            </Card>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.pos}>
                        <img className={classes.photo} src="https://i.ytimg.com/vi/f2wYLkbASz8/maxresdefault.jpg" alt="image"/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>저장</Button>
                </CardActions>
            </Card>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.pos}>
                        <img className={classes.photo} src="https://i.ytimg.com/vi/f2wYLkbASz8/maxresdefault.jpg" alt="image"/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={onClickSave}>저장</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default ImageMaterial;