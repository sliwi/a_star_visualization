const white = "#ffffff";
const green = "#54e600";
const red = "#c70007";
const orange = "#e3670e";
const purple = "#8209e6";
const black = "#000000";
const pink = "#ff00d0";

class Cell{

    constructor(x,y){

        this.parent = parent;
        this.x = x;
        this.y = y;
        this.color = white;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
    }

    getX(){
        return x;
    }
    getY(){
        return y;
    }

    isOpen(){
        return this.color === white;
    }
    isClosed(){
        return this.color === red;
    }
    isWall(){
        return this.color === black;
    }
    isStart(){
        return this.color === green;
    }
    isEnd(){
        return this.color === purple;
    }
    isGoal(){
        return this.color === pink;
    }
    setClosed(){
        this.color = red;
    }
    setWall(){
        this.color = black;
    }
    setStart(){
        this.color = green;
    }
    setEnd(){
        this.color = purple;
    }
    setGoal(){
        this.color = pink;
    }
    reset(){
        this.color = white;
    }
}