import React, { useState, useEffect } from 'react'

export default function Admin() {
    const [posts, setPosts] = useState([])

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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogposts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.ok) {
                fetchPosts();
                alert('Post deleted successfully!');
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEdit = (id) => {
        setPosts(posts.map(post => post._id === id ? { ...post, isEditing: !post.isEditing } : post));
    };

    const handleUpdate = async (id, title, author, body) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogposts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title,
                    author,
                    body
                })
            });
            if (response.ok) {
                fetchPosts();
                alert('Post updated successfully!');
            } else {
                alert('Failed to update post');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>ADMIN PAGE: Blog Posts</h2>
            {posts.map((post) => (
                <div key={post._id}>
                    {post.isEditing ? (
                        <>
                            <input type="text" defaultValue={post.title} onChange={(e) => post.title = e.target.value} />
                            <input type="text" defaultValue={post.author} onChange={(e) => post.author = e.target.value} />
                            <input type="text" defaultValue={post.body} onChange={(e) => post.body = e.target.value} />
                            <button onClick={() => handleUpdate(post._id, post.title, post.author, post.body)}>Save</button>
                        </>
                    ) : (
                        <>
                            <h3>{post.title}</h3>
                            <p>By {post.author}</p>
                            <p>{post.body}</p>
                            <button onClick={() => handleEdit(post._id)}>Edit</button>
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                            <hr />
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}
