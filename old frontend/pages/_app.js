import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/App.scss';
import { wrapper } from '../redux/store';
import { useRouter } from 'next/router';
import { NavigateProvider } from 'react-use-navigate';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const config = {
        push: router.push,
        back: router.back,
        replace: router.replace,
    };

  return <NavigateProvider {...config} >
        <Component {...pageProps} />
    </NavigateProvider>
}

export default wrapper.withRedux(MyApp);