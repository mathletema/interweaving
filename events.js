// handle clicking

document.addEventListener('click', function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (stage == 0) {
        gridClicked (mouseX, mouseY);
    }
})

// handle enter sign
document.addEventListener('keydown', function (event) {
    if (stage == 0 && event.key == 'Enter') {
        stage = 1;
        clearGrid();
        setTypes();
        createCenters();
        createBorders();
    }
})