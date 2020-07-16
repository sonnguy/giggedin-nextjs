import LayoutError from '../src/components/layoutError';
import CustomError from '../src/pages/error/customError'

const CustomErrorPage = () => {
  return (
    <LayoutError>
      <CustomError />
    </LayoutError>
  );
};

export default CustomErrorPage;
