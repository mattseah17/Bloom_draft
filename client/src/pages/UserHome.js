import React, { useEffect, useState, useContext } from "react";
import ReactContext from "../context/reactcontext";
import PlantArray from "../components/PlantArray";

const Userhome = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [bio, setBio] = useState(bio);
  const reactCtx = useContext(ReactContext);

  useEffect(() => {
    async function getUserInfo() {
      const url = `http://localhost:5002/user/${reactCtx.id}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${reactCtx.access}`,
        },
      };
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        setUserPlants(data.posts);
        setBio(data.bio)
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserInfo();
  }, [reactCtx.id, reactCtx.access]);

  return (
    <>
      <div>
        <div>
          <h1>My Dashboard</h1>
        </div>
        <div>
          <h2>About Me</h2>
          <p>{bio}</p>
        </div>
        <h2>Contact me at {reactCtx.loginEmail}</h2>
        <br />
        {userPlants.length === 0 ? (
          <h2>You have not added any plants</h2>
        ) : (
          <div>
            <PlantArray data={userPlants} />
          </div>
        )}
      </div>
    </>
  );
};

export default Userhome;
