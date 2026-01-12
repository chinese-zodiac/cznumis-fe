
import React, { useState } from 'react';
import { getIpfsUrl } from '../../utils/getIpfsJson';

const MAX_RETRIES = 12; // 6 gateways * 2 attempts each

const IpfsImgClickable = ({ ipfsCid, className, style, alt = '' }) => {
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
        return (
            <figure className={className} style={style}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', color: '#999', height: '100%', width: '100%' }}>
                    Image unavailable
                </div>
            </figure>
        );
    }

    const url = getIpfsUrl(ipfsCid, cycle);

    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <figure className={className} style={style}>
                <img src={url} onError={handleError} alt={alt} />
            </figure>
        </a>
    )
}

export default IpfsImgClickable;