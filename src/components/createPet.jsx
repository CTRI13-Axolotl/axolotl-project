import react from 'react';
import axios from 'axios';
class createPet extends react.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      createPetUrl: 'http://localhost:3001/api/pets',
      profileUrl: 'http://localhost:9000/',
      options : ['black', 'blue','brown','calico','creme','gray','seal_point','tabby','white'],
      hidden : true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToUrl = this.navigateToUrl.bind(this);
    this.handleOption = this.handleOption.bind(this)
  }

  navigateToUrl(url) {
    window.location.assign(url);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit form', e);
    const name = e.target.form[0].value;
    // console.log('name in line 26: ', name, name==='')
    if (name==='') return this.setState({...this.state, hidden: false})
    const pet_type = `${e.target.form[1].value}_${e.target.form[2].value}`;
    // console.log('pet_type', pet_type);
    const player_id = window.sessionStorage.getItem('userId');
    // const player_id=57;
    const petCreaterObj = { name, player_id, pet_type };
    axios
      .post(this.state.createPetUrl, petCreaterObj)
      .then((response) => {
        const createdPet = response.data;
        console.log('createdPet: ', createdPet);
        return this.navigateToUrl(this.state.profileUrl);
      })
      .catch((error) => {
        console.error('There was an error!', error.response.data);
        //  this.setState({ ...this.state, invalid: '' });
      });
  }

  handleOption(e){
    e.preventDefault();
    const petType = e.target.value;
    if (petType === 'cat'){
      const catColors = ['black', 'blue','brown','calico','creme','gray','seal_point','tabby','white']
      this.setState({...this.state,options: catColors});
    }
    if(petType === 'axolotl'){
      const axColors = ['bronze','coral','green','pink','turquoise','violet','yellow']
      this.setState({...this.state,options: axColors});
    }
    // bronze
    // coral
    // green
    // pink
    // turquoise
    // violet
  }

  render() {
    const colorsArr = [];
    for (let i = 0; i < this.state.options.length; i++){
      colorsArr.push(<option value={`${this.state.options[i]}`}>{`${this.state.options[i]}`}</option>)
    }
    return (
      <div className="createPetDiv">
        <div className="containerCP">
          <h1 id="cpheader">CreatePet</h1>
          <div className={(this.state.hidden ? 'hidden invalidCreatePet' : 'invalidCreatePet')}>Invalid Input</div>
          <form className="createPetForm">
            <input
              className="petName"
              type="petName"
              name="petName"
              placeholder="Enter a pet name..."
            />
            <label htmlFor="Pets">Choose a pet:</label>
            <select name="pets" id="pets" onChange={this.handleOption}> 
              <option value="cat">Cat</option>  
              <option value="axolotl">Axolotl</option>
            </select>

            <label htmlFor="petcolor">Choose a color:</label>
            <select name="petsColor" id="petsColor">
               {colorsArr} 
            </select>

            <button className="confirm" onClick={this.handleSubmit}>
              Confirm
            </button>
            <div id="picsForCreate">
              <img
                className="goat"
                src="https://i.etsystatic.com/7829877/r/il/78280b/743003426/il_794xN.743003426_kg62.jpg"
                alt="goat"
              />
              <img
                className="geico"
                src="https://www.bellacor.com/dw/image/v2/BFKX_PRD/on/demandware.static/-/Sites-masterCatalog_bellacor/default/dwade4b922/images/large/599ARTAC0288RV2.jpg?sw=600"
                alt="geico"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default createPet;
