import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

class MenuItem {
  snapshot
  data

  constructor(snapshot) {
    this.snapshot = snapshot
    this.data = this.snapshot.data()
  }

  async update(...args) {
    return this.snapshot.ref.update(...args)
  }

  get id() {
    return this.snapshot.id
  }
}

export default MenuItem