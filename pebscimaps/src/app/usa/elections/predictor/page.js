'use client'

import USAMap from '../../USAMap';
import {useEffect, useState} from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import TwoSeventyBar from '../../../../components/elections/TwoSeventyBar';

import {getEVsForYear} from '../../../../app/services/dbFetcherService';
import colors from '../../../../resources/colors.json';

import Link from 'next/link'

import Alert from '@mui/material/Alert';


function UsaElectionsPredictor() {

  const safeRed = 'rgb(175, 48, 48)';
  const likelyRed = 'rgb(236, 100, 105)';
  const leanRed = 'rgb(240, 145, 154)';
  const tiltRed = 'rgb(197, 140, 131)';
  const tossup = '#fcff63';
  const tiltBlue = 'rgb(149, 155, 177)';
  const leanBlue = 'rgb(145, 174, 249)';
  const likelyBlue = 'rgb(95, 123, 198)';
  const safeBlue = 'rgb(37, 63, 135)';

  const SAFE_RED = 0;
  const LIKELY_RED = 1;
  const LEAN_RED = 2;
  const TILT_RED = 3;
  const TOSSUP = 4;
  const TILT_BLUE = 5;
  const LEAN_BLUE = 6;
  const LIKELY_BLUE = 7;
  const SAFE_BLUE = 8;
  const UNASSIGNED = 9;

  const colorList = [
      safeRed,            //0
      likelyRed,          //1
      leanRed,            //2
      tiltRed,            //3
      tossup,             //4
      tiltBlue,           //5
      leanBlue,           //6
      likelyBlue,         //7
      safeBlue,           //8
      'gray' //none       //9
  ];

  const initialEVsByState = [
    { id: "AL", color: "gray", winner: 0 },
    { id: "AK", color: "gray", winner: 0 },
    { id: "AZ", color: "gray", winner: 0 },
    { id: "AR", color: "gray", winner: 0 },
    { id: "CA", color: "gray", winner: 0 },
    { id: "CO", color: "gray", winner: 0 },
    { id: "CT", color: "gray", winner: 0 },
    { id: "DE", color: "gray", winner: 0 },
    { id: "DC", color: "gray", winner: 0 },
    { id: "FL", color: "gray", winner: 0 },
    { id: "GA", color: "gray", winner: 0 },
    { id: "HI", color: "gray", winner: 0 },
    { id: "ID", color: "gray", winner: 0 },
    { id: "IL", color: "gray", winner: 0 },
    { id: "IN", color: "gray", winner: 0 },
    { id: "IA", color: "gray", winner: 0 },
    { id: "KS", color: "gray", winner: 0 },
    { id: "KY", color: "gray", winner: 0 },
    { id: "LA", color: "gray", winner: 0 },
    { id: "ME", color: "gray", winner: 0 },
    { id: "MD", color: "gray", winner: 0 },
    { id: "MA", color: "gray", winner: 0 },
    { id: "MI", color: "gray", winner: 0 },
    { id: "MN", color: "gray", winner: 0 },
    { id: "MS", color: "gray", winner: 0 },
    { id: "MO", color: "gray", winner: 0 },
    { id: "MT", color: "gray", winner: 0 },
    { id: "NE", color: "gray", winner: 0 },
    { id: "NV", color: "gray", winner: 0 },
    { id: "NH", color: "gray", winner: 0 },
    { id: "NJ", color: "gray", winner: 0 },
    { id: "NM", color: "gray", winner: 0 },
    { id: "NY", color: "gray", winner: 0 },
    { id: "NC", color: "gray", winner: 0 },
    { id: "ND", color: "gray", winner: 0 },
    { id: "OH", color: "gray", winner: 0 },
    { id: "OK", color: "gray", winner: 0 },
    { id: "OR", color: "gray", winner: 0 },
    { id: "PA", color: "gray", winner: 0 },
    { id: "RI", color: "gray", winner: 0 },
    { id: "SC", color: "gray", winner: 0 },
    { id: "SD", color: "gray", winner: 0 },
    { id: "TN", color: "gray", winner: 0 },
    { id: "TX", color: "gray", winner: 0 },
    { id: "UT", color: "gray", winner: 0 },
    { id: "VT", color: "gray", winner: 0 },
    { id: "VA", color: "gray", winner: 0 },
    { id: "WA", color: "gray", winner: 0 },
    { id: "WV", color: "gray", winner: 0 },
    { id: "WI", color: "gray", winner: 0 },
    { id: "WY", color: "gray", winner: 0 },
  ];

    const router = useRouter();

    const pathname = usePathname(); 

    const [selectedYear, setSelectedYear] = useState(2020);
    const [marginColor, setMarginColor] = useState(safeRed);

    const [leftEVs, setLeftEVs] = useState(0);
    const [rightEVs, setRightEVs] = useState(0);
    const [remainingEVs, setRemainingEVs] = useState(0);
    const [otherEVs, setOtherEVs] = useState(0);

    const [EVsByState, setEVsByState] = useState(initialEVsByState);


    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState('Margin Color Changed!')
    const [showAlert, setShowAlert] = useState(false);

    const getNextColor = (currentColor) => {
        const currentIndex = colorList.indexOf(currentColor);
        return colorList[(currentIndex + 1) % colorList.length];
    };
    
    // Function to handle year selection
    const handleYearClick = (year) => {
        if (typeof(year) === 'string') {
            year = parseInt(year);
        }

        // Get Electoral Votes Data
        const evsForYear = getEVsForYear(year, true);
        const evsArray = Object.keys(evsForYear).map(stateId => ({
            id: stateId,
            color: "gray", // default color
            winner: 0, // default winner value
            ev: evsForYear[stateId] // electoral votes
        }));

        setEVsByState(evsArray);
        setSelectedYear(year);

        // Navigate programmatically using the new router
        router.push(`${window.location.origin}${pathname}?year=${year}`);
    };

    const changeStateRating = (aState) => {
      //NEED TO ADD LOGIC TO DETERMINE VALUES OF ELECTORAL VOTES
      setEVsByState((prevEVsByState) => {
          return prevEVsByState.map((state) => {
              if (state.id === aState.id) {
                  //const nextColor = getNextColor(state.color);
                  return {
                      ...state,
                      color: marginColor,
                      winner: 1  // You can adjust this value as needed
                  };
              }
              return state;
          });
      });
    };

    const selectColor = (color) => {
      setMarginColor(color);
      switch(color){
        case colorList[SAFE_BLUE]:
          setAlertMessage('Margin color changed to safe blue.');
          break;
        case colorList[LIKELY_BLUE]:
          setAlertMessage('Margin color changed to likely blue.');
          break;
        case colorList[LEAN_BLUE]:
          setAlertMessage('Margin color changed to lean blue.');
          break;
        case colorList[TILT_BLUE]:
          setAlertMessage('Margin color changed to tilt blue.');
          break;
        case colorList[TOSSUP]:
          setAlertMessage('Margin color changed to tossup.');
          break;
        case colorList[UNASSIGNED]:
          setAlertMessage('Margin color changed to unassigned.');
          break;
        case colorList[TILT_RED]:
          setAlertMessage('Margin color changed to tilt red.');
          break;
        case colorList[LEAN_RED]:
          setAlertMessage('Margin color changed to lean red.');
          break;
        case colorList[LIKELY_RED]:
          setAlertMessage('Margin color changed to likely red.');
          break;
        case colorList[SAFE_RED]:
          setAlertMessage('Margin color changed to safe red.');
          break;
      }
      setShowAlert(true);
      setTimeout(() => {
        setAlertMessage(''); 
        setShowAlert(false);
      }, 3000);
    }

    useEffect(() => {
        const evsForYear = getEVsForYear(selectedYear, true);
        const evsArray = Object.keys(evsForYear).map(stateId => ({
            id: stateId,
            color: "gray", // default color
            winner: 0, // default winner value
            ev: evsForYear[stateId] // electoral votes
        }));

        setEVsByState(evsArray);
        setLoading(false);
    }, [selectedYear]);

    //When there is a change to EVsByState, update EV numbers
    useEffect(() => {
      let left = 0;
      let right = 0;
      let other = 0;
      let remaining = 0;
      for(let i = 0; i < EVsByState.length; i++){
        if(EVsByState[i].color === tiltBlue || EVsByState[i].color === leanBlue || EVsByState[i].color === likelyBlue || EVsByState[i].color === safeBlue){
          left += EVsByState[i].ev;
        }else if(EVsByState[i].color === tiltRed || EVsByState[i].color === leanRed || EVsByState[i].color === likelyRed || EVsByState[i].color === safeRed){
          right += EVsByState[i].ev;//TODO
        }else if(EVsByState[i].color === 'gray'){
          remaining += EVsByState[i].ev;
        }else{
          other += EVsByState[i].ev;
        }
      }
      setLeftEVs(left);
      setRightEVs(right);
      setRemainingEVs(remaining);
      setOtherEVs(other);
    }, [EVsByState])

    
    
    return (
        <div style={{color: 'black', backgroundColor: 'white'}}>
          <div style={{display: 'grid', gridTemplateRows: '50px 60px 40px 1fr'}}>

            <div style={{backgroundColor: colors.white, display: 'flex', alignItems: 'center', paddingLeft: '8px'}}>
              <span>Elections Tool Bar</span>
              <Link href='/usa/elections' style={{color: 'blue', paddingLeft: '8px'}}>Back</Link>
              <label htmlFor='years' style={{padding: '0px 4px 0px 8px', color: 'blue'}}>Select Census Year</label>
              <select id='years' onChange={(e) => handleYearClick(e.target.value)}>
                <option value={2020}>2020</option>
                <option value={2010}>2010</option>
                <option value={2000}>2000</option>
              </select>
            </div>

            <TwoSeventyBar leftEVs={leftEVs} rightEVs={rightEVs} otherEVs={otherEVs} remainingEVs={remainingEVs}/>

            <div id='margin-picker' style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', height: '40px', width: '100%'}}>
              <button onClick={() => selectColor(colorList[SAFE_BLUE])} style={{backgroundColor: colorList[SAFE_BLUE], display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center'}}>Safe Left</button>
              <button onClick={() => selectColor(colorList[LIKELY_BLUE])} style={{backgroundColor: colorList[LIKELY_BLUE], display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center'}}>Likely Left</button>
              <button onClick={() => selectColor(colorList[LEAN_BLUE])} style={{backgroundColor: colorList[LEAN_BLUE], display: 'flex', color: 'black', justifyContent: 'center', alignItems: 'center'}}>Lean Left</button>
              <button onClick={() => selectColor(colorList[TILT_BLUE])} style={{backgroundColor: colorList[TILT_BLUE], display: 'flex', color: 'black', justifyContent: 'center', alignItems: 'center'}}>Tilt Left</button>
              <button onClick={() => selectColor(colorList[TOSSUP])} style={{backgroundColor: colorList[TOSSUP], display: 'flex', color: 'black', justifyContent: 'center', alignItems: 'center'}}>Tossup</button>
              <button onClick={() => selectColor(colorList[TILT_RED])} style={{backgroundColor: colorList[TILT_RED], display: 'flex', color: 'black', justifyContent: 'center', alignItems: 'center'}}>Tilt Right</button>
              <button onClick={() => selectColor(colorList[LEAN_RED])}style={{backgroundColor: colorList[LEAN_RED], display: 'flex', color: 'black', justifyContent: 'center', alignItems: 'center'}}>Lean Right</button>
              <button onClick={() => selectColor(colorList[LIKELY_RED])}style={{backgroundColor: colorList[LIKELY_RED], display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center'}}>Likely Right</button>
              <button onClick={() => selectColor(colorList[SAFE_RED])} style={{backgroundColor: colorList[SAFE_RED], display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center'}}>Safe Right</button>
              <button onClick={() => selectColor(colorList[UNASSIGNED])} style={{backgroundColor: colorList[UNASSIGNED], display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center'}}>Unassigned</button>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
            {!loading &&
              <USAMap infoType={"elections"} specificInfoType={"predictor"} selectedYear={selectedYear} suppliedStates={EVsByState} callbackData={(aState) => changeStateRating(aState)}/>
            }
            </div>
          </div>

          <article>
            <h2>Elections in the United States</h2>
            <p>Info to come...</p>
          </article>

          <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '80px',
        }}>
          {showAlert && <Alert severity="info" className="App-alert" sx={{ bgcolor: marginColor}} onClose={() => setShowAlert(false)}><span style={{color: 'black'}}>{alertMessage}</span></Alert>}
        </div>

        </div>
      );
  }

export default UsaElectionsPredictor;