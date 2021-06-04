import React from 'react';
import Search from '../components/Search';

const style = {
    main: {
        width: '400px',
    },
};

function Main() {
    return (
        <div className={style.main}>
            <div>자료 조사 봇</div>
            <Search />
        </div>
    );
}

export default Main;
