import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const style = makeStyles((theme)=>({
    none_click:{
        '& > *': {
            margin: "2px",
        },
    }
}));

function Keyword({ one, two, trd, four, five, six }) {
    const classes = style;

    return(
        <div>
            <Button variant="outlined" color="primary" style={classes.none_click}>{one}</Button>
            <Button variant="outlined" color="primary" style={classes.none_click}>{two}</Button>
            <Button variant="outlined" color="primary" style={classes.none_click}>{trd}</Button>
            <Button variant="outlined" color="primary" style={classes.none_click}>{four}</Button>
            <Button variant="outlined" color="primary" style={classes.none_click}>{five}</Button>
            <Button variant="outlined" color="primary" style={classes.none_click}>{six}</Button>
        </div>
    );
}

export default Keyword;
