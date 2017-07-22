import React from 'react';
import constants from './constants';
import Modal from './Modal';
import Tile from './Tile';
import BottomSlider from './BottomSlider';
import Button from './Button';
import Steps from './Steps';
import Step from './Step';
import TabSwich from './TabSwitch';
import Snackbar from 'material-ui/Snackbar';
import TabSwitch from './TabSwitch';



export default class Dashboard extends React.Component{
    state = {
        method: 0,
        currentStepNumber: 0,
        stepsList: eval(constants.STEPS_LIST_STRING),
    };

    retrieveCurrentStepsList = () => this.state.stepsList[this.state.method][0][this.state.currentStepNumber]

    retrieveCurrentDataStructure = () => this.state.stepsList[this.state.method][this.state.method][this.state.currentStepNumber];
  
    updateStepsList = (list) => this.setState({stepsList: list})


    setStepNumber = (num) => this.setState({currentStepNumber: num})

    toggleMethod = () => {
        this.setState(prevState => {
            return {method: prevState.method === 0 ? 1 : 0}
        })
    }

    gameWon = () => this.state.currentStepNumber == this.getTotalNumberOfSteps() - 1;
  
    getTiles = () => constants.TILE_TYPES.map((type, index) =>
                        <Tile   key={index} 
                                type={type} 
                                id={index}
                                currentStepsList={this.retrieveCurrentStepsList()}
                                gameWon={this.gameWon}/>)
  
    getTotalNumberOfSteps = () => this.state.stepsList[this.state.method][0].length

    render(){
  	var {currentStepNumber,method} = this.state;
    return (
        <div className="dashboard">
            <Modal updateStepsList={this.updateStepsList}/>
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
                        {this.getTiles()}
                    </div>
                </div>
                <div className="col-sm-3 text-center pull-right">
                    <TabSwitch currentStepsList={this.retrieveCurrentDataStructure()} 
                                setStepNumber={this.setStepNumber} 
                                method={method}
                                toggleMethod={this.toggleMethod} />
                </div>
            </div>
            <div className="row">
                <BottomSlider totalNumberOfSteps={this.getTotalNumberOfSteps()} 
                                setStepNumber={this.setStepNumber} 
                                currentStepNumber={currentStepNumber}/>
            </div>
            <Snackbar
                open={this.gameWon()}
                message="Maze Solved"
                autoHideDuration={4000} />        
        </div>
    );
  };
}