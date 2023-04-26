import './header.css'
import logo from '../../assets/starwarslogo.png'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
       <Link to='/'>
        <img className="logo" src={logo} alt="" />
        <p>CHARACTERS</p>
      </Link>
    </header>
  )
}
