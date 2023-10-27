// const adModel = {
//   "title": {
//     "type": "String"
//   },
//   "linkURL": {
//     "type": "String"
//   },
//   "tall": {
//     "type": "String"
//   },
//   "square": {
//     "type": "String"
//   },
//   "banner": {
//     "type": "String"
//   }
// }

// const ad = {
//   "title": "Moon Miner",
//   "linkURL": "boisecodeworks.com",
//   "tall": "https://codeworks.blob.core.windows.net/public/assets/ads/moonminertall.gif",
//   "square": "https://codeworks.blob.core.windows.net/public/assets/ads/moonminersquare.gif",
//   "banner": "https://codeworks.blob.core.windows.net/public/assets/ads/moonminerbanner.gif"
// }

export class Ad {
  constructor(data) {
    this.title = data.title
    this.linkUrl = data.linkUrl
    this.tall = data.tall
    this.square = data.square
    this.banner = data.banner
  }

}