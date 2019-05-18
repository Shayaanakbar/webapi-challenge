import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = { name: [] }

  componentDidMount() {
    fetch('/name')
      .then(res => res.json())
      .then(name => this.setState ({ name }));
  }


  render() {
    return (
      <div className={App}>
        <h1>Name</h1>
        <ul>
          {this.state.name.map(name =>
            <li key={name.id}></li>
          )}
        </ul>
      </div>
    )
  }
}

export default App;
