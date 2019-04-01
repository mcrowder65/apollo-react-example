import React from "react";
import { Query } from "react-apollo";
import Post from "./post";
import AddPost from "./add-post";
import { GET_POSTS } from "./graphql/queries";
const Posts = () => {
  return (
    <Query query={GET_POSTS} errorPolicy="all">
      {({ loading, error, data }) => {
        if (loading) {
          return "loading...";
        }

        if (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return "error :(";
        }
        return (
          <>
            <AddPost />
            {data.posts.map(post => {
              return <Post {...post} key={post.id} />;
            })}
          </>
        );
      }}
    </Query>
  );
};

export default Posts;
