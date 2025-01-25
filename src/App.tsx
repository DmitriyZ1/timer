import './App.css';
import Menu from './components/Menu'
import Timer from './components/Timer'
import React from 'react';
import { MyContext } from './context'


function App() {
  const [timer, setTimer] = React.useState<boolean>(false)
  const [menu, setMenu] = React.useState<boolean>(true)

  return (
    <MyContext.Provider value={{setTimer, setMenu}} >
      <div className="App">
        {menu && <Menu />}
        {timer && <Timer />}
      </div>
    </MyContext.Provider>

    );
}

  export default App;
