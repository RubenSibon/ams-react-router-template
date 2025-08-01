import { Grid, Heading, LinkList, PageHeader } from "@amsterdam/design-system-react";

import { megaMenuLinks, pageHeaderMenuLinks } from "./menu";

export function AppHeader() {
  return (
    <PageHeader
      menuItems={pageHeaderMenuLinks.map(({ fixed, href, label, lang }) => (
        <PageHeader.MenuLink key={label} fixed={fixed} href={href ?? "#"} lang={lang} rel={href ? "external" : undefined}>
          {label}
        </PageHeader.MenuLink>
      ))}
    >
      <Grid paddingBottom="2x-large" paddingTop="large">
        <PageHeader.GridCellNarrowWindowOnly span="all">
          <LinkList>
            {pageHeaderMenuLinks
              .filter(link => !link.fixed)
              .map(({ href, label, lang }) => (
                <LinkList.Link key={label} href={href ?? "#"} lang={lang} rel={href ? "external" : undefined}>
                  {label}
                </LinkList.Link>
              ))}
          </LinkList>
        </PageHeader.GridCellNarrowWindowOnly>

        <Grid.Cell span="all">
          <Heading className="ams-mb-s" level={3}>
            Alle onderwerpen
          </Heading>

          <LinkList>
            {megaMenuLinks.map(label => (
              <LinkList.Link key={label} href="#">
                {label}
              </LinkList.Link>
            ))}
          </LinkList>
        </Grid.Cell>
      </Grid>
    </PageHeader>
  );
}

export default AppHeader;
