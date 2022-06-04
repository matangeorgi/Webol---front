import React, {useEffect, useMemo, useState} from "react";

import {CollapseDiv, RoleDiv, ToggleDiv} from "./profileSettings.styled";
import {DivForm} from "../settings.styled";
import {Field} from "../accountSettings/accountSettings.styled";
import {P} from "../../../common/commonStyles/General.styled";
import {Collapse, Dropdown} from "react-bootstrap";
import InputDropdown from "../../../common/inputDropdown/inputDropdown";
import axios from "axios";

const ProfileSettings = () => {
    const [isPrivate, setIsPrivate] = useState(false);
    const [price, setPrice] = useState(null);
    const [role, setRole] = useState(null);

    const prices = useMemo(()=> ([...Array(51).keys()]),[])

    useEffect(() => {
        if(role){
            async function updateRole() {
                try{
                    await axios.get(`update/updaterole/${role}`);
                }catch{
                    console.error('Could not update role, Server is unavailable');
                }
            }
            updateRole();
        }
    },[role]);

    const SwitchPrivate = async() => {
        setIsPrivate(!isPrivate);
        setPrice(0);
        try{
            await axios.put('update/updateprivatesettings',{isPrivate: !isPrivate});
        }catch{
            console.error('Could not update private setting, Server is unavailable');
        }
    }

    const ChangePrice = async(newPrice) => {
        setPrice(newPrice);
        try{
            await axios.put('update/updateuserprice',{price: newPrice});
        }catch{
            console.error('Could not update price, Server is unavailable');
        }
    }

    useEffect(() => {
        async function fetchData() {
            try{
                const res = await axios.get('update/profileinfo');
                setIsPrivate(res.data.isPrivate);
                setPrice(res.data.price);
                setRole(res.data.role);
            }catch{
                console.error('Could not get role, Server is unavailable');
            }
        }
        fetchData();
    },[])

    return (
        <>
            <DivForm>
                <div>
                    <Field>
                        <P>Profile is private:</P>
                        <ToggleDiv className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch"
                                   checked={isPrivate} onChange={SwitchPrivate}/>
                        </ToggleDiv>
                    </Field>
                    <P size={'14px'} color={'#a09cd5'}>This option will determine if your posts are free and available for all.</P>

                    <Collapse in={isPrivate}>
                        <div id="example-collapse-text">
                            <Field>
                                <P>Price:</P>
                                <CollapseDiv>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic">
                                            {`${price} USD`}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu id='dropdown'>
                                            {prices.map(i => (
                                                <Dropdown.Item key={i} onClick={() => ChangePrice(i)}>{i} USD</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </CollapseDiv>
                            </Field>
                        </div>
                    </Collapse>
                    <Field>
                        <P>Choose role:</P>
                        <RoleDiv>
                            <InputDropdown
                                setSelectedValue={setRole}
                                selectedValue={role || ''}
                                url={'update/getroles'}
                                visible={true}
                                placeholder={'Choose role'}/>
                        </RoleDiv>
                    </Field>
                </div>
            </DivForm>
        </>
    )
};
export default ProfileSettings;