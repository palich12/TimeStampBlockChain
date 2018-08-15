import * as React from 'react';
import {Col} from 'reactstrap';
import { Core } from './Core';

class CheckServer extends React.Component<{setAlert: (text:string) =>void }, { seerverResponse: string}> {

    constructor(props:any, state:any){
    
        super(props, state);
        this.state = {seerverResponse: ""};
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        Core.checkServer().then(res =>{ 
            this.setState({seerverResponse: JSON.stringify(res, null, 2)});
        });
      }

    public render() {

        

        return (
        <div className="container">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
                <pre>
                    {this.state.seerverResponse}
                </pre>
            </Col>
        </div>
        );
    }
}

export default CheckServer;