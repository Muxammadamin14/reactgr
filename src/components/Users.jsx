import React from 'react';
import { Outlet } from 'react-router-dom';

const Users = () => {
  return (
    <div className="container">
      {/* <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
      </ul> */}

      <Outlet />
    </div>
  );
};

export default Users;
