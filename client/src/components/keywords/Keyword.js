import React, { useState, useEffect } from 'react';
import { Form } from 'reactstrap';
import ImageMaterial from './ImageMaterial';
import ViewMaterial from './ViewMaterial';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import KeywordButton from './KeywordButton';

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

function Keyword({ key, id, one, two, trd, four, five, six }) {
    const classes = style;

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
    }];
    
    const [state, setstate] = useState({
        material: ""
    });
    const [material, setmaterial] = useState(initialmaterial);
    const [image, setimage] = useState(initialimage);

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

    const handleChange = (e) => {
        setstate({
            material : e.target.value
        });   
    };

    useEffect(()=>{
        try {
            callApiCommon()
                .then((res) =>setmaterial(res));
            callApiImage()
                .then((res) =>setimage(res));
        } catch (error) {
            console.log(error);
        }
    })

    return(
        <>
            <KeywordButton one={one} two={two} trd={trd} four={four} five={five} six={six}/>
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
                    {material ? (
                        <div>
                            {material.map(m =>{
                                return <ViewMaterial
                                        key={m.id}
                                        material_name={m.material_name}
                                        material_link={m.material_link}
                                        user_id={id}
                                        sel1={select.sel1}
                                        sel2={select.sel2}/>
                            })}
                        </div>
                    ): (<div>
                        
                    </div>)}
                </>
                ):(
                <div>
                    {(state.material === 'image') ?(
                        <>
                            {image ? (
                                <div>
                                    {image.map(m =>{
                                        return <ImageMaterial
                                                key={m.id}
                                                image_link={m.image_link}
                                                user_id={id}
                                                sel1={select.sel1}
                                                sel2={select.sel2}/>
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