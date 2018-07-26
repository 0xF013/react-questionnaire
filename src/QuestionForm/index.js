import React from 'react'
import {reduxForm, Field, FieldArray, getFormSyncErrors} from 'redux-form'
import {connect} from 'react-redux'
import {compose} from 'recompose'


const renderAnswer = (member, index, fields) => (
  <div>
    <div>
      <strong>{  String.fromCharCode(97 + index).toUpperCase() }</strong>
      &nbsp;
      {!!index && <button onClick={() => fields.swap(index, index - 1)}>up</button>}
      &nbsp;

      {index !== fields.length - 1 && <button onClick={() => fields.swap(index, index + 1)}>down</button>}
      &nbsp;
      <label>
        Mark as correct: <Field component='input' type='checkbox' name={`${member}.isCorrect`} />
      </label>
      &nbsp;
      <button onClick={() => fields.remove(index)}>X</button>
    </div>
    <div>
      <label>
        Answer:&nbsp;    
        <Field name={`${member}.text`} component='textarea' />
      </label>
    </div>
    <div>
      <label>
        Feedback:&nbsp;    
        <Field name={`${member}.feedback`} component='textarea' />
      </label>
    </div>
    <hr />    
  </div>
)

const renderAnswers = ({fields}) => (
  <div>
    {fields.map(renderAnswer)}
    <button onClick={() => fields.push({})}>Add answer</button>
  </div>
)
const QuestionForm = ({errors, handleSubmit}) => (
  <form onSubmit={handleSubmit(values => console.log(values))}>
    <div style={{color: 'red'}}>
      <ul>
        {Object.values(errors).map(error => <li>{error}</li>)}
      </ul>
    </div>
    <h1>Create question</h1>
    <label>
      Question:&nbsp;
      <Field component='textarea' type='text' name='title' />
    </label>
    <h2>Answers</h2>
    <FieldArray name='answers' component={renderAnswers} />
    <button type='submit'>Submit</button>
  </form>
)

export default compose(
  connect(state => ({
    errors: getFormSyncErrors('questionForm')(state)
  })),
  reduxForm({
    form: 'questionForm',
    validate (values) {
      const errors = {}
      if (!values.title) {
        errors.title = 'Invalid title'
      }

      if (values.answers && values.answers.length > 1) {
        if (!values.answers.find(a => a.isCorrect)) {
          errors.answers = 'At least one answer must be marked as correct'
        }

        if (values.answers.filter(a => !!a.text).length < values.answers.length) {
          errors.answers = 'Answer text missing'
        }

      } else {
        errors.answers = 'At least two answers required'
      }

      return errors
    }
  }),
)(QuestionForm)
