class Node{

    constructor(parent,x,y){

        this.parent = parent;
        this.x = x;
        this.y = y;
       
    }

    getX(){
        return x;
    }
    getY(){
        return y;
    }
}


function heuristic(start,goal){
    return (Math.abs(start.getX()-goal.getX()) + Math.abs(start.getY()-goal.getY()));
}