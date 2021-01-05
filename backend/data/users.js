import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin User",
    email: "shport.natalia@gmail.com",
    password: bcrypt.hashSync("1151151153", 10),
    isAdmin: true
  },
  {
    name: "Ludmila",
    email: "ludmila@tsigelnik.com",
    password: bcrypt.hashSync("1151151153", 10)
  },
  {
    name: "Anatoly",
    email: "anatoly@tsigelnik.com",
    password: bcrypt.hashSync("1151151153", 10)
  },
  {
    name: "Igor",
    email: "igor@tsigelnik.com",
    password: bcrypt.hashSync("1151151153", 10)
  }
]

export default users
