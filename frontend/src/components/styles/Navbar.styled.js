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
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`

export const Input = styled.input`
  width: 400px;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
`

export const TopBarLeft = styled.div`
    flex: 3;
`

export const TopBarCenter = styled.div`
    flex: 5;
`
export const TopBarRight = styled.div`
  flex: 4;
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