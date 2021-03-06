import * as React from 'react';
import {
  Button, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  // Label 
} from 'reactstrap';
import {Core} from './Core';

class Login extends React.Component<{setAlert: (text:string) =>void }, { 
  password: string, 
  login:string }> {

  constructor(props:any, state:any){
    
    super(props, state);
    this.state = {login: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  public handleSubmit(event:React.FormEvent) : void {
    event.preventDefault();
    if(Core.login(this.state.login, this.state.password) != null){
      this.props.setAlert("");
    }
    else{
      this.props.setAlert("Wrong login or password!");
    }
  }

  public handleLoginChange(event:any) {
    this.props.setAlert("");
    this.setState({login: event.target.value});
  }
  public handlePasswordChange(event:any) {
    this.props.setAlert("");
    this.setState({password: event.target.value});
  }

  public render() {
    return (
      <div className="container">
        <Col sm="12" md={{ size: 4, offset: 4 }}>
          <Form className="form-horizontal" 
                onSubmit={this.handleSubmit}>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <Input  type="text" 
                        name="login" 
                        id="login" 
                        placeholder="Login" 
                        value={this.state.login}
                        onChange={this.handleLoginChange} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">&#9919;</InputGroupAddon>
                <Input  type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password" 
                        value={this.state.password}
                        onChange={this.handlePasswordChange} />
              </InputGroup>
            </FormGroup>
            <Button color="primary" 
                    size="lg" 
                    block={true} 
                    type="submit">
                    Sign in
            </Button>
          </Form> 
        </Col>
      </div>
    );
  }
}

export default Login;
