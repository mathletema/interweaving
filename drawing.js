function createGrid () {
    ctx.strokeStyle = gridBorderColor;
    ctx.beginPath();
    for(let i = 0; i <= width; i += size) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    for(let j = 0; j < height; j += size) {
        ctx.moveTo(0, j);
        ctx.lineTo(width, j)
    }
    ctx.stroke();
    ctx.closePath();
}

function gridClicked (mouseX, mouseY) {
    let gridX = Math.floor(mouseX / size);
    let gridY = Math.floor(mouseY / size);
    
    if (gridPoints[gridX][gridY] == 0){
        ctx.fillStyle = gridFillColor;
        ctx.fillRect(size*gridX, size*gridY, size, size);

        (gridPoints[gridX])[gridY] = 1;
    }
    else {
        ctx.fillStyle = gridEmptyColor;
        ctx.fillRect(size*gridX, size*gridY, size, size);

        (gridPoints[gridX])[gridY] = 0;
    }    

    createGrid();
}

function transitionToEmpty (startTime) {
    timeNow = new Date().getTime();
    if (timeNow > startTime + timeToClear) {
        ctx.fillStyle = gridEmptyColor;
        ctx.fillRect(0, 0, width, height);
        stage = 2;
    } else {
        let heightOfBox = (timeNow - startTime) * height / (timeToClear);
        ctx.fillStyle = gridEmptyColor;
        ctx.fillRect(0, 0, width, heightOfBox);
    }
}

function clearGrid() {
    ctx.fillStyle = gridEmptyColor;
    ctx.fillRect(0, 0, width, height);
}

function setTypes () {
    for (i = 0; i < gridLenX; i ++) {
        for (j = 0; j < gridLenY; j++) {
            if (gridPoints[i][j] == 1){
                pointTypes[i][j][0] = 1;
                pointTypes[i][j-1][2] = 1;
                pointTypes[i][j+1][1] = 1;
                pointTypes[i-1][j][4] = 1;
                pointTypes[i+1][j][3] = 1;
            }
        }
    }
}

function createCenters () {
    ctx.beginPath();
    for (i = 0; i < gridLenX; i ++) {
        for (j = 0; j < gridLenY; j ++) {
            if (pointTypes[i][j][0]) {
                //create center
                ctx.moveTo(size*i + size / 2, size * j + size / 2 - centerSize / 2);
                ctx.lineTo(size*i + size / 2 + centerSize / 2, size * j + size / 2);
                ctx.lineTo(size*i + size / 2, size * j + size / 2 + centerSize / 2);
                ctx.lineTo(size*i + size / 2 - centerSize / 2, size * j + size / 2);
                ctx.lineTo(size*i + size / 2, size * j + size / 2 - centerSize / 2);
                
                // create edges
                ctx.moveTo(size*i, size*j + centerSize / 2);
                ctx.lineTo(size*i + centerSize / 2, size*j);
                
                ctx.moveTo(size*i + size - centerSize / 2, size*j);
                ctx.lineTo(size*i + size, size*j + centerSize / 2);
                
                ctx.moveTo(size*i + size, size*j + size - centerSize / 2);
                ctx.lineTo(size*i + size - centerSize / 2, size*j + size);
                
                ctx.moveTo(size*i, size*j + size - centerSize / 2);
                ctx.lineTo(size*i + centerSize / 2, size*j + size);

                // create spokes
                if (pointTypes[i][j][1]) {
                    ctx.moveTo(size*i + size / 2, size*j + size / 2 - centerSize / 2);
                    ctx.lineTo(size*i + centerSize / 2, size*j);
                }
                
                if (pointTypes[i][j][4]) {
                    ctx.moveTo(size*i + size / 2 + centerSize / 2, size*j + size / 2);
                    ctx.lineTo(size*i + size, size*j + centerSize / 2);
                }
                
                if (pointTypes[i][j][2]) {
                    ctx.moveTo(size*i + size / 2, size*j + size / 2 + centerSize / 2);
                    ctx.lineTo(size*i + size - centerSize / 2, size*j + size);
                }
                
                if (pointTypes[i][j][3]) {
                    ctx.moveTo(size*i + size / 2 - centerSize / 2, size*j + size / 2);
                    ctx.lineTo(size*i, size*j + size  - centerSize / 2);
                }
            }
        }
    }

    ctx.stroke();
    ctx.closePath();
}

function createBorders () {
    for (i = 0; i < gridLenX; i ++) {
        for (j = 0; j < gridLenY; j ++) {
            if (pointTypes[i][j][0] == 0){
                if (pointTypes[i][j][1]) {
                    ctx.beginPath();
                    ctx.arc(size*i + size / 2, size*j - size / 2 + centerSize / 2, radius, Math.PI / 4, 3*Math.PI / 4);
                    ctx.stroke();
                }
                if (pointTypes[i][j][2]) {
                    ctx.beginPath();
                    ctx.arc(size*i + size / 2, size*j + 3 * size / 2 - centerSize / 2, radius, 5*Math.PI / 4, 7*Math.PI / 4);
                    ctx.stroke();
                }
                if (pointTypes[i][j][4]) {
                    ctx.beginPath();
                    ctx.arc(size*i + 3 *  size / 2- centerSize / 2, size*j + size / 2, radius, 3*Math.PI / 4, 5*Math.PI / 4);
                    ctx.stroke();
                }
                if (pointTypes[i][j][3]) {
                    ctx.beginPath();
                    ctx.arc(size*i - size / 2 + centerSize / 2, size*j + size / 2, radius, 7*Math.PI / 4, 9*Math.PI / 4);
                    ctx.stroke();
                }
            }
        }
    }
}