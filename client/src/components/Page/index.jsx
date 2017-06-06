// Page
import React from 'react';
import { Component } from 'react';
import { Grid, Row, Button} from 'react-bootstrap';
import Members from './Members';
import './style.css';
import NewForm from './NewForm';

class Page extends Component {
  constructor(props) {
    super(props);
  }
  // const showManageMemebers = () => {
  //
  // }
  render () {
    return (
      <Grid className='page-grid-outer' fluid>
        <Row className='page-grid-outer-row'>
          <Grid fluid>
            <Row>
              <Button
                //onClick={showManageMemebers}
              >
                Manage Members
              </Button>
              <NewForm />
              <Members />
            </Row>
          </Grid>
        </Row>
      </Grid>
    )
  }
}

export default Page;
