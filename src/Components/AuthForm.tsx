import logo200Image from "../assets/img/logo/logo_200.png";
import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { IApplicationProps } from "../actions/App.Actions";
import { LoginModel } from "../Models/LoginModel";

interface ILoginProps extends IApplicationProps {
  usernameLabel: string;
  usernameInputProps: any;
  passwordLabel: string;
  passwordInputProps: any;
}

interface ILoginState extends LoginModel {
  Email: string;
  PassWord: string;
}

class AuthForm extends React.Component<ILoginProps, ILoginState> {
  public static defaultProps: Partial<ILoginProps> = {
    usernameLabel: "Email",
    usernameInputProps: {
      type: "email",
      placeholder: "your@email.com",
      name: "Email"
    },
    passwordLabel: "Password",
    passwordInputProps: {
      type: "password",
      placeholder: "your password",
      name: "PassWord"
    }
  };
  state: ILoginState;
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      Email: "admin",
      PassWord: "111111"
    };
  }
  handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  handleSubmit = () => {
    this.props.loginAsync(this.state).then(() => this.props.history.push('/'))
  };

  render() {
    const {
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      children
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="text-center pb-4">
          <img
            src={logo200Image}
            className="rounded"
            style={{ width: 60, height: 60, cursor: "pointer" }}
            alt="logo"
          />
        </div>
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input
            {...usernameInputProps}
            value={this.state.Email}
            onChange={event => this.handleChange(event)}
          />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input
            {...passwordInputProps}
            value={this.state.PassWord}
            onChange={event => this.handleChange(event)}
          />
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}
        >
          Login
        </Button>
        {children}
      </Form>
    );
  }
}
export default AuthForm;
