import React from "react";
import { Authenticator, AmplifyTheme } from 'aws-amplify-react'
import { Auth, Hub } from 'aws-amplify'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MarketPage from './pages/MarketPage'
import NavBar from './components/Navbar'
import './App.css'
import '@aws-amplify/ui/dist/style.css';

export const UserContext = React.createContext()


class App extends React.Component {
  state = {
    user: null
  };


  componentDidMount() {
    this.getUserData();
    Hub.listen('auth', this, 'onHubCapsule')
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    user ? this.setState({user}) : this.setState({user: null})
  }

  onHubCapsule = capsule => {
    switch(capsule.payload.event) {
      case "signIn":
        console.log('signed in')
        this.getUserData();
        break;
      case "signUp":
        console.log('signed up');
        break;
      case "signOut":
        console.log('signed out');
        this.setState({ user: null });
        break;
      default:
        return;
    }
  }

  handleSignout = async () => {
    console.log('sign outtt')
    try {
      await Auth.signOut().then( () => {
      })
    } catch(err) {
      console.error('Error signing out user', err);
    }
  }

  render() {
    const { user } = this.state;

    return  !user ? (
      <Authenticator theme={theme}/> )
       : (
         <UserContext.Provider value={{ user }}>
          <Router>
            <>
            {/* Navigation */}
            <NavBar user={user} handleSignout={this.handleSignout}/>
            {/* Routes */}
            <div className="app-container">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/markets/:marketId" component={ ({match}) => <MarketPage user={user} marketId={match.params.marketId} />
              } />
            </div>
            </>
          </Router>
        </UserContext.Provider>
    );
  }
}

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "var(--squidInk)"
  },
  navItem: {
    ...AmplifyTheme.navBar,
    color: "var(--white)",
    borderColor: "none"
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--amazonOrange)"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  }
}

// export default withAuthenticator(App, true, [], null, theme);
export default App
