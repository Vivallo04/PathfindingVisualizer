import React, {Component} from "react";
import Node from "./Node/Node"
import {dijkstraAlgorithm, getNodesInShortestPathOrder} from "../algorithms/dijkstraAlgorithm";

import "./PathfindingVisualizer.css"

const START_NODE_ROW = 10;
const START_NODE_COL = 15;

const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,

        };
    }


    componentDidMount() {
        const grid = getGrid();
        this.setState({grid});
    }


    handleMouse(row, col) {
        const newGrid = getNewGridWall(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col) {

        if (!this.state.mouseIsPressed) {
            return;
        }
        const newGrid = getNewGridWall(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }


    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    animateAlgorithm(visitedNodes, nodesInShortest) {
        for (let i = 0; i < visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortest);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortest) {
        for (let i = 0; i < nodesInShortest.length; i++){
            setTimeout(() => {
                const node = nodesInShortest[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    "node node-shortest-path";
            }, 50 * i);
        }
    }

    visualizeDijkstra() {

        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstraAlgorithm(grid, startNode, endNode);
        const nodesInShortestPath = getNodesInShortestPathOrder(endNode);
        this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPath);
    }

    render() {
        const {grid, mouseIsPressed} = this.state;

        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isFinish, isStart, isWall} = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouse(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
};


const getNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    }
};


const getGrid = () => {
    const grid = [];
    for (let i = 0; i < 20; i++){

        const current = [];
        for (let j  =0; j < 50; j++){
            current.push(getNode(i, j));
        }
        grid.push(current);
    }
    return grid;
}


const getNewGridWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];

    const newNode = {
        ...node,
        isWall: !node.isWall,
    }

    newGrid[row][col] = newNode;
    return newGrid;
};

