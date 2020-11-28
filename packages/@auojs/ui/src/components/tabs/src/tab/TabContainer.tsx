import { defineComponent } from 'vue';
import GlobalMixin from '../../../_mixins/global';

export default defineComponent({
  name: 'AuoTabs',

  mixins: [GlobalMixin('tabs')],

  data() {
    return {};
  },

  render() {}
});
