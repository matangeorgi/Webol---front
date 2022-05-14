import styled from "styled-components";

export const PostBody = styled.div`
  background-color: white;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin-bottom: 20px;
`;
export const PostWrapper = styled.div`
  padding: 10px;
`;

export const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  span{
    cursor: pointer;
  }
`;

export const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
  
  span{
    cursor: pointer;
  }
  p {
    margin: 10px;
  }
`;

export const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export const PostCenter = styled.div`
  align-items: center;
  margin: auto;
  width: 95%;
`;

export const PostImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  cursor: pointer;
`;

export const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PostBottomLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const LikeCounter = styled.span`
  cursor: pointer;
  border-bottom: 1px dashed gray;
  font-size: 15px;
`;

export const CommentArea = styled.textarea`
  width: 100%;
  outline: none;
  height:${(props) => props.height};
  font-family: 'Poppins';
`;

export const Options = styled.div`
  position: absolute;
  z-index: 1;
  margin-top: 10px;
  height: 100px;
  width: 100px;
  transform: translateX(-45%);
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  transition: all 500ms ease;
  box-shadow: 0px 0px 10px #b9b9b9;
  cursor: auto;

  p {
    transition: all 300ms ease;
    border-radius: 8px;
    cursor: pointer;

    :hover {
      background-color: #d9d9ec;
    }
  }
`;
