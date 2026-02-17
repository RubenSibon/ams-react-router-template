import type { ReactNode } from "react";
import { Outlet } from "react-router";

import { Page, SkipLink } from "@amsterdam/design-system-react";

import AppHeader from "~/layouts/App/AppHeader/AppHeader";

import styles from "./App.module.css";
import AppFooter from "./AppFooter/AppFooter";

export function AppLayout({ children }: { readonly children?: ReactNode }) {
  return (
    <Page>
      <SkipLink href="#main">Direct naar inhoud</SkipLink>

      <AppHeader />

      <main className={styles.container}>
        {children}
      </main>

      <AppFooter />
    </Page>

  );
}

export function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default App;
