'use client'

import usa from '../../../data/usa.json'
import USAMap from '../USAMap';
import {useState} from 'react'
import commaifyNumber from '../../helpers/NumberBeautifier';
import {getRankingForGivenMetric} from '../../services/rankingService';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


function UsaCreator() {
    const router = useRouter();

    const pathname = usePathname(); 
    const searchParams = useSearchParams();

    console.log(router.query);
    console.log(pathname);
    console.log(searchParams.get('year'));

    //Default of New England as an example.
    const [selectedStates, setSelectedStates] = useState([{id: 'ME', name: 'Maine', population: 1395722, gdp: 91081},{id: 'NH', name: 'New Hampshire', population: 1402054, gdp: 111102},{id: 'VT', name: 'Vermont', population: 647464, gdp: 43130},{id: 'MA', name: 'Massachusetts', population: 7001399, gdp: 733860},{id: 'CT', name: 'Connecticut', population: 3617176, gdp: 340181},{id: 'RI', name: 'Rhode Island', population: 1095962, gdp: 77322}]);
    
        //SUMMARY STATISTIC Functions:
        const getTotalPopulation = () => {
            let totalPop = 0;
            for(let i = 0; i < selectedStates.length; i++){
                totalPop += selectedStates[i].population;
            }
            return totalPop;
        }

            const getPopRanking = () => {
                const state = {id: 'new', name: 'made up state', population: getTotalPopulation(), gdp: getTotalGDP()}
                const ranking = getRankingForGivenMetric(state, 'population');

                console.log("ranking");
                console.log(ranking);
            }

        const getTotalGDP = () => {
            let totalGDP = 0;
            for(let i = 0; i < selectedStates.length; i++){
                totalGDP += selectedStates[i].gdp;
            }
            return totalGDP;
        }

        const getGDPperCapita = () => {
            return getTotalGDP()*1000000/getTotalPopulation();
        }

    //Reset selected states
    const resetList = () => {
        setSelectedStates([]);
    }


    //Function to handle adding/removing states from list
    const modifyStateFromList = (state) => {

        let arr = selectedStates;
        let isThere = false;

        arr = arr.filter((item) => {
            if(item.id != state.id){
                return item;
            }else if(item.id === state.id){
                isThere = true;
            }
        });
        if(!isThere){
            arr.push(state);
        }

        setSelectedStates(arr);
    }

    
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div style={{color: 'black', marginTop: '20px', marginBottom: '20vh'}}>
          <div style={{marginLeft: '16px', paddingBottom: '50px'}}>
            <h2 style={{fontSize: '1.3rem'}}>State Creator</h2>
            <p>Combine states and learn how this new state would be if it existed.</p>
            <p>Population: {commaifyNumber(getTotalPopulation())} (Ranked #{getPopRanking()})</p>
            <p>Nominal GDP in billions: ${commaifyNumber(getTotalGDP())} or ${Math.round(getTotalGDP()/10000)/100} trillion</p>
            <p>Nominal GDP per capita: ${commaifyNumber(Math.round(getGDPperCapita())) == 'NaN' ? 0 : commaifyNumber(Math.round(getGDPperCapita()))}</p>

            <button onClick={resetList} style={{backgroundColor: 'rgb(227, 99, 86)', borderRadius: '5px', padding: '3px 5px', fontSize: 'small'}}>
                Reset
            </button>
          </div>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <USAMap infoType={"creator"} selectedYear={2020} callbackData={modifyStateFromList} suppliedList={selectedStates}/>
          </div>

        </div>
        </Suspense>
      );
  }

export default UsaCreator;