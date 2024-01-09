import React, { useState } from 'react';
import { useEffect } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config';
import UpdateUserHook from '../Hooks/useUpdateUser';

const Profile = ({UserID ,UserDetail}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState();
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  const styles = {
    body: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : "#f4f4fa",
    },
    card: {
      display : "flex",
      flexDirection : "column",
      justifyContent :  "center",
      alignItems : "center",
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      width: '270px',
      height: '250px',
      // margin: 'auto',
      textAlign: 'center',
      fontFamily: 'arial',
      borderRadius: '8px',
      padding : "1rem"
    },
    profilePic: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: backgroundColor, // Use the state variable
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px', // Increase the font size
      color: '#ffffff', // Set the text color to white
    },
    user: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
    },
    materialIcons: {
      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    },
    editUsername: {
      cursor: 'pointer',
      color: 'rgb(0, 0, 0)',
    },
    username: {
      marginLeft: '10px',
    },
    title: {
      color: 'grey',
      fontSize: '0.8rem',
    },
    svgIcon: {
      fill: 'currentColor',
      height: '24px',
      width: '24px',
    },
    inputBox: {
      width: '80%',
      padding: '8px',
      margin: '8px 0 2px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '14px',
    },
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveUsername = async () => {
    await updateDoc(
      doc(collection(db,  "Users"), UserID),
      {
        user_name : newUsername
      }
    );
    setBackgroundColor(getRandomColor());
    setIsEditing(false);
    await UpdateUserHook(UserID);
    window.location.reload()
  };

 

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <img src = {UserDetail.user_avatar} style={styles.profilePic}/>
        <div style={styles.user}>
            {isEditing ? (
              <input
                type="text"
                className="username"
                style={styles.inputBox}
                placeholder={"Username"}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            ) : (
              <p className="username" style={styles.username}>
                { UserDetail.user_name}
              </p>
            )}
            <span
              style={styles.editUsername}
              onClick={isEditing ? saveUsername : toggleEdit}
            >
              {isEditing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  style={styles.svgIcon}
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  style={styles.svgIcon}
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              )}
            </span>
          </div>
        <p style={styles.title}>{UserDetail.user_email}</p>
        <p>Welcome to Vibe</p>
      </div>
    </div>
  );
};

export default Profile;
