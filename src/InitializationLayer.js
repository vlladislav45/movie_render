import { throttle } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import browserHistory from 'utils/browserHistory';
import { Wrapper } from './baseStyles';
import { ConnectionHandler, Loading } from './components';
import browserHistory from 'utils/browserHistory';
import { SnackBar } from './components/basic';
import { TopNavBar } from './modules/navigation';
import { changeWindowDimensions } from './reducers/uiReducer';
import { checkMedia } from './utils/mediaUtils';

const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
const SingleMoviePage = React.lazy(() => import('pages/SingleMoviePage'));

const Register = React.lazy(
  () => import('modules/authentication/RegisterForm'));

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
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.getWindowDimensions);
  }

  render () {
    return (
      <ThemeProvider theme={this.props.themeColors}>
        <ConnectionHandler/>
        <SnackBar />
        <TopNavBar/>
        <Wrapper>
          <Router history={browserHistory}>
            <Switch>
              <React.Suspense fallback={<Loading elevation={0}/>}>
                <Route path='/profile' component={ProfilePage}/>
                <Route path='/movie/:movieId' component={SingleMoviePage}/>
                <Route exact path='/' component={MainPage}/>
                <Route path='/register' component={Register}/>
                {/*TODO: Redirect not working properly*/}
                {/*<Redirect to={{ pathname: '/', search: browserHistory.location.search}} />*/}
              </React.Suspense>
            </Switch>
          </Router>
        </Wrapper>
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
