'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {  Zap, SkipForward, Shuffle } from 'lucide-react'

const RatInAMaze = () => {
  const sampleBoard = [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 1],
  ]
  const [boardSize, setBoardSize] = useState<number>(4)
  const [board, setBoard] = useState<number[][]>(sampleBoard)
  const [currentPath, setCurrentPath] = useState<string>("")
  const [foundPaths, setFoundPaths] = useState<string[]>([])
  const [currentPosition, setCurrentPosition] = useState<{ row: number, col: number } | null>(null)
  const [visitedCells, setVisitedCells] = useState<Set<string>>(new Set())
  const [pathCells, setPathCells] = useState<Set<string>>(new Set())
  const [currentPathTrace, setCurrentPathTrace] = useState<{ row: number, col: number }[]>([])
  const [solutionPaths, setSolutionPaths] = useState<{ row: number, col: number }[][]>([])
  const [highlightedSolution, setHighlightedSolution] = useState<number | null>(null)
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(true)
  const [isSolved, setIsSolved] = useState<boolean>(false)
  const [solvingSpeed, setSolvingSpeed] = useState<number>(250)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [solutionCount, setSolutionCount] = useState<number>(0)
  const solveRef = useRef<{ shouldStop: boolean }>({ shouldStop: false })



  const callDelay = async () => {
    return new Promise(resolve => {
      if (!solveRef.current.shouldStop) {
        setTimeout(resolve, solvingSpeed)
      } else {
        resolve(undefined)
      }
    })
  }
  const solveMaze = async (
    localBoard: number[][],
    row: number,
    col: number,
    path: string,
    ansArray: string[],
    pathTrace: { row: number, col: number }[]
  ) => {
    if (solveRef.current.shouldStop) return

    const n = board.length

    if (row < 0 || row >= n || col < 0 || col >= n) return
    if (localBoard[row][col] !== 1) return

    // Update current path trace
    const newPathTrace = [...pathTrace, { row, col }]
    setCurrentPathTrace(newPathTrace)

    // Update visualization - show current position
    setCurrentPosition({ row, col })
    setCurrentPath(path)

    // Mark this cell as part of current path (green)
    setPathCells(prev => new Set([...prev, `${row}-${col}`]))
    await callDelay()

    if (row === n - 1 && col === n - 1) {
      ansArray.push(path)
      setSolutionCount(ansArray.length)

      // Add this solution path to permanent solutions
      setSolutionPaths(prev => [...prev, [...newPathTrace]])

      // Keep this solution path highlighted briefly
      await callDelay()
      await callDelay()
      return
    }

    // Mark cell as visited (set to -1)
    localBoard[row][col] = -1

    // Try all four directions
    await solveMaze(localBoard, row, col + 1, path + "R", ansArray, newPathTrace)
    if (solveRef.current.shouldStop) return

    await solveMaze(localBoard, row + 1, col, path + "D", ansArray, newPathTrace)
    if (solveRef.current.shouldStop) return

    await solveMaze(localBoard, row, col - 1, path + "L", ansArray, newPathTrace)
    if (solveRef.current.shouldStop) return

    await solveMaze(localBoard, row - 1, col, path + "U", ansArray, newPathTrace)

    // BACKTRACK: Restore the cell to 1 (this is the key part!)
    localBoard[row][col] = 1

    // Backtrack visualization - remove from current path (no longer green)
    setPathCells(prev => {
      const newSet = new Set(prev)
      newSet.delete(`${row}-${col}`)
      return newSet
    })

    // Add to visited cells (to show it was explored - purple)
    setVisitedCells(prev => new Set([...prev, `${row}-${col}`]))

    // Update path trace for backtracking
    setCurrentPathTrace(pathTrace)

    // Show rat backtracking - move rat back to previous position
    if (pathTrace.length > 0) {
      const previousPosition = pathTrace[pathTrace.length - 1]
      setCurrentPosition(previousPosition)
    } else {
      setCurrentPosition(null)
    }

    // Show backtracking animation
    await callDelay()
  }

  const visualizeMaze = async () => {
    setErrorMessage('')
    setIsEditable(false)
    setIsVisualizing(true)
    setIsSolved(false)
    setFoundPaths([])
    setSolutionCount(0)
    setCurrentPosition(null)
    setCurrentPath("")
    setVisitedCells(new Set())
    setPathCells(new Set())
    setCurrentPathTrace([])
    setSolutionPaths([])
    setHighlightedSolution(null)
    solveRef.current.shouldStop = false

    const localBoard = board.map(row => [...row])
    const result: string[] = []

    await solveMaze(localBoard, 0, 0, "", result, [])

    if (!solveRef.current.shouldStop) {
      setFoundPaths(result)
      setIsSolved(true)
      setCurrentPosition(null)
      setCurrentPathTrace([])
    }

    setIsVisualizing(false)
    setIsEditable(true)
  }

  const solveInstantly = async () => {
    setErrorMessage('')
    setIsVisualizing(false)
    setIsEditable(false)
    setIsSolved(false)
    setFoundPaths([])
    setSolutionCount(0)
    setCurrentPosition(null)
    setCurrentPath("")
    setVisitedCells(new Set())
    setPathCells(new Set())
    setCurrentPathTrace([])
    setSolutionPaths([])
    setHighlightedSolution(null)
    solveRef.current.shouldStop = true

    await new Promise(resolve => setTimeout(resolve, 300))

    const solveMazeSync = (
      localBoard: number[][],
      row: number,
      col: number,
      path: string,
      ansArray: string[],
      pathTrace: { row: number, col: number }[],
      allSolutions: { row: number, col: number }[][]
    ) => {
      const n = board.length

      if (row < 0 || row >= n || col < 0 || col >= n) return
      if (localBoard[row][col] !== 1) return

      const newPathTrace = [...pathTrace, { row, col }]

      if (row === n - 1 && col === n - 1) {
        ansArray.push(path)
        allSolutions.push([...newPathTrace])
        return
      }

      localBoard[row][col] = -1

      solveMazeSync(localBoard, row, col + 1, path + "R", ansArray, newPathTrace, allSolutions)
      solveMazeSync(localBoard, row + 1, col, path + "D", ansArray, newPathTrace, allSolutions)
      solveMazeSync(localBoard, row, col - 1, path + "L", ansArray, newPathTrace, allSolutions)
      solveMazeSync(localBoard, row - 1, col, path + "U", ansArray, newPathTrace, allSolutions)

      localBoard[row][col] = 1
    }

    const localBoard = board.map(row => [...row])
    const result: string[] = []
    const allSolutions: { row: number, col: number }[][] = []
    solveMazeSync(localBoard, 0, 0, "", result, [], allSolutions)

    setFoundPaths(result)
    setSolutionCount(result.length)
    setSolutionPaths(allSolutions)
    setIsSolved(true)
    setIsEditable(true)
  }

  const stopSolving = () => {
    solveRef.current.shouldStop = true
    setIsVisualizing(false)
    setCurrentPosition(null)
    setCurrentPath("")
    setVisitedCells(new Set())
    setCurrentPathTrace([])
    setHighlightedSolution(null)
    setIsEditable(true)
  }

  const generateRandomWalls = () => {
    // Clear any ongoing visualization
    solveRef.current.shouldStop = true

    // Create a new board with random walls
    const newBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(0))

    // Always keep start and end positions open
    newBoard[0][0] = 1
    newBoard[boardSize - 1][boardSize - 1] = 1

    // Generate random walls (30-40% of cells will be walls)
    const wallProbability = 0.35
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        // Skip start and end positions
        if ((i === 0 && j === 0) || (i === boardSize - 1 && j === boardSize - 1)) {
          continue
        }

        // Randomly decide if this cell should be a wall
        if (Math.random() < wallProbability) {
          newBoard[i][j] = 0 // Wall
        } else {
          newBoard[i][j] = 1 // Path
        }
      }
    }

    // Ensure there's at least one possible path by creating a simple path
    // This prevents completely unsolvable mazes
    const createMinimalPath = () => {
      // Simple right-down path
      for (let i = 0; i < boardSize - 1; i++) {
        newBoard[0][i] = 1 // Top row
        newBoard[i][boardSize - 1] = 1 // Right column
      }

      // Sometimes add some random connections
      if (Math.random() > 0.7) {
        for (let i = 1; i < boardSize - 1; i++) {
          for (let j = 1; j < boardSize - 1; j++) {
            if (Math.random() > 0.8) {
              newBoard[i][j] = 1
            }
          }
        }
      }
    }

    // 30% chance to ensure a minimal path exists
    if (Math.random() < 0.3) {
      createMinimalPath()
    }

    setBoard(newBoard)
    setFoundPaths([])
    setSolutionCount(0)
    setCurrentPosition(null)
    setCurrentPath("")
    setVisitedCells(new Set())
    setPathCells(new Set())
    setCurrentPathTrace([])
    setSolutionPaths([])
    setHighlightedSolution(null)
    setIsSolved(false)
    setIsVisualizing(false)
    setIsEditable(true)
    setErrorMessage('')
  }

  const changeBoardSize = (newSize: number) => {
    setBoardSize(newSize)

    // Create initial board with some random walls
    const newBoard = Array(newSize).fill(null).map(() => Array(newSize).fill(0))

    // Always keep start and end positions open
    newBoard[0][0] = 1
    newBoard[newSize - 1][newSize - 1] = 1

    // Add some random walls (lighter density for new boards)
    const wallProbability = 0.25
    for (let i = 0; i < newSize; i++) {
      for (let j = 0; j < newSize; j++) {
        // Skip start and end positions
        if ((i === 0 && j === 0) || (i === newSize - 1 && j === newSize - 1)) {
          continue
        }

        // Randomly decide if this cell should be a wall
        if (Math.random() < wallProbability) {
          newBoard[i][j] = 0 // Wall
        } else {
          newBoard[i][j] = 1 // Path
        }
      }
    }

    setBoard(newBoard)
    setFoundPaths([])
    setSolutionCount(0)
    setCurrentPosition(null)
    setCurrentPath("")
    setVisitedCells(new Set())
    setPathCells(new Set())
    setCurrentPathTrace([])
    setSolutionPaths([])
    setHighlightedSolution(null)
    setIsSolved(false)
    setIsVisualizing(false)
    setIsEditable(true)
    setErrorMessage('')
    solveRef.current.shouldStop = true
  }

  const getCellStyling = (rowIndex: number, colIndex: number) => {
    const isCurrentPos = currentPosition?.row === rowIndex && currentPosition?.col === colIndex
    const isVisited = visitedCells.has(`${rowIndex}-${colIndex}`)
    const isInPath = pathCells.has(`${rowIndex}-${colIndex}`)
    const isStart = rowIndex === 0 && colIndex === 0
    const isEnd = rowIndex === board.length - 1 && colIndex === board.length - 1
    const cellValue = board[rowIndex][colIndex]

    let classes = `w-12 h-12 flex items-center justify-center text-lg font-bold transition-all duration-500 border border-gray-300 relative cursor-pointer `

    // Base styling
    if (cellValue === 0) {
      classes += "bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400 "
    } else {
      classes += "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 "
    }

    // Special states - priority order matters!
    if (isCurrentPos) {
      // Current position - bright yellow with pulse
      classes += "bg-gradient-to-br from-yellow-400 to-yellow-500 animate-pulse scale-110 border-yellow-600 border-2 z-20 shadow-lg "
    } else if (isInPath) {
      // Current solution path - green
      classes += "bg-gradient-to-br from-green-400 to-green-500 border-green-600 border-2 z-10 shadow-md "
    } else if (isVisited && cellValue === 1) {
      // Previously visited (backtracked) - purple
      classes += "bg-gradient-to-br from-purple-300 to-purple-400 border-purple-500 "
    } else if (isStart) {
      // Start position - emerald
      classes += "bg-gradient-to-br from-emerald-400 to-emerald-500 border-emerald-600 "
    } else if (isEnd) {
      // End position - red
      classes += "bg-gradient-to-br from-red-400 to-red-500 border-red-600 "
    }

    // Corner radius for the board
    if (rowIndex === 0 && colIndex === 0) classes += "rounded-tl-xl "
    if (rowIndex === 0 && colIndex === board.length - 1) classes += "rounded-tr-xl "
    if (rowIndex === board.length - 1 && colIndex === 0) classes += "rounded-bl-xl "
    if (rowIndex === board.length - 1 && colIndex === board.length - 1) classes += "rounded-br-xl "

    return classes
  }

  const toggleCell = (rowIndex: number, colIndex: number) => {
    if (isVisualizing || (rowIndex === 0 && colIndex === 0) || (rowIndex === board.length - 1 && colIndex === board.length - 1)) return

    const newBoard = board.map(row => [...row])
    newBoard[rowIndex][colIndex] = newBoard[rowIndex][colIndex] === 0 ? 1 : 0
    setBoard(newBoard)
  }
  const generatePathD = (path: { row: number, col: number }[]) => {
    if (path.length < 2) return ''

    const cellSize = 48 // w-12 h-12 = 48px
    const cellCenter = cellSize / 2
    const padding = 8 // p-2 = 8px

    let d = ''
    for (let i = 0; i < path.length; i++) {
      const { row, col } = path[i]
      const x = col * cellSize + cellCenter + padding
      const y = row * cellSize + cellCenter + padding

      if (i === 0) {
        d += `M ${x} ${y}`
      } else {
        d += ` L ${x} ${y}`
      }
    }
    return d
  }

  const getPathColor = (index: number) => {
    const colors = [
      '#3b82f6', // blue
      '#ef4444', // red
      '#10b981', // emerald
      '#f59e0b', // amber
      '#8b5cf6', // violet
      '#06b6d4', // cyan
      '#84cc16', // lime
      '#f97316', // orange
      '#ec4899', // pink
      '#6366f1', // indigo
      '#14b8a6', // teal
      '#a855f7', // purple
    ]
    return colors[index % colors.length]
  }

  return (
    <section className='min-h-screen w-screen p-4 flex flex-col items-center justify-center overflow-hidden'>
      <motion.div
        className='w-full max-w-7xl flex flex-col items-center gap-4 h-full'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <div className='text-center space-y-1 flex-shrink-0'>
          <motion.h1
            className='text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Rat in a Maze Visualizer
          </motion.h1>
          <motion.p
            className='text-sm text-gray-700 font-medium'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            🐭 Visualize backtracking algorithm with hit-and-trial exploration
          </motion.p>
        </div>

        {/* Main Content */}
        <div className='flex items-start gap-6 w-full justify-center flex-1 min-h-0'>
          {/* Left Side - Board Size & Status */}
          <motion.div
            className='flex flex-col gap-4 w-60'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Board Size Card */}
            <motion.div
              className='w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50'
              layout
            >
              <h3 className='text-sm font-bold text-gray-800 text-center mb-3'>Board Size</h3>
              <div className='grid grid-cols-2 gap-2'>
                {[3, 4, 5, 6].map(size => (
                  <button
                    key={size}
                    onClick={() => changeBoardSize(size)}
                    disabled={isVisualizing}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${boardSize === size
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      } ${isVisualizing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}`}
                  >
                    {size}×{size}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Status Card */}
            <motion.div
              className='w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50'
              layout
            >
              <div className='text-center space-y-3'>
                <h3 className='text-sm font-bold text-gray-800'>Status</h3>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isSolved
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200'
                    : isVisualizing
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200'
                    }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${isSolved ? 'bg-emerald-500' : isVisualizing ? 'bg-blue-500' : 'bg-gray-500'
                      }`}
                  />
                  <span className='text-sm'>
                    {isSolved ? `Found ${solutionCount} paths!` : isVisualizing ? 'Solving...' : 'Ready'}
                  </span>
                </div>

                {/* Current Path Display */}
                {currentPath && (
                  <motion.div
                    className='bg-blue-50 border border-blue-200 rounded-lg p-3'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className='text-sm text-blue-800 font-mono'>
                      Current: {currentPath}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>


            {/* Solutions Card */}
            <motion.div
              className='w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50'
              layout
            >
              <h3 className='text-sm font-bold text-gray-800 text-center mb-3'>
                Solutions ({foundPaths.length} found)
              </h3>
              <div className='space-y-2 h-40 overflow-y-auto'>
                {foundPaths.length > 0 ? (
                  foundPaths.map((path, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-2 rounded-lg p-2 cursor-pointer transition-all duration-200 ${highlightedSolution === index
                        ? 'bg-blue-100 border border-blue-300 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setHighlightedSolution(highlightedSolution === index ? null : index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className='w-3 h-3 rounded-full border border-gray-300'
                        style={{ backgroundColor: getPathColor(index) }}
                      ></div>
                      <span className={`text-xs font-medium flex-1 ${highlightedSolution === index ? 'text-blue-800' : 'text-gray-700'
                        }`}>
                        Path {index + 1}
                      </span>
                      <span className={`text-xs ${highlightedSolution === index ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                        {path.length} steps
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <div className='flex items-center justify-center h-full text-gray-500 text-xs'>
                    No solutions found yet
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Center - Maze Board */}
          <motion.div
            className='relative flex-shrink-0'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            {/* Board Shadow/Glow Effect */}
            <div className='absolute -inset-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg'></div>

            {/* Main Board */}
            <div className='relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50'>
              <div className='relative'>
                <div className='grid gap-0 p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl' style={{ gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))` }}>
                  {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <motion.div
                        key={`${rowIndex}-${colIndex}`}
                        className={getCellStyling(rowIndex, colIndex)}
                        onClick={() => toggleCell(rowIndex, colIndex)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: currentPosition?.row === rowIndex && currentPosition?.col === colIndex ? 1.1 : 1
                        }}
                        transition={{
                          delay: 0.1 + (rowIndex * 0.03) + (colIndex * 0.005),
                          duration: 0.2,
                          scale: { duration: 0.2 }
                        }}
                      >
                        {/* Start marker */}
                        {rowIndex === 0 && colIndex === 0 && (
                          <motion.div
                            className='text-green-700 text-lg'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            🐭
                          </motion.div>
                        )}

                        {/* End marker */}
                        {rowIndex === board.length - 1 && colIndex === board.length - 1 && (
                          <motion.div
                            className='text-red-700 text-lg'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            🧀
                          </motion.div>
                        )}

                        {/* Current position */}
                        {currentPosition?.row === rowIndex && currentPosition?.col === colIndex &&
                          !(rowIndex === 0 && colIndex === 0) &&
                          !(rowIndex === board.length - 1 && colIndex === board.length - 1) && (
                            <motion.div
                              className='text-yellow-700 text-lg'
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              🐭
                            </motion.div>
                          )}

                        {/* Wall indicator */}
                        {cell === 0 && !(rowIndex === 0 && colIndex === 0) && !(rowIndex === board.length - 1 && colIndex === board.length - 1) && (
                          <div className='text-gray-500 text-sm'>⬛</div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>

                {/* SVG Path Overlay */}
                <svg
                  className='absolute inset-0 pointer-events-none'
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {/* Current exploring path */}
                  {currentPathTrace.length > 1 && (
                    <motion.path
                      d={generatePathD(currentPathTrace)}
                      stroke='#10b981'
                      strokeWidth='3'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeDasharray='5,5'
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* Solution paths */}
                  {solutionPaths.map((path, index) => (
                    <motion.path
                      key={`solution-${index}`}
                      d={generatePathD(path)}
                      stroke={getPathColor(index)}
                      strokeWidth={highlightedSolution === index ? '5' : '3'}
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      opacity={highlightedSolution === null ? 0.8 : highlightedSolution === index ? 1 : 0.3}
                      style={{ zIndex: highlightedSolution === index ? 10 : 1 }}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Controls and Solutions */}
          <motion.div
            className='flex flex-col gap-4 w-60'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {/* Controls Card */}
            <motion.div
              className='w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50'
              layout
            >
              <h3 className='text-sm font-bold text-gray-800 text-center mb-3'>Controls</h3>
              <div className='space-y-2'>
                <AnimatePresence mode="wait">
                  {(!isVisualizing && isEditable) ? (
                    <motion.div
                      key="main-controls"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className='space-y-2'
                    >
                      <button
                        onClick={visualizeMaze}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs'
                      >
                        <Zap size={14} className='group-hover:scale-110 transition-transform duration-300' />
                        Visualize Algorithm
                      </button>

                      <button
                        onClick={solveInstantly}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs'
                      >
                        <SkipForward size={14} className='group-hover:scale-110 transition-transform duration-300' />
                        Find All Paths
                      </button>

                      <button
                        onClick={generateRandomWalls}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5 text-xs'
                      >
                        <Shuffle size={14} className='group-hover:scale-110 transition-transform duration-300' />
                        Random Walls
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="stop-control"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className='space-y-2'
                    >
                      <button
                        onClick={stopSolving}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs'
                      >
                        <SkipForward size={14} className='group-hover:scale-110 transition-transform duration-300' />
                        Stop Solving
                      </button>

                      <div className='h-12 flex items-center justify-center text-gray-500 text-xs'>
                        Other controls disabled
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Speed Settings Card */}
            <motion.div
              className='w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50'
              layout
            >
              <h3 className='text-sm font-bold text-gray-800 text-center mb-3'>Speed Settings</h3>
              <AnimatePresence mode="wait">
                {!isVisualizing ? (
                  <motion.div
                    key="speed-active"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='space-y-3'
                  >
                    <div className='text-center'>
                      <span className='text-xs font-medium text-gray-700'>
                        Speed: {solvingSpeed}ms
                      </span>
                    </div>
                    <input
                      type='range'
                      min='0'
                      max='500'
                      value={solvingSpeed}
                      onChange={(e) => setSolvingSpeed(Number(e.target.value))}
                      className='w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider'
                    />
                    <div className='flex justify-between text-xs text-gray-500'>
                      <span>Fast</span>
                      <span>Slow</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="speed-inactive"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='text-center text-gray-500 text-xs py-3'
                  >
                    Can&apos;t alter during visualization
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Error/Success Toast Notification */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              className='fixed top-4 right-4 z-50'
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={`backdrop-blur-md rounded-xl p-3 pr-10 shadow-2xl border max-w-xs ${errorMessage.includes('🎉')
                ? 'bg-green-50/95 border-green-200'
                : 'bg-red-50/95 border-red-200'
                }`}>
                <div className='flex items-start gap-2'>
                  <span className={`text-lg flex-shrink-0 mt-0.5 ${errorMessage.includes('🎉') ? 'text-green-600' : 'text-red-500'}`}>
                    {errorMessage.includes('🎉') ? '🎉' : '⚠️'}
                  </span>
                  <div>
                    <h4 className={`font-bold text-xs mb-1 ${errorMessage.includes('🎉') ? 'text-green-800' : 'text-red-800'}`}>
                      {errorMessage.includes('🎉') ? 'Solution Found!' : 'Error'}
                    </h4>
                    <p className={`text-xs leading-relaxed ${errorMessage.includes('🎉') ? 'text-green-700' : 'text-red-700'}`}>
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setErrorMessage('')}
                  className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-200 font-bold text-xs ${errorMessage.includes('🎉')
                    ? 'text-green-500 hover:text-green-700 hover:bg-green-100'
                    : 'text-red-500 hover:text-red-700 hover:bg-red-100'
                    }`}
                  title='Dismiss'
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default RatInAMaze