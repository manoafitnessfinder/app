import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import { Notes, NotesSchema } from '../../api/note/Notes';

/** Renders the Page for adding a document. */
class AddNote extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { note, owner, contactId, createdAt, madeBy, image } = data;
    Notes.insert({ note, owner, contactId, createdAt, madeBy, image },
      (error) => {
        if (error) {
          swal('Notes Error', error.message, 'error');
        } else {
          swal('Success', 'Note added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
            <AutoForm ref={ref => { fRef = ref; }} schema={NotesSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment className = 'submitButton'>
                <TextField className = 'commentBox' label="Comment:" name='note'/>
                <SubmitField  basic color='green' value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.owner}/>
                <HiddenField name='contactId' value={this.props.contactId}/>
                <HiddenField name='createdAt' value={new Date()}/>
                <HiddenField name='madeBy' value={this.props.madeBy}/>
                <HiddenField name='image' value={this.props.image}/>
              </Segment>
            </AutoForm>
    );
  }
}

AddNote.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
  madeBy: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default AddNote;
