import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { ScrollProvider } from './contexts/ScrollContext';
import { useAppLanguage } from './hooks/useAppLanguage';
import { useRuntimeTextTranslation } from './hooks/useRuntimeTextTranslation';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import { routes } from './config/routes';
import './App.css';
import FDEPage from './pages/FDEPage';
import MaasPage from './pages/MaasPage';

const { Content } = Layout;

function App() {
  const { language } = useAppLanguage();
  useRuntimeTextTranslation(language);

  return (
    <ScrollProvider>
      <Layout className="app-layout">
        <Header />
        <div className="app-content-footer-wrap">
          <Content className="app-content">
            <Routes>
              <Route path={routes.home} element={<HomePage />} />
              <Route path={routes.fde} element={<FDEPage />} />
              <Route path={routes.products} element={<ProductsPage />} />
              <Route path={routes.maas} element={<MaasPage />} />
              <Route path={routes.about} element={<AboutPage />} />
              <Route path="*" element={<Navigate to={routes.home} replace />} />
            </Routes>
          </Content>
          <Footer />
        </div>
      </Layout>
    </ScrollProvider>
  );
}

export default App;
