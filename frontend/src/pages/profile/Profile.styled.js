import styled from "styled-components";

export const Body = styled.div`
  z-index: -1;
  height: fit-content;
  position: center;
  display: flex;
  flex-direction: column;

  box-shadow: 0px 0px 10px #b9b9b9;
  border-radius: 5px;
  width: 100%;

  @media only screen and (min-width: 920px) {
    width: 900px;
  }
`;

export const Images = styled.div`
  z-index: 0;
  margin-top: 10px;
`;

export const ProfileImg = styled.img`
  width: 230px;
  height: 230px;
  border-radius: 50% 50%;
  object-fit: cover;
  border: 1px white solid;
  cursor: ${(props) => props.clickAble ? 'pointer' : 'auto'};
`;

export const ProfileImgDiv = styled.div`
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;

  @media only screen and (min-width: 920px) {
    top: -160px;
    right: 310px;
  }
`;

export const ThemeImage = styled.img`
  object-fit: cover;
  width: 820px;
  height: 300px;
  cursor: ${(props) => props.clickAble ? 'pointer' : 'auto'};
  display: block;

  @media only screen and (max-width: 920px) {
    display: none;
  }
`;

export const MiddleDiv = styled.div`
  z-index: 0;
  flex-direction: column;
  display: flex;
  align-items: center;

  button {
    margin-right: 15px;
  }

  div {
    .skeleton {
      width: 10px;
      display: inline-block;
    }

    margin-bottom: 20px;
    @media only screen and (min-width: 920px) {
      display: Inline-block;
    }
  }

  @media only screen and (min-width: 920px) {
    position: relative;
    top: -260px;
    right: -250px;
    display: Inline-block;
  }
`;

export const Content = styled.div`
  width: 80%;

  @media only screen and (min-width: 920px) {
    position: relative;
    top: -230px;
  }
`;

export const LockIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #5450bd;
  color: #ffffff;
  border-radius: 50%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  box-shadow: 0px 0px 10px #6f6cd2;
  cursor: pointer;

  :hover {
    background-color: #433ebd;
  }
`;

export const BioInput = styled.textarea`
  width: 100%;
  border-radius: 10px;
  outline: none;
  line-height: 2em;
  border-style: dashed;
  font-family: 'Poppins';

  @media only screen and (min-width: 920px) {
    position: absolute;
    right: 3px;
    top: -6.5px;
  }
`;

