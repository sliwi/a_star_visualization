const table = document.querySelector("#table");
const startBtn = document.querySelector("#start_btn");
const resetBtn = document.querySelector("#reset_btn");
const gridHTML = document.querySelector("#grid");

let started = false;
let setStart = false;
let setEnd = false;
let mouseDown = false;
let startCell;
let endCell;
let speed;
const speedSetting = {
    FAST:1,
    AVERAGE:20,
    SLOW:100,
}

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
    const cellindex = obj.id.split(/([0-9]+)/);
    const x = cellindex[1];
    const y = cellindex[3];

    const cell = grid[y][x];
  
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
function visualize(cells,index,cameFrom,end){
        if(index===cells.length){
            visualizePath(reconstrucPath(cameFrom,end),0);
            return true;
        }
        const cell = cells[index];
        const cellHTML = document.querySelector(`#cell_${cell.getX()}_${cell.getY()}`);

        if(cell.isOpen()){
            cellHTML.style.backgroundColor = "green";
            
        }
        else if(cell.isClosed()){
            cellHTML.style.backgroundColor = "red";
        }
    setTimeout(()=>{
        visualize(cells,index+1,cameFrom,end);
    },speed);
}

function reconstrucPath(cameFrom,endCell){
    let current = endCell;
    const visual = [];
    while (current!==undefined && current!==startCell){
        current = cameFrom.get(current);

        if(current===undefined){
            break;
        }

        if(current!==startCell){
            current.setPath();
        }
        if(current!==undefined){
            visual.push(current);
        }
    }
    visual.push(endCell);
    return visual;
}

function visualizePath(pathCells,index){

    if(index===pathCells.length){
        return true;
    }
    const cell = pathCells[index];
    const cellHTML = document.querySelector(`#cell_${cell.getX()}_${cell.getY()}`);

    if(cell.isEnd()){
        cellHTML.style.backgroundColor = "aqua";
    }
    else if(cell.isPath()){
        cellHTML.style.backgroundColor = "yellow";
    }
    setTimeout(()=>{
        visualizePath(pathCells,index+1);
    },speed);
}
function aStarSearch(start,end){
    const visual = [];
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
            console.log("Path found!");
            visualize(visual,0,cameFrom,end);
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
                    if(neighbour!==end && !neighbour.isClosed()){
                        neighbour.setOpen();
                    }
                    visual.push(neighbour);
                }
            }
        }
        if (currentCell!=start){
            currentCell.setClosed();
            visual.push(currentCell);
        }
    }
    visualize(visual,0,cameFrom,end);
    console.log("Path not found!");
    return false;
}

function main(){

    speed = speedSetting.FAST;
    startBtn.addEventListener('click',(e)=>{
        e.preventDefault;

        console.log("Run A* Algorithm");
        for(let i=0; i<grid.length; i++){
            for(let j=0; j<grid[i].length; j++){
                const cell = grid[i][j];
                const cellHTML = document.querySelector(`#cell_${cell.getX()}_${cell.getY()}`);
                cell.updateNeighbours(grid);
                cellHTML.removeEventListener("mousedown",setMouseDown);
                cellHTML.removeEventListener("mousemove",verifyCell);
                cellHTML.removeEventListener("mouseup",setMouseUp);
                cellHTML.removeEventListener("click",mouseClick);
            }  
        }

        aStarSearch(startCell,endCell);
    });

    resetBtn.addEventListener('click', (e)=>{
       
        console.log("Clearing board...reseting visualizer");
        startCell = null;
        endCell = null;
        setStart = false;
        setEnd = false;
        for(let i=0; i<grid.length; i++){
            for(let j=0; j<grid[i].length; j++){
                const cell = grid[i][j];
                cell.neighbours = [];
                cell.setAvailable();
                const cellHTML = document.querySelector(`#cell_${cell.getX()}_${cell.getY()}`);
                cellHTML.style.backgroundColor = "#fff";
                cellHTML.style.border = "1px solid #ccc";
                cellHTML.className = "start";
                cellHTML.addEventListener("mousedown",setMouseDown);
                cellHTML.addEventListener("mousemove",verifyCell);
                cellHTML.addEventListener("mouseup",setMouseUp);
                cellHTML.addEventListener("click",mouseClick);
                
                
            }  
        }

    });
}

main();
