import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loading extends Component{
    constructor(props){
        super(props);
        this.state = {
            completed:0
        }
    }
    componentDidMount(){
        setInterval(this.progress, 20);
    }
    progress = () => {
        const { completed } = this.state;
    
        this.setState({
          completed : completed >= 100 ? 0 : completed + 1
        })
    }
    render(){
        return(
            <CircularProgress size = '60px' variant = 'indeterminate' value = {this.state.completed}/>
        );
    }
}
export default Loading;