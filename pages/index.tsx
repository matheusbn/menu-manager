import React from 'react'
import Home from 'components/pages/Home'
import Signin from 'components/pages/Signin'
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
