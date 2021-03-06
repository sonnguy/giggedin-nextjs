import T from 'prop-types';
import Layout from '../../../src/components/layout';
import AboutUs from '../../../src/pages/about-us';

const AboutUsPage = (props) => {
  return (
    <Layout header={props.header}>
      <AboutUs />
    </Layout>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  const paths = [`/about-us/giggedin`, `/about-us/terms-and-conditions`, `/about-us/privacy-and-policy`]
  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const getTitle = () => {
    switch (slug) {
      case 'giggedin':
        return 'About-us'
      case 'terms-and-conditions':
        return 'Terms and Conditions'
      case 'privacy-and-policy':
        return 'Privacy and Policy'
      default:
        return 'About-us'
    }
  }

  return {
    props: {
      header: {
        title: `GiggedIn Experiences | ${getTitle()}`,
        title: `GiggedIn Experiences | ${getTitle()}`,
        title: `GiggedIn Experiences | ${getTitle()}`,
        siteName: 'GiggedIn',
        url: `${process.env.REACT_APP_HOST_URL}/about-us/${slug}`,
      },
    }
  }
}

AboutUsPage.propTypes = {
  header: T.shape({}).isRequired,
};

export default AboutUsPage;
