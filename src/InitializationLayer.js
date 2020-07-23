import { throttle } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import browserHistory from 'utils/browserHistory';
import { ConnectionHandler, Loading } from './components';
import { SnackBar } from './components/basic';
import { Prompt } from 'components';
import { TopNavBar } from './modules/navigation';
import { changeWindowDimensions } from './reducers/uiReducer';
import RoutingLayer from './RoutingLayer';
import { checkMedia } from './utils/mediaUtils';
import { MainContent } from './baseStyles';


class InitializationLayer extends React.Component {
  constructor (props) {
    super(props);
    this.getWindowDimensions = throttle(this.getWindowDimensions, 300).
      bind(this);
  }

  getWindowDimensions () {
    const media = checkMedia();
    this.props.changeWindowDimensions(window.innerWidth, window.innerHeight,
      media);
  }

  componentDidMount () {
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
        <ConnectionHandler/>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(
  InitializationLayer);
