import firebase from 'firebase/app'
import 'firebase/storage'

/**
 * Uploads a file to firebase storage on the received path
 *
 * @param {string} path - full path including the file
 * @param {File} file
 *
 * @returns {Promise<string>} The download url of the file
 */
export async function upload(path: string, file: File) {
  const storageRef = firebase.storage().ref()
  const fileRef = storageRef.child(path)

  const fileSnapshot = await fileRef.put(file)
  const url = await fileSnapshot.ref.getDownloadURL()

  return url
}
