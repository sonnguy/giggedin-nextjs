import React from 'react';
import bgImage from '../../../public/images/pngwing-com.png';

const WingLine = () => {
    return <div className="pngwing-line background-image-responsive" style={{
        backgroundImage: `url('${bgImage}')`
    }}></div>
}

export default WingLine;