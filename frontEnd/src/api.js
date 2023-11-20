export async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    console.log(body)
    return body
  }