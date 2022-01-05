import styled from "styled-components"

export const TopBar = styled.div`
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  position: sticky;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 5px #b9b9b9;
  
`

// --------------------------- Left side ---------------------------------
export const TopBarLeft = styled.div`
  margin-right: 10px;
  flex: 3;
`

export const Logo = styled.span`
  padding-left: 25px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`

// --------------------------- Center side -------------------------------
export const TopBarCenter = styled.div`
  flex: 5;
  margin-right: 10px;
  border: 1px solid #989898;
  border-radius: 20px;
  
  .searchIcon{
    font-size: 40px;
    margin-left: 10px;
    margin-right: 0px;
    padding-right: 20px ;
    cursor: pointer;
  }
`

export const SearchBar = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: -10px;
  margin-right: auto;
  border-radius: 20px;
`

// --------------------------- Right side --------------------------------
export const TopBarRight = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 10%;
`

export const TopBarIcons = styled.div`
  display: flex;
  .topbarIconItem {
    margin-right: 25px;
    cursor: pointer;
    position: relative;
  }
  .topbarIconBadge {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    color: white;
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
`

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`