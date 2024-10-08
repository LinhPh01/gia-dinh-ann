import React from "react";
import { Sheet, Button, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
const AboutPage = (props) => {
  const [actionSheetOpened, setActionSheetOpened] = React.useState(false);
  const navigate = useNavigate();
  return (
    <Page className="bg-page-color" pb={4}>
      <div className="px-4">
        <Text>This mini app was generated by zmp-cli</Text>
      </div>
      <div>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => setActionSheetOpened(true)}
        >
          Back
        </Button>
      </div>
      <Sheet.Actions
        visible={actionSheetOpened}
        onClose={() => setActionSheetOpened(false)}
        actions={[
          [
            {
              text: "Go back",
              onClick: () => {
                navigate(-1);
              },
            },
            {
              text: "Action 1",
              close: true,
            },
            {
              text: "Action 2",
              close: true,
            },
          ],
          [
            {
              text: "Close",
              close: true,
              danger: true,
            },
          ],
        ]}
      ></Sheet.Actions>
    </Page>
  );
};

export default AboutPage;
