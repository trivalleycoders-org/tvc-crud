// Page
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Grid, Row, Button} from 'react-bootstrap';
import Members from './Members';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import './style.css';
import NewForm from './NewForm';
import * as ku from '../../lib/ke-utils';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render () {
   const { updateShowManageMembers, showManageMembers } = this.props;
    return (
      <Grid className='page-grid-outer' fluid>
        <Row className='page-grid-outer-row'>
          <Grid fluid>
            <Row>
              <h1>showManageMembers: {showManageMembers}</h1>
              <Button
                name='manageMembers'
                onClick={(event) => this.props.updateShowManageMembers('show')}
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

const mapStateToProps = (state) => {
  let showManageMembers = selectors.getShowManageMembers(state);
  if (showManageMembers === null) {
    console.log('showManageMembers', 'is null');
  } else {
    console.log('showManageMembers', showManageMembers);
  }

  const o = {
    showManageMembers: showManageMembers
  }

   return o;
}
// export default Page;
export default connect(mapStateToProps, actionCreators)(Page);
