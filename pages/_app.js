import React from 'react';
import { ApiProvider } from '../lib/context/ApiContext';

/**
 * 应用根组件，提供API上下文
 */
function MyApp({ Component, pageProps }) {
  return (
    <ApiProvider>
      <Component {...pageProps} />
    </ApiProvider>
  );
}

export default MyApp;
