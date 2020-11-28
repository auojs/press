import { TransitionGroup, defineComponent, App as _App, CSSProperties } from 'vue';
import Notice from './notice';

let seed = 0;
const now = Date.now();
function getUuid() {
  return `rcNotification_${now}_${seed++}`;
}

export default defineComponent({
  inheritAttrs: false,

  props: {
    prefixCls: String,

    duration: {
      type: Number,
      default: 1.5
    },

    content: [Function, String],

    maxCount: Number
  },

  data() {
    return {
      notices: []
    } as { notices: any[] };
  },

  methods: {
    add(notice: any) {
      const key = (notice.key = notice.key || getUuid());
      const { maxCount } = this.$props;
      const updatedNotices: any[] = this.notices.concat();
      updatedNotices.push(notice);
      this.notices = updatedNotices;
    },

    remove(key: any) {
      this.notices = this.notices.filter((notice: any) => notice.key !== key);
    }
  },

  render() {
    const { prefixCls, notices, remove, $attrs } = this;

    //const close = createChainedFunction(remove.bind(this, notice.key), onClose);
    const noticeNodes = notices.map((notice: any, index) => {
      const update = Boolean(index === notices.length - 1 && notice.updateKey);
      const key = notice.updateKey ? notice.updateKey : notice.key;

      const { content, duration, closable, onClose, style, class: className } = notice;

      const close = () => {
        remove.bind(this, notice.key)();
        onClose();
      };

      const noticeProps = {
        duration,
        prefixCls,
        update,
        onClose: close,
        key
      };

      return (
        <Notice {...noticeProps}>{typeof content === 'function' ? content() : content}</Notice>
      );
    });

    const p = {
      class: {
        [`${prefixCls}`]: true
      },
      style: ($attrs.style as CSSProperties) || {}
    };

    return (
      <div {...p}>
        <TransitionGroup tag="span">{noticeNodes}</TransitionGroup>
      </div>
    );
  }
});
