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
            <div className={classes.name}>자료</div>
            <div>
                
            </div>
            <div>title : <span></span></div>
            <div>url : <span></span></div>
        </div>
    );
}

export default ViewMaterial;