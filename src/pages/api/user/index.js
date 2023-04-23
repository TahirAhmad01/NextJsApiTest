import fs from "fs";
import userList from "./userList";

export default function Users(req, res) {
  if (req.method === "POST") {
    // Create a new user
    const getUser = req.body;
    const newUser = getUser;
    // console.log(getUser)
    userList.push(newUser);

    // write the data to a JSON file using fs module
    // fs.readFile("/src/pages/api/user/userList.json", (err, data) => {
    //   if (err) throw err;

    //   const jsonData = JSON.parse(data.toString());
    //   jsonData.name = "John Doe";

    fs.writeFile(
      "./src/pages/api/user/userList.json",
      JSON.stringify(userList),
      (err) => {
        if (err) throw err;
        console.log("File modified");
      }
    );
    // });

    res.status(200).json({ data: newUser });
  } else if (req.method === "GET") {
    // Get all users
    res.status(200).json(userList);
    res.setHeader("Content-Type", "application/json");
  }
}
