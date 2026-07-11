<template>
  <div class="pacman-redirect">Opening Pac-Man…</div>
</template>

<script setup>
const wm = useWindows()
const router = useRouter()

onMounted(() => {
  wm.open('pacman')
  router.replace('/')
})
</script>

<style scoped>
.pacman-redirect {
  padding: 24px;
  font-family: var(--font-family);
  color: var(--text-secondary);
}
</style>
