import React from "react"
import logo from "../logo.svg"
import "../styles/App.css"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const LINK = gql`
  {
    feed {
      id
      title
      description
      url
      postedBy
      votes
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(LINK)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  if (!data.feed) return null

  return (
    <div className="App">
      <header>GraphQL Fake News</header>
      <div className="news-list">
        {data.feed.map((el) => (
          <div key={el.id} className="news-item">
            <p>
              <span className="news-position">{el.id}. ▲</span>
              <span>
                {el.title.charAt(0).toUpperCase() + el.title.slice(1)}{" "}
                <small>{el.url}</small>
              </span>
              <p>
                <small class="news-info">
                  {" "}
                  {el.votes} votes | (by {el.postedBy})
                </small>
              </p>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
