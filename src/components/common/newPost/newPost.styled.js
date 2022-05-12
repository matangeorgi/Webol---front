import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`;

export const ContainerWrapepr = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;

`;

export const TextArea = styled.textarea`
  border-radius: 10px;
  outline: none;
  line-height: 2em;
  margin-left: 10px;
  border: none;
  width: 90%;
  position: relative;
  top: 10px;
  height:${(props) => props.height};
  font-family: 'Poppins';
`;

export const Line = styled.hr`
  margin: 20px;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Options = styled.div`
  display: flex;
  margin-left: 20px;
`;

export const PostOption = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;

  input {
    display: none;
  }
`;

export const SpanForIcon = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const IconMedia = styled.span`
  margin-right: 5px;
  color: #5450bd;
`;

export const PostButton = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: #5450bd;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  color: white;
  text-align: center;
`;

export const Img = styled.img`
  max-width: 90%;
  max-height: 90%;
`;