import Layout from '../src/components/layout';
import Home from '../src/pages/home'
import { getCampaignApi } from '../src/api/campaignApi';

const HomePage = (props) => {
  return (
    <Layout>
      <Home {...props}/>
    </Layout>
  );
};

HomePage.getInitialProps = async () => {
  const res = await getCampaignApi(3);
  const experience = res.data.campaign;
  return {
    experience
  };
};


export default HomePage;
