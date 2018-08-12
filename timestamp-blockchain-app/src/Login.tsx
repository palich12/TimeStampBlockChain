import * as React from 'react';
import {Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
// import getHash from './Helpers';

class Login extends React.Component<{}, { password: string, login:string }> {

  constructor(props:any, state:any){
    
    super(props, state);
    this.state = {login: "", password: ""}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  public handleSubmit(event:React.FormEvent) : void {
    event.preventDefault();
    console.log(event);   
  }

  public handleLoginChange(event:any) {
    this.setState({login: event.target.value});
  }
  public handlePasswordChange(event:any) {
    this.setState({password: event.target.value});
  }

  public render() {
    return (
      <div className="container">
        <Col sm="12" md={{ size: 2, offset: 5 }}>
          <Form className="form-horizontal" 
                onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="login">Login</Label>
              <Input  type="text" 
                      name="login" 
                      id="login" 
                      placeholder="Login" 
                      value={this.state.login}
                      onChange={this.handleLoginChange} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input  type="password" 
                      name="password" 
                      id="password" 
                      placeholder="Password" 
                      value={this.state.password}
                      onChange={this.handlePasswordChange} />
            </FormGroup>
            <Button type="submit">Sign in</Button>
          </Form> 
        </Col>
      </div>
    );
  }
}

export default Login;
