import React, {useState} from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


//Takes in a list and gives back a selection
const SelectionList = (props) => {

    const handleChange = (event) => {
        props.handleChange && props.handleChange(event);  
    }

    const options = props.list.map((option,index) => {
        return(<MenuItem key={`${index}${option}`} value={option}>{option}</MenuItem>)
    })

    return(

    <Select
        className={`${props.className}`}
        labelId={props.id}
        id={props.id}
        value={props.value}
        onChange={handleChange}
    >
        {options}

  </Select>)
}

export default SelectionList;