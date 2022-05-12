import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  outline: none;
  margin-left: 10px;
  line-height: 2em;
  resize: none;
  height: ${(props) => props.height};
  border-style: ${(props) => props.borderStyle};
  overflow:hidden;
  border-radius: 5px;
  font-family: 'Poppins';
  margin-bottom: 6.5px;
`;