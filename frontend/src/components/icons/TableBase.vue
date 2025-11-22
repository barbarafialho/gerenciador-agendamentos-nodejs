<template>
  <table class="tabela">
    <thead>
      <tr>
        <th v-for="h in headers" :key="h">{{ h }}</th>
      </tr>
    </thead>

    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<script setup>
defineProps({ headers: Array })
</script>

<style scoped>
.tabela {
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: var(--shadow);
  border-collapse: collapse;
  overflow: hidden;
}

.tabela th {
  background: #1e1e2f;
  color: white;
  padding: 12px;
}

.tabela td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}
</style>
