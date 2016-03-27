import React from 'react';
import Popup from './Popup';
import qs from 'querystring';

class OAuth2 extends React.Component {
  constructor(props) {
    console.log('hi')
    super(props);
    this.state = { popupOpen: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('oauth2')
  }

  handleClick() {
    this.setState({ popupOpen: true });
    console.log('clicked on button');
  }

  render() {
    const props = this.props;

    const childrenWithProps = React.Children.map(props.children, (child) => {
      return React.cloneElement(child, { onClick: this.handleClick });
    });

    const params = {
      client_id: props.clientId,
      redirect_uri: props.redirectUri,
      scope: props.scope,
      display: 'popup',
      response_type: 'code'
    };

    const url = props.authorizationUrl + '?' + qs.stringify(params);

    return <div>
      <Popup open={this.state.popupOpen} popupUrl={url} {...this.props} />
      {childrenWithProps}
    </div>;
  }
}

export default OAuth2;
