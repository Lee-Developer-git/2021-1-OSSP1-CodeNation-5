import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
    },
    },
}));

function ViewMaterial({ material_name, material_link, user_id }){
    const classes = useStyles();

    const [state, setstate] = useState("");
    return(
        <div>
            <br/>
            <div>title: {material_name}</div>
            <div>url: {material_link}</div>
        </div>
    );
}

export default ViewMaterial;