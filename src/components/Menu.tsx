import './Menu.css'
import { useRef } from 'react'
import { MyContext } from '../context'
import React from 'react'

interface MenuTypes {
    name: string,
    link: string
}

const m: MenuTypes[] = [
    { name: 'timer', link: '1' },
    { name: 'help', link: '2' },
    { name: 'exit', link: '3' },
]

export default function Menu() {
    const object:any = React.useContext(MyContext);
    const {setTimer, setMenu} = object; 
    const run = useRef<HTMLDivElement | null>(null)

    const fly = (e:any) => {
        let p =  e.target?.offsetTop
        let div = run.current
        if(div){
            div.style.transform = `translateY(${p}px)`
        }
    }

    const routingMenu = (nameItem: string) => {
        switch (nameItem) {
            case "timer":
                setTimer(true)
                setMenu(false)
                break
            case "help":
               
                break
            case "exit":
                
                break
        }
    }

    return (
        <div className="menu">
            <div className="runner" ref={run}>
                <div className="arrow"> </div>
            </div>
            <ul className='list-menu'>
                {m.map((item, index ) => (
                    <li className='item-menu'  onMouseOver={fly} key={index} onClick={() => {routingMenu(item.name)}}>{item.name}</li>
                ))}
            </ul>
        </div>

    )
}