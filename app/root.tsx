import type { ReactNode } from "react";

import { Grid, Heading, Paragraph } from "@amsterdam/design-system-react";
import "@amsterdam/design-system-tokens/dist/index.css";
import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./app.css";
import type { Route } from "./+types/root";

import { AppLayout } from "./layouts/App/App";

export const links: Route.LinksFunction = () => [];

export default function App() {
  return <Outlet />;
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Required if we run the app as an SPA,
// see: https://reactrouter.com/how-to/spa#2-add-a-hydratefallback-and-optional-loader-to-your-root-route
export function HydrateFallback() {
  return (
    <AppLayout>
      <Grid>
        <Grid.Cell span="all">
          <Heading level={2}>Loading...</Heading>
          <Paragraph>Please wait while we load the application.</Paragraph>
        </Grid.Cell>
      </Grid>
    </AppLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
