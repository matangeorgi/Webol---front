
import axios from "axios";
import React, {useEffect, useState} from "react";
import {InputCategory} from "../newPost/newPost.styled";
import {Li,Ul} from "./inputDropdown.styled";
import useClickOutside from "../../../hooks/useClickOutside";

const InputDropdown = props => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const dropdownRef = useClickOutside(() => {
        setDropdownVisible(false);
    })

    useEffect(() => {
        if (props.selectedValue !== inputValue)
            setDropdownVisible(true);
    },[inputValue])

    const fetchData = async(value) => {
        setInputValue(value.target.value);
        try{
            if (value.target.value){
                const res = await axios.get(`${props.url}/${value.target.value}/0`);
                setItems(res.data);
            }
        }catch{
            console.error("Couldn't get categories from the server");
        }
    }

    const SelectItem = item => {
        props.setSelectedValue(item);
        setInputValue(item);
        setDropdownVisible(false);
    }

    return (props.visible?
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <InputCategory value={inputValue} placeholder="Choose Category" onChange={fetchData}/>
                    {inputValue && dropdownVisible?
                        <Ul ref={dropdownRef}>
                            {items.map(item => (
                                <Li key={item} onClick={() => SelectItem(item)}>{item}</Li>
                            ))}
                        </Ul> : null
                    }
                </div>
            </div>
        </div>:null
    );
}

export default InputDropdown;