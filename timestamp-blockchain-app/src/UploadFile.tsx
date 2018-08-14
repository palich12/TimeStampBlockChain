import * as React from 'react';
import {
  Button, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  Label} from 'reactstrap';
import { Core } from './Core';

class UploadFile extends React.Component<{setAlert: (text:string) =>void }, {metadata: string}> {

  private curientFile : File;
  
  constructor(props:any, state:any){
    
    super(props, state);
    this.state = { metadata: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMetadataChange = this.handleMetadataChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }


  public handleSubmit(event:React.FormEvent) : void {
    event.preventDefault();
    Core.uploadFile(this.curientFile, this.state.metadata);
  }

  public handleMetadataChange(event:any) {
    this.setState({metadata: event.target.value});
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
              <Input  type="textarea" 
                      name="text" 
                      id="metadata"
                      placeholder="File description" 
                      value={this.state.metadata}
                      onChange={this.handleMetadataChange} />
            </FormGroup>        
            <FormGroup>
                <Label for="file">File for uploading to blockchain</Label>
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

export default UploadFile;