import commaifyNumber from "../../app/helpers/NumberBeautifier"
import Link from 'next/link';
import {useEffect, useState} from 'react';

import colors from '../../resources/colors.json';


function TwoSeventyBar( {leftEVs, rightEVs, otherEVs} ) {
    

  const [gridStyling, setGridStyling] = useState('1fr 1fr');

    const blackBarStyling = {
        backgroundColor: 'black',
        width: '5px',
        height: '66px',
        position: 'absolute',
        marginLeft: '50%'
    }

    const getLeftPercent = () => {
        return leftEVs/(leftEVs+rightEVs+otherEVs)*100;
    }

    const getRightPercent = () => {
        return rightEVs/(leftEVs+rightEVs+otherEVs)*100;
    }

    const getOtherPercent = () => {
        return otherEVs/(leftEVs+rightEVs+otherEVs)*100;
    }

    const getRemainingPercent = () => {
        return 0;
    }

  const returnFormattedStyle = () => {
    return `${getLeftPercent()}fr ${getOtherPercent()}px ${getRemainingPercent()}fr ${getRightPercent()}fr`;
  }


  return (
    <div>
    <div style={{display: 'grid', gridTemplateColumns: returnFormattedStyle(), height: '100%', backgroundColor: colors.white}}>
      <div style={{color: 'white', backgroundColor: 'blue', borderRadius: '5px 0px 0px 5px', display: 'flex', alignItems: 'center', paddingLeft: '5px'}}>Democrat {leftEVs} {(leftEVs > rightEVs) && <img src='https://img.icons8.com/?size=100&id=63262&format=png&color=000000' style={{width: '25px', height: '25px'}}/> }</div>
      <div style={{color: 'white', backgroundColor: 'yellow'}}></div>
      <div style={{color: 'white', backgroundColor: colors.white}}></div>
      
      <div style={{color: 'white', backgroundColor: 'red', borderRadius: '0px 5px 5px 0px', display: 'flex', alignItems: 'center', paddingLeft: '5px'}}>Republican {rightEVs} {(rightEVs > leftEVs) && <img src='https://img.icons8.com/?size=100&id=63262&format=png&color=000000' style={{width: '25px', height: '25px'}}/> }</div>
    </div>
    </div>
  );
  }

export default TwoSeventyBar;