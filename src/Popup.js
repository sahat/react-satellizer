import React from 'react';
import qs from 'querystring';
import url from 'url';

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    if (this.props.open) {
      this.openPopup();
    }
  }

  openPopup() {
    const props = this.props;
    const width = props.width || 500;
    const height = props.height || 500;
    
    const options = {
      width: width,
      height: height,
      top: window.screenY + ((window.outerHeight - height) / 2.5),
      left: window.screenX + ((window.outerWidth - width) / 2)
    };

    const popup = window.open(props.popupUrl, '_blank', qs.stringify(options, ','));

    if (props.popupUrl === 'about:blank') {
      popup.document.body.innerHTML = 'Loading...';
    }

    this.pollPopup(popup);
  }

  pollPopup(window) {
    const props = this.props;
    const redirectUri = url.parse(props.redirectUri);
    const redirectUriPath = redirectUri.host + redirectUri.pathname;

    // if (requestToken) {
    //   window.location = config.authorizationUrl + '?' + qs.stringify(requestToken);
    // }

    const polling = setInterval(() => {
      if (!window || window.closed) {
        clearInterval(polling);
      }
      try {
        const popupUrlPath = window.location.host + window.location.pathname;

        if (popupUrlPath === redirectUriPath) {
          if (window.location.search || window.location.hash) {
            const query = qs.parse(window.location.search.substring(1).replace(/\/$/, ''));
            const hash = qs.parse(window.location.hash.substring(1).replace(/[\/$]/, ''));
            const params = Object.assign({}, query, hash);

            if (params.error) {
              console.error(params.error);
            } else {
              console.log(params);
            }
          } else {
            console.info('OAuth redirect has occurred but no query or hash parameters were found.');
          }
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in Internet Explorer.
      }
    }, 500);
  }

  handleClick() {
    console.log('clicked on button');
  }

  render() {
    console.log('popup open?', this.props.open);
   return null;
  }
}

export default Popup;
