import React from 'react';
import Modal from 'react-responsive-modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment/moment.js'

export default class ModalClass extends React.Component{

    state = {
        open: true,
        isValid: false,
        name: '',
        hello: '',
        show: true,
        date: moment()
    }

    componentDidMount () {
        this.interval = setInterval( () => {
        this.setState({
            date: moment()
        })
        })
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleHello = () => {
        this.setState({
            isValid: true
        })
        if(this.state.name !== ''){
            this.setState({ 
                open: false
            })
        }
        setTimeout( () => {
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
              this.props.updateValue(this.state.name, this.state.hello, this.state.show)
        }, 1000);
    }

    render(){
        return(
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
        )
    }
}