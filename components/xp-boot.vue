<template>
  <div class="xpb" :class="phase" @click="onBackdropClick">
    <!-- ── Boot (BIOS/loading) ─────────────────────── -->
    <div v-if="phase === 'boot'" class="boot">
      <div class="boot-brand">
        <div class="boot-flag">
          <span class="fq q1"></span><span class="fq q2"></span>
          <span class="fq q3"></span><span class="fq q4"></span>
        </div>
        <div class="boot-word">
          <span class="bw-micro">Microsoft</span>
          <span class="bw-xp">Windows<b>xp</b></span>
        </div>
      </div>
      <div class="boot-bar">
        <div class="boot-bar-run"><i></i><i></i><i></i></div>
      </div>
      <div class="boot-copy">Copyright © Microsoft Corporation</div>
    </div>

    <!-- ── Welcome (log-on) ────────────────────────── -->
    <div v-else class="wel">
      <div class="wel-top">
        <span class="wel-word">Windows<b>xp</b></span>
      </div>

      <div class="wel-mid">
        <div class="wel-left">
          <p class="wel-hint" v-if="phase === 'welcome'">To begin, click your user name</p>
          <template v-else>
            <div class="wel-spin"><span></span><span></span><span></span></div>
            <p class="wel-hint">Loading your personal settings…</p>
          </template>
        </div>
        <div class="wel-divider"></div>
        <div class="wel-right">
          <button
            type="button"
            class="wel-user"
            :class="{ busy: phase === 'logon' }"
            @click.stop="logOn"
          >
            <img
              class="wel-avatar"
              :src="profile.avatar.src"
              :srcset="profile.avatar.srcset"
              sizes="48px"
              alt=""
            />
            <span class="wel-name">{{ profile.name }}</span>
          </button>
        </div>
      </div>

      <div class="wel-bottom">
        <div class="wel-turnoff">
          <span class="wel-power">⏻</span>
          <span>Turn off computer</span>
        </div>
        <p class="wel-note">
          After you log on, you can add or change accounts.<br />
          Just go to Control Panel and click User Accounts.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { profile } from '~/data/profile'

const emit = defineEmits(['done'])

/* 'boot' → 'welcome' → 'logon' → done */
const phase = ref('boot')
let timers = []
const after = (ms, fn) => timers.push(setTimeout(fn, ms))

function toWelcome() {
  if (phase.value !== 'boot') return
  phase.value = 'welcome'
  /* Never dead-end: auto-log-on if the visitor just watches. */
  after(6500, () => { if (phase.value === 'welcome') logOn() })
}

function logOn() {
  if (phase.value !== 'welcome') return
  phase.value = 'logon'
  after(1500, () => emit('done'))
}

function onBackdropClick() {
  /* Click anywhere during the boot animation to skip ahead. */
  if (phase.value === 'boot') { clearAll(); toWelcome() }
}

function clearAll() {
  timers.forEach(clearTimeout)
  timers = []
}

onMounted(() => { after(2600, toWelcome) })
onBeforeUnmount(clearAll)
</script>

<style scoped>
.xpb {
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
  font-family: 'Franklin Gothic Medium', 'Trebuchet MS', Tahoma, sans-serif;
  user-select: none;
  animation: xpb-in 0.15s ease;
}
@keyframes xpb-in { from { opacity: 0; } to { opacity: 1; } }

