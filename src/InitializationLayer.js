import { throttle } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Router, Switch, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import browserHistory from 'utils/browserHistory';
import { ConnectionHandler, Loading } from './components';
import { SnackBar } from './components/basic';
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
        <SnackBar/>
        <TopNavBar/>
        <MainContent>
          <Router history={browserHistory}>
            <Switch>
              {/*<Route exact path='/'>*/}
              {/*  <Redirect to='/?page=1&items=9' />*/}
              {/*</Route>*/}
              <Route path='*'>
                <RoutingLayer/>
              </Route>
            </Switch>
          </Router>
        </MainContent>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ themeReducer: { themeColors } }) => ({
  themeColors,
});

const mapDispatchToProps = {
  changeWindowDimensions,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  InitializationLayer);
