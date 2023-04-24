import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ todo }) {
  console.log(todo);
  const [userList, setUserList] = useState([]);
  const [userVal, setUser] = useState("");
  const LastUser = userList.slice(-1)[0];

  function getUser() {
    // console.log(data);

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

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://example.com"; // https://v2ds.netlify.app

  return base_url;
};

export async function getServerSideProps(ctx) {
  const res = await fetch(
    process.env.NODE_ENV === "development"
      ? `http://${ctx.req?.headers.host}/api/user`
      : `https://${ctx.req?.headers.host}/api/user`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { todo: data }, // will be passed to the page component as props
  };
}
