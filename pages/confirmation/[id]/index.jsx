import T from 'prop-types';
import Layout from '../../../src/components/layout';
import Confirmation from '../../../src/pages/confirmation'
import { getCampaignApi } from '../../../src/api/campaignApi';
import { getSlugName } from '../../../src/services/utilsService';
import { getImageUrl } from '../../../src/services/imageService';

const ConfirmationPage = (props) => {
    return (
        <Layout header={props.header}>
            <Confirmation />
        </Layout>
    );
};

ConfirmationPage.getInitialProps = async ({ query }) => {
    const { id } = query;
    const res = await getCampaignApi(parseInt(id));
    const experience = res.data.campaign;
    const slug = getSlugName(experience.name);
    return {
        header: {
            title: `${experience.name}: ${experience.headline}`,
            description: experience.description,
            keywords: `${experience.name}: ${experience.headline}`,
            siteName: 'GiggedIn',
            url: `${process.env.REACT_APP_HOST_URL}/experience/${slug}-${experience.id}`,
            image: getImageUrl(experience.banner),
        },
    };
}


ConfirmationPage.propTypes = {
    header: T.shape({}).isRequired,
};


export default ConfirmationPage;
