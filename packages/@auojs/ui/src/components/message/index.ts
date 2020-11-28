import Notification from '../_base/notification';

const defaultDuration = 3;
let key = 1;
const prefixCls = 'auo-message';
let messageInstance: any;
const getContainer = () => document.body;

function getMessageInstance(callback: (fn: any) => void) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }

  Notification.newInstance(
    {
      prefixCls,
      getContainer
    },
    (instance: any) => {
      if (messageInstance) {
        callback(messageInstance);
        return;
      }
      messageInstance = instance;
      callback(instance);
    }
  );
}

export default class Api {
  public static open(args: any) {
    const duration =
      args.duration !== undefined ? args.duration : defaultDuration;

    const target = args.key || key++;
    const closePromise = new Promise((resolve) => {
      const callback = () => {
        if (typeof args.onClose === 'function') {
          args.onClose();
        }
        return resolve(true);
      };

      getMessageInstance((instance: any) => {
        instance.notice({
          key: target,
          duration,
          style: {},
          content: args.content,
          onClose: callback
        });
      });
    });

    const result = () => {
      if (messageInstance) {
        messageInstance.removeNotice(target);
      }
    };

    result.then = (filled: any, rejected: any) =>
      closePromise.then(filled, rejected);
    result.promise = closePromise;
    return result;
  }

  public static info(content: any, duration: number, onClose?: () => void) {
    return Api.open({
      content,
      duration,
      type: 'info'
    });
  }
}
