<template>
  <div class="timeline-area">
    <div class="container">
      <div class="timelines">
        <h2>Experience</h2>
      </div>
      <div class="all-timelines">
        <!--SINGLE TIMELINE-->
        <div class="single-timeline d-flex-2">
          <div class="timeline-blank"></div>
          <div class="timeline-text d-flex-2">
            <span>
              <h6>MIST Mars Rover Society</h6>
              — Co-Lead and Software & Communication Team Lead of the Mars Rover
              Society, MIST in 2021.
            </span>
            <div class="t-square"></div>
          </div>
        </div>
        <!--SINGLE TIMELINE-->
        <div class="single-timeline d-flex-2">
          <div class="timeline-blank"></div>
          <div class="timeline-text d-flex-2">
            <span>
              <h6>BiTechX</h6>
              — I started working at BiTechX as a Full Stack Developer in
              January 2020. My tech stack was: Laravel, VueJS, Wordpress, AWS
              etc. The journey ended in December, 2021.
            </span>
            <div class="t-square"></div>
          </div>
        </div>
        <!--SINGLE TIMELINE-->
        <div class="single-timeline d-flex-2">
          <div class="timeline-blank"></div>
          <div class="timeline-text d-flex-2">
            <span>
              <h6>MIST Robotics Club</h6>
              — The journey with this club started in 2018. The journey ended up
              being the Vice President of the club in 2021.
            </span>
            <div class="t-square"></div>
          </div>
        </div>
        <!--SINGLE TIMELINE-->
        <div class="single-timeline d-flex-2">
          <div class="timeline-blank"></div>
          <div class="timeline-text d-flex-2">
            <span>
              <h6>MIST Computer Club</h6>
              — The journey with MIST Computer Club started in 2018. In 2020, I
              was elected as the Vice President and in 2021, I was elected as
              the President of the club.
            </span>
            <div class="t-square"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
ul {
  list-style: none;
  margin: 0 !important;
}

a {
  text-decoration: none !important;
  display: inline-block;
}

img {
  max-width: 100%;
}

button:focus {
  outline: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  /*color: ;*/
  margin: 0;
}
p {
  font-size: 14px;
  line-height: 26px;
  margin: 0;
}
.container {
  width: 100%;
  max-width: 1140px;
  padding: 0 15px;
  box-sizing: border-box;
  margin: 0 auto;
}
.timelines h2 {
  text-align: center;
  color: #fff;
  /*font-weight: 600;*/
  font-weight: 200;
  margin-bottom: 40px;
  font-size: 32px;
}
.d-flex-2 {
  display: flex;
  align-items: center;
}
.timeline-area {
  padding: 10px 0;
}
.all-timelines {
  position: relative;
}
.all-timelines::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 2px;
  background: #a3aee2 /* #efa22f*/;
  top: 20px;
}
.single-timeline {
  margin-bottom: 22px;
}
.timeline-blank {
  width: 50%;
}
.timeline-text {
  width: 50%;
  padding-left: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}
.timeline-text h6 {
  color: #f0f1f2;
  font-weight: 900;
  display: inline-block;
  font-size: 1rem;
}
.timeline-text span {
  color: #f0f1f2;
  display: block;
  width: 100%;
}
.single-timeline:nth-child(even) .timeline-text span {
  text-align: right;
}
.t-square {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  left: -6px;
  background: #a3aee2 /*#efa22f*/;
}
.single-timeline:nth-child(even) {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}
.single-timeline:nth-child(even) .t-square {
  right: -6px;
  left: unset;
}
.single-timeline:nth-child(even) .timeline-text {
  padding-left: 0;
  padding-right: 30px;
  text-align: right;
}

@media all and (max-width: 991px) {
}
@media all and (max-width: 768px) {
  .all-timelines::before {
    right: unset;
    top: 0;
  }
  .single-timeline:nth-child(2n) .timeline-text {
    padding-left: 30px;
    padding-right: 0;
    text-align: left;
  }
  .single-timeline:nth-child(2n) .t-square {
    left: -6px;
    right: unset;
  }
  .timeline-blank {
    display: none;
  }
  .timeline-text {
    width: 100%;
  }
  .single-timeline:nth-child(even) .timeline-text span {
    text-align: left !important;
  }
}
@media all and (max-width: 575px) {
}
@media all and (max-width: 360px) {
  .all-timelines::before {
    top: 32px;
  }
}
</style>
