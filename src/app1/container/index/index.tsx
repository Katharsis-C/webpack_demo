import React from 'react';
import lodash from 'lodash';

import './index.scss';
// import '../../../common/scss/common.scss';
import nikonSvg from '../../../asset/image/Nikon.svg';

import { DatePicker, Button, Input, InputNumber } from 'antd';
import { Link } from 'react-router-dom';

const a = {
    fx: '114514',
};

export function foobar() {
    console.log(16, 'test tree shaking');
}

/** test lodash */
console.log(lodash.get(a, 'fx'));

export const IndexPage = () => {
    const clickTrigger = () => {
        window.alert('114514');
    };

    return (
        <div>
            <p className={'slogan'}>nikon</p>
            <p className={'logo'}>
                nikon logo
                <img src={nikonSvg} alt='nikon' />
            </p>
            <div>
                <DatePicker />
            </div>
            <div>
                <Button type='dashed' onClick={clickTrigger}>
                    114
                </Button>
            </div>
            <div>
                <Input value={'114514'} />
            </div>
            <div>
                <InputNumber />
            </div>
            <Link to={'/page2'}>index2</Link>
        </div>
    );
};
