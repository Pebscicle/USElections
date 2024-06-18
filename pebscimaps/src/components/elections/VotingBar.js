import commaifyNumber from "../../app/helpers/NumberBeautifier"
import Link from 'next/link';
import {useEffect, useState} from 'react';


function VotingBar( {leftVotes, rightVotes, indyVotes, libertarianVotes, greenVotes, otherVotes} ) {
    
  const [leftPercent, setLeftPercent] = useState(50);
  const [rightPercent, setRightPercent] = useState(50);
  const [indyPercent, setIndyPercent] = useState(0);
  const [libertarianPercent, setLibertarianPercent] = useState(0);
  const [greenPercent, setGreenPercent] = useState(0);
  const [otherPercent, setOtherPercent] = useState(0);
  const [gridStyling, setGridStyling] = useState('1fr 1fr');
  /*const 
  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getData("viewshed-precision");
      console.log("getting viewshedPrecision " + data + " under viewshed-precision");
      setRouteInterval(data ?? 1);
    };

    fetchSettings();

    setUserName(route.params.uName);
    
  }, []);*/

  const getDemPercent = () => {
    return Math.round(leftVotes/(leftVotes+rightVotes+indyVotes+libertarianVotes+greenVotes+otherVotes)*10000)/100;
  }

  const getRepPercent = () => {
    return Math.round(rightVotes/(leftVotes+rightVotes+indyVotes+libertarianVotes+greenVotes+otherVotes)*10000)/100;
  }

  const getIndyPercent = () => {
    return Math.round(indyVotes/(leftVotes+rightVotes+indyVotes+libertarianVotes+greenVotes+otherVotes)*10000)/100;
  }

  const returnFormattedStyle = () => {
    return `${getDemPercent()}fr ${getRepPercent()}fr`;
  }


  /*useEffect(() => {
    //Calculate percentages
    const demPercent = Math.round(leftVotes/(leftVotes+rightVotes)*100);
    const repPercent = Math.round(rightVotes/(leftVotes+rightVotes)*100);
    setGridStyling(demPercent+'fr '+repPercent+'fr')
  }, []);*/

  return (
    <div style={{display: 'grid', gridTemplateColumns: returnFormattedStyle(), marginTop: '5px'}}>
      <div style={{color: 'white', paddingLeft: '4px', backgroundColor: 'blue', borderRadius: '5px 0px 0px 5px'}}>{getDemPercent()+'%'}</div>
      <div style={{color: 'white', paddingLeft: '4px', backgroundColor: 'red', borderRadius: '0px 5px 5px 0px'}}>{getRepPercent()+'%'}</div>
    </div>
  );
  }

export default VotingBar;