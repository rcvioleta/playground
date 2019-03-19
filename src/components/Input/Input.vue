<template>
  <div class="form-group">
    <template v-if="elementType === 'input'">
      <label for>{{ label }}</label>
      <input
        :type="elementConfig.type"
        :name="elementConfig.name"
        :placeholder="elementConfig.placeholder"
        :class="elementConfig.className"
        @input="change"
        @keydown.tab="tabEvent"
      >
    </template>
    <template v-else-if="elementType === 'textarea'">
      <label for>{{ label }}</label>
      <textarea
        :name="elementConfig.name"
        :class="elementConfig.className"
        cols="30"
        rows="10"
        :placeholder="elementConfig.placeholder"
        @input="change"
      ></textarea>
    </template>
    {{ className }}
  </div>
</template>

<script>
export default {
  props: [
    "elementType",
    "elementConfig",
    "label",
    "change",
    "className",
    "tabEvent"
  ],
  data() {
    return {};
  }
};
</script>

<style>
</style>
