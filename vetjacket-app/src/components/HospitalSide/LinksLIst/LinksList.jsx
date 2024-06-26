import React from 'react';
import { useAuth } from '../../../store/useAuth';

const LinksList = () => {
    const {user } = useAuth();

console.log("user", user);
  if (!user) {
    return <p>Please log in to see this page.</p>;
  }

  return (
    <div>
      <h1>Links for {user.name}</h1>
      <ul>
        <li>User ID: {user.uuid}</li>
        <li><a href="/some-link">Profile</a></li>
        <li><a href="/some-other-link">Settings</a></li>
      </ul>
    </div>
  ); 
};

export default LinksList;
