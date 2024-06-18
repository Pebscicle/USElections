import CountryInfo from "../../components/CountryInfo"
import usa from '../../data/usa.json'
import Link from 'next/link';
import USAMap from "./USAMap";

function USA() {
  return (
    <div style={{color: 'black'}}>
      <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
        <CountryInfo country={usa}>
          <USAMap infoType={"general"}/>
        </CountryInfo>
      </div>
      {usa.states.map((state) => (
          <Link style={{display: 'flex', alignItems: 'center', justifyContent: 'start', overflowY: 'scroll'}} href={`/usa/alabama`}>
              <h1 style={{marginLeft: '16px'}}>{state.name}</h1>
              {/*children*/}
          </Link>
        ))
      }
    </div>
  );
}

export default USA;