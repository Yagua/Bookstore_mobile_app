import AsyncStorage from '@react-native-async-storage/async-storage'

export const trimText = (title, lenght) => {
    if (title.length > lenght) {
        let newTitle = title.substring(0, lenght);
        return `${newTitle}...`;
    }
    return title;
}

export const generateModalBody = (data) => {
    let result = ""
    data.map(([key, value], index) => {
        let title = `[${key.toUpperCase()}]`
        let body = typeof value !== "string" ? value.join(" ") : value
        result += `${title}\n${body}`
        if (index !== data.length - 1) result += "\n\n"
    })
    return result
}

export const updateStoredData = async (storedItem, newData) => {
    try {
        let retrivedData = await AsyncStorage.getItem(storedItem)
        if(!retrivedData) return
        let data = await JSON.parse(retrivedData)
        let updated = { ...data, ...newData }
        await AsyncStorage.setItem(storedItem, JSON.stringify(updated))
    } catch (error) {
        console.error(error)
    }
}
