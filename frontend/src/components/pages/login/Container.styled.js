import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  background-color: white;
  height: fit-content;
  width: 385px;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #b9b9b9;

  @media only screen and (max-width: 400px) {
    width: 95%;
  }
`;

export const InsideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins';
`;
