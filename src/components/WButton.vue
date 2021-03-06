<template>
  <component
    :is="tag"
    :class="classList"
    :disabled="disabled"
    :type="htmlType"
    v-bind="propsByTag"
    class="w-button"
    @click="$emit('click', $event)"
  >
    <w-icon v-if="icon && !loading" :icon="icon" class="w-button-icon"></w-icon>
    <w-icon v-if="loading" icon="loading" class="w-button-icon w-button-icon-loading"></w-icon>
    <span>
      <slot></slot>
    </span>
  </component>
</template>

<script>
import { oneOf, generateClass } from '../utils/helper.js'
import WIcon from './WIcon.vue'

const classPrefix = 'w-button-'

export default {
  name: 'WButton',
  components: { WIcon },
  props: {
    type: {
      type: String,
      validator (value) {
        const typeList = ['default', 'primary', 'dashed', 'text', 'link']
        return oneOf(value, typeList)
      }
    },
    success: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      validator (value) {
        const shapeList = ['round', 'circle']
        return oneOf(value, shapeList)
      }
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      validator (value) {
        const positionList = ['left', 'right']
        return oneOf(value, positionList)
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    htmlType: {
      type: String,
      default: 'button',
      validator (value) {
        const htmlTypeList = ['button', 'submit', 'reset']
        return oneOf(value, htmlTypeList)
      }
    },
    href: {
      type: String
    },
    target: {
      type: String,
      validator (value) {
        const targetList = ['_self', '_blank', '_parent', '_top']
        return oneOf(value, targetList)
      }
    }
  },
  computed: {
    classList () {
      const { type, success, warning, danger, ghost, shape, iconPosition, loading, block } = this
      return [
        type && generateClass(classPrefix, type),
        { [generateClass(classPrefix, 'success')]: success },
        { [generateClass(classPrefix, 'warning')]: warning },
        { [generateClass(classPrefix, 'danger')]: danger },
        { [generateClass(classPrefix, 'ghost')]: ghost },
        shape && generateClass(classPrefix, shape),
        iconPosition && generateClass(classPrefix, 'icon-', iconPosition),
        { [generateClass(classPrefix, 'loading')]: loading },
        { [generateClass(classPrefix, 'block')]: block }
      ]
    },
    isHrefMode () {
      const { href } = this
      return !!href
    },
    tag () {
      const { isHrefMode } = this
      return isHrefMode ?  'a' : 'button'
    },
    propsByTag () {
      const { isHrefMode, htmlType, href, target } = this
      const propButton = { type: htmlType }
      const propLink = { href, target }
      return isHrefMode ? propLink : propButton
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

@mixin button-disabled() {
  &[disabled] {
    border-color: $border-color-disabled;
    background-color: $bgc-disabled;
    color: $color-disabled;
    cursor: not-allowed;
  }
}

@mixin button-default-status($color-hover-focus, $color-active) {
  &:hover, &:focus {
    border-color: $color-hover-focus;
    color: $color-hover-focus;
  }

  &:active {
    border-color: $color-active;
    color: $color-active;
  }
}

@mixin set-color-default($color, $color-hover-focus, $color-active) {
  border-color: $color;
  color: $color;
  @include button-default-status($color-hover-focus, $color-active);
  @include button-disabled;
}

@mixin set-color-primary($color, $color-hover-focus, $color-active) {
  border-color: $color;
  background-color: $color;
  color: #fff;

  &:hover, &:focus, &:active {
    color: #fff;
  }

  &:hover, &:focus {
    border-color: $color-hover-focus;
    background-color: $color-hover-focus;
  }

  &:active {
    border-color: $color-active;
    background-color: $color-active;
  }

  @include button-disabled;

  &.w-button-ghost {
    border-color: $color;
    background-color: transparent;
    color: $color;

    &:hover, &:focus {
      border-color: $color-hover-focus;
      background-color: transparent;
      color: $color-hover-focus;
    }

    &:active {
      border-color: $color-active;
      background-color: transparent;
      color: $color-active;
    }

    &:disabled {
      border-color: $border-color-disabled;
      color: $color-disabled;
    }
  }
}

@mixin set-color-text($color, $color-hover-focus, $color-active) {
  border-color: transparent;

  &:hover, &:focus, &:active {
    border-color: transparent;
    color: $color;
  }

  &:hover, &:focus {
    background-color: rgba(0, 0, 0, .018);
    color: $color-hover-focus;
  }

  &:active {
    background-color: rgba(0, 0, 0, .028);
    color: $color-active;
  }

  @include button-disabled;
}

@mixin set-color-link($color, $color-hover-focus, $color-active) {
  border-color: transparent;
  color: $color;

  &:hover, &:focus, &:active {
    border-color: transparent;
  }

  &:hover, &:focus {
    color: $color-hover-focus;
  }

  &:active {
    color: $color-active;
  }

  @include button-disabled;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.w-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding-right: 1em;
  padding-left: 1em;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  background-color: #fff;
  color: $color;
  font-size: $font-size;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  vertical-align: middle; // 解决 inline-flex 产生的 bug，让多个按钮并排时可以在垂直方向对齐

  &::before {
    display: none;
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: 1;
    content: '';
    border-radius: inherit;
    background-color: #fff;
    opacity: .35;
    pointer-events: none;
  }

  &, &:focus, &:active {
    outline: none;
  }

  @include button-default-status($color-primary-hover-focus, $color-primary-active);
  @include button-disabled;

  &.w-button-success {
    @include set-color-default($color-success, $color-success-hover-focus, $color-success-active);
  }

  &.w-button-warning {
    @include set-color-default($color-warning, $color-warning-hover-focus, $color-warning-active);
  }

  &.w-button-danger {
    @include set-color-default($color-danger, $color-danger-hover-focus, $color-danger-active);
  }

  &.w-button-ghost {
    border-color: #fff;
    background-color: transparent;
    color: #fff;

    @include button-default-status($color-primary-hover-focus, $color-primary-active);

    &:disabled {
      border-color: $border-color-disabled;
      background-color: transparent;
      color: $color-disabled;
    }
  }

  $buttonIconMargin: .2em;
  .w-button-icon {
    margin-right: $buttonIconMargin;
  }

  &.w-button-icon-right {
    .w-button-icon {
      order: 1;
      margin-right: 0;
      margin-left: $buttonIconMargin;
    }
  }
}

.w-button-primary {
  @include set-color-primary($color-primary, $color-primary-hover-focus, $color-primary-active);

  &.w-button-success {
    @include set-color-primary($color-success, $color-success-hover-focus, $color-success-active);
  }

  &.w-button-warning {
    @include set-color-primary($color-warning, $color-warning-hover-focus, $color-warning-active);
  }

  &.w-button-danger {
    @include set-color-primary($color-danger, $color-danger-hover-focus, $color-danger-active);
  }
}

.w-button-dashed {
  border-style: dashed;
  @include button-default-status($color-primary-hover-focus, $color-primary-active);
}

.w-button-text {
  @include set-color-text($color, $color, $color);

  &.w-button-success {
    @include set-color-text($color-success, $color-success-hover-focus, $color-success-active);
  }

  &.w-button-warning {
    @include set-color-text($color-warning, $color-warning-hover-focus, $color-warning-active);
  }

  &.w-button-danger {
    @include set-color-text($color-danger, $color-danger-hover-focus, $color-danger-active);
  }
}

.w-button-link {
  @include set-color-link($color-primary, $color-primary-hover-focus, $color-primary-active);

  &.w-button-success {
    @include set-color-link($color-success, $color-success-hover-focus, $color-success-active);
  }

  &.w-button-warning {
    @include set-color-link($color-warning, $color-warning-hover-focus, $color-warning-active);
  }

  &.w-button-danger {
    @include set-color-link($color-danger, $color-danger-hover-focus, $color-danger-active);
  }
}

.w-button-round {
  border-radius: 32px;
}

.w-button-circle {
  width: 32px;
  padding-right: 0;
  padding-left: 0;
  border-radius: 50%;
  vertical-align: middle;
}

.w-button-loading {
  position: relative;

  > .w-button-icon-loading {
    animation: spin 2s linear infinite;
  }

  &::before {
    display: block;
  }

  &:not([disabled]) {
    pointer-events: none;
  }
}

.w-button-block {
  width: 100%;
}
</style>
