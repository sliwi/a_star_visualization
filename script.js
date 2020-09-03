const table = document.querySelector("#table");

function drawGrid(rows,numOfCells){
    const grid = [];
    for(let i=0; i<rows; i++){
        grid[i] = [];
        let row = table.insertRow(i);
        for(let j=0; j<rows; j++){
            grid[i].push(new Cell(j,i));
            let cell = row.insertCell(j);
            cell.id = `cell_${i}_${j}`;
        }
        
    }
    return grid;
}

const grid = drawGrid(50,50);

function heuristic(start,goal){
    return (Math.abs(start.getX()-goal.getX()) + Math.abs(start.getY()-goal.getY()));
}