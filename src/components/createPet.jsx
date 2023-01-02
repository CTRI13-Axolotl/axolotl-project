
import react from 'react';
import axios from 'axios';
import { useEffect } from 'react';
 class createPet extends react.Component {
   constructor (props,context) {
      super(props,context);
      this.state = {
         createPetUrl: 'http://localhost:3001/api/pets',
         profileUrl: 'http://localhost:9000/'
      }
   this.handleSubmit = this.handleSubmit.bind(this);
   this.navigateToUrl = this.navigateToUrl.bind(this);
   }
    
   navigateToUrl(url) {
      window.location.assign(url);
    };
    
   handleSubmit(e) {
      e.preventDefault();
      console.log('submit form', e);
    const name= e.target.form[0].value;
    const pet_type = `${e.target.form[1].value}_${e.target.form[2].value}`;
    console.log('pet_type', pet_type);
   //  const player_id = window.sessionStorage.getItem('userId', userId);
   const player_id=57;
    const petCreaterObj = { name, player_id, pet_type};
    axios
        .post(this.state.createPetUrl, petCreaterObj)
        .then((response) => {
          const createdPet = response.data;
          console.log('createdPet: ', createdPet)
          return this.navigateToUrl(this.state.profileUrl);
        })
        .catch((error) => {
          console.error('There was an error!', error.response.data);
         //  this.setState({ ...this.state, invalid: '' });
        });
   };
  
render() {
    return(
       <div>
        <div className="containerCP">
        <h1 id="cpheader">CreatePet</h1>
          <form>
            <input className="petName" type="petName"  name='petName' placeholder='petName...'/>
            <label htmlFor="Pets">Choose a pet:</label>
             <select name="pets" id="pets">
                <option value="tiger">Tiger</option> //petType = tiger_white
                <option value="cat">Cat</option>
                <option value="axolotl">Axolotl</option>
                <option value="dog">Dog</option>
             </select>
             <label htmlFor="petcolor">Choose a pets color:</label>
             <select name="petsColor" id="petsColor">
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="pink">Pink</option>
                <option value="ruby">Ruby</option>
             </select>

             <button className="confirm"
             onClick={this.handleSubmit}>Confirm</button>
             <div id="picsForCreate">
                <img className="goat" src="https://i.etsystatic.com/7829877/r/il/78280b/743003426/il_794xN.743003426_kg62.jpg" alt="goat" />
                <img className='geico' src="https://www.bellacor.com/dw/image/v2/BFKX_PRD/on/demandware.static/-/Sites-masterCatalog_bellacor/default/dwade4b922/images/large/599ARTAC0288RV2.jpg?sw=600" alt="geico" />
                <img className="family" src="https://i.etsystatic.com/7829877/r/il/4d214e/838807260/il_794xN.838807260_i8v4.jpg" alt="family" />
             </div>
             </form>
        </div>
       </div>
    );
   };
 };
export default createPet