import React, { createContext, useState } from "react";

export const UserMailContext = createContext()

const UserMailProvider = ({children}) => {
  const [email, setEmail] = useState("")

  return(
    <UserMailContext.Provider value={{email, setEmail}}>{children}</UserMailContext.Provider>
  )

}

export default UserMailProvider