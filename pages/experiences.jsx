import Layout from "../src/components/layout";
import Experiences from "../src/pages/experiences";
import { getCampaignsApi } from "../src/api/campaignApi";

const ExperiencesPage = (props) => {
  return (
    <Layout>
      <Experiences {...props} />
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getCampaignsApi();
  const experiences = res.data.campaigns;
  return {
    props: {
      experiences,
    }
  }
}


export default ExperiencesPage;
