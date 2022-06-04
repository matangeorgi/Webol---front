import styled from "styled-components";

export const ContainerDiv = styled.div`
  position: absolute;
`;

export const Ul = styled.ul`
  z-index: 1;
  box-shadow: 0px 8px 16px -8px rgba(0, 0, 0, 0.68);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  width: 200px;
  top: 30px;
  position: relative;
  background-color: white;
  overflow-x: hidden;
`;

export const Li = styled.li`
  list-style-type: none;
  text-align: left;
  margin-left: 0;
  border-radius: 10px;
  transition: background 500ms;
  cursor: default;
  padding: 5px;

  :hover {
    color: #A7A3FF;
    background-color: #525357;
  }
`;

export const SearchDiv = styled.div`
  position: relative;
  left: -17px;
`;