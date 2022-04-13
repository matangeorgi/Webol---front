import styled from "styled-components";

export const Page = styled.div`
  width: fit-content;
  position: center;
  display: flex;
  margin: auto;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const CommentsDiv = styled.div`
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`;

export const Comment = styled.div`
  span{
    color: grey;
  }
  hr {
    color: #5450bd;
    position: relative;
    right: 20px;
  }
`;
