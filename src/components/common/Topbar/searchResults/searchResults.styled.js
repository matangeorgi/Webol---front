import styled from "styled-components";

export const SearchModal = styled.div`
  width: 290px;
  background-color: white;
  position: fixed;
  top: 60px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  max-height: 300px;
  
  li{
    transition: background-color 500ms ease;
    :hover {
      background-color: #c4c3e0;
    }
  }

`;

export const Ul = styled.ul`
  box-shadow: 0px 8px 16px -8px rgba(0, 0, 0, 0.68);
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
`;

export const NoMatchesDiv = styled.div`
  box-shadow: 0px 8px 16px -8px rgba(0, 0, 0, 0.68);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 30px;
`;