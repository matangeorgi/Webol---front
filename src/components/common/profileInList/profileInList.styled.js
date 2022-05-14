import styled from "styled-components";

export const Li = styled.li`
  position: relative;
  right: 30px;
  display: flex;
  padding: 5px;
  margin-left: 5px;
  border-radius: 8px;
  
  p{
    margin-left: 10px;
    margin-top: 5px;
    cursor: pointer;
  }
`;

export const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
