import React from 'react';

import './index.scss';
import '../../common/scss/common.scss';

import { DatePicker } from 'antd';

export const LoginPage = () => (
    <div>
        <span>登录</span>
        <div>
            <DatePicker />
        </div>
    </div>
);
