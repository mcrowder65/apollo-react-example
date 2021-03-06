import React from "react";
import { Mutation } from "react-apollo";
import { useLocalStorageSetState, getElements } from "mooks";
import { UPDATE_POST } from "./graphql/mutations";
import { GET_POSTS } from "./graphql/queries";
import { Button, Modal, Grid } from "@material-ui/core";
import EditPost from "./edit-post";

function UpdatePost(props) {
  const [open, setOpen] = useLocalStorageSetState(false, "update-post");
  return (
    <>
      <Mutation
        mutation={UPDATE_POST}
        update={(cache, { data: { updatePost } }) => {
          cache.writeQuery({ query: GET_POSTS, data: { posts: updatePost } });
        }}
      >
        {(updatePost, { loading }) => {
          const onSubmit = async e => {
            e.preventDefault();
            const { title, body } = getElements(e);
            await updatePost({ variables: { title, body, id: props.id } });
            setOpen(false);
          };
          return (
            <>
              <Modal open={open}>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <EditPost
                      title={props.title}
                      body={props.body}
                      onSubmit={onSubmit}
                      isLoading={loading}
                    />
                  </Grid>
                </Grid>
              </Modal>
              <Button
                data-testid={`open-edit-post-${props.id}`}
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
              >
                EDIT
              </Button>
            </>
          );
        }}
      </Mutation>
    </>
  );
}

export default UpdatePost;
