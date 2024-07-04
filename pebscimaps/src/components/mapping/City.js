function City( {name, xLoc, yLoc, isCapital, size, adjustText, fontSize, show} ) {

    const determineRadius = () => {
        switch(size){
            case 'small':
                return 1;
            case 'medium':
                return 2;
            case 'big':
                return 3;
            case 'mega':
                return 4;
            default: 
                return 1;
        }
    }

    const determineFontSize = () => {
        switch(size){
            case 'small':
                return '4px';
            case 'medium':
                return '8px';
            case 'big':
                return '12px';
            case 'mega':
                return '16px';
            default: 
                return (fontSize != null || fontSize != undefined) ? '8px' : fontSize;
        }
        //adjustText={'x': 0, 'y': 0};
    }

    const adjustTextX = () => {
        if(adjustText == 'none' || adjustText == null || adjustText == undefined){
            switch(size){
                case 'small':
                    return -2.4;
                case 'medium':
                    return 1;
                case 'big':
                    return 1.6;
                case 'mega':
                    return 3;
                default: 
                    return 0;
            }
        }
        return 0;
       
    }
    const adjustTextY = () => {
        if(adjustText == 'none' || adjustText == null || adjustText == undefined){
            switch(size){
                case 'small':
                    return -1.6;
                case 'medium':
                    return 0;
                case 'big':
                    return 1;
                case 'mega':
                    return 2;
                default: 
                    return 0;
            }
        }
        return adjustText.y;
    }

    return (
        <g>
        {show && isCapital && <g><text x={xLoc+6+adjustTextX()} y={yLoc+3+adjustTextY()} style={{fontSize: determineFontSize()}}>{name}</text>
            <circle cx={xLoc} cy={yLoc} r={determineRadius()} fill={'red'}></circle></g>
        }
        {show && !isCapital && <g><text x={xLoc+6+adjustTextX()} y={yLoc+3+adjustTextY()} style={{fontSize: determineFontSize()}}>{name}</text>
            <circle cx={xLoc} cy={yLoc} r={determineRadius()} fill={'black'}></circle></g>
        }
        </g>
    );
  }

export default City;

