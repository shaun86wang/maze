import React from 'react';
import Slider from 'material-ui/Slider';

const BottomSlider = (props) => {
  	return (
  	<Slider min={0} 
            max={props.totalNumberOfSteps-1} 
            step={1} 
            value={props.currentStepNumber} 
            onChange={(e, v)=>props.setStepNumber(Number(v))}/>
    )
}

export default BottomSlider;