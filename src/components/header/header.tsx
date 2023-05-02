import './header.css'
import logo from '../../assets/starwarslogo.png'
import { Link } from 'react-router-dom'
import { FilteredCharactersContext } from '../../context/filtered-characters-context'
import { useContext } from 'react'

export const Header = () => {
  const { onFilterChange, setSelectedGender } = useContext(FilteredCharactersContext)

  return (
    <header>
       <Link onClick={() => {
          onFilterChange("off")
          setSelectedGender("")
       }} to='/'>
        <img className="logo" src={logo} alt="" />
        <p>CHARACTERS</p>
      </Link>
    </header>
  )
}
