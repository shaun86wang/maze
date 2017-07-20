import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppBar from "material-ui/AppBar";
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fullWhite, cyan200} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { CSSTransitionGroup } from 'react-transition-group'

injectTapEventPlugin();


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
    [
        [
            [0],
            [0,1],
            [0,1,2],
            [0,1,2,3],
            [0,1,2],
            [0,1],
            [0],
            [0,10],
            [0,10,20],
            [0,10,20,30]
        ],
        []
    ],
    [
        [
            [0],
            [0,10],
            [0,10,20],
            [0,10,20,30],
            [0,10,20,30,40],
            [0,10,20,30,40,50]
        ],
        [
            [0],
            [0,10],
            [10],
            [10,20],
            [10,20,30],
            [20,30]
        ]
    ]
]

class Tile extends React.Component {
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
    
    render(){
  	    return (
                <Paper zDepth={this.isWall() ? 5 : 1} 
                    className={`col-sm-1 square text-center  ${this.isCurrent() ? 'animated pulse' : ''}`}
                    >
                    <div  zDepth={1} className={this.setClass()}>
                        
                    </div>
                </Paper>
  	        
        )
    }
}





const BottomSlider = (props) => {
  	return (
  	<Slider min={0} max={props.totalNumberOfSteps-1} step={1} value={props.currentStepNumber} onChange={(e, v)=>props.setStepNumber(Number(v))}/>
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

class Step extends React.Component {
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

class Steps extends React.Component {
    getClass = () => this.props.currentStepsList.length <= 20 ? "col-sm-12" : "col-sm-6";
	render(){
        return(
        <div className="row steps">
            <CSSTransitionGroup
                transitionName="step"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {this.props.currentStepsList.map((step, index) => 
                <Step className={this.getClass()} step={step} key={index} id={index}/>
                )}
        
            </CSSTransitionGroup>
        </div>
  	)
    }
}


class TabSwitch extends React.Component {
    handleChange = (value) => {
        this.props.toggleMethod();
        this.props.setStepNumber(0);
    };
    render(){
        
        return(
        <div>
            <Tabs
                onChange={this.handleChange}
                value={this.props.method}
            >
                <Tab label="Stack" value={0} />
                <Tab label="Queue" value={1}/>
            </Tabs>
            <SwipeableViews className="box"
                index = {this.props.method}
                onChangeIndex={this.handleChange}
            >
                <div><Steps currentStepsList={this.props.currentStepsList}></Steps></div>
                <div><Steps currentStepsList={this.props.currentStepsList}></Steps></div>
            </SwipeableViews>
        </div>
    )
    }
	
}

class Dashboard extends React.Component{
    state = {
        method: 0,
        currentStepNumber: 3,
        stepsList: stepsList,
    };
    retrieveCurrentStepsList = () => this.state.stepsList[this.state.method][0][this.state.currentStepNumber];
    retrieveCurrentDataStructure = () => this.state.stepsList[this.state.method][this.state.method][this.state.currentStepNumber]
  
    setStepNumber = (num) => {
        this.setState({currentStepNumber: num}
        )
    };

    toggleMethod = () => {
        this.setState(prevState => {
            return {method: prevState.method === 0 ? 1 : 0}
        })
    }
  
    tiles = tileTypes.map((type, index) =>
          <Tile key={index} type={type} id={index} currentStepsList={this.retrieveCurrentStepsList()}/>);
  
    getTotalNumberOfSteps = () => this.state.stepsList[this.state.method][0].length

   

    render(){
  	var {currentStepNumber,method} = this.state;
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
            <TabSwitch currentStepsList={this.retrieveCurrentDataStructure()} setStepNumber={this.setStepNumber} method={method}
                toggleMethod={this.toggleMethod} />
            </div>
        </div>
            <div className="row">
            <BottomSlider totalNumberOfSteps={this.getTotalNumberOfSteps()} 
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
