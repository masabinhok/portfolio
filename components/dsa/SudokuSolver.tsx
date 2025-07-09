'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Zap, SkipForward, FastForward } from 'lucide-react'

const SudokuSolver = () => {
  const emptySudoku = [
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];

  // Sample puzzles for users to try
  const samplePuzzles = {
    easy: [
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ],
    medium: [
      [".", ".", ".", "6", ".", ".", "4", ".", "."],
      ["7", ".", ".", ".", ".", "3", "6", ".", "."],
      [".", ".", ".", ".", "9", "1", ".", "8", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", "5", ".", "1", "8", ".", ".", ".", "3"],
      [".", ".", ".", "3", ".", "6", ".", "4", "5"],
      [".", "4", ".", "2", ".", ".", ".", "6", "."],
      ["9", ".", "3", ".", ".", ".", ".", ".", "."],
      [".", "2", ".", ".", ".", ".", "1", ".", "."]
    ],
    hard: [
      [".", ".", ".", ".", ".", ".", ".", "1", "."],
      ["4", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", "2", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "5", ".", "4", ".", "7"],
      [".", ".", "8", ".", ".", ".", "3", ".", "."],
      [".", ".", "1", ".", "9", ".", ".", ".", "."],
      ["3", ".", ".", "4", ".", ".", "2", ".", "."],
      [".", "5", ".", "1", ".", ".", ".", ".", "."],
      [".", ".", ".", "8", ".", "6", ".", ".", "."]
    ]
  };

  const [sudoku, setSudoku] = useState<string[][]>(emptySudoku)
  const [originalSudoku, setOriginalSudoku] = useState<string[][]>(emptySudoku)
  const [isEditable, setIsEditable] = useState(true)
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);
  const [currentCell, setCurrentCell] = useState<{ row: number, col: number } | null>(null);
  const [backtrackCell, setBacktrackCell] = useState<{ row: number, col: number } | null>(null);
  const [solvingSpeed, setSolvingSpeed] = useState<number>(50); // milliseconds delay
  const [errorMessage, setErrorMessage] = useState<string>('');
  const solveRef = useRef<{ shouldStop: boolean }>({ shouldStop: false });

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    if (!isEditable) return

    // Clear any existing error message
    setErrorMessage('');

    // Only allow numbers 1-9 or empty
    if (value === '' || (value >= '1' && value <= '9' && value.length === 1)) {
      const newSudoku = sudoku.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? (value === '' ? '.' : value) : cell
        )
      );
      setSudoku(newSudoku);
      setOriginalSudoku(newSudoku); // Store original for resetting
    }
  }

  const clearSudoku = () => {
    setSudoku(emptySudoku)
    setOriginalSudoku(emptySudoku)
    setIsSolved(false);
    setIsVisualizing(false);
    setCurrentCell(null);
    setBacktrackCell(null);
    setIsEditable(true)
    setErrorMessage('');
    solveRef.current.shouldStop = true;
  }

  const resetToOriginal = () => {
    setSudoku([...originalSudoku.map(row => [...row])]);
    setIsSolved(false);
    setIsVisualizing(false);
    setCurrentCell(null);
    setBacktrackCell(null);
    setIsEditable(true)
    setErrorMessage('');
    solveRef.current.shouldStop = true;
  }

  const isSafe = (board: string[][], row: number, col: number, num: string): boolean => {
    //vertical check 
    for (let i = 0; i < 9; i++) {
      if (board[i][col] == num) {
        return false;
      }
    }
    //horizontal check 
    for (let i = 0; i < 9; i++) {
      if (board[row][i] == num) {
        return false;
      }
    }

    //box check
    const rowStart = Math.floor(row / 3) * 3;
    const colStart = Math.floor(col / 3) * 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if (board[i][j] == num) {
          return false;
        }
      }
    }
    return true;
  }

  const callDelay = async () => {
    return new Promise(resolve => {
      if (!solveRef.current.shouldStop) {
        setTimeout(resolve, solvingSpeed);
      } else {
        resolve(undefined);
      }
    });
  }

  const solve = async (board: string[][], row: number, col: number): Promise<boolean> => {
    if (solveRef.current.shouldStop) return false;
    if (row == 9) return true;

    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = col === 8 ? 0 : col + 1;

    // Highlight current cell being processed
    setCurrentCell({ row, col });
    setBacktrackCell(null);
    await callDelay();

    if (solveRef.current.shouldStop) return false;

    //number xa vane
    if (board[row][col] != '.') {
      return solve(board, nextRow, nextCol);
    }

    //empty xa vane
    for (let i = 1; i <= 9; i++) {
      if (solveRef.current.shouldStop) return false;

      const digit = i.toString();
      if (isSafe(board, row, col, digit)) {
        board[row][col] = digit;

        // Update the visual state
        setSudoku([...board]);
        await callDelay();

        if (solveRef.current.shouldStop) return false;
        if (await solve(board, nextRow, nextCol)) return true;

        // Backtrack - show the cell being cleared with special highlight
        setBacktrackCell({ row, col });
        await callDelay();

        board[row][col] = '.';
        setSudoku([...board]);
        await callDelay();
      }
    }
    return false;
  }
  const solveSudoku = async () => {
    // Clear any existing error
    setErrorMessage('');

    // Validate the puzzle before attempting to solve
    const validation = isValidSudoku(sudoku);
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage);
      return;
    }

    setIsEditable(false);
    setIsVisualizing(true);
    setIsSolved(false);
    setCurrentCell(null);
    setBacktrackCell(null);
    solveRef.current.shouldStop = false;

    // Don't modify originalSudoku here - it should remain unchanged
    // Create a deep copy of the sudoku to work with
    const boardCopy = sudoku.map(row => [...row]);

    const solved = await solve(boardCopy, 0, 0);

    if (solved && !solveRef.current.shouldStop) {
      setIsSolved(true);
      setCurrentCell(null);
      setBacktrackCell(null);
    } else if (solveRef.current.shouldStop) {
      // Solving was stopped by user
    } else {
      // No solution found
      setErrorMessage('No solution exists for this Sudoku puzzle. Please check your input.');
    }

    setIsVisualizing(false);
    setIsEditable(true);
  }

  const stopSolving = () => {
    solveRef.current.shouldStop = true;
    setIsVisualizing(false);
    setCurrentCell(null);
    setBacktrackCell(null);
    setIsEditable(true);
  }

  const loadSamplePuzzle = (difficulty: 'easy' | 'medium' | 'hard') => {
    const puzzle = samplePuzzles[difficulty].map(row => [...row]);
    setSudoku(puzzle);
    setOriginalSudoku(puzzle);
    setIsSolved(false);
    setIsVisualizing(false);
    setCurrentCell(null);
    setBacktrackCell(null);
    setIsEditable(true);
    setErrorMessage('');
    solveRef.current.shouldStop = true;
  }

  // Instant solve function without visualization
  const solveInstantly = async () => {
    // Clear any existing error
    setErrorMessage('');

    // Validate the puzzle before attempting to solve
    const validation = isValidSudoku(sudoku);
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage);
      return;
    }

    // Stop current visualization if running
    solveRef.current.shouldStop = true;
    setIsVisualizing(false);
    setCurrentCell(null);
    setBacktrackCell(null);

    // Show solving state
    setIsEditable(false);
    setIsSolved(false);

    // Don't modify originalSudoku here - it should remain unchanged for reset functionality

    // Create a deep copy to work with
    const boardCopy = sudoku.map(row => [...row]);

    // Add a small delay to show the solving state
    await new Promise(resolve => setTimeout(resolve, 300));

    // Synchronous solve function
    const solveSync = (board: string[][], row: number, col: number): boolean => {
      if (row === 9) return true;

      const nextRow = col === 8 ? row + 1 : row;
      const nextCol = col === 8 ? 0 : col + 1;

      if (board[row][col] !== '.') {
        return solveSync(board, nextRow, nextCol);
      }

      for (let i = 1; i <= 9; i++) {
        const digit = i.toString();
        if (isSafe(board, row, col, digit)) {
          board[row][col] = digit;
          if (solveSync(board, nextRow, nextCol)) return true;
          board[row][col] = '.';
        }
      }
      return false;
    };

    const solved = solveSync(boardCopy, 0, 0);

    if (solved) {
      setSudoku(boardCopy);
      setIsSolved(true);
    } else {
      setErrorMessage('No solution exists for this Sudoku puzzle. Please check your input.');
    }

    setIsEditable(true);
  }

  // Validate if the current Sudoku puzzle is valid (no conflicts)
  const isValidSudoku = (board: string[][]): { isValid: boolean; errorMessage: string } => {
    // Check rows
    for (let row = 0; row < 9; row++) {
      const seen = new Set<string>();
      for (let col = 0; col < 9; col++) {
        const cell = board[row][col];
        if (cell !== '.') {
          if (seen.has(cell)) {
            return {
              isValid: false,
              errorMessage: `Duplicate number '${cell}' found in row ${row + 1}`
            };
          }
          seen.add(cell);
        }
      }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const seen = new Set<string>();
      for (let row = 0; row < 9; row++) {
        const cell = board[row][col];
        if (cell !== '.') {
          if (seen.has(cell)) {
            return {
              isValid: false,
              errorMessage: `Duplicate number '${cell}' found in column ${col + 1}`
            };
          }
          seen.add(cell);
        }
      }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const seen = new Set<string>();
        for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
          for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
            const cell = board[row][col];
            if (cell !== '.') {
              if (seen.has(cell)) {
                return {
                  isValid: false,
                  errorMessage: `Duplicate number '${cell}' found in 3x3 box (rows ${boxRow * 3 + 1}-${boxRow * 3 + 3}, cols ${boxCol * 3 + 1}-${boxCol * 3 + 3})`
                };
              }
              seen.add(cell);
            }
          }
        }
      }
    }

    return { isValid: true, errorMessage: '' };
  }

  // Helper function to determine cell styling based on position
  const getCellStyling = (rowIndex: number, colIndex: number) => {
    let classes = "w-12 h-12 text-center text-lg font-bold transition-all duration-200 focus:outline-none "

    // Base styling with modern gradient
    classes += "bg-gradient-to-br from-gray-50 to-white text-gray-800 "
    classes += "border border-gray-200 "

    // Check if this is an original (user-input) cell
    const isOriginalCell = originalSudoku[rowIndex][colIndex] !== '.';

    // Backtrack cell (red highlight)
    if (backtrackCell && backtrackCell.row === rowIndex && backtrackCell.col === colIndex) {
      classes += "bg-gradient-to-br from-red-200 to-red-300 border-red-500 border-2 animate-pulse scale-105 "
    }
    // Current cell being processed (yellow highlight)
    else if (currentCell && currentCell.row === rowIndex && currentCell.col === colIndex) {
      classes += "bg-gradient-to-br from-yellow-200 to-yellow-300 border-yellow-500 border-2 animate-pulse scale-105 "
    }
    // Original/pre-filled cells (blue gradient) - user input, always blue
    else if (isOriginalCell) {
      classes += "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 font-black border-blue-300 "
    }
    // Algorithm-filled cells during solving (purple gradient)
    else if (sudoku[rowIndex][colIndex] !== '.' && isVisualizing) {
      classes += "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 font-semibold "
    }
    // Algorithm-filled cells when solved (green gradient) - only for non-original cells
    else if (sudoku[rowIndex][colIndex] !== '.' && isSolved && !isOriginalCell) {
      classes += "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 font-black "
    }
    // Focus and hover states (only when editable)
    else if (isEditable) {
      classes += "focus:ring-2 focus:ring-blue-400/30 focus:border-blue-500 focus:bg-blue-50 "
      classes += "hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 "
    }

    // Disabled state during solving
    if (!isEditable) {
      classes += "cursor-not-allowed "
    }

    // 3x3 grid separation with colored borders
    if (rowIndex % 3 === 0) classes += "border-t-4 border-t-indigo-600 "
    if (rowIndex % 3 === 2) classes += "border-b-4 border-b-indigo-600 "
    if (colIndex % 3 === 0) classes += "border-l-4 border-l-indigo-600 "
    if (colIndex % 3 === 2) classes += "border-r-4 border-r-indigo-600 "

    // Corner radius for the entire grid
    if (rowIndex === 0 && colIndex === 0) classes += "rounded-tl-xl "
    if (rowIndex === 0 && colIndex === 8) classes += "rounded-tr-xl "
    if (rowIndex === 8 && colIndex === 0) classes += "rounded-bl-xl "
    if (rowIndex === 8 && colIndex === 8) classes += "rounded-br-xl "

    return classes
  }

  return (
    <section className='h-screen w-screen p-4 flex flex-col items-center justify-center overflow-hidden'>
      <motion.div
        className='w-full max-w-7xl flex flex-col items-center gap-4 h-full'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Compact Header */}
        <div className='text-center space-y-1 flex-shrink-0'>
          <motion.h1
            className='text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Sudoku Solver
          </motion.h1>
          <motion.p
            className='text-sm text-gray-700 font-medium'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            🧩 Enter numbers 1-9 and watch the magic happen
          </motion.p>
        </div>

        {/* Main Content - Grid and Controls Side by Side */}
        <div className='flex items-start gap-6 w-full justify-center flex-1 min-h-0'>
          {/* Left Side - Status and Sample Puzzles */}
          <motion.div
            className='flex flex-col gap-4 w-60'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
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
                    : (isVisualizing || !isEditable)
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200'
                    }`}
                  layout
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full ${isSolved ? 'bg-emerald-500' : (isVisualizing || !isEditable) ? 'bg-blue-500' : 'bg-gray-500'}`}
                    animate={{
                      scale: (isVisualizing || !isEditable) && !isSolved ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: (isVisualizing || !isEditable) && !isSolved ? Infinity : 0
                    }}
                  />
                  <motion.span layout className='text-sm'>
                    {isSolved ? 'Solved!' : (isVisualizing || !isEditable) ? 'Solving...' : 'Ready'}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Sample Puzzles Card */}
            <motion.div
              className='w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50'
              layout
            >
              <h3 className='text-sm font-bold text-gray-800 text-center mb-3'>Sample Puzzles</h3>
              <AnimatePresence mode="wait">
                {(!isVisualizing && isEditable) ? (
                  <motion.div
                    key="sample-buttons"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='space-y-2'
                  >
                    <button
                      onClick={() => loadSamplePuzzle('easy')}
                      className='w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5'
                    >
                      Easy Puzzle
                    </button>
                    <button
                      onClick={() => loadSamplePuzzle('medium')}
                      className='w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5'
                    >
                      Medium Puzzle
                    </button>
                    <button
                      onClick={() => loadSamplePuzzle('hard')}
                      className='w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5'
                    >
                      Hard Puzzle
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sample-disabled"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='text-center text-gray-500 text-xs py-3'
                  >
                    Disabled during solving
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Center - Grid */}
          <motion.div
            className='relative flex-shrink-0'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            {/* Grid Shadow/Glow Effect */}
            <div className='absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-xl blur-lg'></div>

            {/* Main Grid */}
            <div className='relative bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-white/50'>
              <div className='grid grid-cols-9 gap-0 p-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg'>
                {sudoku.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <motion.input
                      key={`${rowIndex}-${colIndex}`}
                      type='text'
                      value={cell === '.' ? '' : cell}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                      className={getCellStyling(rowIndex, colIndex)}
                      maxLength={1}
                      disabled={!isEditable}
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
                      whileFocus={{
                        scale: 1.1,
                        zIndex: 10,
                        boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)"
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Controls and Speed */}
          <motion.div
            className='flex flex-col gap-4 w-60'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {/* Main Controls Card */}
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
                        onClick={solveSudoku}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs'
                      >
                        <Zap size={14} className='group-hover:scale-110 transition-transform duration-300' />
                        Visualize Algorithm
                      </button>

                      <button
                        onClick={solveInstantly}
                        className='w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs'
                      >
                        <FastForward size={14} className='group-hover:scale-110 transition-transform duration-300' />
                        Skip to Solution
                      </button>

                      <div className='grid grid-cols-2 gap-2 pt-1'>
                        <button
                          onClick={resetToOriginal}
                          className='group flex items-center justify-center gap-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5 text-xs'
                        >
                          <RotateCcw size={12} className='group-hover:rotate-180 transition-transform duration-500' />
                          Reset
                        </button>

                        <button
                          onClick={clearSudoku}
                          className='group flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 shadow hover:shadow-lg transform hover:-translate-y-0.5 text-xs'
                        >
                          <RotateCcw size={12} className='group-hover:rotate-180 transition-transform duration-500' />
                          Clear
                        </button>
                      </div>
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
                    <h4 className='font-bold text-red-800 text-xs mb-1'>Invalid Puzzle</h4>
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

export default SudokuSolver