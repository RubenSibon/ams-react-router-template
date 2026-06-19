import type { RenderToPipeableStreamOptions } from "react-dom/server";
import * as server from "react-dom/server";
import type { EntryContext } from "react-router";
import * as reactRouter from "react-router";

import { PassThrough, Readable } from "node:stream";

// Custom entry server for SPA mode (ssr: false in react-router.config.ts).
// React Router runs this at build time to generate index.html. It is not used
// at runtime — the app is served as a static SPA via `pnpm start`.
export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const readyOption: keyof RenderToPipeableStreamOptions = "onAllReady";

    const { pipe, abort } = server.renderToPipeableStream(
      <reactRouter.ServerRouter context={routerContext} url={request.url} />,
      {
        [readyOption]() {
          const body = new PassThrough();
          const stream = Readable.toWeb(body) as ReadableStream<Uint8Array>;

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(error);
        },
      },
    );

    setTimeout(abort, 5_000);
  });
}
