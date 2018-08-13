import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
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
import FileList from './FileList';
import Login from './Login';

class App extends React.Component<{}, { isOpen: boolean }> {

  constructor(props: Readonly<{}>) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false 
    };
  }
  public toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  public checkAuth(): boolean{
    return window.localStorage.getItem("UserInfo") != null;
  }

  public render() {
    const isAuthorised= (window.localStorage.getItem("UserInfo") != null);
    const mainComponent = isAuthorised ? <FileList /> : <Login/>;
    const options =  isAuthorised ? (
                    <UncontrolledDropdown nav={true} inNavbar={true}>
                      <DropdownToggle nav={true} caret={true}>
                        Options
                      </DropdownToggle>
                      <DropdownMenu right={true}>
                        <DropdownItem>
                          Option 1
                        </DropdownItem>
                        <DropdownItem>
                          Option 2
                        </DropdownItem>
                        <DropdownItem divider={true} />
                        <DropdownItem>
                          Reset
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
            {mainComponent}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
