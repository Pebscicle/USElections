function MapLabel( {title, otherText, xLoc, yLoc, fontSize, show} ) {

    if(show == undefined || show == null){
        show = true;
    }

    return (
        <g>
        {show && <g><text x={xLoc} y={yLoc} style={{fontSize: fontSize}}>{title}</text>
            </g>
        }
        {show && otherText && <g>
            <text x={xLoc} y={yLoc} style={{fontSize: fontSize}}>{title}</text>
            <text x={xLoc} y={yLoc+10} style={{fontSize: fontSize}}>{otherText}</text>
        </g>
        }
        </g>
    );
  }

export default MapLabel;

