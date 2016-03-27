import React from 'react';
import OAuth2 from './OAuth2';

class Facebook extends React.Component {
  render() {
    const props = this.props;
    return (
      <OAuth2 {...props}>
        <button>Sign in with Facebook</button>
      </OAuth2>
    );
  }
}

Facebook.propTypes = {
  clientId: React.PropTypes.string,
  url: React.PropTypes.string,
  redirectUri: React.PropTypes.string,
  authorizationUrl: React.PropTypes.string,
  scope: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default Facebook;
