import T from "prop-types";
import Layout from "../../../src/components/layout";
import CampaignDetail from "../../../src/pages/experience";
import { getCampaignApi } from "../../../src/api/campaignApi";
import { getImageUrl } from "../../../src/services/imageService";
import { getSlugName } from "../../../src/services/utilsService";
import Custom404 from '../../../src/pages/error/custom404'
import LayoutError from "../../../src/components/layoutError";

const ExperiencesDetailPage = (props) => {
  return (
    // <Layout header={props.header} experience={props.experience}>
    //   <CampaignDetail {...props} />
    // </Layout>
    <LayoutError>
      <Custom404 />
    </LayoutError>
  );
};

ExperiencesDetailPage.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const id = slug.split("-").pop();
  if (!isNaN(id)) {
    const res = await getCampaignApi(id);
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
  }

  return {
    header: {},
    experience: {},
  };
};

ExperiencesDetailPage.propTypes = {
  header: T.shape({}).isRequired,
};

export default ExperiencesDetailPage;
