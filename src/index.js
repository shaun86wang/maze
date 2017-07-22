import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {fullWhite} from 'material-ui/styles/colors';
import Place from 'material-ui/svg-icons/maps/place';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dashboard from './Dashboard';

injectTapEventPlugin();

const App = () => {
    return (
        <MuiThemeProvider>
            <div>
                <AppBar  title="The Maze" iconElementLeft={<Place color={fullWhite} className="place"></Place>}/>
                <Dashboard />
            </div>
        </MuiThemeProvider>
    );
}



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
