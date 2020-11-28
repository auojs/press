import { createApp, TransitionGroup, defineComponent, App as _App, CSSProperties } from 'vue';
import Notice from './notice';
import Notification from './notification';

export { Notice };

interface Properties {
  getContainer: Function;
  style: any;
  class: any;
}

Notification.newInstance = function(properties: Properties, callback: Function) {
  const { style, class: className, getContainer, ...props } = properties;

  const div = document.createElement('div');
  if (getContainer) {
    const root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  const app: _App = createApp(
    defineComponent({
      mounted() {
        const self = this;
        this.$nextTick(() => {
          callback({
            notice(noticeProps: any) {

              self.$refs['notification'].add(noticeProps);
            },
            removeNotice(key: any) {
              self.$refs['notification'].remove(key);
            },
            component: self,
            destroy() {
              app.unmount(div);
              if (div.parentNode) {
                div.parentNode.removeChild(div);
              }
            }
          });
        });
      },

      render() {
        const p = {
          ...props,
          ref: 'notification',
          style,
          class: className
        };

        return <Notification {...p} />;
      }
    })
  );
  app.mount(div);
};

export default Notification;
