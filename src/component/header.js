import React from 'react';
import '../style/style.css';

export default function Header() {
  return (
    <div className="nav">
      <div className="nav-title">React Url Shortner</div>

      <div className="nav-links">
        <ul>
          <li>
            {/* eslint-disable */}
            <a href="/">home</a>
          </li>
          <li>
            <a href="">about</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
