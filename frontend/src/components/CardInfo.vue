<template>
  <div class="card">
    <div class="icon"><slot name="icon" /></div>
    <div>
      <h3>{{ titulo }}</h3>
      <p class="numero">{{ valor }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titulo: String,
  valor: [String, Number]
})
</script>

<style scoped>
.card {
  background: white;
  padding: 20px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: var(--shadow);
}

.icon {
  background: #ffe4f2;
  padding: 12px;
  border-radius: 50%;
  font-size: 20px;
  color: #ad1457;
}

.numero {
  font-size: 30px;
  font-weight: bold;
  margin-top: 4px;
}
</style>
