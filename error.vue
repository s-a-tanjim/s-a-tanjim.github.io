<template>
  <NuxtLayout>
    <div class="error-page">

      <div class="page-banner">
        <h1 class="banner-title">{{ error?.statusCode || 'Error' }} — {{ statusText }}</h1>
        <p class="banner-sub">{{ error?.message || 'Looks like you have lost somewhere.' }}</p>
      </div>

      <div class="error-content">
        <fieldset class="xp-group">
          <legend>{{ error?.statusCode === 404 ? 'Page not found' : 'Error' }}</legend>

          <div class="error-body">
            <div class="error-icon" aria-hidden="true">
              <span class="icon-mark">?</span>
            </div>
            <div class="error-text">
              <p class="prose">
                <template v-if="error?.statusCode === 404">
                  The page <code>{{ requestedPath }}</code> could not be found on this computer.
                </template>
                <template v-else>
                  Something went wrong while loading this page.
                </template>
              </p>
              <p class="prose muted">
                You can return to the home page, or use the task pane on the left to navigate.
              </p>
            </div>
          </div>

          <div class="actions">
            <button type="button" class="xp-btn primary" @click="goHome">
              <span class="btn-icon home"></span><span>Back to Home</span>
            </button>
            <button type="button" class="xp-btn" @click="goBack" :disabled="!canGoBack">
              <span class="btn-icon back"></span><span>Go Back</span>
            </button>
          </div>
        </fieldset>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError & { url?: string }
}>()

const route = useRoute()
const router = useRouter()

const statusText = computed(() => {
  const map: Record<number, string> = { 404: 'Page Not Found', 500: 'Server Error' }
  /* 0 is never a real status, so an absent code falls through. */
  return map[props.error.statusCode ?? 0] || 'Something went wrong'
})

const requestedPath = computed(() => {
  /* `data` is free-form on NuxtError; Nuxt's router puts the missing
     route on `.path` when it raises a 404. */
  const data = props.error.data as { path?: string } | undefined
  return props.error.url || data?.path || route.fullPath || '/'
})
const canGoBack = computed(() => typeof window !== 'undefined' && window.history.length > 1)

const goHome = () => clearError({ redirect: '/' })
const goBack = () => {
  if (canGoBack.value) router.back()
  else clearError({ redirect: '/' })
}
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.page-banner {
  padding: 14px 24px;
  background:
    linear-gradient(90deg,
      #FFFFFF 0%,
      #D6DFF7 60%,
      #7BA2E8 100%);
  border-bottom: 1px solid #4D6FCD;
  color: #0F2C70;
}
.banner-title {
  font-family: var(--font-family-title);
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 0.01em;
  line-height: 1.2;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.6);
}
.banner-sub {
  font-size: var(--font-size-sm);
  color: #36497B;
  margin-top: 2px;
}

.error-content {
  padding: 18px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

.xp-group {
  border: 1px solid #919B9C;
  border-radius: 3px;
  padding: 12px 16px 14px;
  background: var(--xp-window);
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #E2DECC;
}
.xp-group legend {
  padding: 0 6px;
  font-weight: bold;
  color: #0033CC;
  font-size: var(--font-size-sm);
}

.error-body {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 4px 0 12px;
}
.error-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #FFE99C 0%, #FFC83D 100%);
  border: 1px solid #B07B0A;
  border-radius: 50%;
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 rgba(0, 0, 0, 0.15);
}
.icon-mark {
  font-family: var(--font-family-title);
  font-size: 28px;
  font-weight: bold;
  color: #5A3F00;
  line-height: 1;
}
.error-text { flex: 1; min-width: 0; }

.prose {
  font-size: var(--font-size-base);
  color: #000;
  line-height: 1.55;
  margin-bottom: 6px;
  word-break: break-word;
}
.prose:last-child { margin-bottom: 0; }
.prose.muted { color: #4A5A8A; font-size: var(--font-size-sm); }
.prose code {
  padding: 1px 5px;
  background: #F4F1E0;
  border: 1px solid #C8C0A8;
  border-radius: 2px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 0.95em;
  color: #003C74;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.xp-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 96px;
  padding: 5px 14px;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  color: #000;
  cursor: pointer;
  background: linear-gradient(180deg, #FCFCFC 0%, #F0EDDD 50%, #D4D0C0 100%);
  border: 1px solid #003C74;
  border-radius: 3px;
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #ACA899;
  text-decoration: none;
}
.xp-btn:hover:not(:disabled) {
  background: linear-gradient(180deg, #FFFEF1 0%, #FFE9A5 50%, #E5CC75 100%);
  border-color: #C0985C;
}
.xp-btn:disabled { color: #9E9E9E; cursor: default; opacity: 0.7; }
.xp-btn.primary {
  font-weight: bold;
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #ACA899,
    0 0 0 1px #003C74;
}

.btn-icon { width: 14px; height: 14px; flex-shrink: 0; }
.btn-icon.home {
  background: linear-gradient(180deg, #E04A3E 0%, #B71F1F 100%);
  clip-path: polygon(50% 5%, 95% 45%, 85% 45%, 85% 95%, 60% 95%, 60% 65%, 40% 65%, 40% 95%, 15% 95%, 15% 45%, 5% 45%);
}
.btn-icon.back {
  background: linear-gradient(180deg, #B7C8E5 0%, #4D6FCD 100%);
  clip-path: polygon(40% 0, 40% 35%, 100% 35%, 100% 65%, 40% 65%, 40% 100%, 0 50%);
}

@media (max-width: 600px) {
  .page-banner { padding: 12px 16px; }
  .banner-title { font-size: 18px; }
  .error-content { padding: 14px 16px 24px; }
  .error-body { gap: 12px; }
  .error-icon { width: 40px; height: 40px; }
  .icon-mark { font-size: 22px; }
}
</style>
