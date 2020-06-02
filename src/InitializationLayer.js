import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import browserHistory from 'utils/browserHistory';
import { Loading } from './components';

const MainPage = React.lazy(() => import('pages/MainPage'));

class InitializationLayer extends React.Component {

  render() {
    return (
      <ThemeProvider theme={this.props.themeColors}>
        <Router history={browserHistory}>
          <Switch>
            <React.Suspense fallback={<Loading/>}>
              <Route path='/' component={MainPage}/>
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