<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #e2b7d3;
  border-top-color: #ad1457;
  border-radius: 50%;
  animation: spin .8s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
