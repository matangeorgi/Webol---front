import styled from "styled-components";

export const Navrow = styled.div`
  display: flex;
`;

export const NavbarItem = styled.div`
  width: calc(60px * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.span`
  width: 30px;
  height: 30px;
  background-color: #635fc2;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  :hover {
    filter: brightness(1.5);
  }

  svg {
    fill: #ffffff;
    width: 20px;
    height: 20px;
  }
`;

export const OptionButton = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  :hover {
    filter: brightness(1.5);
  }

  svg {
    fill: #635fc2;
    width: 20px;
    height: 20px;
  }
`;

export const DropDownDiv = styled.div`
  position: absolute;
  top: 68px;
  height: 230px;
  width: 300px;
  transform: translateX(-45%);
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
  transition: height 500ms ease;
  box-shadow: 0px 0px 10px #b9b9b9;
`;

export const MenuDiv = styled.div`
  width: 100%;
`;

export const MenuItem = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: background 500ms;
  padding: 0.5rem;
  color: ${(props) => props.color};
  text-decoration: none;
  cursor: pointer;

  span { // Icon button
    margin-right: 0.5rem;
    color: #635fc2;
    :hover {
      filter: none;
    }
  }

  :hover {
    background-color: #c4c3e0;
  }
`;
