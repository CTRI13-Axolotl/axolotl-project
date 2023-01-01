import { Outlet } from 'react-router';
// import {handleSubmit} from './login';

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <div className="petContainer"></div>
      <div className="stats">
        <div className="eating">
          <div className="stat-name">Eat</div>
          <div className="stat-bar">
            <div className="stat-per" per="20%" id="eatStat"></div>
          </div>
        </div>

        <div className="pooping">
          <div className="stat-name">Poop</div>
          <div className="stat-bar">
            <div className="stat-per" per="35%" id="poopStat"></div>
          </div>
        </div>

        <div className="playing">
          <div className="stat-name">Play</div>
          <div className="stat-bar">
            <div className="stat-per" per="50%" id="playStat"></div>
          </div>
        </div>
      </div>
      <div className="imageRow">
        <img
          id="picOne"
          src="https://i.pinimg.com/originals/75/c8/cc/75c8cca0f911f1a9c4a2326291131a2f.png"
          alt="eat"
        />
        <img
          id="picTwo"
          src="https://img.freepik.com/premium-vector/cute-corgi-pooping-toilet-illustration-dog-mascot-cartoon-character-animal-isolated_138676-1050.jpg?w=2000"
          alt="poop"
        />
        <img
          id="picThree"
          src="https://freedesignfile.com/upload/2021/08/Animal-cartoon-playing-basketball-vector.jpg"
          alt="play"
        />
      </div>
    </div>
  );
}
