import Post from "../post/post";

const Posts = props => {
    return (props.posts ?
            <div>
                {props.posts.map(post => (
                    <Post className="col-5"
                          key={post.id}
                          id={post.id}
                          userId={props.userId || post.user.id}
                          profileurl={props.profileImage || post.user.profileImage}
                          url={post.url}
                          fullname={props.username || post.user.username}
                          date={post.createdAt}
                          desc={post.description}
                          likes={post.likes}
                          comment={post.comments}
                          liked={!!post.like}
                          isMe={post.isMe || props.isMe}
                    />
                ))}
            </div> : null
    );
};

export default Posts;