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

export const TopDiv = styled.div`
  margin: auto;
  display: flex;
`;

export const TabButton = styled.div`
  margin: 15px;
  color: ${props => props.chosen ? '#ffffff' : '#6f6cd2'};
  background-color: ${props => props.chosen ? '#726fb9' : null};
  box-shadow: ${props => props.chosen ? '0px 0px 5px 0.8px #A7A3FF' : null};
  transition: all 500ms ease;
  border-radius: 8px;
  width: 45px;
  height: 45px;
  cursor: pointer;

  svg {
    margin: 2px auto auto;
    display: flex;
  }
`;