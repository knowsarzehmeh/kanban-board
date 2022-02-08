import React from 'react';
import Content from './Content';
import Sidebar from './Sidebar';

function Layout({children}) {
  return (
      <div className='flex m-width-full min-h-screen inset-x-0 bg-white relative overflow-x-hidden'>
       <Sidebar />
       <Content>
            {children}
       </Content>
      </div>
  )
}

export default Layout;
