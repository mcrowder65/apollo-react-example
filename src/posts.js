import React from "react";
import { Query } from "react-apollo";
import Post from "./post";
import AddPost from "./add-post";
import { GET_POSTS } from "./graphql/queries";
const Posts = () => {
  return (
    <Query query={GET_POSTS} errorPolicy="all" pollInterval={1000}>
      {({ loading, error, data }) => {
        if (loading) {
          return "loading...";
        }

        if (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return "error :(";
        }
        // eslint-disable-next-line no-console
        console.log("data ", data);
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
