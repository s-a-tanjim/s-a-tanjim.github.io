<template>
  <footer class="site-footer mt-5" id="contact">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h6>About</h6>
          <p class="text-justify">
            It's a portfolio website created by
            <a href="https://s-a-tanjim.github.io/" target="_blank"
              >s-a-tanjim</a
            >.
          </p>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Language I Use</h6>
          <ul class="footer-links">
            <li>C++</li>
            <li>JavaScript</li>
            <li>Python</li>
            <li>Java</li>
            <li>PHP</li>
            <li>HTML | CSS</li>
          </ul>
        </div>
        <div class="col-xs-6 col-md-3">
          <h6>Framework I Use</h6>
          <ul class="footer-links">
            <li>Vuejs</li>
            <li>Reactjs</li>
            <li>Laravel</li>
            <li>ExpressJS</li>
            <li>Django</li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">
            Copyright &copy; 2021 All Rights Reserved by
            <a href="https://s-a-tanjim.github.io/" target="_blank"
              >s-a-tanjim</a
            >.
          </p>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <ul class="social-icons">
            <li>
              <a class="gmail" href="mailto:shoebtanjim@gmail.com">
                <i class="far fa-envelope"></i>
              </a>
            </li>
            <li>
              <a
                class="github"
                href="https://github.com/s-a-tanjim"
                target="_blank"
              >
                <i class="fab fa-github"></i>
              </a>
            </li>
            <!--<li>
              <a
                class="facebook"
                href="https://www.facebook.com/s.a.tanjim"
                target="_blank"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                class="twitter"
                href="https://twitter.com/s_a_tanjim"
                target="_blank"
              >
                <i class="fab fa-twitter"></i>
              </a>
            </li>-->
            <li>
              <a
                class="linkedin"
                href="https://bd.linkedin.com/in/satanjim"
                target="_blank"
              >
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.site-footer {
  background-color: #26272b;
  padding: 45px 0 20px;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
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
  color: #737373;
}
.site-footer a:hover {
  color: #3366cc;
  text-decoration: none;
}
.footer-links {
  padding-left: 0;
  list-style: none;
}
.footer-links li {
  display: block;
  color: #737373;
}
.footer-links li:active,
.footer-links li:focus,
.footer-links li:hover {
  color: #3366cc;
  text-decoration: none;
}
.footer-links.inline li {
  display: inline-block;
}
.site-footer .social-icons {
  text-align: right;
}
.site-footer .social-icons a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-left: 6px;
  margin-right: 0;
  border-radius: 100%;
  background-color: #33353d;
}
.copyright-text {
  margin: 0;
}
@media (max-width: 991px) {
  .site-footer [class^="col-"] {
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .site-footer {
    padding-bottom: 0;
  }
  .site-footer .copyright-text,
  .site-footer .social-icons {
    text-align: center;
  }
}
.social-icons {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.social-icons li {
  display: inline-block;
  margin-bottom: 4px;
}
.social-icons li.title {
  margin-right: 15px;
  text-transform: uppercase;
  color: #96a2b2;
  font-weight: 700;
  font-size: 13px;
}
.social-icons a {
  background-color: #eceeef;
  color: #818a91;
  font-size: 16px;
  display: inline-block;
  line-height: 44px;
  width: 44px;
  height: 44px;
  text-align: center;
  margin-right: 8px;
  border-radius: 100%;
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
.social-icons.size-sm a {
  line-height: 34px;
  height: 34px;
  width: 34px;
  font-size: 14px;
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
@media (max-width: 767px) {
  .social-icons li.title {
    display: block;
    margin-right: 0;
    font-weight: 600;
  }
}
</style>