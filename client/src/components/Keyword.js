import React, { useState } from 'react';
import { Form } from 'reactstrap';
import Research from './Research';
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

    const initialState ={
        btnOne: 'outlined',
        btnTwo: 'outlined',
        btnTrd: 'outlined',
        btnFour: 'outlined',
        btnFive: 'outlined',
        btnSix: 'outlined',
    };

    const [variant, setVarient] = useState(initialState);

    const changeColor = async(e) =>{
        console.log(e.target.name);
        console.log(e.target.variant);
        await setVarient({
            ...variant,
            [e.target.name] : 'contained'
        });
    }

    return(
        <>
            <Form >
                <Button
                    id="btnOne"
                    name="btnOne"
                    variant={variant.btnOne}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}>{one}</Button>
                <Button
                    id="btnTwo"
                    name="btnTwo"
                    variant={variant.btnTwo}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}>{two}</Button>
                <Button
                    id="btnTrd"
                    name="btnTrd"
                    variant={variant.btnTrd}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}>{trd}</Button>
                <Button
                    id="btnFour"
                    name="btnFour"
                    variant={variant.btnFour}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}>{four}</Button>
                <Button
                    id="btnFive"
                    name="btnFive"
                    variant={variant.btnFive}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}>{five}</Button>
                <Button
                    id="btnSix"
                    name="btnSix"
                    variant={variant.btnSix}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}>{six}</Button><br/><br/>
                <Button type="submit" variant="contained" color="primary" style={{ width:"100%" }}>검색</Button>
            </Form>
            <Research />
        </>
    );
}

export default Keyword;
