import styled from "styled-components";

export const Body = styled.div`
  z-index: -1;
  height:fit-content;
  position: center;
  display: flex;
  flex-direction: column;

  box-shadow: 0px 0px 10px #b9b9b9;
  border-radius: 5px;
  width: 100%;

  @media only screen and (min-width:920px) {
    width: 900px;
  }
`;

export const Images= styled.div`
  z-index: 0;
  margin-top: 10px;
`;

export const ProfileImg = styled.img`
  width:230px;
  height:230px;
  border-radius: 50% 50%;
  object-fit: cover;
  border: 1px white solid;
  cursor: pointer;
`;

export const ProfileImgDiv = styled.div`
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width:920px) {
    top: -160px;
    right: 310px;
  }
`;

export const ThemeImage = styled.img`
  display: none;
  object-fit: cover;
  width:820px;
  height:300px;
  cursor: pointer;
  display: block;
  
  @media only screen and (max-width:920px) {
    display: none;
  }
`;

export const MiddleDiv = styled.div`
  z-index: 0;
  flex-direction: column;
  display: flex;
  align-items: center;
  button{
    margin-right: 15px;
  }
  div{
    .skeleton{
      width: 10px;
      display:inline-block ;
    }
    margin-bottom: 20px;
    @media only screen and (min-width:920px) {
      display: Inline-block;
    }
  }

  @media only screen and (min-width:920px){
    position: relative;
    top: -260px;
    right: -250px;
    display: Inline-block;
  }
`;

export const Content = styled.div`
  width: 80%;

  @media only screen and (min-width:920px) {
    position: relative;
    top: -230px;
  }
`;

