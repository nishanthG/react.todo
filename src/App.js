import React, { Component } from 'react';

import './App.css';
// import Counter from './components/Counter';
import TodoApp from './components/todo/TodoApp';

//Root Component
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter></Counter>*/}
        <TodoApp/>
      </div>
    );
  }
}

export default App;