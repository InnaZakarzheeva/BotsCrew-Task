import React from 'react';
import './App.css';
import Modal from 'react-responsive-modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment/moment.js'
import del from './image/delete.png';
import edit from './image/edit.png';
import save from './image/save.png';

class App extends React.Component{

  state = {
    open: true,
    hello: '',
    name: '',
    isValid: false,
    show: true,
    date: moment(),
    tasks: [],
    currentItem: {
      text: '',
      key: '',
      checked: false
    },
    editIndex: '',
    numberItem: 0
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };
 
  componentDidMount () {
    this.interval = setInterval( () => {
      this.setState({
        date: moment()
      })
    })
  }
  
  handleDate = () => {
    if(this.state.date.format('HH') < 12) {
      this.setState({
        hello: 'Good morning'
      })
    } else if(this.state.date.format('HH') < 18) {
      this.setState({
        hello: 'Good afternoon'
      })
    } else if(this.state.date.format('HH') < 23) {
      this.setState({
        hello: 'Good evenning'
      })
    }
    if(this.state.name !== ''){
      this.setState({
        show: !this.state.show
      })
    }
  }

  handleHello = () => {
    this.setState({
      isValid: true
    })
    if(this.state.name !== ''){
      this.setState({ 
        open: false
      })
    }
    this.handleDate()
  }

  handleInput = ({ target: {value} }) => {
    const currentItem = {
      text: value,
      key: Date.now()
    } 
    this.setState({
      currentItem: currentItem
    })
  }

  handleAddInput = () => {
    if(this.state.currentItem.text !== '') {
      this.setState ({
        tasks: [...this.state.tasks, this.state.currentItem],
        currentItem: {
          text: '',
          key: ''
        },
        numberItem: this.state.numberItem + 1
      })
    }
  }

  handleResolved = (key) => {
    this.setState({
      tasks: this.state.tasks.filter(item => {
        if(item.key === key){
          item.checked = !item.checked 
          if(item.checked === true){
            this.setState({
              numberItem: this.state.numberItem - 1
            })
          } else {
            this.setState({
              numberItem: this.state.numberItem + 1
            })
          }
        }  
        return item      
      })
    })
  }

  createList = (task, index) => {
    if(this.state.editIndex === index){
      return <div key={task.key} className="item-wrapper">
                <TextField value={task.text} onChange={(event) => {task.text = event.target.value}}/>
                <img src={save} alt="imgSave" onClick={() => this.setState({editIndex: -1})}/>
             </div>
    } else {
      return <div key={task.key} className="item-wrapper">
                <Checkbox color="primary" onClick={() => this.handleResolved(task.key)}/>
                <span style={{textDecoration: task.checked ? 'line-through' : 'none'}}>{task.text}</span>
                <img src={edit} alt="imgEdit" onClick={() => this.setState({editIndex: index})}/>
             </div>
    }
  }
  render() {
  return (
    <div className="App">
      <Modal open={this.state.open} onClose={this.onCloseModal} center>
        <div className="modal">
          <span>Hello, user!</span>
          <span>Please, enter your name!</span>
          <TextField label="Name" onChange={(event) => {this.setState({name: event.target.value})}} />
          <span className="text-error">
            {this.state.isValid ? "This is field can't be empty!" : null}
          </span>
          <Button variant="contained" color="primary" onClick={this.handleHello}>SIGN IN</Button>
        </div>
      </Modal>
      <br/>
      <div className="user-wrapper" style={{display: this.state.show ? 'none' : 'flex'}}>
        <span>{this.state.hello}, {this.state.name}</span>
        <span>{this.state.date.format('HH:mm')}</span>
      </div>
      <br/>
      <div className="list-wrapper">
        <br/>
        <span>{this.state.numberItem} To Do</span>
        <div className="input-wrapper">
          <TextField label="New ToDo" value={this.state.currentItem.text} onChange={this.handleInput}/>
          <Button variant="contained" color="primary" onClick={this.handleAddInput} className="add-button">ADD</Button>
        </div>
        <br/>
        {this.state.tasks.map(this.createList)}
        <br/>
      </div>
    </div>
  );
}
}

export default App;
