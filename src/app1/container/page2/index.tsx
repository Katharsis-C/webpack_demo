import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Card } from 'antd';
import './index.scss';

export const Page2 = () => (
    <div>
        <Checkbox>114514</Checkbox>
        <Card title='test test test test title' extra={<a> More </a>}>
            <div className='box_in_card'>
                <span>FFFFFF</span>
            </div>
        </Card>
        <Link to={'/'}>indexp</Link>
    </div>
);
