function handleRequest(request) {
    const url = new URL(request.url);
    const user = url.searchParams.get('name') ?? 'world'
    const html = `<html><body><h1>Hello, ${user}!</h1></body></html>`
    return new Response(html, { headers: { "content-type": "text/html; charset=UTF-8" }});
}

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})