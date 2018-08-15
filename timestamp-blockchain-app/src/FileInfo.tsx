import * as React from 'react';
import {Col, Row} from 'reactstrap';
import { Core } from './Core';

class FileInfo extends React.Component<{setAlert: (text:string) =>void, hash:string }, { seerverResponse: string}> {

    constructor(props:any, state:any){
    
        super(props, state);
        this.state = {seerverResponse: ""};
        Core.checkFile(this.props.hash).then(res =>{ 
            this.setState({seerverResponse: JSON.stringify(res, null, 2)});
        });
      }

    public render() {

        

        return (
        <div className="container">
            <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <pre>
                        {this.state.seerverResponse}
                    </pre>
                </Col>
            </Row>
            <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                    File hash: {this.props.hash}
                    <br/>
                    <a href={(Core.HOST +  "/api/services/timestamping/v1/files/"+this.props.hash)}>Download</a>
                </Col>
            </Row>
        </div>
        );
    }
}

export default FileInfo;