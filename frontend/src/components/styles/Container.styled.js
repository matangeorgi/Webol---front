 import styled from "styled-components"

 export const Container = styled.div`
  position: absolute;
  background-color: white;
  height:fit-content;
  width:385px;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px #b9b9b9;

  @media only screen and (max-width:400px) {
   width:95%;
  }
  `
 export const InsideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  font-family: 'Poppins';
`

 export const ForgotPass = styled.div`
  color: #A7A3FF;
  position: relative;
  right: -190px;
  font-size: 14px;
  align-items: end;
  a{
   color: grey;
  }
 `

 export const LoginStyle = styled.div`
  height:550px;
  .forgot{ // Forgot Password
   color: #A7A3FF;
   position: relative;
   right: -190px;
   font-size: 14px;
   font-family: 'Poppins';
   align-items: end;
  }
`