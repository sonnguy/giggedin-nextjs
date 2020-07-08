import Layout from '../../../src/components/layout';
import Confirmation from '../../../src/pages/confirmation'

const ConfirmationPage = () => {
    return (
        <Layout>
            <Confirmation />
        </Layout>
    );
};

ConfirmationPage.getInitialProps = () => {
    return {
        header: {},
    };
}

export default ConfirmationPage;
