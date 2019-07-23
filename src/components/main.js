import React from 'react';
import moment from 'moment/moment.js'

export default class Main extends React.Component{

    state = {
        date: moment()
    }
 
    componentDidMount () {
        this.interval = setInterval( () => {
        this.setState({
            date: moment()
        })
        })
    }

    render(){
        return(
            <div className="user-wrapper" style={{display: this.props.show ? 'none' : 'flex'}}>
                <span>{this.props.hello}, {this.props.name}</span>
                <span>{this.state.date.format('HH:mm')}</span>
            </div>
        )
    }
}