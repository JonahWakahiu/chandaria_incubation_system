import React from 'react'
import NavbarAdmin from '../admin/components/AdminNavbar';
import { Outlet } from 'react-router-dom';

function InnovatorLayout() {
  return (
    <>
    <div id='innovatorNavbar'>
        <NavbarAdmin />
    </div>
    <div id='innovatorSidebar'>

    </div>
    <div id='innovatorMaincontent'>
        <Outlet />
    </div>
    </>
  )
}

export default InnovatorLayout;