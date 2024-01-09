import { collection, where, query, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../Config'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';


export default function Main({User}) {
  return (
    <div style={{ position : "absolute", top:0, left : 0 , right : 0 , bottom : 0, display : "flex", flexDirection : "column"}}>
        <div>
            <Navbar UserID={User.UserID} UserDetail={User.UserDetail}/>
        </div>
        {
            <div style={{display : 'flex', flex : 1}}>
                <Outlet/>
            </div>
        }
    </div>
  )
}
