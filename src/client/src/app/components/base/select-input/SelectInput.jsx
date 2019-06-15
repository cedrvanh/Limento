import React from 'react';

const SelectInput = (props) => {
    const { children, ...other } = props; 

    return (
        <select {...other}>
            <option value=''></option>
            { children }
        </select>
    );
}

export default SelectInput;