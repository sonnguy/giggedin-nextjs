import T from "prop-types";
import Layout from "./../src/components/layout";
import CampaignDetail from "./../src/pages/experience";
import { getCampaignApi } from "./../src/api/campaignApi";
import { getImageUrl } from "./../src/services/imageService";
import { getSlugName } from "./../src/services/utilsService";

const JimmyPage = (props) => {
  return (
    <Layout header={props.header} experience={props.experience}>
      <CampaignDetail {...props} />
    </Layout>
  );
};

JimmyPage.getInitialProps = async () => {
  const res = await getCampaignApi(4);
  const experience = res.data.campaign;
  const slug = getSlugName(experience.name);
  return {
    header: {
      title: `${experience.name}: ${experience.headline}`,
      description: experience.description,
      keywords: `${experience.name}: ${experience.headline}`,
      siteName: "GiggedIn",
      url: `${process.env.REACT_APP_HOST_URL}/experience/${slug}-${experience.id}`,
      image: getImageUrl(experience.banner),
    },
    experience,
  };
};

JimmyPage.propTypes = {
  header: T.shape({}).isRequired,
};

export default JimmyPage;
