// InputField
import React from 'react'
import { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import * as ku from '../../../../../../lib/ke-utils'

class InputField extends Component {
  constructor(props) {
      super(props);
      this.state = {
        validInput: false,
      }
    }

  render () {
    const getValid = () => {
      return this.state.validInput
    }

    const handleOnChange = (value) => {
      ku.log('handleOnChange: value', value, 'blue')
      let val = null;
      switch (this.props.validationRule) {
        case 'text':
          const len = value.length
          val = len > 0;
          break
        case 'email':
          val = value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/) != null
          break
        case 'integer':
          val = value.match(/^\d+$/) != null;
          break
        default:
          val = false
      }
      this.setState({validInput: val})
      this.props.updateField(this.props.name, value)
    }
    return (
      <div>
        <FormGroup controlId='firstName'
          validationState={getValid() > 0 ? "success" : null}>
          <FormControl
            type='text'
            value={this.props.value}
            onChange={(event) => handleOnChange(event.target.value)}
          />
          <FormControl.Feedback />
        </FormGroup>
      </div>
    )
  }
}

export default InputField
