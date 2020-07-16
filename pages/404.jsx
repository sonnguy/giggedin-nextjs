import LayoutError from '../src/components/layoutError';
import Custom404 from '../src/pages/error/custom404'

const Custom404Page = () => {
  return (
    <LayoutError>
      <Custom404 />
    </LayoutError>
  );
};

export default Custom404Page;
