import { Router } from "@stricjs/router"

const router = new Router()

// Get all query string
const slicer = /\?(.+)/;

router.static("GET", "/", () => new Response("hi"))

router.static(
	"POST",
	"/json",
	async (req) =>
		// Should confirm that body is an actual json
		new Response(JSON.stringify(await req.json()), {
			headers: {
				// Should add content-type headers to specified that response is json
				"content-type": "application/json"
			}
		})
)

router.dynamic("GET", "/id/:id", async (req) => {
	const name = new URL(req.url).searchParams.get("name")

	return new Response(`${req.params[1]} ${name}`, {
		headers: { "x-powered-by": "benchmark" }
	})
})

router.serve()