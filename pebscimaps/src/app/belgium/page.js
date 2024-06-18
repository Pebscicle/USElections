import CountryInfo from '../../components/CountryInfo';


import belgium from '../../data/belgium.json'

function Belgium() {
    
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
          <CountryInfo country={belgium}>

          </CountryInfo>
        </div>
      </>
    );
  }

export default Belgium;