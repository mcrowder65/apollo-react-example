import React from "react";
import { Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DeletePost from "./delete-post";
import UpdatePost from "./update-post";

function Post(props) {
  return (
    <Card className={props.classes.card}>
      {props.title} <br /> {props.body}
      <br />
      <DeletePost id={props.id} />
      <UpdatePost id={props.id} title={props.title} body={props.body} />
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
