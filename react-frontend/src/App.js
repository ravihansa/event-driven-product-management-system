import ProductPage from './pages/ProductPage';
import Layout from './components/layout/Layout';
import AlertProvider from './providers/AlertProvider';
import { NotificationProvider } from './providers/NotifyCtxProvider';

function App() {
  return (
    <AlertProvider>
      <NotificationProvider>
        <Layout>
          <ProductPage />
        </Layout>
      </NotificationProvider>
    </AlertProvider>
  );
}

export default App;
