
function MapControls( {right, bottom, left, top, movementDetected} ) {

    return (
        <div style={{position: 'fixed', right: right, bottom: bottom, left: left, top: top, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px'}}>
            <small style={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid black'}}>Map Controls</small>
            <div style={{display: 'grid', width: '100px', height: '100px', 
                gridTemplateRows: '1fr 1fr 1fr', gridTemplateColumns: '1fr 1fr 1fr'}}>
                <span></span>
                <button onClick={() => movementDetected({'x': 0, 'y': -1})}><img src={'https://img.icons8.com/?size=100&id=86088&format=png&color=000000'} style={{ transform: 'rotate(-90deg)' }} width={50} height={50} alt='Up' /></button>
                <span></span>
                <button onClick={() => movementDetected({'x': -1, 'y': 0})}><img src={'https://img.icons8.com/?size=100&id=86088&format=png&color=000000'} style={{ transform: 'rotate(180deg)' }} width={50} height={50} alt='Left' /></button>
                <span></span>
                <button onClick={() => movementDetected({'x': 0, 'y': 1})}><img src={'https://img.icons8.com/?size=100&id=86088&format=png&color=000000'} style={{ transform: 'rotate(0deg)' }} width={50} height={50} alt='Right' /></button>
                <span></span>
                <button onClick={() => movementDetected({'x': 1, 'y': 0})}><img src={'https://img.icons8.com/?size=100&id=86088&format=png&color=000000'} style={{ transform: 'rotate(90deg)' }} width={50} height={50} alt='Down' /></button>
                <span></span>
            </div>
        </div>
    );
}

export default MapControls;


