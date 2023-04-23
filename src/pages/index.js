import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userList, setUserList] = useState([]);
  const [userVal, setUser] = useState("");
  const LastUser = userList.slice(-1)[0];

  function getUser() {
    axios.get("/api/user").then((response) => {
      // console.log(response.data);
      setUserList(response.data);
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  const submitUser = (e) => {
    // console.log(userVal);fsdf
    e.preventDefault();
    axios
      .post(
        "/api/user",
        { id: LastUser?.id + 1, name: userVal },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        getUser();
      });
  };

  return (
    <div className={``}>
      <div>
        <form onSubmit={submitUser}>
          <input
            type="text"
            value={userVal}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            className="border border-2"
          />
        </form>
      </div>
      <div>
        {userList?.map((user, idx) => (
          <div key={idx}>{user?.name}</div>
        ))}
      </div>
    </div>
  );
}
