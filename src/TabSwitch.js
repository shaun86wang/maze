import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Steps from './Steps';

export default class TabSwitch extends React.Component {
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