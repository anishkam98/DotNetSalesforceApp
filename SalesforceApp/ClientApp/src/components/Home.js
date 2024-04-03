import React, { Component } from 'react';
import './PageStyles.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className='component-background'>
        <h1>Home</h1>
        <p>This is a simple web application built using ASP.NET and React, integrated with a Developer edition Salesforce Org.</p>
      </div>
    );
  }
}
