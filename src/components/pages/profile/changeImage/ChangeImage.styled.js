import styled from "styled-components";

export const ModalBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.color || '#1D2226'};
  padding: 50px;
  z-index: 1000;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
  max-height: 600px;
  overflow-y: auto;
`;

export const CloseButton = styled.span`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 1000;
`;

export const IconButton = styled.span`
  --button-size: ${(props) => props.size};
  width: var(--button-size);
  height: var(--button-size);
  padding: 5px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  
  :hover {
    filter: brightness(1.5);
  }
  
  svg{
    fill: #dadce1;
    width: 50px;
    height: 50px;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  border-radius: 10px;
  transition: background-color 300ms ease-in-out;
  
  span {
    margin: auto;
  }
  input{
    display: none;
  }
  
  :hover {
    background-color: #2e353b;
    filter: brightness(1.5);
  }
`;