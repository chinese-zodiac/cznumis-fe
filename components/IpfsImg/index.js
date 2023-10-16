
import React, { useState } from 'react';
import { getIpfsUrl } from '../../utils/getIpfsJson';

const IpfsImg = ({ ipfsCid }) => {
    const [cycle, setCycle] = useState(0);
    return (<img src={getIpfsUrl(ipfsCid, cycle)} onError={() => setCycle(cycle + 1)} />)
}

export default IpfsImg;