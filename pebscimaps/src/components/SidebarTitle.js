'use client'

function SidebarTitle( {title}) {

    return (
        <div className='sidebar-element' style={{color: 'black', fontWeight: 400, textDecoration: 'underline', alignItems: 'center', padding: '4px 0px 4px 4px', width: '100%'}}>
            <p>{title}</p>      
        </div>
    );
  }

export default SidebarTitle;