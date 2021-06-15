import React, { useState, useEffect } from 'react';
import { Form } from 'reactstrap';
import ImageMaterial from './ImageMaterial';
import ViewMaterial from './ViewMaterial';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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

    const handleChange = (e) => {
        setstate({
            material : e.target.value
        });   
    };

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
    })

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
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-material">자료형</InputLabel>
                <Select
                    native
                    value={state.material}
                    onChange={handleChange}
                    inputProps={{
                        name: 'material',
                        id: 'select-material'
                    }}
                >
                    <option aria-label="None"/>
                    <option value="view">view</option>
                    <option value="image">image</option>
                </Select>
            </FormControl>
            {(state.material === 'view') ? (
                <>
                    <div>자료</div>
                    {material ? (
                        <div>
                            {material.map(m =>{
                                return <ViewMaterial
                                        key={m.id}
                                        material_name={m.material_name}
                                        material_link={m.material_link}
                                        user_id={m.user_id}/>
                            })}
                        </div>
                    ): (<div>
                        
                    </div>)}
                </>
                ):(
                <div>
                    {(state.material === 'image') ?(
                        <>
                            <div>자료</div>
                            {image ? (
                                <div>
                                    {image.map(m =>{
                                        return <ImageMaterial
                                                key={m.id}
                                                image_link={m.image_link}
                                                user_id={m.user_id}/>
                                    })}
                                </div>
                            ): (<div>
                                None
                            </div>)}
                        </>
                    ): (
                        ""
                    )}
                </div>
            )}
        </>
    );
}

export default Keyword;