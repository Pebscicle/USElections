import Link from 'next/link';

function SidebarButton( {name, link}) {
    
    return (
        <Link className='sidebar-element' style={{display: 'flex', alignItems: 'center'}} href={link}>
            <button >{name}</button>      
        </Link>
    );
  }

export default SidebarButton;