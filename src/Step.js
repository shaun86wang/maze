import Paper from 'material-ui/Paper';
import React from 'react';

export default class Step extends React.Component {
    getCoordinate = () => {
        let step = this.props.step.toString();
        if (step.length == 1){
            return ( step + " . 0")
        } else if (step.length == 2){
            return (step[1] + " . " + step[0])
        } else {
            return (step[2] + " . " + step[0,2])
        }
    }
	render(){
        return (
            <Paper className="step">
            {this.getCoordinate()}
            </Paper>)
    }
}