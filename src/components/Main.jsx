import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Homepage from './Homepage.jsx'


function Main(){
return(
 <Routes>
                <Route path='/' element={<Homepage />} />
  </Routes>
)
}

export default Main