import { Grid, Icon, Paragraph } from "@amsterdam/design-system-react";
import { HouseIcon } from "@amsterdam/design-system-react-icons";

export function Home() {
  return (
    <Grid>
      <Grid.Cell span="all">
        <Paragraph>
          Home
          {" "}
          <Icon size="small" svg={HouseIcon} />
        </Paragraph>
      </Grid.Cell>
    </Grid>
  );
}

export default Home;
