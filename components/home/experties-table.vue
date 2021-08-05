<template>
  <div class="exp-table">
    <div class="field">
      <div>Languages</div>
      <div>JavaScript</div>
      <div>Python</div>
      <div>C++</div>
    </div>
    <div class="field">
      <div>Frameworks</div>
      <div>ExpressJS</div>
      <div>Django</div>
      <div>NuxtJS</div>
    </div>
    <div class="field">
      <div>Database</div>
      <div>MySQL</div>
      <div>SQLite</div>
      <div>Firebase</div>
    </div>
    <div class="field">
      <div>AWS</div>
      <div>S3</div>
      <div>EC2</div>
      <div>RDS</div>
    </div>
    <div class="field">
      <div>Tools</div>
      <div>Docker</div>
      <div>Git</div>
      <div>Jira</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.exp-table {
  display: flex;
  justify-content: space-around;
}
.field {
  width: -webkit-fill-available;
}

.field div {
  padding: 5px 10px;
}

.field div:nth-child(1) {
  font-weight: bold;
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