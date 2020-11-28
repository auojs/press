import install from '../_util/install';
import Menu from './menu';
import Submenu from './submenu';
import ItemGroup from './item-group';
import Item from './menu-item';

export default install(Menu, [Submenu, ItemGroup, Item]);
