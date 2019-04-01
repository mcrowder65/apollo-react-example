import React from "react";
import { Mutation } from "react-apollo";
import { Button, Modal } from "@material-ui/core";
import { useLocalStorageSetState, getElements } from "mooks";
import { CREATE_POST } from "./graphql/mutations";
import EditPost from "./edit-post";
import { GET_POSTS } from "./graphql/queries";
function AddPost() {
  const [open, setOpen] = useLocalStorageSetState(false, "adding-post");

  return (
    <>
      <Mutation
        mutation={CREATE_POST}
        update={(cache, { data: { createPost } }) => {
          cache.writeQuery({ query: GET_POSTS, data: { posts: createPost } });
        }}
      >
        {(createPost, { loading }) => {
          const onSubmit = async e => {
            e.preventDefault();
            const { title, body } = getElements(e);
            await createPost({ variables: { title, body } });
            setOpen(false);
          };
          return (
            <>
              <Modal open={open}>
                <EditPost
                  title=""
                  body=""
                  onSubmit={onSubmit}
                  isLoading={loading}
                />
              </Modal>
              <Button
                data-testid="open-create-modal"
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
              >
                Add post
              </Button>
            </>
          );
        }}
      </Mutation>
    </>
  );
}

export default AddPost;
