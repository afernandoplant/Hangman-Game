const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle#wordCount=${wordCount}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error(`Unable to get puzzle`)
    }
}

const getCountry = async (code) => {
    const response = await fetch('//restcountries.eu/rest/v2/all')
    
        if (response === 200) {
            const data= await response.json()
            return data.find((country) => country.alpha2Code === code)
        } else {
            throw new Error("unable to fetch data")
        }

     
}

const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=8c0ee6f86c8ba2')
    
    if (response.status === 200) {
        return  response.json()
    } else {
        throw new Error("Invalid Location")
    }
    
}

const getCurrentCountry = async () => {
    const location = await getLocation()
    return getCountry(location.country)
}

export {getPuzzle as default}