import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import './Readings.css'
import {Line} from 'react-chartjs-2';
import {ExportToExcel} from './ExportToExcel'
function Readings({match}) {
    const name=match.params.id
    const [vinr,setvinr] =useState(0)
    const [viny,setviny] =useState(0)
    const [vinb,setvinb] =useState(0)
    const [voutr,setvoutr] =useState(0)
    const [vouty,setvouty] =useState(0)
    const [voutb,setvoutb] =useState(0)
    const [iinr,setiinr] =useState(0)
    const [iiny,setiiny] =useState(0)
    const [iinb,setiinb] =useState(0)
    const [time,settime] = useState([])
    const [list_vinr,setlist_vinr] =useState([])
    const [list_vinb,setlist_vinb] =useState([])
    const [list_viny,setlist_viny] =useState([])
    const [list_voutr,setlist_voutr] =useState([])
    const [list_vouty,setlist_vouty] =useState([])
    const [list_voutb,setlist_voutb] =useState([])
    const [list_iinr,setlist_iinr] =useState([])
    const [list_iiny,setlist_iiny] =useState([])
    const [list_iinb,setlist_iinb] =useState([])
    const [csvdata,setcsvdata] = useState([])
    const [newMsg, setNewMsg] = useState('');
    const ws = useRef(null);
    useEffect(() => {
      ws.current = new WebSocket(`ws://192.168.0.105:8000/ws/chat/${name}/`);
      // ws.current.onopen = e => console.log('Chat socket opened');
      ws.current.onerror = e => console.log(e);
      ws.current.onmessage = e => {
        const msg = JSON.parse(e.data);
        console.log(msg)
        if (msg.type === 'chat_message') {setNewMsg(msg.data.message);}
      };
      let l_vinr=[]
      let l_vinb =[]
      let l_viny=[]
      let l_voutr=[]
      let l_vouty=[]
      let l_voutb =[]
      let l_iinr=[]
      let l_iiny=[]
      let l_iinb =[]
      let t=[]
      axios.get(`http://192.168.0.105:80/api/get_readings/${name}/`).then(res=>{
        setiinb(res.data.readings[res.data.readings.length-1].current_b_in)
        setiinr(res.data.readings[res.data.readings.length-1].current_r_in)
        setiiny(res.data.readings[res.data.readings.length-1].current_y_in)
        setvinb(res.data.readings[res.data.readings.length-1].voltage_b_in)
        setvinr(res.data.readings[res.data.readings.length-1].voltage_r_in)
        setviny(res.data.readings[res.data.readings.length-1].voltage_y_in)
        setvoutb(res.data.readings[res.data.readings.length-1].voltage_b_out)
        setvouty(res.data.readings[res.data.readings.length-1].voltage_y_out)
        setvoutr(res.data.readings[res.data.readings.length-1].voltage_r_out)
        for (const i of res.data.readings){
            
              l_vinr.push(i.voltage_r_in)
              l_vinb.push(i.voltage_b_in)
              l_viny.push(i.voltage_y_in)
              l_voutr.push(i.voltage_r_out)
              l_vouty.push(i.voltage_y_out)
              l_voutb.push(i.voltage_b_out)
              l_iinr.push(i.current_r_in)
              l_iiny.push(i.current_y_in)
              l_iinb.push(i.current_b_in)
              t.push(i.date)
        }
        setcsvdata(res.data.readings)
        setlist_iinb(l_iinb)
        setlist_iinr(l_iinr)
        setlist_iiny(l_iiny)
        setlist_vinb(l_vinb)
        setlist_viny(l_viny)
        setlist_vinr(l_vinr)
        setlist_voutb(l_voutb)
        setlist_voutr(l_voutr)
        setlist_vouty(l_vouty)
        settime(t)
      })


  

    }, [name,newMsg])



    return (
            <div className="container">
                <h1>Here are the latest values</h1>
                <ExportToExcel apiData={csvdata} fileName={name} />
                <div className="row">

                    <div className="col-lg-4 col-sm-3">
                        <div className="card-box bg-blue">
                            <div className="inner">
                                <h3> Voltage in : {vinb}</h3>
                                <h3> Voltage out : {voutb}</h3>
                                <h3> Current in : {iinb}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-3">
                        <div className="card-box bg-red">
                            <div className="inner">
                                <h3> Voltage in : {vinr}</h3>
                                <h3> Voltage out : {voutr}</h3>
                                <h3> Current in : {iinr}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-3">
                        <div className="card-box bg-orange">
                            <div className="inner">
                                <h3> Voltage in : {viny}</h3>
                                <h3> Voltage out : {vouty}</h3>
                                <h3> Current in : {iiny}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>Readings from the beginning</h1>
                <div className="row">
                  <div className="col-12"  style={{marginTop:"2rem"}}>
                                    {<Line
                data={{
                  labels: time,
                  datasets: [
                    {
                      label:"Voltage in R",
                      data: list_vinr,
                      fill: false,
                      borderColor: "#FF073A"
                    },
                    {
                        label:"Voltage in Y",
                        data: list_viny,
                        fill: false,
                        borderColor: "#FFE459"
                    },
                    {
                        label:"Voltage in B",
                        data: list_vinb,
                        fill: false,
                        borderColor: "#0F52BA"
                    },
                  ]
                }}

                options={{
                    
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                
              />}
                  </div>
                  <div className="col-12"  style={{marginTop:"2rem"}}>
                  {<Line
                data={{
                  labels: time,
                  datasets: [
                    {
                      label:"Voltage Out R",
                      data: list_voutr,
                      fill: false,
                      borderColor: "#FF073A"
                    },
                    {
                        label:"Voltage Out Y",
                        data: list_vouty,
                        fill: false,
                        borderColor: "#FFE459"
                    },
                    {
                        label:"Voltage Out B",
                        data: list_voutb,
                        fill: false,
                        borderColor: "#0F52BA"
                    },
                  ]
                }}

                options={{
                    
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                
              />}
                  </div>
<div className="col-12" style={{marginTop:"2rem"}}>
                              {<Line
                data={{
                  labels: time,
                  datasets: [
                    {
                      label:"Current in R",
                      data: list_iinr,
                      fill: false,
                      borderColor: "#FF073A"
                    },
                    {
                        label:"Current in Y",
                        data: list_iiny,
                        fill: false,
                        borderColor: "#FFE459"
                    },
                    {
                        label:"Current in B",
                        data: list_iinb,
                        fill: false,
                        borderColor: "#0F52BA"
                    },
                  ]
                }}

                options={{
                    
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                
              />}</div>

                </div>

            </div>

    )
}

export default Readings
