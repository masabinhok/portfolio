'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Zap, SkipForward, Crown } from 'lucide-react'

const NQueens = () => {
  const createEmptyBoard = (size: number) =>
    Array(size).fill(null).map(() => Array(size).fill('.'))

  const [boardSize, setBoardSize] = useState<number>(4)
  const [board, setBoard] = useState<string[][]>(createEmptyBoard(4))
  const [solutions, setSolutions] = useState<string[][][]>([])
  const [currentSolution, setCurrentSolution] = useState<number>(0)
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(true)
  const [isSolved, setIsSolved] = useState<boolean>(false)
  const [currentCell, setCurrentCell] = useState<{ row: number, col: number } | null>(null)
  const [backtrackCell, setBacktrackCell] = useState<{ row: number, col: number } | null>(null)
  const [attackedCells, setAttackedCells] = useState<Set<string>>(new Set())
  const [solvingSpeed, setSolvingSpeed] = useState<number>(250)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [solutionCount, setSolutionCount] = useState<number>(0)
  const solveRef = useRef<{ shouldStop: boolean }>({ shouldStop: false })

  const isSafe = (board: string[][], row: number, col: number, n: number): boolean => {
    // Vertical check
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') {
        return false
      }
    }

    // Left diagonal check
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false
      }
    }

    // Right diagonal check
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') {
        return false
      }
    }
    return true
  }

  const getAttackedCells = (board: string[][], n: number): Set<string> => {
    const attacked = new Set<string>()

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 'Q') {
          // Mark all cells attacked by this queen
          // Vertical
          for (let k = 0; k < n; k++) {
            attacked.add(`${k}-${j}`)
          }
          // Horizontal
          for (let k = 0; k < n; k++) {
            attacked.add(`${i}-${k}`)
          }
          // Diagonals
          for (let k = 0; k < n; k++) {
            if (i + k < n && j + k < n) attacked.add(`${i + k}-${j + k}`)
            if (i - k >= 0 && j - k >= 0) attacked.add(`${i - k}-${j - k}`)
            if (i + k < n && j - k >= 0) attacked.add(`${i + k}-${j - k}`)
            if (i - k >= 0 && j + k < n) attacked.add(`${i - k}-${j + k}`)
          }
        }
      }
    }
    return attacked
  }

  const callDelay = async () => {
    return new Promise(resolve => {
      if (!solveRef.current.shouldStop) {
        setTimeout(resolve, solvingSpeed)
      } else {
        resolve(undefined)
      }
    })
  }

  const solve = async (localBoard: string[][], row: number, n: number, solutions: string[][][]): Promise<void> => {
    if (solveRef.current.shouldStop) return

    if (row === n) {
      const solution = localBoard.map(row => [...row])
      solutions.push(solution)
      setSolutionCount(solutions.length)
      return
    }

    // Highlight current row being processed
    setCurrentCell({ row, col: -1 })
    setBacktrackCell(null)
    setAttackedCells(getAttackedCells(localBoard, n))
    await callDelay()

    for (let j = 0; j < n; j++) {
      if (solveRef.current.shouldStop) return

      // Highlight current cell being tested
      setCurrentCell({ row, col: j })
      await callDelay()

      if (isSafe(localBoard, row, j, n)) {
        localBoard[row][j] = 'Q'

        // Update visual state
        setBoard([...localBoard])
        setAttackedCells(getAttackedCells(localBoard, n))
        await callDelay()

        if (solveRef.current.shouldStop) return
        await solve(localBoard, row + 1, n, solutions)

        if (solveRef.current.shouldStop) return

        // Backtrack - show the cell being cleared
        setBacktrackCell({ row, col: j })
        await callDelay()

        localBoard[row][j] = '.'
        setBoard([...localBoard])
        setAttackedCells(getAttackedCells(localBoard, n))
        await callDelay()
      }
    }
  }

  const visualizeNQueens = async () => {
    setErrorMessage('')
    setIsEditable(false)
    setIsVisualizing(true)
    setIsSolved(false)
    setSolutions([])
    setSolutionCount(0)
    setCurrentCell(null)
    setBacktrackCell(null)
    setAttackedCells(new Set())
    solveRef.current.shouldStop = false

    const boardCopy = createEmptyBoard(boardSize)
    setBoard(boardCopy)


    const foundSolutions: string[][][] = []
    await solve(boardCopy, 0, boardSize, foundSolutions)

    if (!solveRef.current.shouldStop) {
      setSolutions(foundSolutions)
      setCurrentSolution(0)
      setIsSolved(true)
      setCurrentCell(null)
      setBacktrackCell(null)

      if (foundSolutions.length > 0) {
        setBoard(foundSolutions[0])
        setAttackedCells(getAttackedCells(foundSolutions[0], boardSize))
      }
    }

    setIsVisualizing(false)
    setIsEditable(true)
  }

  const solveInstantly = async () => {
    setErrorMessage('')
    setIsVisualizing(false)
    setIsEditable(false)
    setIsSolved(false)
    setSolutions([])
    setSolutionCount(0)
    setCurrentCell(null)
    setBacktrackCell(null)
    setAttackedCells(new Set())
    solveRef.current.shouldStop = true

    await new Promise(resolve => setTimeout(resolve, 300))

    const solveSync = (localBoard: string[][], row: number, n: number, solutions: string[][][]): void => {
      if (row === n) {
        solutions.push(localBoard.map(row => [...row]))
        return
      }

      for (let j = 0; j < n; j++) {
        if (isSafe(localBoard, row, j, n)) {
          localBoard[row][j] = 'Q'
          solveSync(localBoard, row + 1, n, solutions)
          localBoard[row][j] = '.'
        }
      }
    }

    const boardCopy = createEmptyBoard(boardSize)
    const foundSolutions: string[][][] = []
    solveSync(boardCopy, 0, boardSize, foundSolutions)

    setSolutions(foundSolutions)
    setSolutionCount(foundSolutions.length)
    setCurrentSolution(0)
    setIsSolved(true)

    if (foundSolutions.length > 0) {
      setBoard(foundSolutions[0])
      setAttackedCells(getAttackedCells(foundSolutions[0], boardSize))
    }

    setIsEditable(true)
  }

  const stopSolving = () => {
    solveRef.current.shouldStop = true
    setIsVisualizing(false)
    setCurrentCell(null)
    setBacktrackCell(null)
    setAttackedCells(new Set())
    setIsEditable(true)
  }

  const resetBoard = () => {
    const emptyBoard = createEmptyBoard(boardSize)
    setBoard(emptyBoard)
    setSolutions([])
    setSolutionCount(0)
    setCurrentSolution(0)
    setIsSolved(false)
    setIsVisualizing(false)
    setCurrentCell(null)
    setBacktrackCell(null)
    setAttackedCells(new Set())
    setIsEditable(true)
    setErrorMessage('')
    solveRef.current.shouldStop = true
  }

  const changeBoardSize = (newSize: number) => {
    setBoardSize(newSize)
    const emptyBoard = createEmptyBoard(newSize)
    setBoard(emptyBoard)

    setSolutions([])
    setSolutionCount(0)
    setCurrentSolution(0)
    setIsSolved(false)
    setIsVisualizing(false)
    setCurrentCell(null)
    setBacktrackCell(null)
    setAttackedCells(new Set())
    setIsEditable(true)
    setErrorMessage('')
    solveRef.current.shouldStop = true
  }

  const showSolution = (index: number) => {
    if (solutions.length > 0 && index >= 0 && index < solutions.length) {
      setCurrentSolution(index)
      setBoard(solutions[index])
      setAttackedCells(getAttackedCells(solutions[index], boardSize))
    }
  }

  const getCellStyling = (rowIndex: number, colIndex: number) => {
    const isCurrentCell = currentCell?.row === rowIndex && currentCell?.col === colIndex
    const isBacktrackCell = backtrackCell?.row === rowIndex && backtrackCell?.col === colIndex
    const isAttacked = attackedCells.has(`${rowIndex}-${colIndex}`)
    const hasQueen = board[rowIndex][colIndex] === 'Q'
    const isCurrentRow = currentCell?.row === rowIndex && currentCell?.col === -1

    let classes = `w-12 h-12 flex items-center justify-center text-2xl font-bold transition-all duration-300 border border-gray-300 relative `

    // Chessboard pattern
    const isLightSquare = (rowIndex + colIndex) % 2 === 0
    if (isLightSquare) {
      classes += "bg-gradient-to-br from-amber-100 to-yellow-100 "
    } else {
      classes += "bg-gradient-to-br from-amber-200 to-yellow-200 "
    }

    // Special highlighting
    if (isBacktrackCell) {
      classes += "bg-gradient-to-br from-red-300 to-red-400 animate-pulse scale-105 border-red-500 border-2 "
    } else if (isCurrentCell) {
      classes += "bg-gradient-to-br from-blue-300 to-blue-400 animate-pulse scale-105 border-blue-500 border-2 "
    } else if (isCurrentRow && !isCurrentCell) {
      classes += "bg-gradient-to-br from-yellow-300 to-yellow-400 "
    } else if (hasQueen) {
      classes += "bg-gradient-to-br from-purple-200 to-purple-300 border-purple-400 "
    } else if (isAttacked && !hasQueen) {
      classes += "bg-gradient-to-br from-red-100 to-red-200 "
    }

    // Corner radius for the board
    if (rowIndex === 0 && colIndex === 0) classes += "rounded-tl-xl "
    if (rowIndex === 0 && colIndex === boardSize - 1) classes += "rounded-tr-xl "
    if (rowIndex === boardSize - 1 && colIndex === 0) classes += "rounded-bl-xl "
    if (rowIndex === boardSize - 1 && colIndex === boardSize - 1) classes += "rounded-br-xl "

    return classes
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
            className='text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            N-Queens Visualizer
          </motion.h1>
          <motion.p
            className='text-sm text-gray-700 font-medium'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            👑 Watch the algorithm place {boardSize} queens on a {boardSize}×{boardSize} board
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
                {[4, 5, 6, 8].map(size => (
                  <button
                    key={size}
                    onClick={() => changeBoardSize(size)}
                    disabled={isVisualizing}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${boardSize === size
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
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
                <motion.div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-500 ${isSolved
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200'
                    : isVisualizing
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200'
                    }`}
                  layout
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full ${isSolved ? 'bg-emerald-500' : isVisualizing ? 'bg-blue-500' : 'bg-gray-500'
                      }`}
                    animate={{
                      scale: isVisualizing && !isSolved ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isVisualizing && !isSolved ? Infinity : 0
                    }}
                  />
                  <motion.span layout className='text-sm'>
                    {isSolved ? `Found ${solutionCount} solutions!` : isVisualizing ? 'Solving...' : 'Ready'}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Solutions Card */}
            {solutions.length > 0 && (
              <motion.div
                className='w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <h3 className='text-sm font-bold text-gray-800 text-center mb-3'>
                  Solutions ({solutions.length} found)
                </h3>
                <div className='space-y-2 max-h-40 overflow-y-auto'>
                  {solutions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => showSolution(index)}
                      className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${currentSolution === index
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                    >
                      Solution {index + 1}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Center - Chessboard */}
          <motion.div
            className='relative flex-shrink-0'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            {/* Board Shadow/Glow Effect */}
            <div className='absolute -inset-3 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-2xl blur-lg'></div>

            {/* Main Board */}
            <div className='relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50'>
              <div className='grid gap-0 p-2 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl' style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}>
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      className={getCellStyling(rowIndex, colIndex)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: (currentCell?.row === rowIndex && currentCell?.col === colIndex) ||
                          (backtrackCell?.row === rowIndex && backtrackCell?.col === colIndex) ? 1.05 : 1
                      }}
                      transition={{
                        delay: 0.1 + (rowIndex * 0.03) + (colIndex * 0.005),
                        duration: 0.2,
                        scale: { duration: 0.2 }
                      }}
                    >
                      {cell === 'Q' && (
                        <motion.div
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                          className='text-purple-700'
                        >
                          <Crown size={24} />
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                )}
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
                        onClick={visualizeNQueens}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs'
                      >
                        <Zap size={14} className='group-hover:scale-110 transition-transform duration-300' />
                        Visualize Algorithm
                      </button>

                      <button
                        onClick={solveInstantly}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs'
                      >
                        <SkipForward size={14} className='group-hover:scale-110 transition-transform duration-300' />
                        Find All Solutions
                      </button>

                      <button
                        onClick={resetBoard}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5 text-xs'
                      >
                        <RotateCcw size={14} className='group-hover:rotate-180 transition-transform duration-500' />
                        Reset Board
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
                    Can&apos; alter during visualization
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>


          </motion.div>
        </div>

        {/* Error Toast Notification */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              className='fixed top-4 right-4 z-50'
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className='bg-white/95 backdrop-blur-md rounded-xl p-3 pr-10 shadow-2xl border border-red-200 max-w-xs'>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500 text-lg flex-shrink-0 mt-0.5'>⚠️</span>
                  <div>
                    <h4 className='font-bold text-red-800 text-xs mb-1'>Error</h4>
                    <p className='text-red-700 text-xs leading-relaxed'>{errorMessage}</p>
                  </div>
                </div>
                <button
                  onClick={() => setErrorMessage('')}
                  className='absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-100 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-200 font-bold text-xs'
                  title='Dismiss error'
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

export default NQueens