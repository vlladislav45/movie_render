import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import browserHistory from 'utils/browserHistory';
import { Wrapper } from './baseStyles';
import { Loading } from './components';
import { TopNavBar } from './modules/navigation';
import { changeWindowDimensions } from './reducers/uiReducer';
import { checkMedia } from './utils/mediaUtils';

const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
const SingleMoviePage = React.lazy(() => import('pages/SingleMoviePage'));



class InitializationLayer extends React.Component {
  constructor (props) {
    super(props);
    this.getWindowDimensions = throttle(this.getWindowDimensions, 300).bind(this);
  }

  getWindowDimensions() {
    const media = checkMedia();
    this.props.changeWindowDimensions(window.innerWidth, window.innerHeight, media);
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
        <TopNavBar/>
        <Wrapper>
          <Router history={browserHistory}>
            <Switch>
              <React.Suspense fallback={<Loading/>}>
                <Route path='/profile' component={ProfilePage}/>
                <Route path='/movie/:movieId' component={SingleMoviePage}/>
                <Route exact path='/' component={MainPage}/>
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
