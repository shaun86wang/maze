import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const tileTypes = [1,0,0,0,2,3,0,0,2,2,0,0,0,0,0,2,0];


class Tile extends React.Component {
	setCurrentClass = () => (this.props.id === this.props.currentStepsList[this.props.currentStepsList.length-1]) ? "current" : ""
  setPreviousClass = () => this.props.currentStepsList.slice(0,this.props.currentStepsList.length-1).includes(this.props.id) ? "previous" : ""
  render(){
  	return (
  	<div className={`col-sm-1 square text-center ${this.setCurrentClass()} ${this.setPreviousClass()}`}>{this.props.type}</div>
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
  render(){
  	return(
    	<button onClick={this.setStepNumber} disabled={this.isDisabled()}>{this.props.isForward? ">>" : "<<"}</button>)
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
    </div>)
}

class Dashboard extends React.Component{
  state = {
      currentStepNumber: 3,
      stepsList: [[0],[0,1],[0,1,2],[0,1,2,3],[0,1,2],[0,1],[0,1,2],[0,1,2,3],[0,1,2,3,4],[0,1,2,3,4,5]]
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-10">
          <div className="row">
            <div className="col-sm-1 pull-left high">
              <Button currentStepNumber={currentStepNumber} 
                      isForward={false} 
                      setStepNumber={this.setStepNumber} 
                      totalNumberOfSteps={this.getTotalNumberOfSteps()}/>
            </div>
            
            <div className="col-sm-1 pull-right high">
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
        <div className="col-sm-2 text-center">
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
    <Dashboard />
  );
}



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
