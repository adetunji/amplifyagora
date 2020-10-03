import React from "react";
import { Menu as Nav, Icon, Button } from "element-react";
import {NavLink} from "react-router-dom"
import { Icon  as ReactIcon} from 'react-icons-kit'
import {ic_account_balance} from 'react-icons-kit/md/ic_account_balance'

const Navbar = ({user, handleSignout}) => (
  <Nav mode="horizontal" theme="dark" defaultActive="1">
    <div className="nav-container">
      {/* App Title / Icon */}
      <Nav.Item index="1">
        <NavLink to="/" className="nav-link">
          <span className="app-title">
            {/* <img src="https://icon.now.sh/account_balance/f90" alt="App Icon" className="app-icon"/> */}
            {/* <ReactIcon  style={{width: 24, height: 24, paddingBottom: 5, paddingRight: 5}} alt="App Icon" icon={ic_account_balance}/> */}
            AmplifyAgora
          </span>
        </NavLink>
      </Nav.Item>

      {/* Navbar Items */}
      <div className="nav-items">
        <Nav.Item index="2">
          <span className="app-user">Hello, {user.username}</span>
        </Nav.Item>
        <Nav.Item index="3">
          <NavLink to="/profile" className="nav-link">
           <Icon name="setting" />
           Profile
          </NavLink>
        </Nav.Item>
        <Nav.Item index="4">
          <Button type="warning" onClick={handleSignout}>Sign Out</Button>
        </Nav.Item>
      </div>
    </div>
  </Nav>
)

export default Navbar;
