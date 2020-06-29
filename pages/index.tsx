import React from 'react'
import Home from './home'
import Signin from './signin'
import { useSelector } from 'react-redux'

const Index = () => {
  const user = useSelector(state => state.user)

  if (user) return <Home />

  return <Signin />
}

// export async function getServerSideProps({ req, res }) {
//   // console.log(req?.headers)
//   // console.log(req?.headers?.cookie)
// }

export default Index
