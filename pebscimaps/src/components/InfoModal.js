
import commaifyNumber from "../app/helpers/NumberBeautifier";
import {findIndexOfYear, determineDominantColor} from "../app/services/dbFetcherService"
import VotingBar from "./elections/VotingBar";

function InfoModal( {infoType, selectedYear, isVisible, closeModal, entity} ) {


  const determineBackgroundColor = () => {
    return determineDominantColor(entity.electionResults[findIndexOfYear(selectedYear)].democrat, entity.electionResults[findIndexOfYear(selectedYear)].republican);
  }

    return (
    <>
    {isVisible && infoType === "general" &&
      <div style={{position: 'fixed', right: '50px', bottom: '25vh', width: '350px', height: '450px', borderRadius: '5px', padding: '8px', color: 'black', backgroundColor: '#ffffff', boxShadow: "0px 2px 5px 2px gray"}}> 
        <div style={{display: 'grid', gridTemplateColumns: '1fr 13px'}}>
            <span>{entity.name}</span>
            <span style={{cursor: 'pointer'}}onClick={closeModal}>X</span>
        </div>
        <img src='2020.png' style={{backgroundColor: 'purple', height: '150px', width: '100%'}} alt="placeholder image" height="150px" width="100%"/>
        <p>Population: {commaifyNumber(entity.population)}</p>
        <p>Nominal GDP in billions: ${commaifyNumber(entity.gdp)}</p>
        <p>GDP per capita: ${commaifyNumber( parseInt(entity.gdp/entity.population*1000000) )}</p>
      </div>
    }
    {isVisible && infoType === "elections" &&
      <div style={{position: 'fixed', right: '50px', bottom: '25vh', width: '350px', height: '450px', borderRadius: '5px', padding: '8px', color: 'black', backgroundColor: '#ffffff', boxShadow: "0px 2px 5px 2px gray"}}> 
        <div style={{display: 'grid', gridTemplateColumns: '1fr 13px'}}>
            <span>{entity.name}
              <span style={{backgroundColor: {determineBackgroundColor}, color: 'white', borderRadius: '5px', paddingLeft: '2px', paddingRight: '2px', marginLeft: '4px'}}>
                  R+4
              </span>
            </span>
            <span style={{cursor: 'pointer'}}onClick={closeModal}>X</span>
        </div>
        <img src='2020.png' style={{backgroundColor: 'purple', height: '150px', width: '100%'}} alt="placeholder image" height="150px" width="100%"/>
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
    }
    
    </>
    );
  }

export default InfoModal;