/* ── Boot screen ─────────────────────────────────── */
.boot {
  position: absolute;
  inset: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 34px;
  color: #fff;
}
.boot-brand { display: flex; align-items: center; gap: 16px; }
.boot-flag {
  display: grid;
  grid-template-columns: 15px 15px;
  grid-template-rows: 15px 15px;
  gap: 2px;
  transform: perspective(120px) rotateY(-24deg) skewY(-6deg);
  filter: drop-shadow(0 0 5px rgba(120, 180, 255, 0.5));
}
.fq { border-radius: 3px 3px 2px 2px; }
.q1 { background: #f7443a; }
.q2 { background: #7bc043; }
.q3 { background: #29a3e0; }
.q4 { background: #ffc60b; }
.boot-word { display: flex; flex-direction: column; line-height: 1; }
.bw-micro { font-size: 13px; font-style: italic; color: #e9e9e9; margin-bottom: 3px; letter-spacing: 0.02em; }
.bw-xp { font-size: 40px; font-weight: bold; letter-spacing: -0.01em; }
.bw-xp b {
  color: #ff8a10;
  font-style: italic;
  font-size: 26px;
  vertical-align: super;
  margin-left: 3px;
}
.boot-bar {
  width: 150px;
  height: 15px;
  border: 1px solid #6a6f86;
  border-radius: 8px;
  padding: 2px;
  overflow: hidden;
}
.boot-bar-run {
  display: flex;
  gap: 4px;
  height: 100%;
  width: max-content;
  animation: boot-run 2.1s linear infinite;
}
.boot-bar-run i {
  width: 9px;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(180deg, #7fd0ff 0%, #2a7fe0 50%, #0b52c0 100%);
  box-shadow: 0 0 4px rgba(90, 170, 255, 0.8);
}
@keyframes boot-run {
  from { transform: translateX(-42px); }
  to   { transform: translateX(168px); }
}
.boot-copy {
  position: absolute;
  bottom: 26px;
  font-size: 12px;
  color: #c9c9c9;
}

/* ── Welcome screen ──────────────────────────────── */
.wel {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: minmax(80px, 1fr) minmax(130px, 1.7fr) minmax(72px, 1fr);
  background:
    linear-gradient(180deg,
      #124bb6 0%, #1e5cc9 14%, #3f8ae6 34%,
      #5ea6ef 50%, #3f8ae6 66%, #1e5cc9 86%, #124bb6 100%);
  color: #fff;
}
.wel-top {
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0 0 10px 12%;
  border-bottom: 2px solid #fff;
  box-shadow: 0 3px 10px rgba(120, 180, 255, 0.55);
}
.wel-word, .wel-name, .wel-hint { text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.35); }
.wel-word { font-size: 30px; font-weight: bold; }
.wel-word b { color: #ff8a10; font-style: italic; font-size: 20px; vertical-align: super; margin-left: 2px; }

.wel-mid {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  align-items: center;
  gap: 0 26px;
  padding: 0 8%;
}
.wel-left { justify-self: end; text-align: right; padding-right: 8px; max-width: 260px; }
.wel-hint { font-size: 16px; line-height: 1.4; }
.wel-divider { align-self: stretch; margin: 14px 0; background: rgba(255, 255, 255, 0.5); }
.wel-right { justify-self: start; }

.wel-user {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px 6px 6px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
}
.wel-user:hover { background: rgba(255, 255, 255, 0.16); }
.wel-user.busy { background: rgba(255, 255, 255, 0.22); }
.wel-avatar {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
}
.wel-name { font-size: 20px; font-weight: bold; }

.wel-bottom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  min-height: 74px;
  border-top: 2px solid #fff;
  box-shadow: 0 -3px 10px rgba(120, 180, 255, 0.55);
}
.wel-turnoff { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.wel-power {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(180deg, #e24b3f 0%, #b01d1d 100%);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.4);
  font-size: 14px;
}
.wel-note { font-size: 11px; line-height: 1.4; text-align: right; color: #dbe7ff; }

.wel-spin { display: flex; gap: 5px; justify-content: flex-end; margin-bottom: 8px; }
.wel-spin span {
  width: 8px; height: 8px; border-radius: 50%;
  background: #fff;
  animation: wel-pulse 1s ease-in-out infinite;
}
.wel-spin span:nth-child(2) { animation-delay: 0.15s; }
.wel-spin span:nth-child(3) { animation-delay: 0.3s; }
@keyframes wel-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

.xpb.logon { animation: xpb-out 0.4s ease 1.1s forwards; }
@keyframes xpb-out { to { opacity: 0; } }

@media (max-width: 600px) {
  .wel-mid { grid-template-columns: 1fr; gap: 18px; justify-items: center; text-align: center; }
  .wel-left { justify-self: center; text-align: center; padding: 0; }
  .wel-divider { display: none; }
  .wel-right { justify-self: center; }
  .wel-top { padding-left: 8%; }
  .wel-note { display: none; }
}
</style>
