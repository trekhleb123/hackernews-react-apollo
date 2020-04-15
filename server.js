const express = require("express")
const app = express()
const { ApolloServer, gql } = require("apollo-server-express")
const _find = require("lodash/find")
let links = require("./dummyData")

let idCount = links.length

// The GraphQL schema in string form
const typeDefs = gql`
  type AutoPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
  }

  type Query {
    info: String!
    feed(filter: String): [Link!]!
    link(id: ID!): Link
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
    deleteLink(id: ID!): Link
    signup(email: String!, password: String!, name: String!): AutoPayload
    login(email: String!, password: String!): AutoPayload
    vote(linkId: ID!): Vote
  }

  type Link {
    id: ID!
    title: String!
    description: String!
    url: String!
    postedBy: String
    votes: String
  }

  type Subscription {
    newLink: Link
    newVote: Vote
  }

  type Vote {
    id: ID!
    link: Link!
    user: User!
  }
`

// The resolvers
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, arg) => {
      return _find(links, { id: +arg.id })
    },
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `${idCount++}`,
        title: args.title,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, arg) => {
      const link = _find(links, { id: arg.id })
      link.title = arg.title
      link.url = arg.url
      link.description = arg.description
      return link
    },
    deleteLink: (parent, arg) => {
      const deletedLink = _find(links, { id: arg.id })
      links = links.filter((link) => link.id !== arg.id)
      return deletedLink
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app, path: "/graphql" })

// Start the server
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
