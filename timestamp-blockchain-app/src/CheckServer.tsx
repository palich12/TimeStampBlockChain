import * as React from 'react';
import {Col} from 'reactstrap';
import { Core } from './Core';

class CheckServer extends React.Component<{setAlert: (text:string) =>void }, { seerverResponse: string}> {

    constructor(props:any, state:any){
    
        super(props, state);
        this.state = {seerverResponse: ""};
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }

    public render() {

        Core.checkServer().then(res => this.setState({seerverResponse: res}));

        return (
        <div className="container">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
                {this.state.seerverResponse} 
            </Col>
        </div>
        );
    }
}

export default CheckServer;