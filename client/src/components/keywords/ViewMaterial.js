import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
    },
    },
    name: {
        textAlign: "center",
        backgroundColor: "#BFB0D2",
        color: "white",
        padding: "8px",
        borderRadius:"3px",
        fontSize: "14px",
        marginBottom: "5px"
    },
}));

function ViewMaterial(){
    const classes = useStyles();

    const [state, setstate] = useState(initialState)
    return(
        <div>
            <br/>
            <div>자료</div>
            <div>title: </div>
            <div>url: </div>
            <div className={classes.name}>자료</div>
        </div>
    );
}

export default ViewMaterial;