'use client'

function SidebarTitle( {title}) {

    return (
        <div className='sidebar-element' style={{display: 'flex', color: 'black', justifyContent: 'center', alignItems: 'center', padding: '4px 0px 4px 4px', width: '100%'}}>
            <p>{title}</p>      
        </div>
    );
  }

export default SidebarTitle;