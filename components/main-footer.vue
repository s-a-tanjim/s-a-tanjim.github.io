<template>
  <footer class="site-footer mt-5 py-5">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h6>contact me</h6>
          <p class="text-justify">
            Feel free to reach out to me for any kind of new opportunities or if
            you have any queries.
          </p>
        </div>

        <div class="col-xs-6 col-md-6">
          <div class="social-icons">
            <a class="gmail" :href="email">
              <icons-email class="svg-icon" />
            </a>

            <a
              class="github"
              href="https://github.com/s-a-tanjim"
              target="_blank"
            >
              <icons-github class="svg-icon" />
            </a>

            <a
              class="linkedin"
              href="https://bd.linkedin.com/in/satanjim"
              target="_blank"
            >
              <icons-linkedin class="svg-icon" />
            </a>
            <!--<a
              class="medium"
              href="https://medium.com/@satanjim"
              target="_blank"
            >
              <icons-medium class="svg-icon" />
            </a>
            <a
              class="stackoverflow"
              href="https://stackoverflow.com/users/12639184/sat"
              target="_blank"
            >
              <icons-stackoverflow class="svg-icon" />
            </a>-->
          </div>
        </div>
      </div>
      <hr />
    </div>
    <div class="container text-center">
      <!--Copyright &copy; 2021 All Rights Reserved by-->
      Designed and developed by
      <a href="https://github.com/s-a-tanjim" target="_blank">s-a-tanjim</a>.
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
  mounted() {
    const z = '.com'
    const d = 'tanjim'
    const x = 'gmail'
    const b = 'shoeb'
    const a = 'mailto:'
    this.email = a + b + d + '@' + x + z
  },
}
</script>

<style scoped>
.site-footer {
  background-color: var(--footer-bg);
  font-size: 15px;
  color: var(--footer-txt);
}
.site-footer hr {
  border-top-color: #bbb;
  opacity: 0.5;
}
.site-footer hr.small {
  margin: 20px 0;
}
.site-footer h6 {
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 2px;
}
.site-footer a {
  color: var(--footer-txt);
}

.site-footer .social-icons {
  text-align: right;
}

@media (max-width: 991px) {
  .site-footer [class^='col-'] {
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .site-footer {
    padding-bottom: 0;
  }
  .site-footer .social-icons {
    text-align: center;
  }
}
/*............ */
.site-footer .social-icons a {
  width: 45px;
  height: 45px;
  line-height: 43px;
  margin-left: 6px;
  margin-right: 0;
  border-radius: 100%;
  background-color: #33353d;
  font-size: 16px;
  display: inline-block;
  text-align: center;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}

.social-icons a:active,
.social-icons a:focus,
.social-icons a:hover {
  color: #fff;
  background-color: #29aafe;
}

.gmail .svg-icon {
  height: 24px;
  width: 25px;
}

.github .svg-icon {
  height: 26px;
  width: 24px;
}

.linkedin .svg-icon {
  height: 19px;
  width: 19px;
  margin-top: -2px;
  margin-right: -2px;
}

.medium .svg-icon {
  height: 22px;
  width: 22px;
}

.stackoverflow .svg-icon {
  height: 24px;
  width: 24px;
  margin-right: 1px;
  margin-bottom: 1px;
}

.social-icons a.facebook:hover {
  background-color: #3b5998;
}
.social-icons a.twitter:hover {
  background-color: #00aced;
}
.social-icons a.linkedin:hover {
  background-color: #007bb6;
}
.social-icons a.github:hover {
  background-color: #747474;
}
.social-icons a.gmail:hover {
  background-color: #ea4335;
}
.social-icons a.stackoverflow:hover {
  background-color: #ff9800;
}
</style>
<style >
.site-footer .linkedin:hover path,
.site-footer .github:hover path,
.site-footer .gmail:hover path,
.site-footer .medium:hover path {
  fill: #fff !important;
}
.site-footer .stackoverflow:hover svg {
  fill: #fff !important;
}
</style>