<template>
  <div>
    <div class="btns-container mb-4">
      <button
        @click="selectedTab = 1"
        class="btn btn-secondary"
        :class="{ active: selectedTab == 1 }"
      >
        Software Development
      </button>
      <button
        @click="selectedTab = 2"
        class="btn btn-secondary"
        :class="{ active: selectedTab == 2 }"
      >
        Robotics
      </button>
    </div>
    <div :class="[selectedTab === 1 ? 'show' : 'hide']">
      <div class="exp-table">
        <div class="field">
          <div>Languages</div>
          <div>JavaScript</div>
          <div>Python</div>
          <div>C++</div>
          <div>PHP</div>
          <div>Bash</div>
          <div>HTML5</div>
          <div>CSS|SCSS</div>
        </div>
        <div class="field">
          <div>Frameworks</div>
          <div>ExpressJS</div>
          <div>Laravel</div>
          <div>Django</div>
          <div>VueJS</div>
          <div>NuxtJS</div>
          <div>Bootstrap</div>
        </div>
        <div class="field">
          <div>Database</div>
          <div>MySQL</div>
          <div>SQLite</div>
          <div>Firebase</div>
        </div>
        <div class="field">
          <div>Infrastructure</div>
          <div>AWS | S3</div>
          <div>AWS | EC2</div>
          <div>AWS | RDS</div>
          <div>API</div>
          <div>SPA | PWA</div>
          <div>SSR</div>
        </div>
        <div class="field">
          <div>Tools</div>
          <div>Linux</div>
          <div>Docker</div>
          <div>Git</div>
          <div>Jira</div>
          <div>Google SEO</div>
          <div>Bluehost</div>
        </div>
      </div>
    </div>
    <div :class="[selectedTab === 2 ? 'show' : 'hide']">
      <div class="exp-table">
        <div class="field">
          <div>Languages</div>
          <div>C++</div>
          <div>Arduino</div>
          <div>Assembly</div>
          <div>Python</div>
        </div>
        <div class="field">
          <div>Infrastructure</div>
          <div>ROS</div>
          <div>IoT</div>
          <div>HW interfaces</div>
        </div>
        <div class="field">
          <div>Networking</div>
          <div>WiFi</div>
          <div>RF</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 1,
    }
  },
}
</script>

<style scoped>
.btns-container {
  display: flex;
  justify-content: space-around;
}
.exp-table {
  display: flex;
  justify-content: space-around;
}
.field {
  width: -webkit-fill-available;
  width: -moz-available;
}

.field div {
  padding: 5px 10px;
}

.field div:nth-child(1) {
  font-weight: bold;
  font-size: 1.2em;
  background-color: var(--bg-secondary);
}
@media only screen and (max-width: 991px) {
  .exp-table {
    display: block;
  }
  .field {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid var(--color-primary);
    padding: 5px 0px;
  }
  .field:nth-child(1) {
    border-top: none;
  }
}
</style>