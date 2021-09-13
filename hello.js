class Endpoint {
    constructor(url) {
        this._url = url
    }

    default() {
        const user = (this._url.searchParams.get('name') ?? 'world')
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")

        return { status: true, data: { message: `hello, ${user}!` } }
    }
}

const router = (urlObject) => {
    const { pathname } = urlObject
    const endpoint = new Endpoint(urlObject)
    const pathMap = {
        "/": endpoint.default,
        "/hello": endpoint.default
    }

    if (pathMap[pathname]) {
        return pathMap[pathname]()
    } else {
        return {
            status: false,
            error: {
                message: "page not found"
            }
        }
    }
}

function handleRequest(request) {
    const url = new URL(request.url);
    return new Response(router(url), { headers: { "content-type": "application/json" }});
}

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})