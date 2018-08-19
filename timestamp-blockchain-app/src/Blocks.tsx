import * as React from 'react';
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap';
import { Block } from './Block';
import { Core } from './Core';

class Blocks extends React.Component<{setAlert: (text:string) =>void }, { blocks: Block[]}> {

    constructor(props:any, state:any){
    
        super(props, state);
        this.state = {blocks: []};
        Core.getBlocks().then(res =>{ 
            this.setState({blocks:res});
        });
      }

    public render() {

        const list = this.state.blocks.map((block: Block) =>
            <ListGroupItem key={block.prev_hash}>
                Preview hash: {block.prev_hash}
                <br/>
                State hash: {block.state_hash}
                <br/>
                Transaction hash: {block.tx_hash}
            </ListGroupItem>
            );

        return (
            <div className="container">
                <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                        <ListGroup>
                            {list}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Blocks;