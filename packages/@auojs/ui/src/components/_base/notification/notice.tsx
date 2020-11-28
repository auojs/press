import { getSlot } from '../../_util/instance';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuoNotice',

  inheritAttrs: false,

  emits: ['close'],

  props: {
    duration: {
      type: Number,
      default: 1.5
    },

    update: Boolean,

    prefixCls: String
  },

  data() {
    return {
      closeTimer: null
    } as { closeTimer: NodeJS.Timeout | null };
  },

  mounted() {
    this.startCloseTimer();
  },

  updated() {
    if (this.update) {
      this.restartCloseTimer();
    }
  },

  methods: {
    close(e?: Event) {
      if (e) {
        e.stopPropagation();
      }
      this.clearCloseTimer();
      this.$emit('close');
    },

    startCloseTimer() {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.duration * 1000);
    },

    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },

    restartCloseTimer() {
      this.clearCloseTimer();
      this.startCloseTimer();
    }
  },

  render() {
    const { prefixCls } = this;

    const noticeProps = {
      class: {
        [`${prefixCls}-notice`]: true
      }
    };

    return (
      <div {...noticeProps}>
        <div class={`${prefixCls}-notice-content`}>{getSlot(this)}</div>
      </div>
    );
  }
});
