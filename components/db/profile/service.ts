import { onSnapshot } from "firebase/firestore"
import { useEffect } from "react"
import { useAuth } from "../../auth"
import { useAppDispatch } from "../../hooks"
import { createService } from "../../service"
import { profileRef } from "./profile"
import { profileChanged } from "./redux"
import { Profile } from "./types"

export const { Provider } = createService(() => {
  const uid = useAuth().user?.uid
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (uid) {
      const unsubscribe = onSnapshot(profileRef(uid), snapshot => {
        dispatch(profileChanged(snapshot.data() as Profile))
      })
      return () => {
        unsubscribe()
        dispatch(profileChanged())
      }
    }
  }, [dispatch, uid])
})
