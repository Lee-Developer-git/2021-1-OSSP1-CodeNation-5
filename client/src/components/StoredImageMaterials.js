import React, { useState, useEffect } from 'react';

function StoredImageMaterial({id}){
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/material/image/' + id)
            .then(response => response.json())
            .then(response => {
                setData(response);
            });
    }, []);

    const dataList = data.map(e => <li key={e.user_id}>image_url: {e.image_link}<br/></li>);

    return(
        <div>
            <br/>
            <h4>이미지 자료목록</h4>
            <ul>{dataList}</ul>
        </div>
    );
}

export default StoredImageMaterial;