<template>
  <div>
    <main-navbar />
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pr-mc mt-5">
          <img src="/img/dp.jpg" class="dp-img" alt="Photo" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pl-mc mt-5">
          <h3>Hi there</h3>
          <p>
            This is Shoeb Ahmed Tanjim. A Full Stack Developer at
            <a href="https://www.bitechx.com" target="_blank">Bitechx</a>. I'm a
            undergraduate student of department of Computer Science and
            Engineering at Military Institute of Science and Technology.
          </p>
          <p>
            Programming is what I love most and Travelling is what I enjoy most!
            A pet lover but pet is not allowed at my home :')
          </p>
        </div>
      </div>
    </div>
    <hr />
    <section class="container">
      <div class="typewriter">
        <h1>Field of Interest</h1>
      </div>

      <div class="container mt-5">
        <div id="timeline">
          <div class="timeline-item">
            <div class="timeline-icon">
              <img
                src="img/icons/coding.svg"
                class="timeline-img"
                alt="Programming"
              />
            </div>
            <div class="timeline-content">
              <h2>Computer Programming</h2>
              <p>
                I spend most of my time creating new projects using various
                programming language and learn new things
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-icon">
              <img
                src="img/icons/robot.svg"
                class="timeline-img"
                alt="Robotics"
              />
            </div>
            <div class="timeline-content right">
              <h2>Robotics</h2>
              <p>
                Likes to work with Robotics Operating System (ROS), Autonomus
                Robot, Arduino based projects.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-icon">
              <img
                src="img/icons/server.svg"
                class="timeline-img"
                alt="Networking"
              />
            </div>
            <div class="timeline-content">
              <h2>Networking</h2>
              <p>Being a cybersecurity specialist is a big dream of mine</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-icon">
              <img
                src="img/icons/travelling.svg"
                class="timeline-img"
                alt="Travel"
              />
            </div>
            <div class="timeline-content right">
              <h2>Traveling</h2>
              <p>Loves to do Traveling, Trekking, Cycling.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <main-footer />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.dp-img {
  max-width: 400px;
  width: 100%;
}
a {
  color: #fff !important;
}

a:hover {
  color: #fff !important;
}
/* Field of interest */
.typewriter {
  text-align: center;
}
.typewriter h1 {
  display: inline-block;
  color: #fff;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid #2f86d2; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3.5s steps(30, end), blink-caret 0.5s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 50%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #2f86d2;
  }
}

@media screen and (max-width: 991px) {
  .typewriter h1 {
    font-size: 1.6em;
    letter-spacing: 1px;
  }
}
/* Timeline */

.timeline-img {
  margin-top: 10px;
  width: 60%;
}

#timeline .timeline-item:after,
#timeline .timeline-item:before {
  content: '';
  display: block;
  width: 100%;
  clear: both;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

#timeline {
  width: 100%;
  margin: 30px auto;
  position: relative;
  padding: 0 10px;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -ms-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

#timeline:before {
  content: '';
  width: 3px;
  height: 100%;
  background: #2f86d2;
  left: 50%;
  top: 0;
  position: absolute;
}

#timeline:after {
  content: '';
  clear: both;
  display: table;
  width: 100%;
}

#timeline .timeline-item {
  margin-bottom: 50px;
  position: relative;
}

#timeline .timeline-item .timeline-icon {
  text-align: center;
  background: #2f86d2;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  overflow: hidden;
  margin-left: -23px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
}

#timeline .timeline-item .timeline-content {
  width: 45%;
  background: #fff;
  padding: 20px;
  -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#timeline .timeline-item .timeline-content h2 {
  padding: 15px;
  background: #2f86d2;
  color: #fff;
  margin: -20px -20px 0 -20px;
  font-weight: 300;
  -webkit-border-radius: 3px 3px 0 0;
  -moz-border-radius: 3px 3px 0 0;
  -ms-border-radius: 3px 3px 0 0;
  border-radius: 3px 3px 0 0;
}

#timeline .timeline-item .timeline-content:before {
  content: '';
  position: absolute;
  left: 45%;
  top: 20px;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid #2f86d2;
}

#timeline .timeline-item .timeline-content.right {
  float: right;
}

#timeline .timeline-item .timeline-content.right:before {
  content: '';
  right: 45%;
  left: inherit;
  border-left: 0;
  border-right: 7px solid #2f86d2;
}

.timeline-content p {
  margin-top: 15px;
  color: #111 !important;
}

@media screen and (max-width: 768px) {
  #timeline {
    margin: 30px;
    margin-left: 20px;
    padding: 0px;
    width: 90%;
  }

  #timeline:before {
    left: 0;
  }

  #timeline .timeline-item .timeline-content {
    width: 90%;
    float: right;
  }

  #timeline .timeline-item .timeline-content:before,
  #timeline .timeline-item .timeline-content.right:before {
    left: 10%;
    margin-left: -6px;
    border-left: 0;
    border-right: 7px solid #2f86d2;
  }

  #timeline .timeline-item .timeline-icon {
    left: 0;
  }
}
</style>
