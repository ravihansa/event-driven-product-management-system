import ProductPage from './pages/ProductPage';
import Layout from './components/layout/Layout';
import AlertProvider from './providers/AlertProvider';

function App() {
  return (
    <AlertProvider>
      <Layout>
        <ProductPage />
      </Layout>
    </AlertProvider>
  );
}

export default App;
