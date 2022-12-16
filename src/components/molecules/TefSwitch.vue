<template>
<div>
  <span class="switch-container">
    <label class="tef-toggle-switch">
      <input
        :type="type"
        :name="name"
        v-if="type === 'radio'"
        @change="onChange"
        :value="value"
        :checked="state"
        :disabled="disabled"
      />
      <input
        :type="type"
        v-else
        @change="onChange"
        :checked="state"
        :value="value"
        :disabled="disabled"
      />
      <small></small>
    </label>
  </span>
</div>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "input",
  },
  data() {
    return {};
  },
  props: {
    modelValue: { default: undefined },
    value: {},
    checked: { type: Boolean, default: false },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "checkbox",
    },
    name: {
      type: String,
    },
    model: {},
  },
  computed: {
    state() {
      if (this.modelValue === undefined) {
        return this.checked;
      }
      if (this.type == "checkbox") {
        if (Array.isArray(this.modelValue)) {
          return this.modelValue.indexOf(this.value) > -1;
        }
        return !!this.modelValue;
      } else {
        return this.modelValue === this.value;
      }
    },
  },
  methods: {
    onChange() {
      this.toggle();
    },
    toggle() {
      if (this.type == "checkbox") {
        let value;
        if (Array.isArray(this.modelValue)) {
          value = this.modelValue.slice(0);
          if (this.state) {
            value.splice(value.indexOf(this.value), 1);
          } else {
            value.push(this.value);
          }
        } else {
          value = !this.state;
        }
        this.$emit("input", value);
      } else {
        this.$emit("input", this.state ? "" : this.value);
      }
    },
  },
  watch: {
    checked(newValue) {
      if (newValue !== this.state) {
        this.toggle();
      }
    },
  },
  mounted() {
    if (this.checked && !this.state) {
      this.toggle();
    }
  },
};
</script>

<style>
.switch-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 10px; */
}
.tef-toggle-switch {
  display: inline-block;
}
.tef-toggle-switch input {
  display: none;
}
.tef-toggle-switch small {
  display: inline-block;
  width: 43px;
  height: 18px;
  background: #fff;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  border: 1px solid #000;
  padding: 9px;
}
.tef-toggle-switch small:after {
  content: ""; /* if you add lable then put text in content property */
  position: absolute;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  width: 100%;
  left: 0px;
  text-align: right;
  padding: 0 6px;
  box-sizing: border-box;
  line-height: 18px;
}
.tef-toggle-switch small:before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background: #000;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
  box-shadow: -3px 0 3px rgba(0, 0, 0, 0.1);
}
.tef-toggle-switch input:checked ~ small {
  background: #000;
  transition: 0.2s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}
.tef-toggle-switch input:checked ~ small:before {
  transform: translate(23px);
  transition: transform 0.2s;
  background: #fff;
}
.tef-toggle-switch input:checked ~ small:after {
  content: ""; /* if you add lable then put text in content property */
  text-align: left;
}
</style>
