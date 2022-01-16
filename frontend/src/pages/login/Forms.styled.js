import styled from "styled-components"

export const Input = styled.input`
 margin-top: 6px;
 min-width: 320px;
 height: 53px;
 padding: 0px 20px;
 background-color: #F0EFFF;
 border: 0;
 border-radius: 10px;
 transition: all 250ms ease-in-out;
 ::placeholder{color: #A7A3FF;}
 &:focus {
  outline: none;
  box-shadow: 0px 0px 5px 0.8px #A7A3FF;
 }
 `

export const Logo = styled.h2`
  font-size: 58px;
  font-weight: bold;
 `

export const P = styled.p`
 color: ${(props) => props.color};
 a{
  color: ${(props) => props.color};
  font-weight: bold;
 }
`