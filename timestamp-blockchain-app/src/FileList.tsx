import * as React from 'react';
import {Col} from 'reactstrap';

class FileList extends React.Component {
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

export default FileList;