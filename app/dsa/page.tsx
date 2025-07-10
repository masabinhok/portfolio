import NQueens from '@/components/dsa/NQueens'
import RatInAMaze from '@/components/dsa/RatInAMaze'
import SudokuSolver from '@/components/dsa/SudokuSolver'
import React from 'react'

const DsaVisualisation = () => {
  return (
    <main className='p-5 min-h-screen flex flex-col items-center justify-center'>
      <SudokuSolver />
      <NQueens />
      <RatInAMaze />
    </main>
  )
}

export default DsaVisualisation