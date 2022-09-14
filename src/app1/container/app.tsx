import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { IndexPage } from './index';
import { Page2 } from './page2';

export const App = () => {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<IndexPage />} />
                    
                    {/* 使用browserrouter修改为 */}
                    {/* <Route path='*' element={<IndexPage />} /> */}

                    <Route path='page2' element={<Page2 />} />
                </Routes>
            </HashRouter>
        </>
    );
};
