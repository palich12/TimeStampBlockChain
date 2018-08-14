import * as React from 'react';
import {
  Button, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  Label} from 'reactstrap';
import { Core } from './Core';

class CheckFile extends React.Component<{setAlert: (text:string) =>void }, {}> {

  private curientFile : File;
  
  constructor(props:any, state:any){
    
    super(props, state);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }


  public async handleSubmit(event:React.FormEvent) {
    event.preventDefault();
    const response = await Core.checkFile(this.curientFile);
    this.props.setAlert(response);
  }

  public handleFileChange(event:any) {
    this.curientFile = event.target.files[0];
  }

  public render() {
    return (
      <div className="container">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Form className="form-horizontal" 
                  onSubmit={this.handleSubmit}>      
            <FormGroup>
                <Label for="file">File for finding in blockchain</Label>
                <Input  type="file" 
                        name="file" 
                        id="file"
                        placeholder="file" 
                        onChange={this.handleFileChange} />
            </FormGroup>
            <Button color="primary" 
                    type="submit">
                    Send file
            </Button>
          </Form>
        </Col>
      </div>
    );
  }
}

export default CheckFile;