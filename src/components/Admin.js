import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar'
import { Link, Navigate } from 'react-router-dom'
import StudentForm from './StudentForm';
import { getDatabase,ref,child,set,get, onValue  } from "firebase/database";


const Admin = () => {
  
  const [player,setPlayer] = React.useState('Name');
  const [showAlert, setShowAlert] = useState(false);
  const [session,setSession] = React.useState(true);
  const [alertMessage, setAlertMessage] = useState('');

  const database = getDatabase();
  const getDataFromFirebase = () => {

    const dbRef = ref(database);
    get(child(dbRef, `players/${player}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setid(player);
          //TODO: Updated alert
          console.log("Player Exist");
        } else {
          setAlertMessage('Player does not exist');
          setShowAlert(true);
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSetAuction = () =>{
    const playerName = document.getElementById('playerInput').value;
    console.log(playerName);
    setPlayer(playerName);
    getDataFromFirebase();
  }

  const handleSetNull = () => {
    setid("null");
  }
  const closeAlert = () => {
    setShowAlert(false);
  };


  function setid(id) {
    const db = getDatabase();
    set(ref(db, 'current'), {
      id:id,
    });
  }
  
  function updateSession(session) {
    const db = getDatabase();
    set(ref(db, 'session'), {
      session:Boolean(session),
    });
  }
  return (
    <div>
      <Navbar balance={null}/>
    <div className="container">
      <h5 className="display-6">By Name:-</h5>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Player Name
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Dal BC..."
          aria-label="Username"
          aria-describedby="basic-addon1"
           id="playerInput"
        />
      </div>
     <div className="container">
     <button
        type="button"
        onClick={handleSetAuction}
        className="btn btn-primary"
      >
        Set Auction
      </button>
      <button
        type="button"
        onClick={handleSetNull}
        className="btn btn-danger float-end"
      >
        Set Null
      </button>
      
     </div>
     <hr className='my-4'/>
     <h5 className="display-5">Session</h5>
     <button className="btn btn-success float-start" onClick={() => updateSession(true)}>Start</button>
     <button className="btn btn-success float-end" onClick={() => updateSession(false)}>End</button>
     <hr className='my-4'/>
     <StudentForm/>
    </div>

    {showAlert && (
      <CustomAlert message={alertMessage} onClose={closeAlert} />
    )}
  </div>

  )
}


const CustomAlert = ({ message, onClose }) => {
  // Use state to track whether the alert should be visible
  const [visible, setVisible] = useState(true);

  // Automatically close the alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Call the onClose function to remove the alert from the UI
    }, 1000); // 3000 milliseconds (3 seconds)

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  // Render the alert only if it's visible
  return visible ? (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  ) : null;
};




export default Admin
