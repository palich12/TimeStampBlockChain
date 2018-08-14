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
import {Core} from './Core';
import Login from './Login';
import ShowPublicKey from './ShowPublicKey';
import UploadFile from './UploadFile';

class App extends React.Component<{}, { 
  isOpen: boolean, 
  alert: string }> {

  constructor(props: Readonly<{}>) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      alert: "",
      isOpen: false,
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
    const mainComponent = userInfo != null ? 
    (
      <Switch>
        <Route exact={true} path='/' render={uploadfile} />
        <Route path='/publickey' render={showpublickey}/>
      </Switch>
    ):(
      <Switch>
        <Route exact={true} path='/' render={login}/>
        {/* <Route path='/checkfile' component={ShowPublicKey}/> */}
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
          <NavLink href="/publickey">Show public key</NavLink>
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
                <NavItem>
                  <NavLink href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi">Allow-Control-Allow-Origin: *</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/checkfile">Get file info</NavLink>
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
