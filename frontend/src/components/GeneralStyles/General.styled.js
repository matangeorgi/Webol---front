import styled from "styled-components";

export const Button = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 0px;
  color: white;
  border-radius: 10px;
  transition: all 0.2s;
  background-color: #5450bd;
  box-shadow: 0px 0px 10px #6f6cd2;

  :hover {
    outline: none;
    color: white;
    background-color: #433ebd;
  }
`;

export const P = styled.p`
  line-height: 2em;
  font-family: 'Poppins';
  white-space: pre-wrap;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;
