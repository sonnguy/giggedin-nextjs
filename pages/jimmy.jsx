import T from "prop-types";
import Layout from "./../src/components/layout";
import CampaignDetail from "./../src/pages/experience";
import { getCampaignApi } from "./../src/api/campaignApi";
import { getImageUrl } from "./../src/services/imageService";

const JimmyPage = (props) => {
  return (
    <Layout header={props.header} experience={props.experience}>
      <CampaignDetail {...props} />
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getCampaignApi(4);
  const experience = res.data.campaign;
  return {
    props: {
      header: {
        title: `${experience.name}: ${experience.headline}`,
        description: experience.description,
        keywords: `${experience.name}: ${experience.headline}`,
        siteName: "GiggedIn",
        url: `${process.env.REACT_APP_HOST_URL}/jimmy`,
        image: getImageUrl(experience.banner),
      },
      experience,
    }
  }
}

export default JimmyPage;
