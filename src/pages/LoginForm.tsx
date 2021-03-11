import logo200Image from "../assets/img/logo/logo_200.png";
import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { ILoginProps } from "../Types/PropTypes";
import { ILoginState } from "../Types/StateTypes";
import { login as LoginUser } from "../api/users";
import { connect } from "react-redux";
import { login } from "../actions/App.Actions";
import { RawRule } from "@casl/ability";
import { ConvertAbility } from "../utils/AbilityConverter";
import ability from "../abilityConfig/ability";

class LoginForm extends React.Component<ILoginProps, ILoginState> {
  public static defaultProps: Partial<ILoginProps> = {
    usernameLabel: "UserName",
    usernameInputProps: {
      type: "text",
      placeholder: "UserName",
      name: "UserName"
    },
    passwordLabel: "Password",
    passwordInputProps: {
      type: "password",
      placeholder: "Password",
      name: "PassWord"
    }
  };
  state: ILoginState;
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      UserName: "admin",
      PassWord: "1111"
    };
  }
  handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  handleClick = (event: any) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({'data': 'Tirthak'}));
  };




  componentDidMount()
  {
   
    window.addEventListener("message", function(event) {

alert(event.data)
});
  };


  handleSubmit = () => {
    LoginUser(this.state)
      .then(async ({ data }) => {
        const abilities: RawRule[] = ConvertAbility(data.permissions);
        ability.update(abilities);
        data.abilities = abilities;
        this.props.dispatch(login(data))
        this.props.history.push('/')
      })
      .catch(m => {
        alert(m.toString());
      })
      .finally();
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
      
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleClick}
        >
          Settings
        </Button>
        {children}
      </Form>
    );
  }
}
export default connect(
  null,
  null
)(LoginForm);
