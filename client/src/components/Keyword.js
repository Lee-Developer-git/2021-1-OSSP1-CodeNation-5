import React from 'react';
import { Button } from 'reactstrap';

function Keyword({ one, two, trd, four, five, six }) {

    return(
        <div>
            <Button>{one}</Button>
            <Button>{two}</Button>
            <Button>{trd}</Button>
            <Button>{four}</Button>
            <Button>{five}</Button>
            <Button>{six}</Button>
        </div>
    );
}

export default Keyword;