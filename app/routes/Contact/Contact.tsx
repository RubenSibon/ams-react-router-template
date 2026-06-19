import { Grid, Heading, LinkList } from "@amsterdam/design-system-react";
import {
  HouseIcon,
  PhoneIcon,
  SpeechBalloonEllipsisIcon,
} from "@amsterdam/design-system-react-icons";

export function Contact() {
  return (
    <Grid>
      <Grid.Cell className="ams-prose" span="all">
        <Heading level={1}>Contact</Heading>
        <LinkList>
          <LinkList.Link href="/contact" icon={<SpeechBalloonEllipsisIcon />}>
            Contactformulier
          </LinkList.Link>
          <LinkList.Link
            href="https://www.amsterdam.nl/contact/adressen-openingstijden/"
            icon={<HouseIcon />}
          >
            Adressen en openingstijden
          </LinkList.Link>
          <LinkList.Link
            href="https://formulieren.amsterdam.nl/TriplEforms/DirectRegelen/formulier/nl-NL/evAmsterdam/contactformulier.aspx/"
            icon={<PhoneIcon />}
          >
            Bel 14 020
          </LinkList.Link>
        </LinkList>
      </Grid.Cell>
    </Grid>
  );
}

export default Contact;
