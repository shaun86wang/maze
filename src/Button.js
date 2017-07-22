import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fullWhite} from 'material-ui/styles/colors';


export default class Button extends React.Component {
    isDisabled = () => this.props.currentStepNumber == ( this.props.isForward ?  this.props.totalNumberOfSteps-1 : 0)

    setStepNumber = () => this.props.setStepNumber(this.props.currentStepNumber + (this.props.isForward? 1 : -1))
    setIcon = () => {
        if(this.props.isForward){
            return(<ArrowForward color={fullWhite}/>)
        } else {
            return(<ArrowBack color={fullWhite}/>)
        }
       
    }
    render(){
        return(<RaisedButton className="button" 
                                primary={true} 
                                onClick={this.setStepNumber} 
                                disabled={this.isDisabled()}
                                icon={this.setIcon()}/>)
    }
}