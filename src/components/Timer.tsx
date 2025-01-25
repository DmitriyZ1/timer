import "./Timer.css"
import { useState, useRef } from "react"

interface TimeTipe {
    hour: number
    min: number
    sec: number
}


export default function Timer(){
    
    const [time, setTime] = useState<TimeTipe>({hour: 0, min: 0, sec: 10})
    const [start, setStart] = useState<boolean>(false)
    const [errorNumbers, setErrorNumbers] = useState<boolean>(false)
    const timeRef = useRef<any>()

    const proxyValid = (n: number):string => {
        const num = String(n)
        return num.length === 1 ? `0${num}` : num
    }
    
    const proxyValueValid = (e: React.FormEvent<HTMLInputElement>, hms: string) => {
        let n = +e.currentTarget.value
        setErrorNumbers(false)
        if(String(n).length > 2) return
        if(isNaN(n)) return
        if(hms === "h"){
            setTime({...time, hour: n})
        }else if (hms === "m"){
            setTime({...time, min: n})
        }else if(hms === "s"){
            setTime({...time, sec: n})
        }
    }

    const zvonok = () => {
        const audio = new Audio('zv.mp3');
        audio.play();
    }
    
    const stopTime = () => {
        if(typeof timeRef.current == "number"){
            setStart(false)
            clearInterval(timeRef.current)
        }
    }

    const startTime = () => {
        let sec = time.sec, min = time.min, hour = time.hour 
        if(min > 59 || sec > 59) {
            setErrorNumbers(true)
            return
        }
        setStart(true)
        timeRef.current = setInterval(() => {
            if(sec <= 0 && min <= 0 && hour <= 0){
                stopTime()
                zvonok()
                return
            } else {
                sec--
                if(sec < 0) {
                    sec = 59
                    min--
                }
                if(min < 0){
                    min = 59
                    hour--
                }
                setTime({hour: hour, min: min, sec: sec})
            }
        }, 1000)
    }

    return (
        <div className="timer">      
            <div className="timer-content">
                <div className="timer-items">
                    {!start && <>
                        <input className="inp box" type="text" value={time.hour} onInput={(e) => {proxyValueValid(e, "h")}}/>
                        <div className="perineum">:</div>
                        <input className="inp box" type="text" value={time.min} onInput={(e) => {proxyValueValid(e, "m")}}/>
                        <div className="perineum">:</div>
                        <input className="inp box" type="text" value={time.sec} onInput={(e) => {proxyValueValid(e, "s")}}/>
                        </>
                    }
                    {errorNumbers && <div className="err-num" onClick={() => {setErrorNumbers(false)}}> 
                        <div className="err-content">
                            <div className="err-text">Сикунды и минуты должны быть не более 59</div>
                        </div>
                    </div> }
                    
                    {start && <>
                        <div className="t-hour box">{proxyValid(time.hour)}</div>
                        <div className="perineum">:</div>
                        <div className="t-min box">{proxyValid(time.min)}</div>
                        <div className="perineum">:</div>
                        <div className="t-sec box">{proxyValid(time.sec)}</div>
                    </>}
                </div>
                <div className="block-button">
                    <button className="but" disabled={start} onClick={() => {startTime()}}>Пуск</button>
                    <button className="but" onClick={() => {stopTime()}}>Стоп</button>
                </div>
            </div>
        </div>
    )
}