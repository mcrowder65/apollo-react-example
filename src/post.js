import React from "react";
import { Card, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DeletePost from "./delete-post";
import UpdatePost from "./update-post";

function Post(props) {
  return (
    <Card className={props.classes.card}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          {props.title} <br /> {props.body}
        </Grid>
      </Grid>
      <br />
      <Grid container justify="space-evenly" alignItems="center">
        <Grid item>
          <DeletePost id={props.id} />
        </Grid>
        <Grid item>
          <UpdatePost id={props.id} title={props.title} body={props.body} />
        </Grid>
      </Grid>
    </Card>
  );
}

const styles = {
  card: {
    margin: 10,
    width: 500,
    padding: 5
  }
};

export default withStyles(styles)(Post);
