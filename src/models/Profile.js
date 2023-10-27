// const profile = {
//   "_id": "652958305bfd1dca2f0579a0",
//   "subs": [
//     "auth0|6529582f05506d01ecc209be"
//   ],
//   "email": "trashpanda99@gmail.com",
//   "name": "Trash Panda",
//   "picture": "https://images.unsplash.com/photo-1615812214207-34e3be6812df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//   "bio": "Eatin Trash",
//   "coverImg": "https://images.unsplash.com/photo-1553058296-61093581de13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
//   "github": "",
//   "linkedin": "",
//   "resume": "",
//   "class": "",
//   "graduated": true,
//   "createdAt": "2023-10-13T14:46:14.407Z",
//   "updatedAt": "2023-10-13T14:47:51.275Z",
//   "__v": 0,
//   "id": "652958305bfd1dca2f0579a0"
// }

export class Profile {
  constructor(data) {
    this.id = data.id || data._id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.class = data.class
    this.graduated = data.graduated
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}