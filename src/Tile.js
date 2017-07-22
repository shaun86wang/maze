import React from 'react';
import Paper from 'material-ui/Paper';

export default class Tile extends React.Component {
	setClass = () => {
        if(this.isStart()){
            return ('start')
        } else if (this.isFinish()){
            return ('finish')
        } else if(this.isCurrent()){
            return ('current')
        } else if (this.props.currentStepsList.slice(0,this.props.currentStepsList.length-1).includes(this.props.id)){
            return ('previous')
        } else if (this.isWall()){
            return ('wall')
        }
    }
    isCurrent = () => this.props.id === this.props.currentStepsList[this.props.currentStepsList.length-1]
    isWall = () => this.props.type === 1
    isStart = () => this.props.type === 2
    isFinish = () => this.props.type === 3
    isFinal = () => this.isFinish() && this.props.gameWon() ? "animated tada" : ''
    
    render(){
  	    return (
                <Paper zDepth={this.isWall() ? 5 : 1} 
                        className={`col-sm-1 square text-center  
                                ${this.isCurrent() ? 'animated pulse' : ''} 
                                ${this.isFinal()}`}>
                    <div className={this.setClass()}> 
                    </div>
                </Paper>
  	        
        )
    }
}