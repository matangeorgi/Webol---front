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
  --button-size: calc(60px * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  background-color: #484a4d;
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
    fill: #dadce1;
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

  span { // Icon button
    margin-right: 0.5rem;

    :hover {
      filter: none;
    }
  }

  :hover {
    background-color: #e1dfea;
    color: #635fc2;
  }
`;
