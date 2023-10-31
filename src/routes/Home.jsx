import axios from "axios"

import { useState, useEffect } from "react"


import './Home.css'

function Home() {

    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        try {
            const response = await axios.get("https://api.github.com/users/Allanpt/repos?page=${page}&per_page=100", {
                headers: {
                    Authorization: `Bearer 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`
                }
            })
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

    useEffect(() => {
        const fetchLanguages = async (post) => {
            try {
                const languagesResponse = await axios.get(post.languages_url, {
                    headers: {
                        Authorization: `Bearer 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`
                    }
                });
                const languages = Object.keys(languagesResponse.data);
                return languages;
            } catch (error) {
                console.error(error);
                return [];
            }
        }
    
        const getLanguagesForPost = async (post) => {
            if (!post.languages) {
                const languages = await fetchLanguages(post);
                setPosts(prevPosts => prevPosts.map(prevPost => prevPost.id === post.id ? { ...prevPost, languages } : prevPost));
            }
        }
    
        if (posts.length > 0) {
            posts.forEach(post => getLanguagesForPost(post));
        }
    }, [posts]);
    const sortedPosts = [...posts].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <div id="home">
        <h1>Repositórios do GitHub</h1>
        {sortedPosts.length === 0 ? <p>Carregando</p> : (
            sortedPosts.map((post) => (
                <a href={post.svn_url} target="_blank" rel="noopener noreferrer" className="post" key={post.id}>
                    <div className="header">
                        <h2>{post.name}</h2>
                        <div className="languages">
                            {post.languages && post.languages.map((language) => (
                                <p key={language}>{language}</p>
                            ))}
                        </div>
                    </div>
                    <p className="description">{post.description}</p>
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