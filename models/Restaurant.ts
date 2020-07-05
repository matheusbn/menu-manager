import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

const proxyHandler = {
  get: function (target, prop, receiver) {
    if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver)

    return target.snapshot.data()[prop]
  },
}

class Restaurant {
  snapshot
  data

  constructor(snapshot) {
    this.snapshot = snapshot
    this.data = this.snapshot.data()
  }

  async update(...args) {
    return this.snapshot.ref.update(...args)
  }

  async updatePicture(file: File) {
    const storageRef = firebase.storage().ref()

    const extension = file.name.split('.').pop()
    const pictureRef = storageRef.child(
      `${this.snapshot.id}/cover.${extension}`
    )

    const picSnapshot = await pictureRef.put(file)
    const url = await picSnapshot.ref.getDownloadURL()
    this.update({ coverPicture: url })

    return url
  }

  async getMenuItems() {
    const querySnapshot = await this.snapshot.ref.collection('items').get()

    return querySnapshot.docs.map(snapshot => ({
      id: snapshot.id,
      ...snapshot.data(),
    }))
  }

  static async fromUser(userId: string): Promise<Restaurant | null> {
    const restaurants = await firebase.firestore().collection('restaurants')

    const result = await restaurants.where('ownerId', '==', userId).get()

    if (result.empty) return null

    const restaurantSnapshot = result.docs[0]
    return new Restaurant(restaurantSnapshot)
  }
}

export default Restaurant
