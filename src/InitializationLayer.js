import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import browserHistory from 'utils/browserHistory';
import { Loading } from './components';
import { TopNavBar } from './modules/navigation';

const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));

class InitializationLayer extends React.Component {

  render() {
    return (
      <ThemeProvider theme={this.props.themeColors}>
        <TopNavBar/>
          <Router history={browserHistory}>
            <Switch>
              <React.Suspense fallback={<Loading/>}>
                <Route path='/' component={MainPage}/>
                <Route path='/profile' component={ProfilePage}/>
              </React.Suspense>
            </Switch>
          </Router>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ themeReducer: { themeColors } }) => ({
  themeColors,
});

export default connect(mapStateToProps, null)(InitializationLayer);
