import SidebarButton from "./SidebarButton";

function SidebarCountry( {name, link}) {
    
    return (
        <div className='sidebar-element' style={{display: 'grid', gridTemplateColumns: '25px 1fr', }}>
            <div style={{backgroundColor: 'green', width: '25px', height: '25px'}}></div>
            <SidebarButton name={name} link={link}/>
        </div>
    );
  }

export default SidebarCountry;