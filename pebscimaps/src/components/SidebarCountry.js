import SidebarButton from "./SidebarButton";

function SidebarCountry( {name, link, flag}) {
    
    return (
        <div className='sidebar-element' style={{display: 'grid', gridTemplateColumns: '25px 1fr', }}>
            <div style={{display: 'flex', alignItems: 'center', paddingRight: '4px'}}>
                <img src={flag} width='auto' height='auto' />
            </div>
            <SidebarButton name={name} link={link}/>
        </div>
    );
  }

export default SidebarCountry;