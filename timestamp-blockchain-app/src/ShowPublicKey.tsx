import * as React from 'react';
import {Col} from 'reactstrap';
import { Core } from './Core';
import { UserInfo } from './UserInfo';

class ShowPublicKey extends React.Component<{setAlert: (text:string) =>void }, {}> {
  public render() {
    const user = Core.getUserInfo();
    return (
      <div className="container">
        <Col sm="12" md={{ size: 10, offset: 1 }}>
            Public key: {(user as UserInfo).publicKey}
        </Col>
      </div>
    );
  }
}

export default ShowPublicKey;