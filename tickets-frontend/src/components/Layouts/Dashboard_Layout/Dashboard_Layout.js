import React from 'react';
import Menu from '../Menu/Menu'
const Dashboard_Layout = ({
    HeaderPage = "Name",
    Description = "Description",
    className,
    childern
}) => {
    return (
        <div>
            <Menu />
            <div className='container-fluid'>
                <h2>{HeaderPage}</h2>
                <p style={{ cursor: 'pointer', color: '#5cdb95' }}>{Description}</p>
            </div>
            <div className={className}>{childern}</div>

        </div>

    )
}


export default Dashboard_Layout;