import React from 'react'
const Home = ({params}) => {
    const category = params["collection-slug"]
  return (
    <div>{category}</div>
  )
}

export default Home