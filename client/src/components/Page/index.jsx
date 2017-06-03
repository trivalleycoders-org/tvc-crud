// Page
import React from 'react';
import {
  Grid,
  Row,
} from 'react-bootstrap';
import Members from './Members';
import './style.css';
import NewForm from './NewForm';

const Page = () => {
  return (
    <Grid className='page-grid-outer' fluid>
      <Row className='page-grid-outer-row'>
        <Grid fluid>
          <Row>
            <NewForm />
            <Members />
          </Row>
        </Grid>
      </Row>
    </Grid>
  )
}

export default Page;
