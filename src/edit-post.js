import React from "react";
import { DefaultValue, LoaderButton } from "mooks";
import { TextField, Card, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function EditPost(props) {
  return (
    <Card className={props.classes.card}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <form onSubmit={props.onSubmit}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item className={props.classes.element}>
                <DefaultValue value={props.title}>
                  <TextField
                    required
                    inputProps={{ "data-testid": "title" }}
                    defaultValue={props.title}
                    label="Title"
                    name="title"
                  />
                </DefaultValue>
              </Grid>
              <Grid item className={props.classes.element}>
                <DefaultValue value={props.body}>
                  <TextField
                    required
                    inputProps={{ "data-testid": "body" }}
                    defaultValue={props.body}
                    label="Body"
                    name="body"
                    multiline
                  />
                </DefaultValue>
              </Grid>
              <Grid item className={props.classes.element}>
                <LoaderButton
                  type="submit"
                  isLoading={props.isLoading}
                  variant="contained"
                  color="primary"
                  data-testid="submit"
                >
                  SUBMIT
                </LoaderButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Card>
  );
}

const styles = {
  card: {
    width: 400,
    padding: 20
  },
  element: {
    width: "100%",
    margin: 10
  }
};
export default withStyles(styles)(EditPost);
