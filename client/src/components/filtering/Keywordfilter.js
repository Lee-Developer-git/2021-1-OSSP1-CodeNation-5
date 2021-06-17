import React, { useState, useEffect } from 'react';
import { Form } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { post } from 'axios';

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

const Styles ={
    submit: {
        backgroundColor: "#2DC8B4",
        width : "100%",
        textAlign: "center",
        color: "#FEFFFF"
    }
};

function Keywordfilter({ keyword1, keyword2, keyword3, keyword4, keyword5 }){
    const classes = style;

    const initialState ={
        btnOne_: 'outlined',
        btnTwo_: 'outlined',
        btnTrd_: 'outlined',
        btnFour_: 'outlined',
        btnFive_: 'outlined',
    };
    
    const initialselect = [{
        sel1: '',
        sel2: ''
    }]

    const initialmaterial = [{
        id: '',
        material_name: '',
        material_link: '',
        user_id: 'TEST1ID'
    }];

    const initialimage = [{
        id: '',
        image_link: '',
        user_id: 'TEST1ID'
    }]

    const [select, setselect] = useState(initialselect);
    const [variant, setVarient] = useState(initialState);
    const [state, setstate] = useState({
        material: ""
    });
    const [material, setmaterial] = useState(initialmaterial);
    const [image, setimage] = useState(initialimage);

    const changeColor = (e) =>{
        setVarient({
            ...variant,
            [e.target.id] : 'contained'
        });
        console.log(e.target.value);
        if (select.sel1 === ''){
            setselect({
                ...select,
                sel1 : e.target.value
            })
            console.log(e.target.value);
        } else if (select.sel1 !== ''){
            setselect({
                ...select,
                sel2 : e.target.value
            })
        }
        console.log(e.target.id);
    }

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


    const callApiCommon = async () => {
        const response = await fetch('http://localhost:5000/api/material/common');
        const body = await response.json();
        return body;
    }

    const callApiImage = async () => {
        const response = await fetch('http://localhost:5000/api/material/image');
        const body = await response.json();
        return body;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(select.sel1);
        console.log(select.sel2);
        addMaterial()
            .then((response)=>{
                console.log(response.data);
            })
        setselect({
            ...select,
            sel1: '',
            sel2: ''
        })
    }

    useEffect(()=>{
        try {
            callApiCommon().then((res) =>setmaterial(res));
            callApiImage().then((res) =>setimage(res));
        } catch (error) {
            console.log(error);
        }
    }, [material, image])



    return (
        <>
            <Form onSubmit={onSubmit}>
                <Button
                    id="btnOne_"
                    name={variant.btnOne_}
                    variant={variant.btnOne_}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={keyword1}>{keyword1}</Button>
                <Button
                    id="btnTwo_"
                    name={variant.btnTwo_}
                    variant={variant.btnTwo_}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={keyword2}>{keyword2}</Button>
                <Button
                    id="btnTrd_"
                    name={variant.btnTrd_}
                    variant={variant.btnTrd_}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={keyword3}>{keyword3}</Button>
                <Button
                    id="btnFour_"
                    name={variant.btnFour_}
                    variant={variant.btnFour_}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={keyword4}>{keyword4}</Button>
                <Button
                    id="btnFive_"
                    name={variant.btnFive_}
                    variant={variant.btnFive_}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={keyword5}>{keyword5}</Button>
                <br/><br/>
            </Form> 
        </>
    );
}

export default Keywordfilter;
