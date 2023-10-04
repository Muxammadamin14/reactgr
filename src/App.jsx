import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const fetchPosts = (userId) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchAlbums = (userId) => {
    axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchTodos = (userId) => {
    axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handlePostsClick = (userId) => {
    if (selectedUser === userId && isOpen) {
      setIsOpen(false);
    } else {
      setSelectedUser(userId);
      fetchPosts(userId);
      setIsOpen(true);
    }
  };

  const handleAlbumClick = (userId) => {
    if (selectedUser === userId && isOpen) {
      setIsOpen(false);
    } else {
      setSelectedUser(userId);
      fetchAlbums(userId);
      setIsOpen(true);
    }
  };

  const handleTodosClick = (userId) => {
    if (selectedUser === userId && isOpen) {
      setIsOpen(false);
    } else {
      setSelectedUser(userId);
      fetchTodos(userId);
      setIsOpen(true);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Список пользователей</h1>
      {users.map(user => (
        <div key={user.id} className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <p className="card-text">{user.username}</p>
            <p className="card-text">{user.email}</p>
            <button className="btn btn-primary" onClick={() => handleTodosClick(user.id)}>Todos</button>
            <button className="btn btn-primary" onClick={() => handleAlbumClick(user.id)}>Album</button>
            <button className="btn btn-primary" onClick={() => handlePostsClick(user.id)}>Posts</button>
            {selectedUser === user.id && isOpen && (
              <div className="mt-4">
                {posts.map(post => (
                  <div key={post.id} className="card mt-4">
                    <div className="card-body">
                      <h3 className="card-title">{post.title}</h3>
                      <p className="card-text">{post.body}</p>
                    </div>
                  </div>
                ))}
                {albums.map(album => (
                  <div key={album.id} className="card mt-4">
                    <div className="card-body">
                      <h3 className="card-title">{album.title}</h3>
                      {/* Отображение фото из альбома */}
                    </div>
                  </div>
                ))}
                {todos.map(todo => (
                  <div key={todo.id} className="card mt-4">
                    <div className="card-body">
                      <h3 className="card-title">{todo.title}</h3>
                      <p className="card-text">{todo.completed ? '✅' : '🚫'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
