import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db, googleProvider } from '../Config.js'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'


const styles = {
    wrapper: {
      height : "100vh",
      width: "100%",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url(\'/src/components/bg.jpeg\')',  // Adjust the path accordingly
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    root: {
      '--color': '#52004A',
      '--fade': '#9344bd96',
      '--req_words': 'rgb(206, 202, 202)',
      '--imp_buttons': '#3d65f7',
      '--imp_links': '#3660f9'
    },
    container: {
      backgroundColor: '#36393f',
      borderRadius: '8px',
      width: '30%',
      position: 'relative',
      textAlign: 'center',
      boxShadow: '0px 0px',
      zIndex: '50',
      height: '66vh', 
    },
    welcome: {
      color: '#FFFFFF',
      marginTop: '15px'
    },
    greet: {
      color: '#7e7e7e',
      // marginTop: '10px'
    },
    loginButton: {
      backgroundColor: '#3d65f7',
      color: '#FFFFFF',
      padding: '10px 20px',
      width: '80%',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '0px'
    },
    googleButton: {
      backgroundColor: '#3d65f7',
      color: '#FFFFFF',
      padding: '10px 20px',
      width: '80%',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      fontWeight: 'bold',
      fontSize: 'medium',
      alignItems: 'center',
      height: '55%',
      boxSizing: 'border-box',
      justifyContent: 'space-around',
      paddingBottom: '5px'
    },
    input: {
      padding: '5px',
      fontSize: '16px',
      color: 'black',
      boxSizing: 'border-box',
      width: '80%',
      borderRadius: '3px',
      transition: 'background-color 0.2s ease-in-out',
      height: '30px',
      backgroundColor: 'white',
      border: '#36393F',
      position: 'relative'
    },
    forgot: {
      color: '#3660f9',
      fontSize: '13px',
      cursor: 'pointer',
      marginTop: '-5px',
      marginBottom: '5px'
    },
    outsideForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    signUp: {
      fontSize: '13px',
      marginTop: '7px',
      display: 'flex',
      color: '#767f91'
    },
    label: {
      fontSize: '18px',
      color:'white',
    }
  };

export default function Auth() {
    const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const User = async (email) => {
        const result = await getDocs(
            query(collection(db, 'Users'),where ("user_email", "==", email))
        )
        if(result.docs[0].id){
            return [result.docs[0].id, result.docs[0].data()]
        }
        return [];
    }
    const SignInWithGoogle = async () => {
       const result = await signInWithPopup(auth, googleProvider);
       const UserDetail  = await User(result.user.email);
       if(UserDetail.length){
            const user = { UserID : UserDetail[0] , UserDetail : UserDetail[1]};
            localStorage.setItem('User', JSON.stringify(user))
            navigate('/')
       } 
       else{
        navigate('/Register')
       }
    }
    const SignInWithEmailPass = async (e) => {
        e.preventDefault();
        const result = await signInWithEmailAndPassword(auth, email, password);
        const UserDetail  = await User(result.user.email);
        if(UserDetail.length){
            const user = { UserID : UserDetail[0] , UserDetail : UserDetail[1]};
            localStorage.setItem('User', JSON.stringify(user))
            navigate('/')
        } 
        else{
         navigate('/Register')
        }
    }
   return (
    <div className="wrapper" style={styles.wrapper}>
      <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome</h1>
      <p style={styles.greet}>We are so excited to see you!!</p>
      <form style={styles.form} onSubmit={SignInWithEmailPass}>
        <label htmlFor="username" style={styles.label}>Email</label>
        <input type="email" name="username" id="username" placeholder="xyz@abc.com" style={styles.input} onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password" style={{ ...styles.label, marginTop: '5px' }} >Password</label>
        <input type="password" name="password" id="password" style={styles.input} onChange={(e) => setPassword(e.target.value)}/>
        <Link to="/forgot">
          <p style={styles.forgot}>Forgot your password?</p>
        </Link>

        <button type='submit' className="login-button" style={styles.loginButton}>Log in</button>
      </form>
      <div style={styles.outsideForm}>
        <button id="googleBtn" className="google-button" style={styles.googleButton} onClick={SignInWithGoogle}>Sign up with Google</button>
        <div style={styles.signUp}>
          <p>Need an account?</p>
          <Link to="/Register">
            <p style={{ marginLeft: '3px', color: styles.root['--imp_links'], cursor: 'pointer' }}>Register</p>
          </Link>
        </div>
      </div>
    </div>
    </div>
   ) 
}
