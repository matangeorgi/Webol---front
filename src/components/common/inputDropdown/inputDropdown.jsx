
import axios from "axios";
import React, {useEffect, useState} from "react";
import {InputCategory} from "../newPost/newPost.styled";
import {ContainerDiv, Li, Ul} from "./inputDropdown.styled";
import useClickOutside from "../../../hooks/useClickOutside";
import UseInfiniteScroll from "../../../hooks/useInfiniteScroll";

const InputDropdown = props => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [value, setValue] = useState(null);

    const ulRef = UseInfiniteScroll(false, setItems, items, `${props.url}/${value}`);

    const dropdownRef = useClickOutside(() => {
        setDropdownVisible(false);
    })

    useEffect(() => {
        if (props.selectedValue !== inputValue)
            setDropdownVisible(true);
    },[inputValue])

    useEffect(() => {
        setInputValue(props.selectedValue);
    }, [props.selectedValue])

    const fetchData = async(value) => {
        setInputValue(value.target.value);
        try{
            if (value.target.value){
                const res = await axios.get(`${props.url}/${value.target.value}/0`);
                setValue(value.target.value);
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
                    <InputCategory value={inputValue} placeholder={props.placeholder} onChange={fetchData}/>
                    {inputValue && dropdownVisible?
                        <ContainerDiv ref={dropdownRef}>
                            <Ul ref={ulRef}>
                                {items.map(item => (
                                    <Li key={item} onClick={() => SelectItem(item)}>{item}</Li>
                                ))}
                            </Ul>
                        </ContainerDiv>
                         : null
                    }
                </div>
            </div>
        </div>:null
    );
}

export default InputDropdown;