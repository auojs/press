import install from '../_util/install';
import Layout from './layout';
import Header from './header';
import Sider from './sider';
import Content from './content';
import Footer from './footer';

export default install(Layout, [Header, Sider, Content, Footer]);
