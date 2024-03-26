import Cookies from 'js-cookie'

export const fetchWrapper = {
    get,
    post,
    deleteData,
    formDataSubmit,
}

const fetchMethods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
}

const errorStatus = [422, 500, 400, 401, 403, 404]

function getHeaders(headers = {}) {
    return {
        'Content-Type': 'application/json',
        authorization: Cookies.get('token') ? `Bearer ${Cookies.get('token')}` : '',
        ...headers,
    }
}

async function get(url, { headers }) {
    const responseData = await fetch(url, {
        method: fetchMethods.GET,
        headers: getHeaders(headers),
    })

    return handleResponse(responseData)
}

async function post(url, { body, headers }) {
    try {
        const responseData = await fetch(url, {
            method: fetchMethods.POST,
            headers: getHeaders(headers),
            body: JSON.stringify(body),
        })

        return handleResponse(responseData)
    } catch (error) {
        return {
            errors: 'Unknown Error',
        }
    }
}

async function deleteData(url, { headers }) {
    const responseData = await fetch(url, {
        method: fetchMethods.DELETE,
        headers: getHeaders(headers),
    })

    return handleResponse(responseData)
}

async function formDataSubmit(url, { body, headers }) {
    try {
        const responseData = await fetch(url, {
            method: fetchMethods.POST,
            headers: { authorization: Cookies.get('token') ? `Bearer ${Cookies.get('token')}` : '', ...headers },
            body: body,
        })

        return handleResponse(responseData)
    } catch (error) {
        return {
            errors: 'Unknown Error',
        }
    }
}

async function handleResponse(response) {
    const data = await response.json()

    if (errorStatus.includes(response.status)) {
        if (response.status === 401) return { errors: data?.data, code: response?.status }
        return data?.data.errors
            ? { errors: data.data.errors, code: response.status }
            : { errors: data?.message || 'Unknown Error' }
    }

    return { data: data, code: response.status }
}
