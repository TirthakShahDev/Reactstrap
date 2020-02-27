import logo200Image from '../assets/img/logo/logo_200.png';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { IApplicationProps } from '../actions/App.Actions';

interface ILoginProps extends IApplicationProps
{
  usernameLabel : string
  usernameInputProps : any
  passwordLabel:string
  passwordInputProps : any
}

class AuthForm extends React.Component<ILoginProps> {
  public static defaultProps: Partial<ILoginProps> = {
    usernameLabel: 'Email',
    usernameInputProps: {
      type: 'email',
      placeholder: 'your@email.com',
    },
    passwordLabel: 'Password',
    passwordInputProps: {
      type: 'password',
      placeholder: 'your password',
    },
  };

  handleSubmit = (event: any) => {
    console.log(this.props.usernameInputProps)
  };

  render() {
    const {
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      children,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
       <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
            />
          </div>
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Remember me
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          Login
        </Button>
        {children}
      </Form>
    );
  }
}
export default AuthForm;
