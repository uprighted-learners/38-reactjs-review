import React, { useState, useEffect } from 'react';

function Home() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogposts`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            alert('Failed to fetch posts: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogposts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    author,
                    body
                })
            });
            setTitle('');
            setAuthor('');
            setBody('');
            fetchPosts(); // Refresh the list of posts after creating a new one
            alert('Post created successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Welcome to the Blog Management System</h2>
            <h3>Create a New Post</h3>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label>Author:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <label>Body:</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
                <button type="submit">Create Post</button>
            </form>

            <h3>Posts</h3>
            {posts.map(post => (
                <div key={post._id}>
                    <h4>{post.title}</h4>
                    <p>Author: {post.author}</p>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
