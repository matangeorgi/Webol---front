import styled from "styled-components"

export const Input = styled.input`
  margin-top: 6px;
  min-width: 320px;
  height: 53px;
  padding: 0px 20px;
  font-size: 16px;
  font-family: 'Poppins';
  background-color: #F0EFFF;
  border: 0;
  border-radius: 10px;
  transition: all 250ms ease-in-out;
  ::placeholder{
   color: #A7A3FF;
  }
  &:focus {
   outline: none;
   box-shadow: 0px 0px 5px 0.8px #A7A3FF;
  }
 `

export const Button = styled.button`
 width: 320px;
 height: 53px;
 display:inline-block;
 padding:0.3em 1.2em;
 margin:0 0.3em 0.3em 0;
 border-radius:10px;
 box-sizing: border-box;
 text-decoration:none;
 font-weight:300;
 color:#FFFFFF;
 background-color:#5450bd;
 text-align:center;
 font-weight: bold;
 transition: all 0.2s;
 border: 0px;
 box-shadow: 0px 0px 10px #6f6cd2;
`