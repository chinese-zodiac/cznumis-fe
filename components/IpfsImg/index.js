
import React, { useState } from 'react';
import { getIpfsUrl } from '../../utils/getIpfsJson';

const MAX_RETRIES = 12; // 6 gateways * 2 attempts each

const IpfsImg = ({ ipfsCid, alt = '', className = '', style = {} }) => {
    const [cycle, setCycle] = useState(0);
    const [failed, setFailed] = useState(false);

    const handleError = () => {
        if (cycle < MAX_RETRIES - 1) {
            setCycle(c => c + 1);
        } else {
            setFailed(true);
        }
    };

    if (failed || !ipfsCid) {
        return <div className={className} style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', color: '#999' }}>Image unavailable</div>;
    }

    return (
        <img 
            src={getIpfsUrl(ipfsCid, cycle)} 
            onError={handleError}
            alt={alt}
            className={className}
            style={style}
        />
    );
}

export default IpfsImg;