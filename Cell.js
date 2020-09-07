
const cellStatus = {
    AVAILABLE: "available",
    OPEN: "open",
    CLOSE: "close",
    WALL: "wall",
    START: "start",
    END: "end",
    GOAL: "goal",
    PATH: "path"
}

class Cell{

    constructor(x,y){

        this.parent = parent;
        this.x = x;
        this.y = y;
        this.status = cellStatus.AVAILABLE;
        this.neighbours = [];
    }
    
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getNeighbours(){
        return this.neighbours;
    }
    isAvailable(){
        return this.status === cellStatus.AVAILABLE;
    }
    isOpen(){
        return this.status === cellStatus.OPEN;
    }
    isClosed(){
        return this.status === cellStatus.CLOSE;
    }
    isWall(){
        return this.status === cellStatus.WALL;
    }
    isStart(){
        return this.status === cellStatus.START;
    }
    isEnd(){
        return this.status === cellStatus.END;
    }
    isGoal(){
        return this.status === cellStatus.GOAL;
    }
    isPath(){
        return this.status === cellStatus.PATH;
    }
    setAvailable(){
        this.status = cellStatus.AVAILABLE;
    }
    setOpen(){
        this.status = cellStatus.OPEN;
    }
    setClosed(){
        this.status = cellStatus.CLOSE;
    }
    setWall(){
        this.status = cellStatus.WALL;
    }
    setStart(){
        this.status = cellStatus.START;
    }
    setEnd(){
        this.status = cellStatus.END;
    }
    setGoal(){
        this.status = cellStatus.GOAL;
    }
    setPath(){
        this.status = cellStatus.PATH;
    }
    updateNeighbours(grid){
        //add cell that is one above

        if(this.y-1>=0 && !this.neighbours.includes(grid[this.y-1][this.x])){
            if(grid[this.y-1][this.x].isWall()===false){
                this.neighbours.push(grid[this.y-1][this.x]);
            }
        }
        //add cell that is one below
        if(this.y+1<grid.length  && !this.neighbours.includes(grid[this.y+1][this.x])){
            if(grid[this.y+1][this.x].isWall()===false){
                this.neighbours.push(grid[this.y+1][this.x]);
            }
        }
        //add cell that is one to the left
        if(this.x-1>=0 && !this.neighbours.includes(grid[this.y][this.x-1])){
            if(grid[this.y][this.x-1].isWall()===false){
                this.neighbours.push(grid[this.y][this.x-1]);
            }
        }
        //add cell that is one to the right
        if(this.x+1<grid[this.y].length  && !this.neighbours.includes(grid[this.y][this.x+1])){
            if(grid[this.y][this.x+1].isWall()===false){
                this.neighbours.push(grid[this.y][this.x+1]);
            }
        }
        return this.neighbours;
    }
}