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

function ImageMaterial({ image_link, user_id }){
    const classes = useStyles();

    return(
        <div >
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.pos}>
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
        </div>
    );
}

export default ImageMaterial;