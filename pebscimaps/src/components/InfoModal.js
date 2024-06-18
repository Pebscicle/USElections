
import commaifyNumber from "../app/helpers/NumberBeautifier";
import {findIndexOfYear, determineDominantColor} from "../app/services/dbFetcherService"
import VotingBar from "./elections/VotingBar";

import {useEffect, useState} from 'react'

function InfoModal( {infoType, selectedYear, isVisible, closeModal, entity, imageLink} ) {

  const [isLoading, setIsLoading] = useState(true);

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
      <div style={{position: 'fixed', right: '50px', bottom: '25vh', width: '350px', height: '450px', borderRadius: '5px', color: 'black', backgroundColor: '#ffffff', boxShadow: "0px 2px 5px 2px gray"}}> 
        <div style={{display: 'grid', gridTemplateColumns: '1fr auto'}}>
            <span style={{padding: '2px'}}>{entity.name}</span>
            <span style={{cursor: 'pointer', backgroundColor: 'red', borderRadius: '0px 5px 0px 0px', padding: '0px 8px', display: 'flex', alignItems: 'center'}}onClick={closeModal}>X</span>
        </div>
        <img src={imageLink} style={{ backgroundColor: 'gray', height: '200px', width: '100%', opacity: isLoading? 0.5 : 1 }} alt="placeholder image" height="200px" />
        <div style={{paddingLeft: '4px', paddingTop: '8px'}}>
          <p>Population: {commaifyNumber(entity.population)}</p>
          <p>Nominal GDP in billions: ${commaifyNumber(entity.gdp)}</p>
          <p>GDP per capita: ${commaifyNumber( parseInt(entity.gdp/entity.population*1000000) )}</p>
        </div>
      </div>
    }
    {isVisible && infoType === "elections" &&
      <div style={{position: 'fixed', right: '50px', bottom: '25vh', width: '350px', height: '450px', borderRadius: '5px', color: 'black', backgroundColor: '#ffffff', boxShadow: "0px 2px 5px 2px gray"}}> 
        <div style={{display: 'grid', gridTemplateColumns: '1fr auto'}}>
            <span>{entity.name}
              <span style={{backgroundColor: {determineBackgroundColor}, color: 'white', borderRadius: '5px', paddingLeft: '2px', paddingRight: '2px', marginLeft: '4px'}}>
                  R+4
              </span>
            </span>
            <span style={{cursor: 'pointer', backgroundColor: 'red', borderRadius: '0px 5px 0px 0px', padding: '0px 8px'}}onClick={closeModal}>X</span>
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
    }
    </>
    
    );
  }

export default InfoModal;