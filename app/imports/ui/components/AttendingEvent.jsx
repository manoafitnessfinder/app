import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import { Attending, AttendingSchema } from '../../api/attending/Attending';

/** Renders the Page for adding a document. */
class AttendEvent extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { eventId, otherEmail, otherName } = data;
    Attending.insert({ eventId, otherEmail, otherName },
        (error) => {
          if (error) {
            swal('Attending Error', error.message, 'error');
          } else {
            swal('Success', 'You are now attending this event', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => { fRef = ref; }} schema={AttendingSchema} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <SubmitField basic color='green' value='Attend This Event'/>
            <ErrorsField/>
            <HiddenField name='eventId' value={this.props.eventId}/>
            <HiddenField name='otherEmail' value={this.props.anotherprofile.owner}/>
            <HiddenField name='otherName' value={this.props.anotherprofile.name}/>
          </Segment>
        </AutoForm>
    );
  }
}

AttendEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  anotherprofile: PropTypes.object.isRequired,
};

export default AttendEvent;
