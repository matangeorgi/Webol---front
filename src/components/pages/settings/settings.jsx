import React, {useState} from "react";

import {CgProfile} from "react-icons/cg"
import {RiLockPasswordLine} from "react-icons/ri"

import AccountSettings from "./accountSettings/accountSettings";
import {TabButton, TopDiv} from "./settings.styled";
import Navbar from "../../common/Navbar/Navbar";
import {Body} from "../profile/Profile.styled";
import ProfileSettings from "./profileSettings/profileSettings";

const Settings = () => {
    const [settingsPage, setSettingsPage] = useState('account');

    return(
        <div>
            <Body>
                <TopDiv>
                    <TabButton chosen={settingsPage==='account'} onClick={() => setSettingsPage('account')}>
                        <RiLockPasswordLine size={40}/>
                    </TabButton>
                    <TabButton chosen={settingsPage==='profile'} onClick={() => setSettingsPage('profile')}>
                        <CgProfile size={40}/>
                    </TabButton>
                </TopDiv>
                {settingsPage === 'account'?
                    <AccountSettings/> : <ProfileSettings/>}
            </Body>
        </div>
    )
};

export default Settings;