import React from 'react';

import { createRoot } from 'react-dom/client';

import './index.scss';
import '../../common/scss/common.scss';

const app = window.document.getElementById('app');

const root = createRoot(app);

const Login = () => (
    <div>
        <span>Logintsx</span>
    </div>
);

root.render(<Login />);

// console.log(1919810)
