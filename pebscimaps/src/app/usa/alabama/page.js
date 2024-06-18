import StateInfo from "@/components/StateInfo";


import usa from '../../../data/usa.json'

function Alabama() {
    
    return (
      <StateInfo stateData={usa.states[0]}></StateInfo>
    );
  }

export default Alabama;