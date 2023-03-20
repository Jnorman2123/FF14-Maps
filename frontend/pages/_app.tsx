import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import { MyAppProps } from "./components/types";
import { Layouts } from "./components/layouts";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import {  useEffect } from 'react';

function MyApp({ Component, pageProps }: MyAppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, [])
  const Layout = Layouts[Component.Layout] ?? ((page) => page);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
