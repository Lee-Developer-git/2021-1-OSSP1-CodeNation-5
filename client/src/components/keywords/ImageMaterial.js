import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

function ImageMaterial({ image_link, user_id }){

    return(
        <div>
            <br/>
            <div><img src={image_link} alt="image"/></div>
        </div>
    );
}

export default ImageMaterial;