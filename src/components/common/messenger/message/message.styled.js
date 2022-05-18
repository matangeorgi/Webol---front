import styled from "styled-components";

export const MessageBody = styled.div`
  background-color: ${props => props.isMine? '#7A58FF' : '#9BA4B4'};
  border-radius: 50px;
  margin-left: ${props => props.isMine? 'auto' : null};
  width: fit-content;
  display: flex;
  margin-bottom: 10px;
  p{
    text-align: center;
    margin: 5px;
  }
`;