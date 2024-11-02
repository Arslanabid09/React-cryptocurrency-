import React from 'react'
import { Header } from '../Components'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        </>
  )
}

export default Main