import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import FileList from './FileList';
import Login from './Login';

class App extends React.Component {

  public checkAuth(): boolean{
    return window.localStorage.getItem("UserInfo") != null;
  }

  public render() {

    const mainComponent = (window.localStorage.getItem("UserInfo") != null) ? <FileList /> : <Login/>;

    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Blockchain file storage</h1>
          </header>
          <div className="App-intro">
            {mainComponent}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
