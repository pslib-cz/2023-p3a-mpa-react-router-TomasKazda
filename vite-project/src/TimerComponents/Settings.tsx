import styles from './Settings.module.css';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHourglassHalf, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
//import { useNavigate, Link } from 'react-router-dom';

export type SettingsProps = {
    setTestTime: (time: number) => void;
    setThresholdType: (type: 'minutes' | 'percentage') => void;
    setThresholdValue: (value: number) => void;
    setIsRunning: () => void;
    isRunning: boolean;
    setTotalTime: (time: number) => void;
    thresholdValue: number;
}

export const Settings:React.FC<SettingsProps> = ({setTestTime, setThresholdType, setThresholdValue, setIsRunning, isRunning, setTotalTime, thresholdValue}) => {
    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);
    const thresholdRef = useRef<HTMLInputElement>(null);
    //const navigate = useNavigate();

    const [thresholdType, setLocalThresholdType] = useState<'minutes' | 'percentage'>('minutes');

    function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let time: number = 0;
        
        if(hourRef.current) {
            time += parseInt(hourRef.current?.value) * 3600;
        }
        if(minuteRef.current) {
            time += parseInt(minuteRef.current?.value) * 60;
        }
        if(secondRef.current) {
            time += parseInt(secondRef.current?.value);
        }

        if(time >= 5 && time <= 6*3600){
          setTestTime(time);
          setTotalTime(time);
          if(thresholdRef.current) 
            setThresholdValue(parseInt(thresholdRef.current.value));
          setThresholdType(thresholdType);
        }
        else{
          alert("Zadejte čas v rozmezí 5s - 6h");
        }
    }

    return (
      <div className={styles['settings']}>
        <h1>Settings</h1>

        <form onSubmit={handleOnSubmit}>
          <div className={styles['inputs']}>
            <label>Hodiny
              <input ref={hourRef} defaultValue={0} type='number' />
            </label>
            <label>Minuty
              <input ref={minuteRef} defaultValue={0} type='number' />
            </label>
            <label>Sekundy
              <input ref={secondRef} defaultValue={0} type='number' />
            </label>
          </div>

          <div className={styles['radio']}>
            <label>Minuty
              <input type="radio" className={styles['radio-input']} name="thresholdType" value="minutes" checked={thresholdType === 'minutes'} onChange={() => setLocalThresholdType('minutes')}/>
            </label>
            <label>Procenta
              <input className={styles['radio-input']} type="radio" name="thresholdType" value="percentage" checked={thresholdType === 'percentage'} onChange={() => setLocalThresholdType('percentage')}/>
            </label>
            <label>Hranice
              <input ref={thresholdRef} defaultValue={thresholdValue} type='number' min="1" max={thresholdType === 'percentage' ? 100 : undefined} />
            </label>
          </div>

          <button type='submit'><FontAwesomeIcon icon={faCheck} /> Set!</button>

          <button type="button" onClick={() => {
            setIsRunning(); 
            if (!isRunning) {
              //navigate('/');
            }
          }}>
            {isRunning ? <FontAwesomeIcon icon={faStop} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>


        </form>
        <button onClick={() => {
          setTestTime(300);
          setTotalTime(300);
        }}><FontAwesomeIcon icon={faHourglassHalf} /> pětiminutovka</button>

        <button onClick={() => {
          setTestTime(2400);
          setTotalTime(2400);
        }}><FontAwesomeIcon icon={faHourglassHalf} /> hodinový test</button>

        {/* <Link to="/" className="settings__button">{" "}
          <FontAwesomeIcon icon={faGear} /> Back
        </Link> */}
      </div>
    )
  }
  
  export default Settings;