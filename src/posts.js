import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Post from "./post";
import AddPost from "./add-post";
const GET_POSTS = gql`
  query {
    posts {
      id
      body
      title
    }
  }
`;
const Posts = () => {
  return (
    <Query query={GET_POSTS} errorPolicy="all">
      {({ loading, error, data }) => {
        if (loading) {
          return "loading...";
        }

        if (error) {
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
