import styled from "styled-components"

export const Logo = styled.h2`
  font-size: 58px;
  font-weight: bold;
 `

export const P = styled.p`
 color: ${(props) => props.color};
 a{
  color: ${(props) => props.color};
  font-weight: bold;
 }
`