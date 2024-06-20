
import commaifyNumber from "../app/helpers/NumberBeautifier";
import {convertKM2toMI2} from '../app/helpers/Converter';
import {findIndexOfYear, determineDominantColor} from "../app/services/dbFetcherService"
import VotingBar from "./elections/VotingBar";

  //Make Modal Draggable
  import Draggable, {DraggableCore} from 'react-draggable';

import colors from '../resources/colors.json'

import {useEffect, useState} from 'react'

import Link from 'next/link';

function InfoModal( {infoType, selectedYear, isVisible, closeModal, entity, imageLink} ) {

  const [isLoading, setIsLoading] = useState(true);
  const [isInKM, setIsInKM] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Set loading to true when imageLink changes
    const img = new Image();
    img.src = imageLink; // Preload the image
    img.onload = () => {
      setIsLoading(false); // Set loading to false once the image is loaded
    };
  }, [imageLink]); // Re-run effect if imageLink changes

  const determineBackgroundColor = () => {
    return determineDominantColor(entity.electionResults[findIndexOfYear(selectedYear)].democrat, entity.electionResults[findIndexOfYear(selectedYear)].republican);
  }

    return (
    <>
    {isVisible && infoType === "general" &&
    <Draggable
    axis="both"
    handle=".handle"
    defaultPosition={{x: 0, y: 0}}
    position={null}
    grid={[25, 25]}
    scale={1}
    onStart={(event, data) => {
      // Add your custom logic here
    }}
    onDrag={(event, data) => {
      // Add your custom logic here
    }}
    onStop={(event, data) => {
      // Add your custom logic here
    }}>
      <div style={{position: 'fixed', right: '50px', bottom: '25vh', width: '350px', height: '450px', borderRadius: '5px', color: 'black', backgroundColor: colors.white, boxShadow: "0px 2px 5px 2px gray"}}> 
        <div style={{display: 'grid', gridTemplateColumns: 'auto 50px 1fr auto', gridTemplateRows: '25px'}}>
            <Link href={`/usa/${entity.name.toLowerCase()}`}>
              <span style={{color: colors.clickable, fontWeight: 900, padding: '2px', cursor: 'pointer'}}>{entity.name}</span>    
            </Link>
            <div style={{paddingLeft: '4px', display: 'flex', alignItems: 'center'}}>
              <img src={entity.flag} style={{height: '20px'}} alt='Flag'/>
            </div>
            <span className="handle"
            style={{
              cursor: "move",
              backgroundImage: "radial-gradient(circle at 2px 2px, gray 1px, transparent 1px)",
              backgroundSize: "5px 5px",
            }}
            ></span>
            <span style={{cursor: 'pointer', backgroundColor: colors.close, borderRadius: '0px 5px 0px 0px', padding: '0px 8px', display: 'flex', alignItems: 'center'}}onClick={closeModal}>X</span>
        </div>
        <img src={imageLink} style={{ backgroundColor: 'gray', height: '200px', width: '100%', opacity: isLoading? 0.5 : 1 }} alt="placeholder image" height="200px" />
        <div style={{paddingLeft: '4px', paddingTop: '8px'}}>
          <p><span style={{fontWeight: 'bold', color: '#333939'}}>Population</span>: {commaifyNumber(entity.population)}</p>
          <p><span style={{fontWeight: 'bold', color: '#333939'}}>Capital</span>: {entity.capital.name} <span style={{fontSize: 'small', cursor: 'pointer', borderBottom: 'dotted 1px black'}} title={`${Math.round(entity.capital.population/entity.population*100)}% of state's population`}>({commaifyNumber(entity.capital.population)})</span></p>
          <p><span style={{fontWeight: 'bold', color: '#333939'}}>Largest City</span>: {entity.largestCity.name} <span style={{fontSize: 'small', cursor: 'pointer', borderBottom: 'dotted 1px black'}} title={`${Math.round(entity.largestCity.population/entity.population*100)}% of state's population`}>({commaifyNumber(entity.largestCity.population)})</span></p>
          <p><span style={{fontWeight: 'bold', color: '#333939'}}>Area</span>: {isInKM && commaifyNumber(entity.area)}{!isInKM && commaifyNumber(Math.round(convertKM2toMI2(entity.area) ))} {isInKM && <span>km<sup style={{fontSize: 'small'}}>2</sup></span>}{!isInKM && <span>sq mi</span>}
            <span onClick={() => setIsInKM(!isInKM)} style={{color: 'blue', fontSize: 'small', cursor: 'pointer'}}> Swap Unit</span>
          </p>
          <p><span style={{fontWeight: 'bold', color: '#333939'}}>Population Density</span>: {isInKM && Math.round(entity.population/entity.area*100)/100}{!isInKM && Math.round(entity.population/convertKM2toMI2(entity.area)*100)/100}
            {isInKM && <span>/km<sup style={{fontSize: 'small'}}>2</sup></span>}
            {!isInKM && <span>/sq mi</span>}
            <span onClick={() => setIsInKM(!isInKM)} style={{color: 'blue', fontSize: 'small', cursor: 'pointer'}}> Swap Unit</span>
          </p>
          <p><span style={{fontWeight: 'bold', color: '#333939'}}>Nominal GDP in billions</span>: ${commaifyNumber(entity.gdp)}</p>
          <p><span style={{fontWeight: 'bold', color: '#333939'}}>GDP per capita</span>: ${commaifyNumber( parseInt(entity.gdp/entity.population*1000000) )}</p>
          <p><span style={{fontWeight: 'bold', color: '#333939'}}>HDI</span>: <span>
            {entity.hdi} <span
            style={{
              color: entity.hdi >= 0.8? '#00441B' : 
              (entity.hdi > 0.699 ? '#66C2A4' : 
                (entity.hdi > 0.549 ? '#b2b849' :
                  '#6D0026'
                )
              )
            }}>(
              {entity.hdi >= 0.8 && <span>Very High</span>}
              {(entity.hdi < 0.8 && entity.hdi > 0.699)  && <span>High</span>}
              {(entity.hdi < 0.700 && entity.hdi > 0.549)  && <span>Medium</span>}
              {entity.hdi < 0.550 && <span>Low</span>}
              )</span>
            </span>
          </p>
        </div>
      </div>
    </Draggable>
    }
    {isVisible && infoType === "elections" &&
    <Draggable
    axis="both"
    handle=".handle"
    defaultPosition={{x: 0, y: 0}}
    position={null}
    grid={[25, 25]}
    scale={2}
    onStart={(event, data) => {
      // Add your custom logic here
    }}
    onDrag={(event, data) => {
      // Add your custom logic here
    }}
    onStop={(event, data) => {
      // Add your custom logic here
    }}>
      <div style={{position: 'fixed', right: '50px', bottom: '25vh', width: '350px', height: '450px', borderRadius: '5px', color: 'black', backgroundColor: colors.white, boxShadow: "0px 2px 5px 2px gray"}}> 
        <div style={{display: 'grid', gridTemplateColumns: 'auto 50px 1fr auto', gridTemplateRows: '25px'}}>
            <Link href={`/usa/${entity.name.toLowerCase()}`}>
              <span style={{padding: '2px', cursor: 'pointer'}}>{entity.name}</span>    
            </Link>
            <div style={{paddingLeft: '4px', display: 'flex', alignItems: 'center'}}>
              <img src={entity.flag} style={{height: '20px'}} alt='Flag'/>
            </div>
            <span className="handle" style={{borderBottom: 'solid 1px black', cursor: 'pointer'}}></span>
            <span style={{cursor: 'pointer', backgroundColor: colors.close, borderRadius: '0px 5px 0px 0px', padding: '0px 8px', display: 'flex', alignItems: 'center'}}onClick={closeModal}>X</span>
        </div>
        <img src={imageLink} style={{ backgroundColor: 'gray', height: '200px', width: '100%', opacity: isLoading? 0.5 : 1 }} alt="placeholder image" height="200px" />
        <div style={{paddingLeft: '4px', paddingTop: '8px'}}>
          <p>Election Year: {entity.electionResults[findIndexOfYear(selectedYear)].year}</p>
          <VotingBar 
          leftVotes={entity.electionResults[findIndexOfYear(selectedYear)].democrat}
          rightVotes={entity.electionResults[findIndexOfYear(selectedYear)].republican}
          indyVotes={entity.electionResults[findIndexOfYear(selectedYear)].independent}
          libertarianVotes={entity.electionResults[findIndexOfYear(selectedYear)].libertarian}
          greenVotes={entity.electionResults[findIndexOfYear(selectedYear)].green}
          otherVotes={entity.electionResults[findIndexOfYear(selectedYear)].other}
          />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>Democrat</span>
            <span>Republican</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{commaifyNumber(entity.electionResults[findIndexOfYear(selectedYear)].democrat)}</span>
            <span>{commaifyNumber(entity.electionResults[findIndexOfYear(selectedYear)].republican)}</span>
          </div>
        </div>
      </div>
    </Draggable>
    }
    </>
    
    );
  }

export default InfoModal;