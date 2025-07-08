'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Zap } from 'lucide-react'

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
  const [sudoku, setSudoku] = useState(emptySudoku)
  const [isEditable, setIsEditable] = useState(true)

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    if (!isEditable) return

    // Only allow numbers 1-9 or empty
    if (value === '' || (value >= '1' && value <= '9' && value.length === 1)) {
      const newSudoku = sudoku.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? (value === '' ? '.' : value) : cell
        )
      );
      setSudoku(newSudoku);
    }
  }

  const clearSudoku = () => {
    setSudoku(emptySudoku)
    setIsEditable(true)
  }

  const solveSudoku = () => {
    // Placeholder for solve function
    setIsEditable(false)
    // TODO: Add actual solving algorithm
  }

  // Helper function to determine cell styling based on position
  const getCellStyling = (rowIndex: number, colIndex: number) => {
    let classes = "w-12 h-12 text-center text-lg font-bold transition-all duration-300 focus:outline-none "

    // Base styling with modern gradient
    classes += "bg-gradient-to-br from-gray-50 to-white text-gray-800 "
    classes += "border border-gray-200 "

    // Focus and hover states
    classes += "focus:ring-2 focus:ring-blue-400/30 focus:border-blue-500 focus:bg-blue-50 "
    classes += "hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 "

    // Disabled state
    if (!isEditable) {
      classes += "bg-gradient-to-br from-gray-100 to-gray-200 cursor-not-allowed "
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

    // Special styling for pre-filled cells (if any)
    if (sudoku[rowIndex][colIndex] !== '.' && isEditable) {
      classes += "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 font-black "
    }

    return classes
  }

  return (
    <section className='min-h-screen w-screen p-4 flex flex-col items-center justify-center'>
      <motion.div
        className='w-full max-w-6xl flex flex-col items-center gap-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Compact Header */}
        <div className='text-center space-y-2'>
          <motion.h1
            className='text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Sudoku Solver
          </motion.h1>
          <motion.p
            className='text-base text-gray-700 font-medium'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            🧩 Enter numbers 1-9 and watch the magic happen
          </motion.p>
        </div>

        {/* Main Content - Grid and Controls Side by Side */}
        <div className='flex items-center gap-8 w-full justify-center'>
          {/* Left Side - Grid */}
          <motion.div
            className='relative'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            {/* Grid Shadow/Glow Effect */}
            <div className='absolute -inset-3 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg'></div>

            {/* Main Grid */}
            <div className='relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50'>
              <div className='grid grid-cols-9 gap-0 p-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl'>
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
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.1 + (rowIndex * 0.03) + (colIndex * 0.005),
                        duration: 0.1
                      }}
                      whileFocus={{
                        scale: 1.05,
                        zIndex: 10,
                        boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)"
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Controls */}
          <motion.div
            className='flex flex-col gap-6 items-center'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {/* Controls */}
            <div className='flex flex-col gap-4'>
              <button
                onClick={clearSudoku}
                className='group flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              >
                <RotateCcw size={18} className='group-hover:rotate-180 transition-transform duration-500' />
                Clear Board
              </button>

              <button
                onClick={solveSudoku}
                className='group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              >
                <Zap size={18} className='group-hover:scale-110 transition-transform duration-300' />
                Solve Puzzle
              </button>
            </div>

            {/* Status */}
            <div className='text-center'>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-500 ${isEditable
                  ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-2 border-emerald-200'
                  : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-2 border-blue-200'
                }`}>
                <motion.div
                  className={`w-2 h-2 rounded-full ${isEditable ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {isEditable ? '🟢 Ready' : '🔄 Solving...'}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default SudokuSolver