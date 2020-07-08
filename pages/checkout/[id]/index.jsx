import Layout from '../../../src/components/layout';
import CheckOut from '../../../src/pages/checkout'

const CheckOutPage = () => {
    return (
        <Layout>
            <CheckOut />
        </Layout>
    );
};


CheckOutPage.getInitialProps = () => {
    return {
        header: {},
    };
}

export default CheckOutPage;
