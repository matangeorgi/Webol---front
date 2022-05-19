import styled from "styled-components";

export const MessengerDiv = styled.div`
  z-index: 1;
  height: fit-content;
  right: 10px;
  bottom: 0;
  position:fixed;
  background-color:white;
  border-radius: 8px;
`;

export const SideBar = styled.div`
  font-family: 'Poppins';
  position: absolute;
  bottom: 0;
  max-width: 400px;
  min-width: 250px;
  transform: translateX(-45%);
  background-color: var(--bg);
  box-shadow: 0px 0px 10px #b9b9b9;
  border-radius: var(--border-radius);
  padding: 1rem;
  overflow: hidden;
  transition: all var(--speed) ease;
  h2{
    margin-left: auto;
  }
`;

export const MinimizeDiv = styled.div`
  cursor: pointer;
  padding-left: 10px;
  z-index: 1;
  height: fit-content;
  display: flex;
  right: 10px;
  bottom: 0;
  width: 70px;
  position:fixed;
  background-color:white;
  margin-left:0;
  padding-top: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px #b9b9b9;
  p{
    margin-top: 5px;
    margin-left: 10px;
  }
  svg {
    fill: black;
    width: 30px;
    height: 30px;
    margin: 10px;
  }
`;

export const OnlineBadge = styled.span`
  width: 10px;
  height: 10px;
  background-color: #05d505;
  border-radius: 50%;
  color: white;
  position: relative;
  top: -8px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;


export const Ul = styled.ul`
  li{
    width: 100%;
    background-color:#D2D2D2;
    transition: background-color 500ms ease;
    margin-top:5px;
    :hover {
      cursor: pointer;
      background-color: #c4c3e0;
    }
  }
`;

export const ProfileInChat = styled.span`
  cursor: pointer;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: background 500ms;
  padding: 0.5rem;

  span {
    margin-right: 0.5rem;
    :hover {
      filter: none;
    }
  }
  
  :hover{
    color:#A7A3FF;
    background-color: #525357;
  }
`;

export const NumberBadge = styled.span`
  width: 15px; 
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: relative;
  top: -15px;
  right: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const ProfileImage = styled.span`
  padding: 5px;
  margin: 2px;
  
  svg {
    fill: black;
    width: 30px;
    height: 30px;
  }
`;

export const NameOfChat = styled.div`
  text-align: center;
`;

export const TextAreDiv = styled.div`
  display: flex;
  position: fixed;
  top: 360px;
  textarea{
    margin-bottom: 0;
    margin-right: 5px;
  }
`;



