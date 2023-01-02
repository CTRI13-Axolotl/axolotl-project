import { Outlet } from "react-router";
import Root from './root.jsx'
export default function createPet (){


    return(
       <div>
        <div className="containerCP">
        <h1 id="cpheader">CreatePet</h1>
        <li id="warning">Warning : Axolotls can only be pink</li>
            <input className="petName" type="petName"  name='petName' placeholder='petName...'/>
            <label for="Pets">Choose a pet:</label>
             <select name="pets" id="pets">
                <option value="whiteCat">Tiger</option>
                <option value="blackCat">Cat</option>
                <option value="whiteDog">Axolotl</option>
                <option value="blackDog">Dog</option>
             </select>
             <label for="petcolor">Choose a pets color:</label>
             <select name="petsColor" id="petsColor">
                <option value="whiteCat">White</option>
                <option value="blackCat">Black</option>
                <option value="whiteDog">Pink</option>
                <option value="blackDog">Ruby</option>
             </select>

             <button className="confirm">Confirm</button>
             <div id="picsForCreate">
                <img className="goat" src="https://i.etsystatic.com/7829877/r/il/78280b/743003426/il_794xN.743003426_kg62.jpg" alt="goat" />
                <img className='geico' src="https://www.bellacor.com/dw/image/v2/BFKX_PRD/on/demandware.static/-/Sites-masterCatalog_bellacor/default/dwade4b922/images/large/599ARTAC0288RV2.jpg?sw=600" alt="geico" />
                <img className="family" src="https://i.etsystatic.com/7829877/r/il/4d214e/838807260/il_794xN.838807260_i8v4.jpg" alt="family" />
             </div>
        </div>
       </div>
    );
};