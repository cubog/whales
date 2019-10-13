import React from 'react';
import { register } from '../services/authService';
import Form from 'react-jsonschema-form';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

const schema = {
  title: 'Register an Account',
  type: 'object',
  required: [
    'firstName',
    'lastName',
    'email',
    'username',
    'password',
    'repeatPassword',
  ],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      format: 'password',
    },
    repeatPassword: {
      type: 'string',
      format: 'password',
      title: 'Password',
    },
  },
};

const uiSchema = {
  'ui:order': [
    'firstName',
    'lastName',
    'email',
    'username',
    'password',
    'repeatPassword',
  ],
  firstName: {
    'ui:placeholder': 'First name',
    'ui:label': '',
    'ui:Required': true,
  },
  lastName: {
    'ui:placeholder': 'Last name',
    'ui:label': '',
    'ui:Required': true,
  },
  email: {
    'ui:placeholder': 'Email',
    'ui:label': '',
    'ui:Required': true,
  },
  username: {
    'ui:placeholder': 'Username',
    'ui:label': '',
    'ui:Required': true,
  },
  password: {
    'ui:placeholder': 'Password',
    'ui:label': '',
    'ui:Required': true,
  },
  repeatPassword: {
    'ui:placeholder': 'Repeat password',
    'ui:label': '',
    'ui:Required': true,
  },
};

function ObjectFieldTemplate({ TitleField, properties, title, description }) {
  return (
    <div>
      <TitleField title={title} />
      <div className='column'>
        {properties.map(prop => (
          <div className='input-parent' key={prop.content.key}>
            {prop.content}
          </div>
        ))}
      </div>
      {description}
    </div>
  );
}
function validate(formData, errors) {
  if (formData.password !== formData.repeatPassword) {
    errors.repeatPassword.addError("Passwords don't match");
  }
  return errors;
}

export default class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    isLoading: false,
    accountCreated: false,
  };

  handleChange = e => {
    const id = e.target.id;
    this.setState({
      [id]: e.target.value,
    });
  };

  handleSubmit = async e => {
    this.setState({ isLoading: true });
    try {
      await register(
        this.state.username,
        this.state.password,
        this.email,
        this.firstName,
        this.lastName
      );
      localStorage.setItem('isAuthenticated', true);
      this.setState({
        isLoading: false,
        accountCreated: true,
      });
    } catch (e) {
      this.setState({
        isLoading: false,
        accountCreated: e,
      });
    }
  };

  render() {
    const { isLoading, accountCreated } = this.state;
    if (accountCreated) {
      return <Redirect to='/userhome' />;
    }
    return (
      <div className='center main-container'>
        {isLoading && <Loading />}
        <div className='center form-container'>
          <Form
            className='form column'
            schema={schema}
            uiSchema={uiSchema}
            ObjectFieldTemplate={ObjectFieldTemplate}
            validate={validate}
            onSubmit={this.handleSubmit}
          >
            <button className='button' type='submit'>
              Submit
            </button>
          </Form>
        </div>
      </div>
    );
  }
}
