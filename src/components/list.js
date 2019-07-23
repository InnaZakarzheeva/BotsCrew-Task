import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import edit from '../image/edit.png';
import del from '../image/delete.png';
import save from '../image/save.png';

export default class List extends React.Component{
    
  state = {
    tasks: [],
    currentItem: {
      text: '',
      key: '',
      checked: false
    },
    editIndex: '',
    numberItem: 0
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
  
  handleDelete = (key) => {
    this.setState ({
      tasks: this.state.tasks.filter(task => {
        return task.key !== key
      }),
      numberItem: this.state.numberItem - 1
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
                <div className="img-wrapper">
                  <img src={edit} alt="imgEdit" onClick={() => this.setState({editIndex: index})}/>
                  <img src={del} alt="imgDelete" onClick={() => this.handleDelete(task.key)} style={{visibility: task.checked ? 'hidden' : 'visible'}}/>
                </div>
              </div>
    }
  }
    render(){
        return(
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
        )
    }
}