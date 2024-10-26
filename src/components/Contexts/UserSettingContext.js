import { createContext, useEffect, useState } from "react";
import { fetchUserSettings } from "../../supabaseFetcher";

const UserSettingContext = createContext()

const UserSettingContextProvider = ({ children }) => {
    const [userSettings, setUserSettings] = useState({})

    const updateUserSettings = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) { return }
        const doUpdate = async () => {
            const response = await fetchUserSettings(user.uid, { displayName: user.displayName })
            setUserSettings(response[0])
        }
        doUpdate()
    }

    useEffect(() => {
        updateUserSettings()
    }, [])

    return (
        <UserSettingContext.Provider value={{ updateUserSettings: updateUserSettings, userSettings: userSettings }}>
            {children}
        </UserSettingContext.Provider>
    )
}

export { UserSettingContext, UserSettingContextProvider }