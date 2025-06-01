import  { useContext, } from 'react'
import { AppContext } from './Context/AppContext';

export default function Home() {

  const {user} = useContext(AppContext);

  return (
    <div>
      {
        user ? (
          <div>Logged in as {user.name}</div>
        ) : (
          <div>Not Logged In</div>
        )
      }
    </div>
  )
}
