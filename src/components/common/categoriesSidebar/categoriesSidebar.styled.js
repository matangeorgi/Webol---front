import styled from "styled-components";

export const SidebarDiv = styled.div`
  z-index: 1;
  height: fit-content;
  left: 10px;
  bottom: 0;
  position: fixed;
  background-color: white;
  border-radius: 8px;
  width: 300px;
  
  box-sizing:border-box
`;

export const ListDiv = styled.div`
  font-family: 'Poppins';
  transform: ${props => props.open? 'translateX(0%)':'translateX(-110%)'};
  overflow-x: hidden;
  overflow-y: ${props => props.overflowY ? 'auto' : 'hidden'};
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  bottom: 0;
  box-shadow: 0px 0px 10px #b9b9b9;
  border-radius: var(--border-radius);
  padding: 1rem;
  transition: all var(--speed) ease;
  font-weight: bold;
`;

export const TopDiv = styled.div`
  color: #5450bd;
  display: flex;

  h4 {
    margin-left: 5px;
  }

  svg path {
    fill: #5450bd;
  }
`;

export const IconButton = styled.span`
  width: 30px;
  height: 30px;
  background-color: #635fc2;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: #ffffff;
    width: 20px;
    height: 20px;
  }
`;

export const CategoryDiv = styled.div`
  display: flex;
  height: 35px;
  border-radius: 8px;
  transition: all 500ms ease;
  margin-bottom: 10px;
  p {
    margin-left: 5px;
  }

  :hover {
    color: white;
    cursor: pointer;
    background-color: #c4c3e0;
  }
`;