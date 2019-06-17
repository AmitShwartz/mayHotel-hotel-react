// SpaDateForm

import React from "react";
import { connect } from "react-redux";
import { fetchSpa } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class SpaDateForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) return <Message error={true} content={error} />;
  };

  //called in <Field>(redux-form tag) and render the input by the props
  //input is a field in the <Field> tag that handle the input behind the scenes
  renderInput = ({ icon, type, placeholder, input, meta }) => {
    const isError = meta.error && meta.touched ? true : false;
    return (
      <>
        <Form.Input
          error={isError}
          fluid
          icon={icon}
          iconPosition="left"
          type={type}
          placeholder={placeholder}
          {...input}
        />
        {this.renderError(meta)}
      </>
    );
  };

  //called by props.handleSubmit(redux-form properties)
  onSubmit = formValues => {
    this.props.fetchSpa(formValues.date);
  };

  render() {
    return (
      <div className="SpaDateForm-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              בחר תאריך הזמנות
            </Header>
            <Form
              size="large"
              error
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Segment stacked>
                <Field
                  name="date"
                  type="date"
                  icon="calendar alternate outline"
                  component={this.renderInput}
                />
                <Button positive fluid size="large" type="submit">
                  אישור
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.date) errors.date = "You must enter a date";

  return errors;
};

const formWarrped = reduxForm({
  form: "SpaDateForm",
  validate
})(SpaDateForm);

export default connect(
  null,
  { fetchSpa }
)(formWarrped);
