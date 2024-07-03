import './ToggleSwitch.css';
import '../components/ToggleSwitch.css'

function ToggleSwitch( {} ) {

    return (
        <label className="toggle-switch"> 
            <input type= "checkbox" className="toggle-switch-checkbox"/>
            <span className= "toggle-switch-slider"></span>
        </label>
    );
  }

export default ToggleSwitch;

