import React from "react";
import {
  render as rtlRender,
  waitForElement,
  fireEvent
} from "react-testing-library";
import { sleep } from "mooks";
import Posts from "../posts";
import { MockedProvider } from "react-apollo/test-utils";
import { GET_POSTS } from "../graphql/queries";
import { CREATE_POST, DELETE_POST, UPDATE_POST } from "../graphql/mutations";

const render = (yourUi, { mocks = [], addTypeName = false } = {}) => {
  return rtlRender(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypeName}
      resolvers={{
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } });
          }
        }
      }}
    >
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
          ],
          isConnected: true
        }
      }
    },
    {
      request: {
        query: DELETE_POST,
        variables: { id: "react-asdf" }
      },
      result: {
        data: {
          deletePost: []
        }
      }
    },
    {
      request: {
        query: UPDATE_POST,
        variables: {
          id: "react-asdf",
          title: "How to learn vue",
          body: "learning react is awesome!"
        }
      },
      result: {
        data: {
          updatePost: [
            {
              title: "How to learn vue",
              body: "learning react is awesome!",
              id: "react-asdf",
              __typename: "Post"
            }
          ]
        }
      }
    },
    {
      request: {
        query: CREATE_POST,
        variables: {
          title: "How to learn angular",
          body: "Angular is cool, i guess?"
        }
      },
      result: {
        data: {
          createPost: [
            {
              id: "angular-asdf",
              title: "How to learn angular",
              body: "Angular is cool, i guess?",
              __typename: "Post"
            }
          ]
        }
      }
    }
  ];
  const { getByText, getByTestId, queryByText } = render(<Posts />, {
    mocks
  });
  // VIEW
  await waitForElement(() => getByText(/loading.../i));
  await sleep(100);
  expect(getByText(/how to learn react/i)).toBeInTheDocument();

  // UPDATE
  fireEvent.click(getByTestId("open-edit-post-react-asdf"));
  getByTestId("title").value = "How to learn vue";
  fireEvent.click(getByTestId("submit"));
  await sleep(100);
  expect(queryByText(/how to learn react/i)).toBeNull();

  expect(getByText(/how to learn vue/i)).toBeInTheDocument();

  // DELETE
  fireEvent.click(getByTestId("delete-post-react-asdf"));

  await sleep(100);
  expect(queryByText(/how to learn vue/i)).toBeNull();

  //  CREATE

  fireEvent.click(getByTestId("open-create-modal"));
  getByTestId("title").value = "How to learn angular";
  getByTestId("body").value = "Angular is cool, i guess?";
  fireEvent.click(getByTestId("submit"));
  await sleep(100);

  expect(getByText(/how to learn angular/i)).toBeInTheDocument();
  expect(getByText(/Angular is cool, i guess?/i)).toBeInTheDocument();
});
