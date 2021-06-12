import React from 'react';
import Button from '@material-ui/core/Button';

function Keywordfilter({ keyword1, keyword2, keyword3, keyword4, keyword5 }){


    return (
        <>
            <Button variant="outlined" color="primary">{keyword1}</Button>&nbsp;
            <Button variant="outlined" color="primary">{keyword2}</Button>&nbsp;
            <Button variant="outlined" color="primary">{keyword3}</Button>&nbsp;
            <Button variant="outlined" color="primary">{keyword4}</Button>&nbsp;
            <Button variant="outlined" color="primary">{keyword5}</Button>&nbsp;
        </>
    );
}

export default Keywordfilter;