import T from "prop-types";
import Layout from "../../../src/components/layout";
import CampaignDetail from "../../../src/pages/experience";
import { getCampaignApi, getCampaignsApi } from "../../../src/api/campaignApi";
import { getImageUrl } from "../../../src/services/imageService";
import { getSlugName } from "../../../src/services/utilsService";
import Custom404 from '../../../src/pages/error/custom404'
import LayoutError from "../../../src/components/layoutError";

const ExperiencesDetailPage = (props) => {
  return (
    <Layout header={props.header} experience={props.experience}>
      <CampaignDetail {...props} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await getCampaignsApi();

  const paths = res.data.campaigns.map(experience => {
    const slugName = `${getSlugName(experience.name)}-${getSlugName(experience.headline)}-${experience.id}`;
    return `/experience/${slugName}`
  });

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const id = slug.split("-").pop();
  const res = await getCampaignApi(id);
  const experience = res.data.campaign;

  return {
    props: {
      header: {
        title: `${experience.name}: ${experience.headline}`,
        description: experience.description,
        keywords: `${experience.name}: ${experience.headline}`,
        siteName: "GiggedIn",
        url: `${process.env.REACT_APP_HOST_URL}/experience/${slug}`,
        image: getImageUrl(experience.banner),
      },
      experience,
    }
  }
}

ExperiencesDetailPage.propTypes = {
  header: T.shape({}).isRequired,
};

export default ExperiencesDetailPage;
