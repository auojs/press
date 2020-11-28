import { Transition, defineComponent, PropType } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot, getComponent } from '../_util/instance';
import { createPopper, Instance, Placement, Options, Modifier } from '@popperjs/core';

export default defineComponent({
  name: 'AuoTooltip',

  mixins: [GlobalMixin('tooltip')],

  props: {
    title: String,

    placement: {
      type: String as PropType<Placement>,
      default: 'auto'
    },

    options: {
      type: Object as PropType<Options>
    },

    disabled: Boolean
  },

  data() {
    return {
      isShow: false,
      popperInstance: null
    } as { isShow: boolean; popperInstance: Instance | null };
  },

  methods: {
    show() {
      this.isShow = true;
      this.create();
    },

    hide() {
      this.isShow = false;
    },

    create() {
      const { placement, options } = this;

      let key = '';

      const modifiers: Array<Partial<Modifier<any, any>>> = [
        {
          name: 'offset',
          options: {
            offset: [0, 6]
          }
        }
      ];

      key = 'arrow';
      if (this.$refs[key]) {
        modifiers.push({
          name: key,
          options: {
            element: this.$refs[key]
          }
        });
      }

      const referenceOpts: Options = Object.assign(
        {
          placement,
          modifiers: modifiers,
          strategy: 'absolute'
        },
        options
      );

      if (this.$refs['reference'] && this.$refs['inner']) {
        if (this.popperInstance) {
          this.popperInstance.update();
        } else {
          this.popperInstance = createPopper(
            this.$refs['reference'] as Element,
            this.$refs['inner'] as HTMLElement,
            referenceOpts
          );
        }
      }
    },

    destroy() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    }
  },

  render() {
    const { disabled, isShow, prefixCls, show, hide } = this;
    const tootipProps = {
      class: {
        [`${prefixCls}`]: true
      },
      ref: 'reference',
      onMouseenter: show,
      onFocus: show,
      onMouseleave: hide,
      onBlur: hide
    };

    const innerProps = {
      class: {
        [`${prefixCls}-inner`]: true
      },
      ref: 'inner'
    };

    return (
      <div {...tootipProps}>
        {!disabled ? (
          <Transition name="fade">
            <div v-show={isShow} {...innerProps}>
              <div class={[`${prefixCls}-arrow`]} data-popper-arrow ref="arrow"></div>
              {getComponent(this, 'title')}
            </div>
          </Transition>
        ) : null}
        {getSlot(this)}
      </div>
    );
  },

  beforeUnmount() {
    this.destroy();
  }
});
