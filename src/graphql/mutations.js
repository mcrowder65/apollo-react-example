import { gql } from "apollo-boost";

export const DELETE_POST = gql`
  mutation deletePost($id: String) {
    deletePost(id: $id) {
      id
      body
      title
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String, $body: String) {
    createPost(title: $title, body: $body) {
      id
      body
      title
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($title: String, $body: String, $id: String) {
    updatePost(title: $title, body: $body, id: $id) {
      id
      body
      title
    }
  }
`;
