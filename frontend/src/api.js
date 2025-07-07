const BASE_URL = 'http://localhost:8080'

export const getAllEmployees = async (search='', page='1', limit='5') => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`

    try {
        const Options = {
            method: 'GET',
            'Content-Type': 'application/json'
        }
        const result = await fetch(url, Options)
        const data = await result.json()
        return data;
    } catch (error) {
        return error;
    }
}

export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employees`

    try {
        const formData = new FormData();
        for(const key in empObj){
            formData.append(key, empObj[key])
        }

        const Options = {
            method: 'POST',
            'Content-Type': 'application/json',
            body: formData
        }
        const result = await fetch(url, Options)
        const data = await result.json()
        return data;
    } catch (error) {
        return error;
    }
}