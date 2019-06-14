import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Posts from "./posts";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  clientState: {
    defaults: {
      isConnected: true
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, parameters, { cache }) => {
          cache.writeData({ data: { isConnected: parameters.isConnected } });
        }
      }
    }
  }
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Posts />
    </ApolloProvider>
  );
}

export default App;
