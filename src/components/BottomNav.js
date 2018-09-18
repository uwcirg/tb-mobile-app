import React from "react"

import { NavLink } from "react-router-dom"

import {
  CalendarCheckIcon,
  EmailIcon,
  InformationIcon,
  ChartLineIcon,
  PencilIcon,
} from "mdi-react"

const BottomNav = () => (
  <div>
    <NavLink exact to='/daily-checkin'>
      <CalendarCheckIcon />
    </NavLink>

    <NavLink exact to='/messages'>
      <EmailIcon />
    </NavLink>

    <NavLink exact to='/info'>
      <InformationIcon />
    </NavLink>

    <a href={ process.env.REACT_APP_CPRO_PATH+'/users/care' }>
      <ChartLineIcon />
    </a>

    <NavLink exact to='/my-notes'>
      <PencilIcon />
    </NavLink>
  </div>
)

export default BottomNav;
