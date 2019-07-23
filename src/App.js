import React from 'react';
import './App.css';
import Main from './components/main';
import List from './components/list';
import ModalClass from './components/modal';

class App extends React.Component{
 
  state = {
    name: '',
    hello: '',
    show: true
  }

  updateValue = (name, hello, show) => {
    this.setState({
      name: name,
      hello: hello,
      show: show
    })
  }

  render() {
  return (
    <div className="App">
      <ModalClass updateValue = {this.updateValue}/>
      <Main name = {this.state.name}
            hello = {this.state.hello}
            show = {this.state.show}/>
      <List/>
    </div>
  );
}
}

export default App;
