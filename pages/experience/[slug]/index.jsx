import T from 'prop-types';
import Layout from '../../../src/components/layout';
import CampaignDetail from '../../../src/pages/experience'
import { getCampaignApi } from '../../../src/api/campaignApi';
import { getImageUrl } from '../../../src/services/imageService';

const ExperiencesDetailPage = (props) => {
  return (
    <Layout header={props.header}>
      <CampaignDetail />
    </Layout>
  );
};

ExperiencesDetailPage.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const id = slug.split('-').pop();
  if (!isNaN(id)) {
    const res = await getCampaignApi(id);
    const experience = res.data.campaign;

    return {
      header: {
        title: `${experience.name}: ${experience.headline}`,
        description: experience.description,
        keywords: `${experience.name}: ${experience.headline}`,
        siteName: 'GiggedIn',
        url: `https://experience.giggedin.com/`,
        image: getImageUrl(experience.banner),
      },
    };
  }

  return {
    header: {},
  };

}


ExperiencesDetailPage.propTypes = {
  header: T.shape({}).isRequired,
};


export default ExperiencesDetailPage;
