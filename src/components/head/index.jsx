import React from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';

export default () => (
  <header>
    <section id="brand-section"><NavLink to="/">mPharma Products</NavLink></section>
    <section id="navigation-section">
      <ul>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/archived">Archived</NavLink></li>
        <li><NavLink to="/all">All</NavLink></li>
      </ul>
    </section>
    <section id="user-details-section">Demo User</section>
  </header>
);
