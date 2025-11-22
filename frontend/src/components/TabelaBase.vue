<template>
  <div class="overflow-hidden rounded-xl shadow bg-white mt-6">
    <table class="w-full">
      <thead class="bg-gray-900 text-white">
        <tr>
          <th v-for="h in headers" :key="h" class="px-4 py-3 text-left text-sm font-semibold">
            {{ h }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: Array
})
</script>
