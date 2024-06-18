import SidebarButton from "./SidebarButton";
import SidebarTitle from "./SidebarTitle";
import SidebarCountry from './SidebarCountry';

//import './BouncingArrow.css';
import './Sidebar.css'


function Sidebar() {
    
    return (
        <div className= "sidebar" style={{backgroundColor: 'red', height: '100vh', width: '200px', position: 'fixed'}}>
            <SidebarButton name='Home' link='/' />

            <div style={{width: "100%", border: 'solid black 1px'}}></div>

            <SidebarTitle title='Countries' />
                <SidebarCountry name='France' link='/france'/>

                <SidebarCountry name='USA' link='/usa'/>
        </div>
    );
  }

export default Sidebar;

