import { debounce } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import browserHistory from 'utils/browserHistory';
import { ConnectionHandler, Loading } from './components';
import { SnackBar } from './components/basic';
import { Prompt } from 'components';
import { TopNavBar } from './modules/navigation';
import { checkToken } from './reducers/auth';
import { changeWindowDimensions } from './reducers/uiReducer';
import RoutingLayer from './RoutingLayer';
import { checkMedia } from './utils/mediaUtils';
import { MainContent } from './baseStyles';

class InitializationLayer extends React.Component {
  constructor (props) {
    super(props);
    this.getWindowDimensions = debounce(this.getWindowDimensions, 300).
      bind(this);
  }

  getWindowDimensions () {
    const media = checkMedia();
    this.props.changeWindowDimensions(window.innerWidth, window.innerHeight,
      media);
  }

  componentDidMount () {
    // Wait for redux to be imported in BaseApi, so authorization header is added
    // TODO: On slower devices this may cause problems
    setTimeout(() => {
      this.props.checkToken();
    }, 200);
    this.getWindowDimensions();
    window.addEventListener('resize', this.getWindowDimensions);

    document.body.style.background = this.props.themeColors.surface;
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.getWindowDimensions);
  }

  render () {
    return (
      <ThemeProvider theme={this.props.themeColors}>
        {/*<ConnectionHandler/>*/}
        <Prompt {...this.props.promptProps} />
        <SnackBar/>
        <TopNavBar/>
        <MainContent>
          <Router history={browserHistory}>
            <RoutingLayer/>
          </Router>
        </MainContent>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ themeReducer: { themeColors }, uiReducer: { prompt: { props } } }) => ({
  themeColors,
  promptProps: props,
});

const mapDispatchToProps = {
  changeWindowDimensions,
  checkToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  InitializationLayer);
