# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Chatify - Chat Application Project

## Introduction
**Project Name:** Chatify  
**Version:** 1.0  
**Authors:** 
- Akshat Patidar
- Pratyush Khengle
- Shreshth Rai
- Kashish Kunj  
**Date:** 5/1/2024 to 9/1/2024

This documentation provides an overview of the Chatify project, a feature-rich chat application developed by four students at IIT Madras. Chatify boasts a user-friendly interface and incorporates various functionalities, including authorization, forgot password, live chatting, group chatting, profile picture and username customization, emotes in texting, and a responsive UI.

# ChatApp Deployment and Usage Guide

## Deployment Steps:

1. **Clone the Repository:**
   - Clone the repository to your local machine using the following command:
     ```bash
     git clone [repository-url]
     ```

2. **Firebase Account Setup:**
   - Create an account on [Firebase](https://firebase.google.com/) and start a new project.

3. **Import Firebase Configuration:**
   - In the project, create a `config.js` file and import the Firebase configuration object.
     ```javascript
     // config.js
     export const firebaseConfig = {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_AUTH_DOMAIN",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_STORAGE_BUCKET",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID"
     };
     ```

4. **Start the Environment:**
   - Start the development environment using the following command:
     ```bash
     npm run dev
     ```

## Usage Steps:

1. **Login:**
   - Open the app, and you will be directed to the login page.

2. **Register:**
   - Click on the "Register" button.
   - Fill in all the required details and click on "Sign Up".
   - You will be redirected to the submit page.

3. **Google Sign-In:**
   - Alternatively, you can sign in using your Google account.

4. **Forgot Password:**
   - If you forget your password, click on "Forget Password".
   - Enter your email, and a link will be sent to your email to reset your password.

5. **Dashboard:**
   - Once logged in, you'll land on the dashboard.
   - Choose a contact from the left panel to start a chat.
   - Click on the "Group" option at the top to select and chat in a group.

6. **Group Management:**
   - In groups, find "Add" and "View" buttons at the top-right in the message bar.
     - "Add" to add new members to the group.
     - "View" to see all the members in the group.

7. **Add Contacts and Groups:**
   - At the bottom of the left panel, find a plus sign.
     - In "Contacts," add new contacts.
     - In "Groups," create a new group using the plus sign.

8. **Profile Editing:**
   - On the top-left corner, find your profile avatar.
   - Click on it to edit your profile, change avatar, and access special features through a lottery-based system.

9. **Logout:**
   - Beside the profile, find a door-like icon.
   - Click on it to log out.


## Technology Stack
### Frontend (React):
- User Interface designed using Adobe Illustrator and Canva
- React JS for flexible and interactive frontend
- Custom backgrounds created using Illustrator and Canva

### Backend (JavaScript):
- Server-side scripting with JavaScript
- Streamlined flow: Login → Register/Forgot Password → Login → HomePage → Personal Contacts/Groups → Read Chats → Add Contacts/Change Profile Picture/Create New Group

### Database (Google Firebase):
- Firebase utilized for authorization and live database
- Convenient integration for seamless user experience

## Design Choices
### User Interface:
- Custom background theme using Adobe Illustrator and Canva
- 100+ avatars available for user profile pictures
- Flexibility and responsiveness achieved through React JS

### Authorization and Database:
- Firebase chosen for its convenience in handling user authentication and real-time data storage
- Streamlined flow designed for a seamless user experience

## Features Implementation
### Feature 1: Authorization
- **Description:** User authentication and authorization using Google Firebase
- **Implementation Process:** Integrated Firebase authentication methods for secure login and registration
- **Challenges Faced:** Ensured robust security measures and error handling

### Feature 2: Live Chatting
- **Description:** Real-time chatting functionality for one-on-one conversations
- **Implementation Process:** Utilized Firebase real-time database for efficient data synchronization
- **Challenges Faced:** Ensured optimal performance and responsiveness during live interactions

### Feature 3: Group Chatting
- **Description:** Enable users to create and participate in group chats
- **Implementation Process:** Leveraged Firebase for group data management and communication
- **Challenges Faced:** Maintained data integrity and optimized group chat performance

### Feature 4: Profile Customization
- **Description:** Users can change profile pictures and usernames
- **Implementation Process:** Integrated options for profile picture selection and username customization
- **Challenges Faced:** Ensured a smooth user experience with quick updates

## Conclusion
Chatify, crafted by the collaborative efforts of students from IIT Madras, presents a chat application with a compelling interface and a range of features. By leveraging technologies like React for frontend flexibility and Firebase for authentication and real-time data handling, the app delivers a smooth and engaging user experience. The carefully considered design choices and streamlined user flow contribute to the success of Chatify. Future updates may include additional features and optimizations for enhanced performance.

