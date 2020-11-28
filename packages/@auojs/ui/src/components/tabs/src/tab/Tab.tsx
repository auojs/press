import { defineComponent } from 'vue';
import GlobalMixin from '../../../_mixins/global';

export default defineComponent({
  name: 'AuoTab',

  mixins: [GlobalMixin('tab')],

  props: {
    name: String
  },

  data() {
    return {
      isActive: false
    };
  },

  render() {}
});
