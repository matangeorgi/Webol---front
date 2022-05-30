import styled from "styled-components";

export const SearchModal = styled.div`
  z-index: 10;
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
  background-color: white;
  height: 30px;
`;

export const TopDiv = styled.div`
  height: 30px;
  background-color: #5450bd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: sticky;
  color: white;
  display: flex;

  div {
    position: relative;
    flex: 3;
    height: 100%;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: background-color 300ms ease;
    cursor: pointer;

    :hover {
      background-color: #6b67d0;
    }

    
  }
  :active {
    background-color: #7a77cb;
  }
`;