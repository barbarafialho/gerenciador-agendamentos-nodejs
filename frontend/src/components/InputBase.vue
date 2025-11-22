<template>
  <div class="campo">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="model"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  type: { default: 'text' },
  placeholder: String
})

const emits = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emits('update:modelValue', v)
})
</script>

<style scoped>
.campo {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: .2s;
}

input:focus {
  border-color: #ad1457;
  box-shadow: 0 0 4px #ffb6d9;
}
</style>
