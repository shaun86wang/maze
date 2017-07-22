import React from 'react';
import constants from './constants';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import injectTapEventPlugin from 'react-tap-event-plugin';


//Modal class asks for the solution of the maze in text format in a dialog
export default class Modal extends React.Component {
  state = {
    open: true,
    content: constants.STEPS_LIST_STRING,
    error: false,
  };

  handleClose = () => {
      //If the content is empty
       if (this.state.content.length == 0){
           //Alert user
           this.setState({
               error:true
           })
       } else{
        this.setState({
            open: false,
            error: false,
            });
        //Evaluate the input
        this.props.updateStepsList(eval(this.state.content));
       }
    };

    render() {
        //Set up action button
        const actions = [
        <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={this.handleClose}
        />,
        ];

        return (
        <div>
            <Dialog
            title="Paste in Path Solution"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            Please paste in the path solution data and click Submit.
            Or click Submit directly to use the default solution.
            <br/>
            <TextField
                fullWidth={true}
                hintText="a string of three dimentional list"
                defaultValue={this.state.content}
                multiLine={true}
                rows={6}
                errorText={this.state.error ? "The text field cannot be empty" : ""}
                onChange={(e, v)=>this.setState({content: v})}
                />
            </Dialog>
        </div>
        );
    }
}