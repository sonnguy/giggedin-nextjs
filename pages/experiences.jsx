import Layout from "../src/components/layout";
import Experiences from "../src/pages/experiences";
import { getCampaignsApi } from "../src/api/campaignApi";

const ExperiencesPage = (props) => {
  return (
    <Layout>
      <Experiences {...props}/>
    </Layout>
  );
};

ExperiencesPage.getInitialProps = async () => {
  const res = await getCampaignsApi();
  const experiences = res.data.campaigns;
  return {
    experiences
  };
};

export default ExperiencesPage;
