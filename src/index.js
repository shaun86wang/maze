import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppBar from "material-ui/AppBar"
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fullWhite, cyan500} from 'material-ui/styles/colors';


const tileTypes = [2,0,0,0,1,0,0,0,0,0,
                    0,1,1,1,0,0,1,1,1,0,
                    0,1,0,1,0,1,0,1,0,0,
                    0,0,0,1,0,1,0,1,0,1,
                    0,1,0,1,0,1,0,0,0,0,
                    0,0,0,0,0,1,0,0,1,0,
                    1,0,0,0,1,0,0,1,1,0,
                    1,1,1,1,0,1,0,0,0,1,
                    0,0,1,0,0,0,1,0,1,0,
                    1,0,0,0,1,0,1,0,0,0,
                    0,0,1,3,1,0,0,0,1,0];
const stepsList = [
    [0],
    [0,1],
    [0,1,2],
    [0,1,2,3],
    [0,1,2],
    [0,1],
    [0],
    [0,11],
    [0,11,21],
    [0,11,21,31]
]

class Tile extends React.Component {
	setStyle = () => {
        if(this.props.id === this.props.currentStepsList[this.props.currentStepsList.length-1]){
            return ('current')
        } else if (this.props.currentStepsList.slice(0,this.props.currentStepsList.length-1).includes(this.props.id)){
            return ('previous')
        } else if (this.isWall()){
            return ('#00BCD4')
        }
    }
    isWall = () => this.props.type === 1
    style = {backgroundColor: this.setStyle()}
    render(){
  	    return (
                <Paper zDepth={this.isWall() ? 5 : 1} 
                    className="col-sm-1 square text-center"
                    style={this.style}>
                </Paper>
  	        
        )
    }
}





const Slider = (props) => {
  	return (
  	<input type="range" min="0" max={props.totalNumberOfSteps-1} value={props.currentStepNumber} onChange={(e)=>props.setStepNumber(Number(e.target.value))}/>
    )
  
}

class Button extends React.Component {
	isDisabled = () => this.props.currentStepNumber == ( this.props.isForward ?  this.props.totalNumberOfSteps-1 : 0)
    setStepNumber = () => {
  	    this.props.setStepNumber(this.props.currentStepNumber + (this.props.isForward? 1 : -1))
    }
    setIcon = () => {
        if(this.props.isForward){
            return(<ArrowForward color={fullWhite}/>)
        } else {
            return(<ArrowBack color={fullWhite}/>)
        }
       
    }
    render(){
          return(<RaisedButton className="center-vertical" 
                                primary={true} 
                                onClick={this.setStepNumber} 
                                disabled={this.isDisabled()}
                                icon={this.setIcon()}/>)
    }
}

const Step = (props) => {
	return (
  	<li>{props.step}</li>)
}

const Steps = (props) => {
	return(
        <ol>
            {props.currentStepsList.map((step, index) => 
                <Step step={step} key={index}/>
            )}
        </ol>
  	)
}

const Tabs = (props) => {
	return(
        <div>
        <h3>{props.dataStructureName}</h3>
        <Steps currentStepsList={props.currentStepsList} />
        </div>
    )
}

class Dashboard extends React.Component{
    state = {
        currentStepNumber: 3,
        stepsList: stepsList,
    };
    retrieveCurrentStepsList = () => this.state.stepsList[this.state.currentStepNumber];
  
    setStepNumber = (num) => {
        this.setState({
            currentStepNumber: num,
        })
    };
  
    tiles = tileTypes.map((type, index) =>
          <Tile key={index} type={type} id={index} currentStepsList={this.retrieveCurrentStepsList()}/>);
  
    getTotalNumberOfSteps = () => this.state.stepsList.length

    render(){
  	var {currentStepNumber, stepsList} = this.state;
    return (
        <div className="dashboard">
        <div className="row">
            <div className="col-sm-7">
            <div className="row">
                <div className="col-sm-2 pull-left high">
                    <Button currentStepNumber={currentStepNumber} 
                        isForward={false} 
                        setStepNumber={this.setStepNumber} 
                        totalNumberOfSteps={this.getTotalNumberOfSteps()}/>
                </div>
                
                <div className="col-sm-2 pull-right high">
                    <Button currentStepNumber={currentStepNumber} 
                        isForward={true} 
                        setStepNumber={this.setStepNumber} 
                        totalNumberOfSteps={this.getTotalNumberOfSteps()}/>
                </div>
                {tileTypes.map((type, index) =>
                        <Tile key={index} type={type} id={index} 
                        currentStepsList={this.retrieveCurrentStepsList()}/>)}
                </div>
            </div>
            <div className="col-sm-3 text-center pull-right">
            <Tabs dataStructureName="Stack" currentStepsList={this.retrieveCurrentStepsList()} />
            </div>
        </div>
            <div className="row">
            <Slider totalNumberOfSteps={this.getTotalNumberOfSteps()} 
                    setStepNumber={this.setStepNumber} 
                    currentStepNumber={currentStepNumber}/>
            </div>
        
        </div>
    );
  };
}

const App = () => {
    return (
        <MuiThemeProvider>
            <div>
                <AppBar  title="The Maze" />
                <Dashboard />
            </div>
        </MuiThemeProvider>
    );
}



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
