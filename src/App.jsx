
import './App.css'
import Header from './components/Header'
import MenuCard from './components/MenuCard'
import AddMenu from './components/AddMenu'
import { initialMenus } from "./data"
import { useState, useEffect } from 'react'

function loadMenus() {
  const saved = localStorage.getItem('lunch-menus')
  return saved ? JSON.parse(saved) : initialMenus
}

function App() {
  const [menus, setMenus] = useState(loadMenus)

  const total = menus.reduce((sum, m) => sum + m.votes, 0)
  const topVotes = Math.max(...menus.map((m) => m.votes))
  useEffect(() => {

    document.title = `${total}표 투표중`

  }, [total])


  useEffect(() => {

    localStorage.setItem('lunch-menus', JSON.stringify(menus))
  }, [menus])

  const vote = (id) => {
    setMenus(menus.map((m) => (m.id === id ? { ...m, votes: m.votes + 1 } : m)))
  }
  const reset = () => {
    setMenus(menus.map((m) => ({ ...m, votes: 0 })))
  }

  const addMenu = (name) => {
    setMenus([...menus, {
      id: Date.now(),
      emoji: '👾',
      name: name,
      votes: 0
    }])
  }

  return (
    <div className='app'>
      <Header title={'🐾 좋아하는 동물 투표하기'} />
      <AddMenu onAdd={addMenu} />
      <ul className="menus">
        {menus.map((m) => (
          <MenuCard
            key={m.id}
            {...m}
            onVote={() => vote(m.id)}
            isTop={m.votes === topVotes && topVotes > 0}
          />
        ))}
      </ul>


      <footer className='footer'>
        <button type='button' className='reset' onClick={reset}> 투표 초기화</button>
      </footer>
    </div>
  )
}

export default App
