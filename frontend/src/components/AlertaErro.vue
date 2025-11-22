<template>
  <div class="erro">{{ mensagem }}</div>
</template>

<script setup>
defineProps({ mensagem: String })
</script>

<style scoped>
.erro {
  background: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 4px solid #c62828;
}
</style>
