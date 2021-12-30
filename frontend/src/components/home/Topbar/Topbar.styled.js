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

export const Logo = styled.span`
  padding-left: 35px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`

export const Input = styled.input`
  border: none;
  outline: none;
  width: 70%;
`

export const TopBarLeft = styled.div`
`

export const TopBarCenter = styled.div`
  border: 1px solid #989898;
  border-radius: 20px;
  .searchbar {
    width: 100%;
    height: 30px;
    background-color: white;
    display: flex;
    align-items: center;
    border: 1px solid #989898;
  }
  .searchIcon{
    font-size: 35px;
    padding-right: 20px ;
    margin-left: 10px;
    cursor: pointer;
  }
`

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  .topbarIcons {
    display: flex;
  }
  .topbarIconItem {
    margin-right: 15px;
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
  .topbarLink {
    margin-right: 10px;
    font-size: 14px;
    cursor: pointer;
  }
`