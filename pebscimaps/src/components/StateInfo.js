

function StateInfo( {stateData}) {
    
    return (
      <div style={{color: 'black'}}>
        <h1>{stateData.name}</h1>
        {/* Render other state information here */}
      </div>
    );
}

export default StateInfo;