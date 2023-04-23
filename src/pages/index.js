import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userList, setUserList] = useState([]);
  const [userVal, setUser] = useState("");

  useEffect(() => {
    axios.get("/api/user").then((response) => {
      console.log(response.data);
      setUserList(response.data);
    });
  }, []);

  const submitUser = (e) => {
    console.log(userVal);
    e.preventDefault();
    axios
      .post(
        "/api/user",
        { user: userVal },
        {
          "content-type": "application/json",
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserList([...userList, response.data]);
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
          <div key={idx}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}
