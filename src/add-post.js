import React from "react";
import { Mutation } from "react-apollo";
import { Button, Modal, Grid } from "@material-ui/core";
import { useLocalStorageSetState, getElements } from "mooks";
import { CREATE_POST, UPDATE_NETWORK_STATUS } from "./graphql/mutations";
import EditPost from "./edit-post";
import { GET_POSTS } from "./graphql/queries";
function AddPost() {
  const [open, setOpen] = useLocalStorageSetState(false, "adding-post");

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Mutation mutation={UPDATE_NETWORK_STATUS}>
          {updateNetworkStatus => {
            return (
              <Mutation
                mutation={CREATE_POST}
                update={(cache, { data: { createPost } }) => {
                  cache.writeQuery({
                    query: GET_POSTS,
                    data: { posts: createPost }
                  });
                }}
              >
                {(createPost, { loading }) => {
                  const onSubmit = async e => {
                    e.preventDefault();
                    const { title, body } = getElements(e);
                    updateNetworkStatus({ variables: { isConnected: false } });
                    await createPost({ variables: { title, body } });
                    setOpen(false);
                  };
                  return (
                    <Grid container justify="center" alignItems="center">
                      <Grid item>
                        <Modal open={open}>
                          <Grid container justify="center" alignItems="center">
                            <Grid item>
                              <EditPost
                                title=""
                                body=""
                                onSubmit={onSubmit}
                                isLoading={loading}
                              />
                            </Grid>
                          </Grid>
                        </Modal>
                      </Grid>
                      <Grid item>
                        <Button
                          data-testid="open-create-modal"
                          variant="contained"
                          color="primary"
                          onClick={() => setOpen(true)}
                        >
                          Add post
                        </Button>
                      </Grid>
                    </Grid>
                  );
                }}
              </Mutation>
            );
          }}
        </Mutation>
      </Grid>
    </Grid>
  );
}

export default AddPost;
