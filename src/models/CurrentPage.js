// const currentPage = {
//   "page": 2,
//   "totalPages": 21,
//   "newer": "https://bcw-sandbox.herokuapp.com/api/posts?page=1",
//   "older": "https://bcw-sandbox.herokuapp.com/api/posts?page=3",
//   "posts": ['20 items']
// }

export class CurrentPage {
  constructor(data) {
    this.page = data.page || 1
    this.totalPages = data.totalPages || 1
    this.prevPage = data.newer || null
    this.nextPage = data.older || null
  }
}