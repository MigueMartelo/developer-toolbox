import React, { useEffect, useState } from 'react';
// Small helpers you might want to keep
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Row, Col } from 'antd';
import UserSettings from './services/settings';

// eslint-disable-next-line import/extensions
import './helpers/external_links.ts';
import SwitchTheme from './components/SwitchTheme';
import Sidebar from './components/Sidebar';
import JSONFormatterValidator from './components/pages/jsonformattervalidator';
import JWTDecoder from './components/pages/jwtdecoder';
import UnixTimeConverter from './components/pages/unixtimeconverter';
import SSLInformation from './components/pages/sslinformation';
import Base64 from './components/pages/base64';
import URLDecoder from './components/pages/urldecoder';
import JSONtoYaml from './components/pages/jsontoyaml';
import YamlToJSON from './components/pages/yamltojson';
import DiffViewer from './components/pages/diffViewer';
import AboutPage from './components/pages/about';
import SettingsPage from './components/pages/settings';

const { Content, Header } = Layout;

export default function App() {
  const userTheme = UserSettings.Get('settings.theme')
    ? UserSettings.Get('settings.theme')
    : 'dark';

  const userLang = UserSettings.Get('settings.lang')
    ? UserSettings.Get('settings.lang')
    : 'en';

  const [theme = userTheme, setTheme] = useState();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(userLang);
  }, []);

  const changeTheme = (value: boolean) => {
    const selectedTheme: string = value ? 'dark' : 'light';
    setTheme(selectedTheme);
    UserSettings.Save('settings.theme', selectedTheme);
  };

  return (
    <Router>
      <Layout className={`site-layout-background-${theme}`}>
        <Sidebar theme={theme} />
        <Layout style={{ marginLeft: 200 }}>
          <Header
            className={`site-layout-background-${theme}`}
            style={{ padding: 0, textAlign: 'right' }}
          >
            <Row>
              <Col offset={1}>
                <h3 className={`color-${theme}`}>{t('app.name')}</h3>
              </Col>
              <Col span={6} offset={5}>
                <SwitchTheme defaultTheme={theme} onChange={changeTheme} />
              </Col>
            </Row>
          </Header>
          <Content className="content-layout">
            <Switch>
              <Route path="/json-to-yaml" component={JSONtoYaml} />
              <Route path="/diff" component={DiffViewer} />
              <Route path="/yaml-to-json" component={YamlToJSON} />
              <Route path="/url-decoder" component={URLDecoder} />
              <Route
                path="/json-formater-validator"
                component={JSONFormatterValidator}
              />
              <Route path="/ssl-information" component={SSLInformation} />
              <Route path="/base64" component={Base64} />
              <Route path="/jwt-decoder" component={JWTDecoder} />
              <Route
                path="/unix-time-converter"
                component={UnixTimeConverter}
              />
              <Route path="/about" component={AboutPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/" component={JSONFormatterValidator} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}
