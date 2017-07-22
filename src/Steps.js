import React from 'react';
import Step from './Step';
import { CSSTransitionGroup } from 'react-transition-group';

const Steps = (props) => {
	return(
        <div className="row steps">
            <CSSTransitionGroup
                transitionName="step"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {props.currentStepsList.map((step, index) => 
                    <Step step={step} key={index} id={index}/>
                )}
        
            </CSSTransitionGroup>
        </div>
    )
}

export default Steps;