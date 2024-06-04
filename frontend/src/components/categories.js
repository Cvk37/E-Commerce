// CategoryTable.js

import React from 'react';

const Categories = ({ categories }) => {
  return (
    <div>
      <h1>Categories</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td><a href={`http://localhost:3000/categories/${category.categoryId}/${category.name}`}>{category.name}</a></td>
              <td>{category.description}</td>
              {/* Add more columns based on your Category entity */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
