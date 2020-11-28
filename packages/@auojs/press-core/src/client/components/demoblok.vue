<template>
  <div class="hero">
    <div class="show">
      <slot />
    </div>
    <div class="meta">
      <auo-divider orientation="left">
        {{ title }}
      </auo-divider>

      <div class="describe">
        <slot name="describe" />
      </div>
      <div class="meta-actions">
        <auo-icon type="file" size="16" />
        <auo-icon
          class="actions-show"
          @click="handleHljsClick"
          :type="!show ? 'eye' : 'eye-off'"
          size="16"
          style="margin-left: 16px"
        />
      </div>
    </div>
    <transition name="fade" appear :css="false" v-bind="transition">
      <slot name="hijs" v-if="show" />
    </transition>
  </div>
</template>

<script>
import { nextTick } from "vue";

/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

/* istanbul ignore next */
export function addClass(el, cls) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += " " + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(" " + clsName + " ", " ");
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

const Transition = {
  onBeforeEnter(el) {
    addClass(el, "collapse-transition");
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.height = "0";
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },
  onAfterLeave(el) {
    removeClass(el, "collapse-transition");
    el.style.height = "";
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  },
  onEnter(el, done) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      console.log("%O", el, el.scrollHeight);

      el.style.height = el.scrollHeight + "px";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.height = "";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = "hidden";
  },
  onAfterEnter(el) {
    // for safari: remove class then reset height is necessary
    removeClass(el, "collapse-transition");
    el.style.height = "";
    el.style.overflow = el.dataset.oldOverflow;
  },
  onBeforeLeave(el) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = el.scrollHeight + "px";
    el.style.overflow = "hidden";
  },
  onLeave(el, done) {
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      addClass(el, "collapse-transition");
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },
};

export default {
  name: "Hero",
  props: {
    msg: String,
    title: String,
  },
  data() {
    return {
      show: false,
      transition: Transition,
    };
  },

  methods: {
    handleHljsClick() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="less">
.collapse-transition {
  transition: height 0.2s ease-in-out, padding-top 0.2s ease-in-out,
    padding-bottom 0.2s ease-in-out;
}

.hljs {
  background: #f2f4f6 !important;
  padding: 12px 20px !important;
  border-radius: 4px;
}

// pre[class*="language-"]

.hero {
  background: #fff;
  border: 1px solid #ebedf0;
  border-radius: 4px;
  overflow: hidden;
  margin: 1em 0;
  transition: all 0.2s ease-in-out;
  margin-bottom: 24px;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 15%);
    border-color: transparent;
  }

  .show {
    padding: 20px 20px 32px;
  }

  .meta {
    position: relative;

    .auo-divider {
      position: absolute;
      top: -27px;
      z-index: 3;
    }

    .title {
      padding: 0 20px;
      position: absolute;
      top: -11px;
      z-index: 3;

      > * {
        margin: 0;
        padding: 0 24px 0 5px;
        background: #fff;
        font-size: 14px;
      }
    }
    & > .describe {
      margin: 0;
      padding: 18px 25px 12px;
      width: 100%;
      word-break: break-word;
      z-index: 2;
      position: relative;
      background: #fff;

      > * {
        margin: 0;
        padding: 0;
      }

      & > ul > li {
        list-style-type: circle;
        margin-left: 20px;
        padding-left: 4px;
      }
      & > ul > li:empty {
        display: none;
      }

      & > ol > li {
        list-style-type: decimal;
        margin-left: 20px;
        padding-left: 4px;
      }
      & > ol > li > p,
      & > ul > li > p {
        margin: 0.2em 0;
      }
    }

    &-actions {
      padding: 12px 0 4px;
      text-align: center;
      opacity: 0.7;
      transition: opacity 0.3s;
      border-top: 1px dashed #ebedf0;
      box-shadow: 0 4px 20px #00000024;
      position: relative;
      z-index: 0;

      .auo-icon {
        &:hover {
          color: #2196f3;
          cursor: pointer;
        }
      }
      .actions-show {
        &:hover {
          color: #2196f3;
          cursor: pointer;
        }
      }
    }
  }

  pre {
    margin: 0 !important;
    border-radius: 0 !important;
    padding: 0 !important;

    & > code {
      display: block;
      padding: 1.25rem 1.5rem;
      box-shadow: none;
      border-left: 0;
      overflow: auto;
      background-color: transparent;
      background-image: none;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
