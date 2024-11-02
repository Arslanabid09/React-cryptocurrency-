import React from 'react'
import { Header } from './Components'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Main from './Pages/Main'
import SinlgePage from './Pages/SinlgePage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main/> }>
        <Route path='' element={<Home />} />
        <Route path='/coin/:id' element={<SinlgePage/>} />
      </Route>
    </Routes>
  )
}

export default App