'use client';

import commaifyNumber from "../app/helpers/NumberBeautifier";
import {convertKM2toMI2} from '../app/helpers/Converter';
import Link from 'next/link'

import {useState} from 'react';

function CountryInfo( {children, country} ) {
    
  const [isInKM, setIsInKM] = useState(true);

    return (
      <div style={{color: 'black'}}> 
        <h1 style={{display: 'flex', justifyContent: 'center', paddingTop: '16px', paddingBottom: '16px', fontSize: '1.5rem'}}> <span style={{display: 'flex', alignItems: 'center', paddingRight: '8px', paddingLeft: '4px'}}><img src={country.flag} width='40px' height='auto' /></span> {country.name} </h1>
        <div>
          {children}
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-full md:max-w-2xl mx-auto pt-8">

          <h3 className='py-2'  style={{fontWeight: 'semibold'}}>Summary</h3>
            <p style={{textAlign: 'justify'}}>{country.article.summary}</p>

          <h3 className='py-2'  style={{fontWeight: 'semibold'}}>Geography</h3>
            <p style={{textAlign: 'justify'}}>{country.article.geography}</p>
            <p style={{textAlign: 'justify'}}><span style={{fontWeight: 'bold', color: '#333939'}}>Area</span>: {isInKM && commaifyNumber(country.area)}{!isInKM && commaifyNumber(Math.round(convertKM2toMI2(country.area) ))} {isInKM && <span>km<sup style={{fontSize: 'small'}}>2</sup></span>}{!isInKM && <span>sq mi</span>}
            <span onClick={() => setIsInKM(!isInKM)} style={{color: 'blue', fontSize: 'small', cursor: 'pointer'}}> Swap Unit</span></p>

          <h3 className='py-2'  style={{fontWeight: 'semibold'}}>Demographics</h3>
            <p style={{textAlign: 'justify'}}>{country.article.demographics}</p>
            <p style={{textAlign: 'justify'}}><span style={{fontWeight: 'bold', color: '#333939'}}>Population</span>: {commaifyNumber(country.population)}</p>
            <p style={{textAlign: 'justify'}}><span style={{fontWeight: 'bold', color: '#333939'}}>Population Density</span>: {isInKM && Math.round(country.population/country.area*100)/100}{!isInKM && Math.round(country.population/convertKM2toMI2(country.area)*100)/100}
            {isInKM && <span>/km<sup style={{fontSize: 'small'}}>2</sup></span>}
            {!isInKM && <span>/sq mi</span>}
            <span onClick={() => setIsInKM(!isInKM)} style={{color: 'blue', fontSize: 'small', cursor: 'pointer'}}> Swap Unit</span></p>

          <h3 className='py-2'  style={{fontWeight: 'semibold'}}>Economy</h3>
            <p style={{textAlign: 'justify'}}>{country.article.economy}</p>
            <p style={{textAlign: 'justify'}}><span style={{fontWeight: 'bold', color: '#333939'}}>Nominal GDP in billions</span>: ${commaifyNumber(country.gdp)}</p>
            <p style={{textAlign: 'justify'}}><span style={{fontWeight: 'bold', color: '#333939'}}>GDP per capita</span>: ${commaifyNumber( parseInt(country.gdp/country.population*1000000) )}</p>
            <p style={{textAlign: 'justify'}}>
              <span style={{fontWeight: 'bold', color: '#333939'}}>GDP per area</span>: 
              ${isInKM ? commaifyNumber(Math.round(country.gdp * 1000000 / country.area)) : commaifyNumber(Math.round(country.gdp * 1000000 / convertKM2toMI2(country.area)))}
              {isInKM && <span>/km<sup style={{fontSize: 'small'}}>2</sup></span>}
              {!isInKM && <span>/sq mi</span>}
              <span onClick={() => setIsInKM(!isInKM)} style={{color: 'blue', fontSize: 'small', cursor: 'pointer'}}> Swap Unit</span>
            </p>

          <h3 className='py-2'  style={{fontWeight: 'semibold'}}>Culture</h3>
            <p style={{textAlign: 'justify'}}>{country.article.culture}</p>

          <h3 className='py-2'  style={{fontWeight: 'semibold'}}>Education</h3>
            <p style={{textAlign: 'justify'}}>{country.article.education}</p>

          <h3 className='py-2'  style={{fontWeight: 'semibold'}}>Infrastructure</h3>
            <p style={{textAlign: 'justify'}}>{country.article.infrastructure}</p>

          <h3 className='py-2'  style={{fontWeight: 'semibold'}}>Government</h3>
            <p style={{textAlign: 'justify'}}>{country.article.government}</p>


          </article>
        </div>

      </div>
    );
  }

export default CountryInfo;