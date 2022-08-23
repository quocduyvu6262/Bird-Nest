const {
    PriorityQueue,
    MinPriorityQueue,
    MaxPriorityQueue,
} = require('@datastructures-js/priority-queue');




/**
 * Custom Comparator to rank element
 * by priority count and count
 */
const MyComparator = (a, b) => {
    if(a.priorityCount < b.priorityCount){
        return 1;
    }
    if(a.priorityCount > b.priorityCount){
        return -1;
    }
    return a.count < b.count ? 1 : -1;
}
const queue = new PriorityQueue(MyComparator)


module.exports = queue;