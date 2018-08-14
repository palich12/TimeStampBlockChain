import * as React from 'react';
import {Col} from 'reactstrap';

class TransactionInfo extends React.Component<{setAlert: (text:string) =>void }, {}> {
  public render() {
    return (
      <div className="container">
        <Col sm="12" md={{ size: 2, offset: 5 }}>
            item
        </Col>
      </div>
    );
  }
}

export default TransactionInfo;