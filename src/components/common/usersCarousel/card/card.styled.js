import styled from "styled-components";

export const CardDiv = styled.div`
  width: 100%;
  height: 170px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  p{
    margin: 0;
    b{
      cursor: pointer;
    }
  }
`;

export const ProfileImg = styled.img`
  cursor: pointer;
  position: relative;
  margin-bottom: auto;
  width: 50%;
  border-radius: 50% 50%;
  object-fit: cover;
`;