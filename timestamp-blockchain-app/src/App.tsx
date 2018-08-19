import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Alert,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown } from 'reactstrap';
import './App.css';
import CheckFile from './CheckFile';
import CheckServer from './CheckServer';
import {Core} from './Core';
import Login from './Login';
import ShowPublicKey from './ShowPublicKey';
import UploadFile from './UploadFile';

import * as browserHistory from 'history';
import Blocks from './Blocks';
import FileInfo from './FileInfo';
export const history = browserHistory.createBrowserHistory();

class App extends React.Component<{}, { 
  isOpen: boolean, 
  alert: string,
  path: string}> {

  constructor(props :any, state:any) {
    super(props, state);

    this.toggle = this.toggle.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      alert: "",
      isOpen: false,
      path: "/"
    };
  }
  public toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public setAlert(text: string): void{
    this.setState({alert: text});
  }

  public logout() : void{
    Core.logout();
    this.setAlert("");
  }

  public render() {

    const alert = this.state.alert.length > 0 ?
    <div className="container">
      <Alert color="danger">
        {this.state.alert}
      </Alert> 
      </div>
      : <div className="container"/>;

    const userInfo= Core.getUserInfo();

    const login = () => (<Login setAlert={this.setAlert}/>);
    const uploadfile = () => (<UploadFile setAlert={this.setAlert}/>);
    const showpublickey = () => (<ShowPublicKey setAlert={this.setAlert}/>);
    const checkserver = () => (<CheckServer setAlert={this.setAlert}/>);
    const checkfile = () => (<CheckFile setAlert={this.setAlert}/>); 
    const fileinfo = (props:any) => (<FileInfo setAlert={this.setAlert} hash={props.match.params.hash} />);
    const blocks = (props:any) => (<Blocks setAlert={this.setAlert} />);
    const mainComponent = userInfo != null ? 
    (
      <Switch>
        <Route exact={true} path='/' component={uploadfile} />
        <Route path='/publickey' component={showpublickey}/>
        <Route path='/checkserver' component={checkserver}/>
        <Route path='/checkfile' component={checkfile}/>
        <Route path="/file/:hash" component={fileinfo}/>
        <Route path="/blocks" component={blocks}/>
      </Switch>
    ):(
      <Switch>
        <Route exact={true} path='/' render={login}/>
      </Switch>);
    
    const options =  userInfo != null ? (
      <UncontrolledDropdown nav={true} inNavbar={true}>
        <DropdownToggle nav={true} caret={true}>
          {userInfo.login}
        </DropdownToggle>
        <DropdownMenu right={true}>
          <DropdownItem>
            <NavLink href="/">Upload file</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/checkfile">Get file info</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/blocks">Blocks list</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/checkserver">Check server</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/publickey" >Show public key</NavLink>
          </DropdownItem>
          <DropdownItem divider={true} />
          <DropdownItem onClick={this.logout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>):"";
    return (
      <BrowserRouter>
        <div className="App">
            <Navbar color="light" light={true} expand="md">
            <NavbarBrand href="/">Blockchain file storage</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar={true}>
              <Nav className="ml-auto" navbar={true}>
                <NavItem>
                  <NavLink href="https://github.com/palich12/TimeStampBlockChain">GitHub</NavLink>
                </NavItem>
                {options}
              </Nav>
            </Collapse>
          </Navbar>
          <br/>
          <div className="App-intro">
            {alert}
            {mainComponent}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
