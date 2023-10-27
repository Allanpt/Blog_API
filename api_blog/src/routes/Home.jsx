import axios from "axios"

import { useState, useEffect } from "react"

import { Link } from "react-router-dom"

import './Home.css'

function Home() {

    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        try {
            const response = await axios.get("https://api.github.com/users/Allanpt/repos")
            const data = response.data
            console.log(data)
            setPosts(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

  return (
    <div id="home">
        <h1>Repositório</h1>
        {posts.length === 0 ? <p>Carregando</p> : (
            posts.map((post) => (
                <a href={post.svn_url} target="_blank" rel="noopener noreferrer" className="post" key={post.id}>
                    <h2>{post.name}</h2>
                    <p>{post.description}</p>
                    {post.homepage !== null ? (
                        <a href={post.homepage} target="_blank" rel="noopener noreferrer" className="deploy">Deploy</a>
                    ): null}
                </a>
            ))
        )}
    </div>
  )
}

export default Home