/*





 */

export function dijkstraAlgorithm(grid, startNode, endNode) {

    const  visitedNodes = [];
    startNode.distance = 0;

    const unvisitedNodes = getAllNodes(grid);

    while (!!unvisitedNodes.length) {

        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        //If we find a wall -> Skip
        if (closestNode.isWall) continue;

        //If the closest node is at distance of infinity,
        //then we know we are trapped -> Stop
        if (closestNode.distance === Infinity) {
            return visitedNodes;
        }
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);

        if (closestNode === endNode) {
            return visitedNodes;
        }
        getUnvisitedNeighbors(closestNode, grid);

    }
}

function sortNodesByDistance(univisitedNodes) {

    univisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}


function updateVisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = neighbor.distance + 1;
        neighbor.previousNode = node;
    }
}


function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;

    if (row > 0) {
        neighbors.push(grid[row - 1][col]);
    }
    if(row < grid.length - 1) {
        neighbors.push(grid[row][col - 1]);
    }
    if(col > 0) {
        neighbors.push(grid[row][col - 1]);
    }
    if(col < grid[0].length - 1) {
        neighbors.push(grid[row][col + 1]);
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}


function getAllNodes(grid) {

    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}


export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let current = finishNode;

    while (current !== null) {
        nodesInShortestPathOrder.unshift(current);
        current = current.previousNode;
    }
    return nodesInShortestPathOrder;
}













