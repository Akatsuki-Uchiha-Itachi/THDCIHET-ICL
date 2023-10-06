import React, { useState } from 'react';
import { getDatabase ,ref,get,child} from 'firebase/database';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './UserContext';
import { useEffect } from 'react';

const BuyerLogin = () => {
  const [buyerName, setBuyerName] = useState('');
  const [isPartner, setIsPartner] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const db = getDatabase();
  const {user,setUser} = useUser();
  const navigator = useNavigate();
  const handleInputChange = (event) => {
    setBuyerName(event.target.value);
  };

  const handlePartnerNameChange = (event) => {
    setPartnerName(event.target.value);
  };

  const handlePartnerClick = () => {
    setIsPartner(true);
  };

  const handleSubmit = () => {
    const buyRef = ref(db);
    console.log(`buyers/${buyerName}`);
    get(child(buyRef,`buyers/${buyerName}`))
      .then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if(data){
            console.log("before setUser",user);
            setUser(buyerName);
            console.log("after setUser",user);
        }
      })
      .catch((error) => {

        console.error(error);
      });
  };
  useEffect(() => {
    document.body.style.backgroundImage = `url(C:/Users/raviarya2/Downloads/Icl.jpeg)`;
      document.body.style.backgroundPosition = 'center'; // Center the background image horizontally and vertically
    document.body.style.backgroundSize = 'cover';
    console.log("User has been updated:", user);
    if(user !== 'Fake'){
        navigator('/');
    }
  }, [user,navigator]); 
  return (
    <div className="container">
      <p className="display-6 text-md-lg text-sm mt-5">
        {!isPartner ? "What's your name?" : "What's your and partner's name?"}
      </p>

      <div className="input-group mb-3 mt-3 d-flex justify-content-center align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your Name..."
          aria-label="Username"
          value={buyerName}
          onChange={handleInputChange}
        />
        {isPartner ? (
          <>
            <span className="input-group-text">+</span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Partner's Name..."
              value={partnerName}
              onChange={handlePartnerNameChange}
            />
          </>
        ) : null}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Next
        </button>
      </div>

      {!isPartner && (
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={handlePartnerClick}
          >
            I have a partner!
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerLogin;
