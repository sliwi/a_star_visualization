const table = document.querySelector("#table");
const startBtn = document.querySelector("#start_btn");
let started = false;
let setStart = false;
let setEnd = false;
let mouseDown = false;
let startCell;
let endCell;

function makeGrid(rows,numOfCells){
    const grid = [];
    for(let i=0; i<rows; i++){
        grid[i] = [];
        let row = table.insertRow(i);
        for(let j=0; j<numOfCells; j++){
            grid[i].push(new Cell(j,i));
            let cell = row.insertCell(j);
            cell.id = `cell_${j}_${i}`;

            cell.addEventListener("mousedown",setMouseDown);
            cell.addEventListener("mousemove",verifyCell);
            cell.addEventListener("mouseup",setMouseUp);
            cell.addEventListener("click",mouseClick);
            cell.className = "start";
            
            
  
        }
        
    }
    return grid;
}


function heuristic(start,goal){
    return (Math.abs(start.getX()-goal.getX()) + Math.abs(start.getY()-goal.getY()));
}

function setMouseUp(){
    mouseDown = false;
}
function setMouseDown(){
    mouseDown = true;
}
function verifyCell(ev){
    if(mouseDown===true){
        ev.stopPropagation();
        updateCell(this,ev);
    }
}
function mouseClick(ev){
    ev.stopPropagation();
    updateCell(this,ev);
}

function updateHover(name){
    const cells = document.getElementsByTagName("TD");
    for(let i=0; i<cells.length; i++){
        cells[i].className = name;
    }
}

const grid = makeGrid(35,50);

function updateCell(obj,ev){
    const cellPos = obj.id.split(/([0-9]+)/);
    const x = cellPos[1];
    const y = cellPos[3];

    const cell = grid[y][x];
    //console.log(`(${x},${y})`);
    //console.log(`(${cell.getX()},${cell.getY()})`)
    //console.log(cell.updateNeighbours(grid));
    if(event.shiftKey && !cell.isAvailable()){
        obj.style.background = "#fff";
        obj.style.border = "1px solid #ccc";
        if(cell.isStart()){
            setStart = false;
            startCell = null;
        }
        else if(cell.isEnd()){
            setEnd = false;
            endCell = null;
        }
        cell.setAvailable();
    }
    else if(!event.shiftKey){
        if(!setStart && !setEnd){
            obj.style.background = "#54e600";
            setStart = true;
            obj.style.border = "none";
            updateHover("end");
            cell.setStart();
            startCell = cell;
        }
        else if(setStart && !setEnd && !cell.isStart()){
            obj.style.background = "#e3670e";
            setEnd = true;
            obj.style.border = "none";
            obj.className = "wall";
            updateHover("wall");
            cell.setEnd();
            endCell = cell;
        }
        else if(cell.isAvailable()){
            obj.style.background = "#a9a9a9";
            obj.style.border = "none";
            cell.setWall();
        }
    }
}
function visualize(){
    for(let i=0; i<grid.length; i++){
        for(cell of grid[i]){
            if(cell.isOpen()){
                const cellHTML = document.querySelector(`#cell_${cell.getX()}_${cell.getY()}`);
                cellHTML.style.backgroundColor = "green";
            }
            else if(cell.isClosed()){
                const cellHTML = document.querySelector(`#cell_${cell.getX()}_${cell.getY()}`);
                cellHTML.style.backgroundColor = "red";
            }
        }
    }
}

function reconstrucPath(cameFrom,endCell){
    let current = endCell;
    while (current!=startCell){
        current = cameFrom.get(current);
        if(current!=startCell && current!=endCell){
            const cellHTML = document.querySelector(`#cell_${current.getX()}_${current.getY()}`);
            cellHTML.style.backgroundColor = "yellow";
        }
    }
    
}
function aStarSearch(start,end){
    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    for(let i=0; i<grid.length; i++){
        for(cell of grid[i]){
            gScore.set(cell,Infinity);
            fScore.set(cell,Infinity);
        }
    }

    openSet.enqueue(0,start);
    closedSet.add(start);
    gScore.set(start,0);
    fScore.set(start,heuristic(start,end));

    while(!openSet.isEmpty()){ 
        const currentCell = openSet.dequeue();
        closedSet.delete(currentCell);
        
        if(currentCell===end){
            const cellHTML = document.querySelector(`#cell_${currentCell.getX()}_${currentCell.getY()}`);
            cellHTML.style.backgroundColor = "aqua";
            reconstrucPath(cameFrom,end);
            return true;
        }
        
        for(neighbour of currentCell.neighbours){
            const tmpGScore = gScore.get(currentCell)+1;
           
            if(tmpGScore<gScore.get(neighbour)){
              
                gScore.set(neighbour,tmpGScore);
                fScore.set(neighbour,tmpGScore+heuristic(neighbour,end));
                cameFrom.set(neighbour,currentCell);
                
                if(!closedSet.has(neighbour)){
                    openSet.enqueue(fScore.get(neighbour),neighbour);
                    closedSet.add(neighbour);
                    neighbour.setOpen();
                }
            }
        }
        visualize();
        if (currentCell!=start){
            currentCell.setClosed();
        }
    }
    return false;
}

function main(){

    startBtn.addEventListener('click',(e)=>{
        e.preventDefault;
        console.log("Run A* Algorithm");

        for(let i=0; i<grid.length; i++){
            for(let j=0; j<grid[i].length; j++){
                const cell = grid[i][j];
                cell.updateNeighbours(grid);
            }  
        }

        aStarSearch(startCell,endCell);
    })
}

main();
