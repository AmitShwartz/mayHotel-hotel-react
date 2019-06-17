// Login

import React from "react";
import { connect } from "react-redux";
import { signIn } from "../actions";
import logo from "../images/mayHotel_logo.png";
import { Field, reduxForm } from "redux-form";
import {
  Image,
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class Login extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) return <Message error={true} content={error} />;
  };

  //called in <Field>(redux-form tag) and render the input by the props
  //input is a field in the <Field> tag that handle the input behind the scenes
  renderInput = ({ icon, type, placeholder, input, meta }) => {
    const isError = meta.error && meta.touched ? true : false;
    return (
      <Segment>
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
      </Segment>
    );
  };

  //called by props.handleSubmit(redux-form properties)
  onSubmit = formValues => {
    this.props.signIn(formValues);
  };

  render() {
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              <Image src={logo} />
              Log-in hotel account
            </Header>
            <Form
              size="large"
              error
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Segment stacked>
                <Field
                  name="name"
                  type="text"
                  icon="user"
                  placeholder="hotel"
                  component={this.renderInput}
                />
                <Field
                  name="password"
                  type="password"
                  icon="lock"
                  placeholder="password"
                  component={this.renderInput}
                />
                <Button color="blue" fluid size="large" type="submit">
                  Login
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

  if (!formValues.name) errors.name = "You must enter a name";

  if (!formValues.password) errors.password = "You must enter a password";

  return errors;
};

const formWarrped = reduxForm({
  form: "login",
  validate
})(Login);

export default connect(
  null,
  { signIn }
)(formWarrped);
