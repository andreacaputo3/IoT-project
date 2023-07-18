import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Homepage from './Homepage.jsx'
import Transport from './TransportView.jsx'


function Main(){
return(
 <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/Transport' element={<Transport />} />
  </Routes>
)
}

export default Main