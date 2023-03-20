import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import '../styles/custom.scss';
import { MyAppProps } from "./components/types";
import { Layouts } from "./components/layouts";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { SSRProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page) => page);

  return (
    <Provider store={store}>
      <SSRProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;
