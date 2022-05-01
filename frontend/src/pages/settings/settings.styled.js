import styled from "styled-components";

export const DivForm = styled.div`
  margin: 20px auto 30px;
  @media only screen and (max-width: 610px) {
    width: 90%;
  }

  button {
    display: table;
    margin: 40px auto auto;
  }
`;

export const Top = styled.div`
  display: flex;
  p {
    margin-left: 5px;
  }
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Field = styled.div`
  margin-top: 25px;
  display: flex;

  p{
    margin-right: 10px;
    margin-top: 15px;
  }
  input{
    margin-left: auto;
    margin-right: 0;
    @media only screen and (max-width: 610px) {
      width: 60%;
    }
  }
`;

export const Hr = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
  color: #635fc2;
`;

export const FieldsDiv = styled.div`
  
`;


