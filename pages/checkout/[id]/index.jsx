import T from 'prop-types';
import Layout from '../../../src/components/layout';
import CheckOut from '../../../src/pages/checkout'
import { getCampaignApi } from '../../../src/api/campaignApi';
import { getSlugName } from '../../../src/services/utilsService';
import { getImageUrl } from '../../../src/services/imageService';

const CheckOutPage = (props) => {
    return (
        <Layout header={props.header}>
            <CheckOut />
        </Layout>
    );
};


CheckOutPage.getInitialProps = async ({ query }) => {
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
            url: `https://giggedin-nextjs.herokuapp.com/experience/${slug}-${experience.id}`,
            image: getImageUrl(experience.banner),
        },
    };

}


CheckOutPage.propTypes = {
    header: T.shape({}).isRequired,
};

export default CheckOutPage;
