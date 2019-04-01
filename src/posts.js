import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
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
        if (data) {
          console.log(data);
        }
        if (loading) {
          return "loading...";
        }

        if (error) {
          console.error(error);
          return "error :(";
        }
        return JSON.stringify(data);
      }}
    </Query>
  );
};

export default Posts;
