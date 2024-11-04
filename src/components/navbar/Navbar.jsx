import React,{useState} from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false);
  return (
    <div className='gpt3__navbar'>
      <div className='gpt3__navbar-links'>
        <div className='gtp3__navbar-links_logo'>
         <h1 className="gradient__text">QuestGenAI</h1>
        </div>
        <div className='gpt3__navbar-links_container'>
          <p><a href='#home'>Home</a></p>
          <p><a href='#wgpt3'>What is QuestGenAI?</a></p>
          <p><a href='#features'>Features</a></p>
        </div>
      </div>
      
      <div className='gpt3__navbar-menu'>
      {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
          {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#wgpt3">What is QuestGenAI?</a></p>
            <p><a href="#features">Features</a></p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
          <a href='/Multi_signIN/hh.html'>
        <button type="button">Sign Up</button>
        </a>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default Navbar