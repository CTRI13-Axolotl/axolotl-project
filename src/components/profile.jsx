import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pixi from '../pixi/pixi';
import YoutubeEmbed from './rickroll.jsx';

function Profile() {
  //setting up state with all the petData
  const [petName, setPetName] = useState('');
  const [health, setHealth] = useState(0);
  const [userId, setUserId] = useState('');
  const [birthday, setBirthday] = useState('');
  const [petType, setPetType] = useState('');
  const [petId, setPetId] = useState('');
  const [numPoop, setNumPoop] = useState(0);
  const [xDate, setXDate] = useState({
    xDate: '',
    imageRowClass: 'imageRow',
    abandonClass: 'hidden',
  });
  const [rick, setRick] = useState(false);

  //tooSoon will toggle a hidden class. if eat clean or play buttons
  //are pressed within 1 hr, the text "too soon to <action here>" will appear
  const [tooSoon, setTooSoon] = useState('tooSoon hidden');
  //this defines the desired action (eat, clean, play) during the click event
  const [action, setAction] = useState('');

  useEffect(() => {
    //userId is in session storage, getItem will get the value in session storage
    const newUserId = window.sessionStorage.getItem('userId');
    // //update state with the current userId
    setUserId(newUserId);
    //when making a get request to axios, the data you want to send needs to be
    //in an object with the property params
    const userObj = { params: { player_id: newUserId } };

    //get request to get all current pet data
    axios
      .get('http://localhost:3001/api/pets/', userObj)
      .then((res) => {
        //store all petData in state
        const petData = res.data[0];
        setPetName(petData.name);
        if (petData.name === 'Rick Astley') {
          setRick(true);
        }
        const birthdate = new Date(petData.birthdate);
        setBirthday(birthdate.toLocaleDateString());
        setNumPoop(petData.num_poop);
        setHealth(petData.health);
        setPetType(petData.pet_type);
        setPetId(petData._id);
        if (petData.x_date !== null) {
          setXDate({
            xDate: petData.x_date,
            imageRowClass: 'imageRow hidden',
            abandonClass: 'abandon',
          });
        }
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  }, [petName, health, userId, petId, numPoop]);

  //click handler when user wants to eat, clean, or play with pet
  const performAction = (e) => {
    const action = e.target.alt;
    const url = `http://localhost:3001/api/pets/${action}`;
    axios
      .put(url, { _id: petId })
      .then((res) => {
        //check if health is a property in the response
        if (Object.hasOwn(res.data, 'health')) {
          //update health in state with new health data
          setHealth(res.data.health);
        } else {
          //otherwise, update state with the desired action (eat, clean, play)
          setAction(action);
          //unhide the div with the text 'Too soon to <insert action here>'
          //by changing the class stored in state
          setTooSoon('tooSoon');
        }
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  };

  // console.log(petType);

  const handleNewPet = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3001/api/pets/update', { petId: petId })
      .then((res) => {
        console.log(res.data);
        return window.location.assign('http://localhost:9000/createPet');
      })
      .catch((error) => {
        console.log('ERROR: ', error);
        return window.location.assign('http://localhost:9000/login');
      });
  };

  const fixPetType = () => {
    if (petType.includes('_')) {
      const newPetType = petType.split('_')[0];
      return newPetType;
    } else {
      return petType;
    }
  };
  // console.log('petType in line 98: ', petType);
  return (
    <div id="profileDiv">
      <div id="leftColumn">
        <h1 id="profileHeader">Profile</h1>
        <h3 id="petName" className="petData">
          Name: {petName}
        </h3>
        <h3 id="birthdate" className="petData">
          Birthday: {birthday}
        </h3>
        <h3 id="birthdate" className="petData">
          Type: {fixPetType()}
        </h3>
        <div className="stats">
          <div className="eating">
            <div className="stat-name">Health: {health}%</div>
            <div className="stat-bar">
              <div
                className="stat-per"
                per="20%"
                id="healthStat"
                style={{ maxWidth: `${health}%` }}
              ></div>
            </div>
            <div className={tooSoon}>Too soon to {action}</div>
          </div>
        </div>
      </div>
      <div id="rightColumn">
        <div className={rick ? 'video-responsive' : 'hidden'}>
          <YoutubeEmbed embedId="dQw4w9WgXcQ" />
        </div>
        <div className="petContainer">
          <Pixi petType={petType} numPoop={numPoop} xDate={xDate} />
        </div>
        <div className={xDate.abandonClass}>
          <div className="abandonText">{petName} has abandoned you</div>
          <button onClick={handleNewPet} className="newPetButton">
            Create New Pet
          </button>
        </div>
        <div className={xDate.imageRowClass}>
          <div id="EatButton" className="actionButtonDiv">
            Feed
            <img
              className="actionButtons"
              id="picOne"
              src="https://i.pinimg.com/originals/75/c8/cc/75c8cca0f911f1a9c4a2326291131a2f.png"
              alt="feed"
              onClick={performAction}
            />
          </div>
          <div id="cleanButton" className="actionButtonDiv">
            Clean
            <img
              className="actionButtons"
              id="picTwo"
              src="https://img.freepik.com/premium-vector/cute-corgi-pooping-toilet-illustration-dog-mascot-cartoon-character-animal-isolated_138676-1050.jpg?w=2000"
              alt="clean"
              onClick={performAction}
            />
          </div>
          <div id="playButton" className="actionButtonDiv">
            Play
            <img
              className="actionButtons"
              id="picThree"
              src="https://freedesignfile.com/upload/2021/08/Animal-cartoon-playing-basketball-vector.jpg"
              alt="play"
              onClick={performAction}
            />
          </div>
        </div>
      </div>
      <div id="invisibleColumn"></div>
    </div>
  );
}

export default Profile;
