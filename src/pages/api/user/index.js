import userList from "./userList";

export default function Users(req, res) {
  if (req.method === "POST") {
    // Create a new user
    const getUser = req.body;
    const newUser = {
      id: 1,
      name: getUser.user,
    };
    // console.log(getUser)
    userList.push(newUser);
    res.status(201).json(newUser);
  } else if (req.method === "GET") {
    // Get all users
    res.status(200).json(userList);
  }
}
