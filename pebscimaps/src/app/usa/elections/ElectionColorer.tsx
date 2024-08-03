class ElectionColorer {
   

    // Color by percentage
    public colorByPercentage(percentage: number, isLeft: boolean): string {
        switch(isLeft){
            case true:
                //Assign blue colors
                if(percentage < 50){
                    return '#a6bddb';
                }else if(percentage < 60){
                    return '#74a9cf';
                }else if(percentage < 70){
                    return '#3690c0';
                }else if(percentage < 80){
                    return '#0570b0';
                }else if(percentage < 90){
                    return '#045a8d';
                }else if(percentage < 100){
                    return '#023858';
                }
                break;
            case false:
                //Assign red colors
                if(percentage < 50){
                    return '#fdbb84';
                }else if(percentage < 60){
                    return '#fc8d59';
                }else if(percentage < 70){
                    return '#ef6548';
                }else if(percentage < 80){
                    return '#d7301f';
                }else if(percentage < 90){
                    return '#b30000';
                }else if(percentage < 100){
                    return '#7f0000';
                }
                break;
        }

        return 'gray';
    }

    // Color by margin
    public colorByMargin(margin: number): string {
        // Define colors for positive and negative margins
        /*const positiveColor: RGB = { r: 0, g: 255, b: 0 }; // Green
        const negativeColor: RGB = { r: 255, g: 0, b: 0 }; // Red

        // Clamp the margin to [-100, 100]
        const clampedMargin = Math.max(-100, Math.min(100, margin));
        const factor = (clampedMargin + 100) / 200;

        // Interpolate the color
        const color = this.interpolateColor(negativeColor, positiveColor, factor);
        return this.rgbToHex(color);*/
        return 'gray';
    }
}

export default ElectionColorer;
