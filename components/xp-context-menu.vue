<template>
  <div
    ref="root"
    class="ctx"
    :style="{ left: pos.x + 'px', top: pos.y + 'px' }"
    @contextmenu.prevent
  >
    <template v-for="(item, i) in items" :key="i">
      <div v-if="item.separator" class="ctx-sep"></div>
      <div
        v-else
        class="ctx-row"
        @mouseenter="openIndex = item.children ? i : -1"
      >
        <button
          type="button"
          class="ctx-item"
          :class="{ disabled: item.disabled, 'has-sub': item.children, open: item.children && openIndex === i }"
          @click="choose(item)"
        >
          <span class="ctx-ico">{{ item.icon || '' }}</span>
          <span class="ctx-label" :class="{ bold: item.bold }">{{ item.label }}</span>
          <span v-if="item.children" class="ctx-arrow">▶</span>
          <span v-else-if="item.hint" class="ctx-hint">{{ item.hint }}</span>
        </button>

        <!-- one level of submenu, anchored to this row -->
        <div v-if="item.children && openIndex === i" class="ctx ctx-sub">
          <button
            v-for="(sub, j) in item.children"
            :key="j"
            type="button"
            class="ctx-item"
            :class="{ disabled: sub.disabled }"
            @click="choose(sub)"
          >
            <span class="ctx-ico">{{ sub.icon || '' }}</span>
            <span class="ctx-label">{{ sub.label }}</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/* One row of the menu. A row is either a separator, a submenu parent
   (`children`), or a command (`action`); `disabled` greys it out. Lives
   in a plain <script> block so callers can import the type. */
export interface CtxItem {
  label?: string
  icon?: string
  action?: string
  hint?: string
  bold?: boolean
  disabled?: boolean
  separator?: boolean
  children?: CtxItem[]
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items: CtxItem[]
    x?: number
    y?: number
  }>(),
  { x: 0, y: 0 },
)

const emit = defineEmits<{
  select: [action: string | undefined]
  close: []
}>()

const root = ref<HTMLElement | null>(null)
const openIndex = ref(-1)
const pos = reactive({ x: props.x, y: props.y })

function choose(item: CtxItem) {
  if (item.disabled || item.children) return
  emit('select', item.action)
  emit('close')
}

function clamp() {
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const pad = 4
  if (props.x + r.width > window.innerWidth) pos.x = Math.max(pad, window.innerWidth - r.width - pad)
  if (props.y + r.height > window.innerHeight) pos.y = Math.max(pad, window.innerHeight - r.height - pad)
}

function onDocDown(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node | null)) emit('close')
}
function onKey(e: KeyboardEvent) { if (e.key === 'Escape') emit('close') }
function onBlur() { emit('close') }

onMounted(() => {
  clamp()
  document.addEventListener('mousedown', onDocDown, true)
  document.addEventListener('contextmenu', onDocDown, true)
  document.addEventListener('keydown', onKey)
  window.addEventListener('resize', onBlur)
  window.addEventListener('blur', onBlur)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocDown, true)
  document.removeEventListener('contextmenu', onDocDown, true)
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onBlur)
  window.removeEventListener('blur', onBlur)
})
</script>

<style scoped>
.ctx {
  position: fixed;
  z-index: 300;
  min-width: 168px;
  padding: 2px;
  background: #f5f4ea;
  border: 1px solid #a0a0a0;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.35);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  color: #000;
}
.ctx-row { position: relative; }
.ctx-sub {
  position: absolute;
  left: 100%;
  top: -3px;              /* line the first sub-item up with its parent */
  margin-left: -2px;      /* overlap the parent border, no gap */
}
/* keep the parent item highlighted while its submenu is open */
.ctx-item.open { background: var(--xp-selection); color: #fff; }
.ctx-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 4px 22px 4px 6px;
  background: transparent;
  border: none;
  border-radius: 0;
  color: #000;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  cursor: pointer;
  position: relative;
}
.ctx-item:hover:not(.disabled) { background: var(--xp-selection); color: #fff; }
.ctx-item.disabled { color: #9a9a9a; cursor: default; }
.ctx-ico { width: 16px; text-align: center; flex-shrink: 0; font-size: 13px; }
.ctx-label { flex: 1; white-space: nowrap; }
.ctx-label.bold { font-weight: bold; }
.ctx-arrow { font-size: 8px; opacity: 0.8; }
.ctx-hint { font-size: 11px; opacity: 0.7; margin-left: 12px; }
.ctx-item:hover:not(.disabled) .ctx-hint { opacity: 0.9; }
.ctx-sep { height: 1px; margin: 3px 2px; background: #aca899; box-shadow: 0 1px 0 #fff; }
</style>
