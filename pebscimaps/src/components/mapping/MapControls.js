
function MapControls( {right, bottom, left, top, buttonClicked} ) {

    return (
        <div style={{position: 'absolute', right: right, bottom: bottom, left: left, top: top, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderTopLeftRadius: '10px'}}>
            <small style={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid black'}}>Map Controls</small>
            <div style={{display: 'grid', width: '100px', height: '100px', 
                gridTemplateRows: '1fr 1fr 1fr', gridTemplateColumns: '1fr 1fr 1fr'}}>
                <button onClick={() => buttonClicked('zoom-out')} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} ><img src={'https://img.icons8.com/?size=100&id=717&format=png&color=000000'} width={25} height={25} alt='Zoom Out' /></button>
                <button onClick={() => buttonClicked('pan-up')}><img src={'https://img.icons8.com/?size=100&id=86088&format=png&color=000000'} style={{ transform: 'rotate(-90deg)' }} width={50} height={50} alt='Up' /></button>
                <button onClick={() => buttonClicked('zoom-in')} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} ><img src={'https://img.icons8.com/?size=100&id=715&format=png&color=000000'} width={25} height={25} alt='Zoom In' /></button>
                <button onClick={() => buttonClicked('pan-left')}><img src={'https://img.icons8.com/?size=100&id=86088&format=png&color=000000'} style={{ transform: 'rotate(180deg)' }} width={50} height={50} alt='Left' /></button>
                <span></span>
                <button onClick={() => buttonClicked('pan-right')}><img src={'https://img.icons8.com/?size=100&id=86088&format=png&color=000000'} style={{ transform: 'rotate(0deg)' }} width={50} height={50} alt='Right' /></button>
                <span></span>
                <button onClick={() => buttonClicked('pan-down')}><img src={'https://img.icons8.com/?size=100&id=86088&format=png&color=000000'} style={{ transform: 'rotate(90deg)' }} width={50} height={50} alt='Down' /></button>
                <span></span>
            </div>
        </div>
    );
}

export default MapControls;


