import styled from "styled-components";

export const SearchModal = styled.div`
  width: 290px;
  position: fixed;
  top: 60px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: white;
  height: 30px;
  li{
    transition: background-color 500ms ease;
    :hover {
      background-color: #c4c3e0;
    }
  }

`;

export const Ul = styled.ul`
  box-shadow: 0px 8px 16px -8px rgba(0, 0, 0, 0.68);
  position: relative;
  top: -20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  margin-bottom: 10px;
`;

export const NoMatchesDiv = styled.div`
  box-shadow: 0px 8px 16px -8px rgba(0, 0, 0, 0.68);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 30px;
`;