
import './App.css'
import Header from './components/Header'
import MenuCard from './components/MenuCard'
import AddMenu from './components/AddMenu'
import { initialMenus } from "./data"
import { useState } from 'react'

function App() {

  const [menus, setMenus] = useState(initialMenus)

  const addMenu = (name) =>{
    setMenus([...menus,{
      id:Date.now(),
      emoji:'👾',
      name:name,
      votes:0
    }])
  }

  return (
    <div className='app'>
      <Header title={'🐾 좋아하는 동물 투표하기'} />
      <AddMenu onAdd={addMenu}/>
      <ul className="menus">
        {menus.map((m) => (
          <MenuCard key={m.id} {...m} />

        ))}
      </ul>


      <footer className='footer'>
        <button type='button' className='reset'> 투표 초기화</button>
      </footer>
    </div>
  )
}

export default App
