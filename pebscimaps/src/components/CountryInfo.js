import commaifyNumber from "../app/helpers/NumberBeautifier";
import Link from 'next/link'


function CountryInfo( {children, country} ) {
    
    return (
      <div style={{color: 'black'}}> 
        <h1 style={{display: 'flex', justifyContent: 'center', paddingTop: '16px', paddingBottom: '16px', fontSize: '1.5rem'}}>{country.name}</h1>
        <div>
          {children}
        </div>
        <div>
          <p>Population: {commaifyNumber(country.population)}</p>
          <p>Nominal GDP in billions: ${commaifyNumber(country.gdp)}</p>
          <p>GDP per capita: ${commaifyNumber( parseInt(country.gdp/country.population*1000000) )}</p>
          <p>Elections: <Link style={{color: 'blue'}} href={"/usa/elections"}>Learn More</Link></p>
          <p>State Creator: <Link style={{color: 'red'}} href={"/usa/creator"}>NEW!</Link></p>
        </div>
        {/* Render other state information here */}
      </div>
    );
  }

export default CountryInfo;