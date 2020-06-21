import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import browserHistory from 'utils/browserHistory';
import { Loading } from './components';
import { TopNavBar } from './modules/navigation';
import { changeWindowDimensions } from './reducers/uiReducer';
import { checkMedia } from './utils/mediaUtils';

const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));



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
        <div>
          <Router history={browserHistory}>
            <Switch>
              <React.Suspense fallback={<Loading/>}>
                <Route exact path='/home' component={MainPage}/>
                <Redirect to={{ pathname: '/home', search: browserHistory.location.search}} />
                <Route path='/profile' component={ProfilePage}/>
              </React.Suspense>
            </Switch>
          </Router>
        </div>
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
