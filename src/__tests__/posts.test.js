import React from "react";
import { render as rtlRender, waitForElement } from "react-testing-library";
import { sleep } from "mooks";
import Posts from "../posts";
import { MockedProvider } from "react-apollo/test-utils";
import { GET_POSTS } from "../graphql/queries";
import { DELETE_POST } from "../graphql/mutations";

const render = (yourUi, { mocks = [], addTypeName = true } = {}) => {
  return rtlRender(
    <MockedProvider mocks={mocks} addTypename={addTypeName}>
      {yourUi}
    </MockedProvider>
  );
};
test("that it renders", () => {
  render(<Posts />);
});

test("that it renders posts and you can delete posts", async () => {
  const mocks = [
    {
      request: {
        query: GET_POSTS
      },
      result: {
        data: {
          posts: [
            {
              title: "How to learn react",
              body: "learning react is awesome!",
              id: "react-asdf",
              __typename: "Post"
            }
          ]
        }
      }
    }
    // {
    //   request: {
    //     mutation: DELETE_POST,
    //     variables: { id: "react-asdf" }
    //   },
    //   result: {
    //     data: {
    //       deletePost: {
    //         posts: []
    //       }
    //     }
    //   }
    // }
  ];
  const { getByText } = render(<Posts />, { mocks });
  await waitForElement(() => getByText(/loading.../i));
  await sleep(0);
  expect(getByText(/how to learn react/i)).toBeInTheDocument();
});
