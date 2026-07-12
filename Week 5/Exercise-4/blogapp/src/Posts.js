import React from "react";
import Post from "./Post";
import "./App.css";

class Posts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    loadPosts() {

        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => {

                const posts = data.map(
                    item => new Post(item.id, item.title, item.body)
                );

                this.setState({
                    posts: posts
                });

            })
            .catch(error => {
                alert(error);
            });

    }

    componentDidMount() {
        this.loadPosts();
    }

    componentDidCatch(error, info) {
        alert(error);
        console.log(info);
    }

    render() {

        return (

            <div className="container">

                <h1>Blog Posts</h1>

                {
                    this.state.posts.map(post => (

                        <div className="post" key={post.id}>

                            <h3>{post.title}</h3>

                            <p>{post.body}</p>

                        </div>

                    ))
                }

            </div>

        );

    }

}

export default Posts;