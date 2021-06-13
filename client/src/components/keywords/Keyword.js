import React, { useState, useEffect } from 'react';
import { Form } from 'reactstrap';
import ImageMaterial from './ImageMaterial';
import ViewMaterial from './ViewMaterial';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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

    const initialmaterial = [{
        sel1: '',
        sel2: '',
        material_name: '',
        material_link: '',
        user_id: 'TEST1ID'
    }];

    const initialimage = [{
        sel1: '',
        sel2: '',
        image_link: '',
        user_id: 'TEST1ID'
    }]

    const [variant, setVarient] = useState(initialState);
    const [state, setstate] = useState({
        material: ""
    });
    const [material, setmaterial] = useState(initialmaterial);
    const [image, setimage] = useState(initialimage);

    const changeColor = (e) =>{
        setVarient({
            ...variant,
            [e.target.name] : 'contained'
        });
        console.log(e.target.name);
        console.log(e.target.variant);
        console.log(e.target.value);
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
            <Form >
                <Button
                    id="btnOne"
                    name="btnOne"
                    variant={variant.btnOne}
                    color="primary"
                    style={classes.none_click}
                    onClick={changeColor}
                    value={variant.btnOne}>{one}</Button>
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
                    <div className={classes.name}>자료</div>
                    {material ? (
                        <div>
                            {material.map(m =>{
                                return <ViewMaterial
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
                            <div className={classes.name}>자료</div>
                            {image ? (
                                <div>
                                    {image.map(m =>{
                                        return <ImageMaterial
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