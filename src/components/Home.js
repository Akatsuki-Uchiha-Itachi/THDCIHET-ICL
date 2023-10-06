import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { auth } from './auth';
import { Navbar } from './Navbar'
import { signOut } from 'firebase/auth';
import { getDatabase, ref, child, set, get, onValue, off } from "firebase/database";
import { useUser } from './UserContext';



const Home = () => {

  const [buyer,setBuyer] = React.useState(false);
  const[pref,setPref]  = React.useState('null');
  const [buyerName,setBuyerName] = React.useState('Fake');
  const [hbid,setHBid] = React.useState('');
  const [bet,setBet] = React.useState(0);
  const [session,setSession] = React.useState(true);
  const [balance,setBalance] = React.useState(0);
  const [player, setPlayer] = React.useState('null');
  const [isLoading, setIsLoading] = React.useState(true);
  const [name, setName] = React.useState('Name');
  const [year, setYear] = React.useState('X');
  const [branch, setBranch] = React.useState('Y');
  const [imgurl, setImgurl] = React.useState('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80');
  const [value, setValue] = React.useState(0);
  const userName = JSON.parse(localStorage.getItem("userName"))
  const photoURL = JSON.parse(localStorage.getItem("photoURL"))
  const database = getDatabase();
  const Navigate = useNavigate();
  const user = useUser();
  function writeUserData(userId, name, year, branch, imageUrl, value,pref) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      name: name,
      year: year,
      branch: branch,
      imgurl: imageUrl,
      value: value,
      pref: pref,
    });
  }
  
  const getDataFromFirebase = () => {
    const dbRef = ref(database);

    get(child(dbRef, `players/${player}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setName(data.name);
          setYear(data.year);
          setBranch(data.branch);
          setImgurl(data.imgurl);
          setValue(data.value);
          setPref(data.pref);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSignOut = () => {
    localStorage.clear();
    signOut(auth).then(() => {
      Navigate('/login')
      window.location.reload();
    })
  }

  const handleBet = (e) =>{
    /*{const buyRef = ref(database,`buyers/${buyerName}`);
    get(child(buyRef,'balance'))
      .then((snapshot) => {
        const currentBalance = snapshot.val();
        if (currentBalance !== 0) {
          const updatedBalance = currentBalance - e;
          updateBalance(updatedBalance);
          handleValue(e);
        }
      })
      .catch((error) => {
        console.error(error);
      });}*/
      if(e > 0 && e < 10000 && session){
        if(balance >= e){
          handleValue(e);
          updateHBid();
        }
        else{
          console.error('Insufficient balance');
        }
      }
      else{
        console.error('Invalid bet amount')
      }
      
  };

  function updateHBid() {
    const db = getDatabase();
    set(ref(db, 'hbid'), {
      bidder:String(buyerName),
    });
  }


  
  const handleValue = (e) =>{
    
    const playRef = ref(database,`players/${player}`);
    get(child(playRef,'value'))
      .then((ss) => {
        const currentValue = ss.val();
        const updatedValue = currentValue + e;
        updateValue(updatedValue);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  function updateValue(newValue){
    
    const db = getDatabase();
    const playerRef = ref(db,`players/${player}`);
    set(playerRef,{
      name:name,
      branch:branch,
      year:year,
      imgurl:imgurl,
      value: newValue,
    })
      .then(()=>{
        setValue(newValue);
        console.log('Player Value updated sucessfully');
      })
      .catch((error)=>{
        console.error('Error updating value:',error);
      })
  }
  function updateBalance(bid) {
    if(!session && hbid !== '' && hbid !='Fake')
    {const db = getDatabase();
    const buyerRef = ref(db, `buyers/${hbid}`);
    const newBalance = balance - bid;
    console.log(newBalance);
    // Update the balance field
    set(buyerRef, {
      balance: newBalance,
    })
      .then(() => {
        console.log('Balance updated successfully');
      })
      .catch((error) => {
        console.error('Error updating balance:', error);
      });}
      
  }
  
  useEffect(() => {
    console.log("buyerName: ",buyerName);
    console.log("user: ",user);
    
    const currRef = ref(database,'current');
    const listener = onValue(currRef,(snapshot) => {
      const id = snapshot.val().id;
      console.log("id",id);
      if(id !== 'null'){
        setIsLoading(false);
      }
      if(id == 'null'){
        setIsLoading(true);
      }
      setPlayer(id);
      console.log("player",player)
      getDataFromFirebase();
      document.body.style.backgroundImage = `url(${imgurl})`;
      document.body.style.backgroundPosition = 'center'; // Center the background image horizontally and vertically
    document.body.style.backgroundSize = 'cover';
    },[setPlayer])
  });

  useEffect(() => {
   console.log("name:",name);
    if(buyerName === 'Fake' && user.user === 'Fake'){
      Navigate('/manager')
    }
     
    console.log(buyerName);
    console.log("user.user",user.user);
    setBuyerName(user.user);
    const buyRef = ref(database,`buyers/${buyerName}`);
    
    const balanceListener = onValue(buyRef,(snapshot)=>{
      const data = snapshot.val();
      setBalance(data.balance);
    })
    
  });

 useEffect(()=>{
  const valRef = ref(database,`players/${player}/value`);
  const valueListener = onValue(valRef,(ss)=>{
    const data = ss.val();
    setValue(data);
  })
 },[value]);

 useEffect(()=>{
  const sRef = ref(database,`session/session`);
  const sListener = onValue(sRef,(ss) => {
    const data = ss.val();
    setSession(Boolean(data));
  })
  if(!session){
      updateBalance(value);
      
  }
 },[session]);

//  useEffect(()=>{
//   if(sessio)
//   {const hRef = ref(database,`hbid/bidder`);
//   const hListener = onValue(hRef,(ss) => {
//     const data = ss.val();
//     setHBid(data);
    
//   })}

//  },[hbid]);

//  useEffect(() => {
//   if(!session && hbid !== '' && hbid !=='Fake'){
//       updateHBid('');
//   }
//  },[hbid])

  
  return (
    <div>
      <Navbar balance={balance}/>
      {/* <div>
            Welcome
               
            {
                userName
            }
           <img src={photoURL} alt= "profile"/>
            <button style={{"marginLeft" : "20px"}} 
            onClick={handleSignOut}>
                Logout
            </button>
        </div> */}

      {isLoading ? (<h5 className="display-5 text-center mt-3">Waiting For Admin...</h5>):(
      <div className="container">
        <div className="row row-cols-1">
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="card mb-5" style={{ width: '18rem' }}>
              <img
                src={imgurl}
                className="card-img-top img-fluid"
                style={{width: '100%', height: '200px',objectFit:'cover'}}
                alt="..."
              />
              <div className="card-body">

                <h5 className="card-title">{name}</h5>

                <p className="card-text">{year} Year {branch} Branch</p>
                <h5 className="card-title">Bet:- {value}</h5>
                <h5 className="card-title">Manager:- {buyerName}</h5>
                <h5 className="card-title">{pref}</h5>
                
                {/* <div className="container text-center">
                  <div className="row row-cols-1 gy-1">
                    <a onClick={()=>handleBet(100)}  className="btn btn-dark">
                      100
                    </a>
                    <a onClick={()=>handleBet(500)}  className="btn btn-secondary">
                      500
                    </a>
                    <a onClick={()=>handleBet(1000)}  className="btn btn-warning">
                      1000
                    </a>
                    <a onClick={()=>handleBet(2000)}  className="btn btn-success">
                      2000
                    </a>
                    <a onClick={()=>handleBet(3000)}  className="btn btn-primary">
                      3000
                    </a>
                    <a onClick={()=>handleBet(5000)}  className="btn btn-danger">
                      5000
                    </a>
                    <div className="input-group">
                      <input type="number" className="form-control" onChange={(e) =>setBet(e.target.value)} placeholder='Your Bid...'/>
                      <button className="btn btn-dark" onClick={() => handleBet(Number(bet))}>Bid</button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>)}



    </div>
  )
}

export default Home
