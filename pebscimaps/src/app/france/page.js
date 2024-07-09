import CountryInfo from '../../components/CountryInfo';


import france from '../../data/france.json'
import FranceMap from "./FranceMap";

function France() {
    
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'white'}}>
          <CountryInfo country={france}>
            <FranceMap />
          </CountryInfo>
        </div>
      </>
    );
  }

export default France;