var priorityQueue = new PriorityQueue(); 
  
// testing isEmpty and front on an empty queue 
// return true 
console.log(priorityQueue.isEmpty()); 
  
// returns "No elements in Queue" 
console.log(priorityQueue.front()); 
  
// adding elements to the queue 
priorityQueue.enqueue("Sumit", 2); 
priorityQueue.enqueue("Gourav", 1); 
priorityQueue.enqueue("Piyush", 1); 
priorityQueue.enqueue("Sunny", 2); 
priorityQueue.enqueue("Sheru", 3); 
  
// prints [Gourav Piyush Sumit Sunny Sheru] 
console.log(priorityQueue.printPQueue()); 
  
// prints Gourav 
console.log(priorityQueue.front().element); 
  
// pritns Sheru 
console.log(priorityQueue.rear().element); 
  
// removes Gouurav 
// priorityQueue contains 
// [Piyush Sumit Sunny Sheru] 
console.log(priorityQueue.dequeue().element); 
  
// Adding another element to the queue 
priorityQueue.enqueue("Sunil", 2); 
  
// prints [Piyush Sumit Sunny Sunil Sheru] 
console.log(priorityQueue.printPQueue()); 