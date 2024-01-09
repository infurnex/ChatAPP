import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, db } from '../Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// ... other imports

// import backgroundImage from '../Components/tatti.jpeg';  // Update the import statement


export default function Register() {
  const navigate = useNavigate()
  const [userName,setUserName]  = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isHovered, setIsHovered] = useState(false);
  const styles = {
    root: {
      '--color': '#52004A',
      '--fade': '#91d3de',
    },
    body: {
      fontFamily: 'Arial, sans-serif',
      background: 'radial-gradient(circle at 35% 63%, var(--color), var(--fade))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: '0',
      backgroundImage: 'url(\'/src/components/bg.jpeg\')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    container: {
      backgroundColor: '#36393F',
      borderRadius: '8px',
      width: '400px',
      textAlign: 'center',
      padding: '20px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    account: {
      color: '#FFFFFF',
      fontSize: '24px',
      marginBottom: '10px',
    },
    signUpButton: {
      backgroundColor: isHovered ? 'lightblue' : '#3d65f7',
      // backgroundColor: '#3d65f7',
      color: '#FFFFFF',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      margin: '10px 0 5px',
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      color: 'black',
      borderRadius: '5px',
      border:'none',
      borderBottom:'1px white', 
      width: '80%',
      marginBottom: '15px',
      boxShadow: 'none',
      backgroundColor: 'white',
      border: '#36393F',
    },
  };
    const randomNumber = () => {
      return Math.floor(Math.random() * 50) + 1;
    }
    const handleRegisterUser = async (e) => {
      e.preventDefault();
        const result = await createUserWithEmailAndPassword(auth, email, password);
        console.log(result);
        await addDoc(collection(db, "Users"), {
          "user_email" :email,
          "user_name" : userName,
          "user_avatar" : `https://avatar.iran.liara.run/public/${randomNumber()}`,
          "connections" : [],
          "groups" : []
        })
      navigate('/Login')
    }
  return (
    <div style={styles.body} className='tatti-background'>
      <div style={styles.container}>
        <h1 style={styles.account}>Create an account</h1>
        <form onSubmit={async (e) => { await handleRegisterUser(e)}} className='signup-form' style={styles.form}>
          <label htmlFor="username" style={styles.label}>User Name</label>
          <input 
            type="username" 
            id="username" 
            value={userName} 
            placeholder="Username" 
            required style={styles.input} 
            onChange={(e)=> setUserName(e.target.value)} />

          <label htmlFor="email" style={styles.label}>Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            placeholder="xyz@abc.com" 
            required style={styles.input} 
            onChange={(e)=> setEmail(e.target.value)} />

          <label htmlFor="password" style={styles.label}>Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            required style={styles.input} 
            onChange={(e)=> setPassword(e.target.value)}  />

          <button
            type='submit'
            className="Sign-up-button"
            style={styles.signUpButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
    // <div>
    //   <div>
    //     <input placeholder='name' onChange={(e) => setUserName(e.target.value)}></input>
    //     <input placeholder='email' onChange={(e) => setUserEmail(e.target.value)}></input>
    //     <input placeholder='password' onChange={(e) => setUserPassword(e.target.value)}></input>
    //   </div>
    //   <button onClick={async () => await handleRegisterUser()}>
    //     Submit
    //   </button>
    // </div>
  )
}
