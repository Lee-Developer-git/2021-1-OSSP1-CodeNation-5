import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Form } from 'reactstrap';
import { post } from 'axios';

const Styles ={
    submit: {
        backgroundColor: "#2DC8B4",
        width : "100%",
        textAlign: "center",
        color: "#FEFFFF"
    }
};

const style = makeStyles((theme)=>({
    none_click:{
        '& > *': {
            margin: "2px",
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

function KeywordButton({p_setSelect, one, two, trd, four, five, six }) {
    const classes = style;

    const initialState ={
        btnOne: 'outlined',
        btnTwo: 'outlined',
        btnTrd: 'outlined',
        btnFour: 'outlined',
        btnFive: 'outlined',
        btnSix: 'outlined',
    };
    const initialselect = [{
        sel1: '',
        sel2: ''
    }];

    const [select, setselect] = useState(initialselect);
    const [variant, setVarient] = useState(initialState);

    const addMaterial = () =>{
        let sel = {};
        sel[0] = select.sel1;
        sel[1] = select.sel2;
        const url = 'http://localhost:5000/api/material/common';
        let data = {
            "material_name" : "",
            "material_link" : "",
            "user_id" : "",
            "sel1" : sel[0],
            "sel2" : sel[1]
        }
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return post(url, JSON.stringify(data), config);
    }

    const addImage = () =>{
        let sel = {};
        sel[0] = select.sel1;
        sel[1] = select.sel2;
        const url = 'http://localhost:5000/api/material/image';
        const formData = new FormData();
        formData.append('image_link', '');
        formData.append('user_id', '');
        formData.append('id', '');
        formData.append('sel1', sel[0]);
        formData.append('sel2', sel[1]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    const changeColor = (e) =>{
        setVarient({
            ...variant,
            [e.target.id] : 'contained'
        });
        console.log(e.target.value);
        if (select.sel1 === undefined){
            setselect({
                ...select,
                sel1 : e.target.value
            })
            p_setSelect(
                {
                    ...select,
                    sel1 : e.target.value
                }
            )
            console.log(e.target.value);
        } else if (select.sel1 !== undefined){
            setselect({
                ...select,
                sel2 : e.target.value
            })
            p_setSelect(
                {
                    ...select,
                    sel2 : e.target.value
                }
            )
        }
        console.log(e.target.id);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addMaterial()
            .then((response)=>{
                console.log(response.data);
            });
        addImage()
            .then((response)=>{
                console.log(response.data);
            })
        setselect({
            ...select,
            sel1: '',
            sel2: ''
        })
        p_setSelect(
            {
                ...select,
                sel1 : '',
                sel2 : ''
            }
        )
    }
    
    return(
        <>
            <Form onSubmit={onSubmit}>
                <Button
                    id="btnOne"
                    name={variant.btnOne}
                    variant={variant.btnOne}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={one}>{one}</Button>
                <Button
                    id="btnTwo"
                    name={variant.btnTwo}
                    variant={variant.btnTwo}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={two}>{two}</Button>
                <Button
                    id="btnTrd"
                    name={variant.btnTrd}
                    variant={variant.btnTrd}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={trd}>{trd}</Button>
                <Button
                    id="btnFour"
                    name={variant.btnFour}
                    variant={variant.btnFour}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={four}>{four}</Button>
                <Button
                    id="btnFive"
                    name={variant.btnFive}
                    variant={variant.btnFive}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={five}>{five}</Button>
                <Button
                    id="btnSix"
                    name={variant.btnSix}
                    variant={variant.btnSix}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={six}>{six}</Button><br/><br/>
                <Button type="submit" style={Styles.submit}>검색</Button>
            </Form>
        </>
    );
}

export default KeywordButton;