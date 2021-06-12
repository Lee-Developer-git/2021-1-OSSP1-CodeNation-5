import React, { useState, useEffect } from 'react';

function StoredCommonMaterial({id}){

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/material/common/' + id)
            .then(response => response.json())
            .then(response => {
                setData(response);
            });
    }, []);

    const dataList = data.map(e => <li key={e.user_id}>title : {e.material_name}<br/>url : {e.material_link}<br/></li>);

    return(
        <div>
            <br/>
            <h4>자료목록</h4>
            <ul>{dataList}</ul>
        </div>
    );
}

export default StoredCommonMaterial;