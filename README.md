After watching [Theo's](https://www.youtube.com/@t3dotgg) [video](https://www.youtube.com/watch?v=Cifkb-ZVps4&t=1286s) on different ways HTML gets to your browser, I thought it would be interesting for my own learning to build a website that renders HTML using a couple of different methods.

This website renders HTML using a few different methods:

- Pure Server Side Rendering
    - HTML is fully rendered on the server and sent to the client. No JavaScript is needed.
- Multi Page Application
    - Each page is rendered on the server and sent to the client on request, requiring full page reloads.
- Single Page Application
    - An initial HTML shell is sent, and JavaScript manages content and routing dynamically.
- Server Side Rendering with Client Hydration
    - The server renders HTML, then JavaScript hydrates it for interactivity and optional prefetching.

An nginx server is used to proxy requests to the different methods from the landing page.

The website can be accessed here: https://the-web-tech-showcase.vercel.app/