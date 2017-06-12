// Page
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Grid, Row, Button } from 'react-bootstrap';
import Members from './Members';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import './style.css';
import ShowManageMembers from './NewForm';
import NewForm from './NewForm';
import * as ku from '../../lib/ke-utils';

class Page extends Component {
  render () {
   const { showManageMembers } = this.props;
   const manageMembers = showManageMembers.value
     ? <ShowManageMembers />
     : ''
    ku.log('Page: manageMembers', manageMembers, 'blue');
    return (
      <Grid className='page-grid-outer' fluid>
        <Row className='page-grid-outer-row'>
          <Grid fluid>
            <Row>
              <Button
                name='manageMembers'
                onClick={(event) => this.props.updateShowManageMembers(!showManageMembers.value)}
              >
                Manage Members
              </Button>
              {manageMembers}
              <Members />
            </Row>
          </Grid>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  let showManageMembers = selectors.getShowManageMembers(state);
  const o = {
    showManageMembers: showManageMembers
  }
   return o;
}
// export default Page;
export default connect(mapStateToProps, actionCreators)(Page);
