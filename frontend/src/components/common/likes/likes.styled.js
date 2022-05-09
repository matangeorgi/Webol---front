import styled from "styled-components";

export const Modal = styled.div`
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;
  width: 350px;
  height: 450px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const TopDiv = styled.div`
  height: 40px;
  background-color: #5450bd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  position: sticky;
  color: white;

  p {
    position: relative;
    top: 5px;
  }
`;

export const Ul = styled.ul`
  height: 400px;
  overflow-y: scroll;
  list-style-type: none;
  background-color: white;
`;

export const CloseButton = styled.span`
  cursor: pointer;
  position:relative;
  bottom: 43px;
  left: 310px;
`;