import styled from "styled-components"

export const PostBody = styled.div`
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
`
export const PostWrapper = styled.div`
  padding: 10px;
`

export const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
  p{
    margin: 10px;
  }
`

export const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`

export const PostCenter = styled.div`
  align-items: center;
  margin: auto;
  width:95%;
`

export const PostImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`

export const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PostBottomLeft = styled.div`
  display: flex;
  align-items: center;
`

export const LikeCounter = styled.span`
  cursor: pointer;
  border-bottom: 1px dashed gray;
  font-size: 15px;
`