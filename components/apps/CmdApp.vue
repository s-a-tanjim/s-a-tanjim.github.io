<template>
  <div class="cmd-app" ref="screen" @click="focusInput">
    <p v-for="(ln, i) in lines" :key="i" class="cmd-line" :class="ln.cls">{{ ln.text }}</p>
    <div class="cmd-line cmd-input-line">
      <span class="cmd-prompt">{{ prompt }}</span>
      <input
        ref="input"
        v-model="current"
        class="cmd-input"
        type="text"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        @keydown="onKey"
      />
    </div>
  </div>
</template>

<script setup>
import { profile } from '~/data/profile'

/* Rendered inside an <XpWindow>; `winId` lets the `exit` command close
   its own window through the window manager. */
const props = defineProps({
  winId: { type: String, default: '' },
  focused: { type: Boolean, default: true },
})

const wm = useWindows()
const router = useRouter()

const prompt = 'C:\\Portfolio>'
const lines = ref([])
const current = ref('')
const history = ref([])
let hIndex = -1

const screen = ref(null)
const input = ref(null)

const ROUTES = {
  home: '/', '~': '/', '..': '/',
  about: '/about',
  contact: '/contact',
  resume: '/resume', cv: '/resume',
  works: '/works', projects: '/works',
  achievements: '/achievements',
  pacman: 'app:pacman', game: 'app:pacman', games: 'app:pacman',
}

function print(text = '', cls = '') {
  lines.value.push({ text, cls })
}

function banner() {
  print('Microsoft Windows XP [Version 5.1.2600]')
  print('(C) Copyright 1985-2001 Microsoft Corp.')
  print('')
  print("Type 'help' for a list of commands.", 'dim')
  print('')
}

function scrollDown() {
  nextTick(() => { if (screen.value) screen.value.scrollTop = screen.value.scrollHeight })
}

function focusInput() {
  nextTick(() => input.value && input.value.focus())
}

function go(dest) {
  const key = (dest || '').toLowerCase()
  const target = ROUTES[key]
  if (!target) { print(`The system cannot find the path specified: ${dest}`, 'err'); return }
  if (target.startsWith('app:')) {
    print(`Launching ${key} …`, 'dim')
    wm.open(target.slice(4))
  } else {
    print(`Opening ${target} …`, 'dim')
    router.push(target)
  }
}

const COMMANDS = {
  help() {
    print('Available commands:')
    print('  help                 Show this list')
    print('  dir                  List the portfolio contents')
    print('  cd / start <name>    Open a page/app (about, resume, works, pacman …)')
    print('  whoami               Who is logged on')
    print('  about                Short bio')
    print('  echo <text>          Print text')
    print('  ver                  Windows version')
    print('  date / time          Current date / time')
    print('  ipconfig             Network configuration')
    print('  color                Surprise')
    print('  cls                  Clear the screen')
    print('  exit                 Close the window')
  },
  dir() {
    print(' Volume in drive C is Portfolio')
    print(' Directory of C:\\Portfolio')
    print('')
    const items = [
      ['<DIR>', 'about'], ['<DIR>', 'works'], ['<DIR>', 'achievements'],
      ['<DIR>', 'games'], ['', 'resume.pdf'], ['', 'contact.txt'], ['', 'readme.txt'],
    ]
    for (const [kind, name] of items) {
      print(`01/01/2001  09:00 AM    ${kind.padEnd(8)} ${name}`)
    }
    print('')
    print('               3 File(s)          4 Dir(s)')
  },
  whoami() { print(`microsoftxp\\${profile.username}`) },
  about() {
    print(`${profile.name}`)
    print(`${profile.role} @ ${profile.company}`)
    print(`${profile.city}, ${profile.country}`)
    print('')
    print("Try:  start about   |   start pacman", 'dim')
  },
  echo(args) { print(args.join(' ')) },
  ver() { print(''); print('Microsoft Windows XP [Version 5.1.2600]'); print('') },
  date() { print(`The current date is: ${new Date().toDateString()}`) },
  time() { print(`The current time is: ${new Date().toLocaleTimeString()}`) },
  ipconfig() {
    print('')
    print('Windows IP Configuration')
    print('')
    print('Ethernet adapter Local Area Connection:')
    print('')
    print('   Connection-specific DNS Suffix  . : portfolio.local')
    print('   IP Address. . . . . . . . . . . . : 192.168.0.42')
    print('   Subnet Mask . . . . . . . . . . . : 255.255.255.0')
    print('   Default Gateway . . . . . . . . . : 192.168.0.1')
    print('')
  },
  color() { print('♦ Nice try — but this terminal likes silver on black.', 'accent') },
  cls() { lines.value = [] },
  clear() { lines.value = [] },
  cd(args) { go(args[0]) },
  start(args) { go(args[0]) },
  open(args) { go(args[0]) },
  exit() { wm.close(props.winId) },
}

function run(raw) {
  const trimmed = raw.trim()
  print(`${prompt}${raw}`)
  if (!trimmed) return
  history.value.push(trimmed)
  const [cmd, ...args] = trimmed.split(/\s+/)
  const fn = COMMANDS[cmd.toLowerCase()]
  if (fn) {
    fn(args)
  } else {
    print(`'${cmd}' is not recognized as an internal or external command,`, 'err')
    print('operable program or batch file.', 'err')
  }
}

function onKey(e) {
  /* The terminal owns keystrokes while focused — keep them away from any
     global keydown handlers (e.g. the Pac-Man WASD controls). */
  e.stopPropagation()
  if (e.key === 'Enter') {
    run(current.value)
    current.value = ''
    hIndex = -1
    scrollDown()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (!history.value.length) return
    hIndex = hIndex < 0 ? history.value.length - 1 : Math.max(0, hIndex - 1)
    current.value = history.value[hIndex]
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (hIndex < 0) return
    hIndex = hIndex + 1
    if (hIndex >= history.value.length) { hIndex = -1; current.value = '' }
    else current.value = history.value[hIndex]
  } else if (e.key === 'c' && e.ctrlKey) {
    print(`${prompt}${current.value}^C`)
    current.value = ''
    scrollDown()
  }
}

/* Refocus the prompt whenever this window becomes the active one. */
watch(() => props.focused, (v) => { if (v) focusInput() })

onMounted(() => {
  banner()
  focusInput()
})
</script>

<style scoped>
.cmd-app {
  height: 100%;
  overflow-y: auto;
  padding: 4px 6px 8px;
  background: #000;
  color: #cccccc;
  font-family: 'Lucida Console', 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.35;
}
.cmd-line {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}
.cmd-line.dim { color: #8a8a8a; }
.cmd-line.err { color: #d68a8a; }
.cmd-line.accent { color: #86d0ff; }
.cmd-input-line { display: flex; }
.cmd-prompt { flex-shrink: 0; white-space: pre; }
.cmd-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: #eaeaea;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  caret-color: #cccccc;
  padding: 0 0 0 1px;
}
@media (max-width: 600px) {
  .cmd-app { font-size: 12px; }
}
</style>
