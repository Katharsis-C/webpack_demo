import React from 'react';
import lodash from 'lodash';

import './index.scss';
import '../../common/scss/common.scss';
import nikonSvg from '../../asset/image/Nikon.svg';

const a = {
    fx: '114514',
};

/** test lodash */
console.log(lodash.get(a, 'fx'));

export const IndexPage = () => (
    <div>
        <p className={'slogan'}>nikon</p>
        <p className={'logo'}>
            nikon logo
            <img src={nikonSvg} alt='nikon' />
            {/* <nikonSvg/> */}
        </p>
    </div>
);
