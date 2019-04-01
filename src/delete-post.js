import React from "react";
import { Mutation } from "react-apollo";
import { DELETE_POST } from "./graphql/mutations";
import { LoaderButton } from "mooks";
import { GET_POSTS } from "./graphql/queries";

function DeletePost(props) {
  return (
    <>
      <Mutation
        mutation={DELETE_POST}
        update={(cache, { data: { deletePost } }) => {
          cache.writeQuery({ query: GET_POSTS, data: { posts: deletePost } });
        }}
      >
        {(deletePost, { loading }) => {
          return (
            <LoaderButton
              data-testid={`delete-post-${props.id}`}
              isLoading={loading}
              color="primary"
              variant="contained"
              onClick={() => {
                deletePost({ variables: { id: props.id } });
              }}
            >
              Delete
            </LoaderButton>
          );
        }}
      </Mutation>
    </>
  );
}

export default DeletePost;
