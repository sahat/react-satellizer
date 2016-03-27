import React from 'react';
import { Facebook } from './index';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onFacebookLogin(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
        Hello world
        <Facebook
          clientId='603122136500203'
          url='http://localhost:3000/auth/facebook'
          redirectUri='http://localhost:3000/auth/facebook/callback'
          authorizationUrl='https://www.facebook.com/v2.5/dialog/oauth'
          scope='email,user_location'
          width={580}
          height={400}
          callback={this.onFacebookLogin} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
