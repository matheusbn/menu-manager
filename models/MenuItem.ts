import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

class MenuItem {
  private snapshot
  data

  constructor(snapshot) {
    this.snapshot = snapshot
    this.data = this.snapshot.data()
  }

  get id() {
    return this.snapshot.id
  }

  async update(...args) {
    return this.snapshot.ref.update(...args)
  }
}

export default MenuItem
