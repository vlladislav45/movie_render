import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { connect, useDispatch } from 'react-redux'
import browserHistory from 'utils/browserHistory'
import { Loading } from './components'
import { TopNavBar } from './modules/navigation'
import { closeUserDropDown } from './reducers/uiReducer'

const MainPage = React.lazy(() => import('pages/MainPage'))
const ProfilePage = React.lazy(() => import('pages/ProfilePage'))

class InitializationLayer extends React.Component {

  render () {
    return (
      <ThemeProvider theme={this.props.themeColors}>
        <TopNavBar/>
        <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
        }} onClick={this.props.closeDropDown}/>
        <Router history={browserHistory} onClick={this.click}>
          <Switch>
            <React.Suspense fallback={<Loading/>}>
              <Route path='/' component={MainPage}/>
              <Route path='/profile' component={ProfilePage}/>
            </React.Suspense>
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = ({ themeReducer: { themeColors } }) => ({
  themeColors,
})

const mapDispatchToProps = {
  closeDropDown: closeUserDropDown,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  InitializationLayer)
