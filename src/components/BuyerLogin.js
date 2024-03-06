import React, { useState } from 'react';
import { getDatabase ,ref,get,child} from 'firebase/database';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './UserContext';
import { useEffect } from 'react';

const BuyerLogin = () => {
  const [buyerName, setBuyerName] = useState('');
  const [isPartner, setIsPartner] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [buyerData,setBuyerData] = useState([]);
  const [buyerList,setBuyerList] = useState([]);
  const db = getDatabase();
  const {user,setUser} = useUser('Fake');
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

//   const getBuyersData = ()=>{
//     const buyRef = ref(db);
//     get(child(buyRef,"buyers"))
//     .then((snapshot)=>{
//       const data = snapshot.val();
//       return data;
//     })
//   }
//   const handleSubmit = () => {
//     setBuyerData(getBuyersData());
//     console.log(buyerData)
// if(buyerData){
//   buyerData.map((data)=>console.log(data))
// }

//     // const buyRef = ref(db);
//     // console.log(`buyers/${buyerName}`);
//     // get(child(buyRef,`buyers/${buyerName}`))
//     //   .then((snapshot) => {
//     //     const data = snapshot.val();
//     //     console.log(snapshot);
//     //     if(data){
//     //         console.log("before setUser",user);
//     //         setUser(buyerName);
//     //         console.log("after setUser",user);
//     //     }
//     //   })
//     //   .catch((error) => {

//     //     console.error(error);
//     //   });
//   };
const getBuyersData = async () => {
  const buyRef = ref(db);
  try {
    const snapshot = await get(child(buyRef, "buyers"));
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error("Error fetching buyers data:", error);
    return null;
  }
};

const handleSubmit = async () => {
  setUser(buyerName)
};
useEffect(() => {
  const fetchData = async () => {
    try {
      const buyerData = await getBuyersData();
      console.log(buyerData);
      if (buyerData) {
        setBuyerList(Object.keys(buyerData));
        console.log(buyerList);
      }
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  fetchData(); // Call the function inside useEffect

  // Specify dependencies to avoid infinite loop
}, []); // Empty dependency array ensures useEffect runs only once on mount

  useEffect(() => {
    console.log("User has been updated:", user);
    if(user !== 'Fake'){
        navigator('/');
    }
  }, [user,navigator,]); 
  return (
    <div className="container">
      <p className="display-6 text-md-lg text-sm mt-5">
        {!isPartner ? "What's your name?" : "What's your and partner's name?"}
      </p>

      <div className="input-group mb-3 mt-3 d-flex justify-content-center align-items-center">
      <select
        className="form-select"
        aria-label="Select Buyer"
        value={buyerName}
        onChange={handleInputChange}
      >
        <option value='Fake'>Select Buyer</option>
        {buyerList.map((buyer, index) => (
          <option key={index} value={buyer}>
            {buyer}
          </option>
        ))}
      </select>
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
