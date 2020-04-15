import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"
import * as serviceWorker from "./serviceWorker"

import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-boost"
import ApolloClient, { gql } from "apollo-boost"

//instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

// client
//   .query({
//     query: gql`
//       {
//         link(id: 1) {
//           id
//           description
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result))

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
