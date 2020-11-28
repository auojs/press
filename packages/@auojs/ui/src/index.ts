import { App as _App } from 'vue';
import Affix from './components/affix';
import Alert from './components/alert';
import Button from './components/button';
import Card from './components/card';
import Col from './components/col';
import Diveder from './components/divider';
import Icon from './components/icon';
import Input from './components/input';
import Layout from './components/layout';
import Menu from './components/menu';
import Message from './components/message';
import Row from './components/row';
import Spacs from './components/space';
import Tabs from './components/tabs';
import Tootip from './components/tootip';
import { setConfig } from './components/_util/config';

const components = {
  Affix,
  Alert,
  Button,
  Card,
  Icon,
  Spacs,
  Input,
  Row,
  Col,
  Layout,
  Menu,
  Tootip,
  Tabs,
  Diveder
};

const install = (app: _App, ...options: any[]) => {
  Object.keys(components).forEach((key) => {
    app.use((components as { [x: string]: any })[key]);
  });

  setConfig('prefixCls', 'Auo');

  app.config.globalProperties.$message = Message;
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: Message;
  }
}

export default {
  install,
  ...components
};
