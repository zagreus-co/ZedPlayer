// Our Company : https://zagreus.company
// Main Variables

const player = document.querySelector("#videoPlayer");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const pausePlayBtn = document.querySelector("#pausePlay");
const playerDuration = document.querySelector("#duration");
const backwardBtn = document.querySelector("#backward");
const forwardBtn = document.querySelector("#forward");
const screenResizer = document.querySelector("#screenResizer");
const controls = document.querySelector("#controls");
const container = document.querySelector("#container");
const soundBtn = document.querySelector("#sound");
const updateVolume = document.querySelector("#updateVolume");
const videoSpeed = document.querySelector("#videoSpeed");

let timeDrag = false;
let hour = Number(Math.floor(player.duration / 3600));
let minute = Number(Math.floor((player.duration % 3600) / 60));
let second = Math.ceil((player.duration % 60) - 1);

if (hour < 10) {
  hour = "0" + hour;
}
if (minute < 10) {
  minute = "0" + minute;
}
if (second < 10) {
  second = "0" + second;
}

// Total Time Set

totalTime.innerHTML = `${hour != 0 ? `${hour} :` : ""}${minute}:${second}`;

// Pause and Play Function

let pausePlay = () => {
  if (player.paused == true) {
    player.play();
    pausePlayBtn.innerHTML = `<svg class="svg-inline--fa fa-pause fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>`;
  } else {
    player.pause();
    pausePlayBtn.innerHTML = `<svg class="svg-inline--fa fa-play fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>`;
  }
};

// Current Time

let timeUpdate = () => {
  let secondNumber = Math.floor(player.currentTime);
  let currentHours = Math.floor(secondNumber / 3600);
  let currentMinutes = Math.floor((secondNumber - currentHours * 3600) / 60);
  let currentSeconds = secondNumber - currentHours * 3600 - currentMinutes * 60;

  if (currentHours < 10) {
    currentHours = "0" + currentHours;
  }
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }
  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }
  currentTime.innerHTML = `${
    currentHours != 0 ? `${currentHours} :` : ""
  }${currentMinutes}:${currentSeconds}`;
};
player.addEventListener("timeupdate", timeUpdate);

setInterval(() => {
  playerDuration.style.width = `${
    (100 / player.duration) * player.currentTime
  }%`;
}, 1);

// Time Drag

let drag = (e) => {
  timeDrag = true;
  updateBar(e.pageX);
};

["mouseup"].map((evt) => {
  document.addEventListener(evt, (e) => {
    if (timeDrag) {
      timeDrag = false;
      updateBar(e.pageX);
    }
  });
});

["mousemove"].map((evt) => {
  document.addEventListener(evt, (e) => {
    if (timeDrag) {
      updateBar(e.pageX);
    }
  });
});

let updateBar = (x) => {
  let progress = $("#totalDuration");
  let maxduration = player.duration;
  let position = x - progress.offset().left;
  let percentage = (100 * position) / progress.width();
  if (percentage > 100) {
    percentage = 100;
  }
  if (percentage < 0) {
    percentage = 0;
  }
  player.currentTime = (maxduration * percentage) / 100;
};

// easter egg ;)

$(document).on("keydown", function (e) {
  if (e.which === 90) {
    $(document).on("keydown", function (e) {
      if (e.which === 65) {
        $(document).on("keydown", function (e) {
          if (e.which === 71) {
            $(document).on("keydown", function (e) {
              if (e.which === 82) {
                $(document).on("keydown", function (e) {
                  if (e.which === 69) {
                    $(document).on("keydown", function (e) {
                      if (e.which === 85) {
                        $(document).on("keydown", function (e) {
                          if (e.which === 83) {
                            document.getElementById(
                              "duration"
                            ).style.animation = "totalDuration 0.1s infinite";
                            updateVolume.style.animation =
                              "totalDuration 0.1s infinite";
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

// Backward and Forward btn

let backward = () => {
  player.currentTime -= 10;
};
let forward = () => {
  player.currentTime += 10;
};

// svg adder

playerDuration.innerHTML = `<svg class="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>`;
pausePlayBtn.innerHTML = ` <svg class="svg-inline--fa fa-play fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>`;
backwardBtn.innerHTML = ` <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-50 -50 500 500"><g><path d="M147.917 39.210 L 122.917 62.500 147.917 85.790 L 172.917 109.080 174.220 91.593 L 175.523 74.105 199.220 76.866 C 314.036 90.242,362.967 208.410,285.688 285.688 C 173.488 397.889,4.027 230.192,113.412 115.205 L 129.429 98.368 118.601 87.726 L 107.772 77.083 87.541 98.899 C -20.033 214.899,107.474 396.910,257.135 340.990 C 407.569 284.780,364.899 50.000,204.250 50.000 L 175.479 50.000 174.198 32.960 L 172.917 15.920 147.917 39.210 M142.425 147.917 C 139.814 153.646,134.826 158.333,131.339 158.333 C 126.834 158.333,125.000 162.690,125.000 173.390 C 125.000 187.749,125.579 188.361,137.500 186.611 L 150.000 184.777 150.000 223.638 L 150.000 262.500 162.500 262.500 L 175.000 262.500 175.000 200.000 L 175.000 137.500 161.085 137.500 C 150.287 137.500,146.108 139.833,142.425 147.917 M210.227 147.727 C 200.720 157.235,200.000 160.915,200.000 200.000 C 200.000 250.552,207.169 262.500,237.500 262.500 C 267.831 262.500,275.000 250.552,275.000 200.000 C 275.000 149.448,267.831 137.500,237.500 137.500 C 224.958 137.500,217.753 140.202,210.227 147.727 M247.471 173.257 C 255.471 194.105,248.960 233.333,237.500 233.333 C 228.036 233.333,225.000 225.238,225.000 200.000 C 225.000 174.762,228.036 166.667,237.500 166.667 C 241.593 166.667,246.080 169.633,247.471 173.257 "></path></g></svg>`;
forwardBtn.innerHTML = ` <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-50 -50 500 500"><g><path d="M225.000 32.983 L 225.000 50.000 195.990 50.000 C 35.122 50.000,-7.730 284.720,142.865 340.990 C 292.526 396.910,420.033 214.899,312.459 98.899 L 292.228 77.083 281.399 87.726 L 270.571 98.368 286.588 115.205 C 395.973 230.192,226.512 397.889,114.312 285.688 C 37.033 208.410,85.964 90.242,200.780 76.866 L 224.477 74.105 225.780 91.593 L 227.083 109.080 252.083 86.231 L 277.083 63.382 266.667 52.110 C 260.938 45.910,249.219 35.241,240.625 28.402 L 225.000 15.966 225.000 32.983 M142.425 147.917 C 139.814 153.646,134.826 158.333,131.339 158.333 C 126.834 158.333,125.000 162.690,125.000 173.390 C 125.000 187.749,125.579 188.361,137.500 186.611 L 150.000 184.777 150.000 223.638 L 150.000 262.500 162.500 262.500 L 175.000 262.500 175.000 200.000 L 175.000 137.500 161.085 137.500 C 150.287 137.500,146.108 139.833,142.425 147.917 M210.227 147.727 C 200.720 157.235,200.000 160.915,200.000 200.000 C 200.000 250.552,207.169 262.500,237.500 262.500 C 267.831 262.500,275.000 250.552,275.000 200.000 C 275.000 149.448,267.831 137.500,237.500 137.500 C 224.958 137.500,217.753 140.202,210.227 147.727 M247.471 173.257 C 255.471 194.105,248.960 233.333,237.500 233.333 C 228.036 233.333,225.000 225.238,225.000 200.000 C 225.000 174.762,228.036 166.667,237.500 166.667 C 241.593 166.667,246.080 169.633,247.471 173.257 "></path></g></svg>`;
screenResizer.innerHTML = `<svg width="100%" viewBox="-12 -12 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="#fff" stroke-width="1" fill="#fff" fill-rule="evenodd"><g id="p1-copy-30" transform="translate(-711.000000, -512.000000)" fill="#fff" fill-rule="nonzero"><g id="Group-Copy" transform="translate(48.000000, 296.000000)"><path d="M670.714288,229.714301 L673.285699,232.285712 L668.571418,236.999993 L671.571425,240 L663,240 L663,231.428575 L666,234.428582 L670.714288,229.714301 Z M679.285712,229.714301 L683.999993,234.428582 L687,231.428575 L687,240 L678.428575,240 L681.428582,236.999993 L676.714301,232.285712 L679.285712,229.714301 Z M687,216 L687,224.571425 L683.999993,221.571418 L679.285712,226.285699 L676.714301,223.714288 L681.428582,219 L678.428575,216 L687,216 Z M671.571425,216 L668.571418,219 L673.285699,223.714288 L670.714288,226.285699 L666,221.571418 L663,224.571425 L663,216 L671.571425,216 Z" id="Combined-Shape-Copy-2"></path></g></g></g></svg>`;
soundBtn.innerHTML = `<svg width="100%" viewBox="-12 -11 48 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="p1-copy-30" transform="translate(-870.000000, -489.000000)" fill="#fff"><path d="M882.5,489 L882.5,511 C880.482292,511 878.531445,510.274131 876.99974,508.953345 L876.99974,508.953345 L873.90599,506.285714 L870,506.285714 L870.00026,493.714286 L873.90625,493.714286 L876.99974,491.046917 C878.531445,489.725869 880.482292,489 882.5,489 L882.5,489 Z M888.671419,492.221363 L890.880859,489.999298 C893.537435,492.670988 895,496.223595 895,500.000262 C895,503.646699 893.636562,507.084201 891.151407,509.721723 L890.880859,510.001226 L888.671419,507.779161 C890.737435,505.701274 891.875,502.937458 891.875,500.000262 C891.875,497.180553 890.82662,494.520633 888.914871,492.473969 L888.671419,492.221363 L890.880859,489.999298 Z M884.252474,496.667131 L886.461914,494.445 C887.9375,495.928952 888.75,497.900899 888.75,500.000262 C888.75,501.994595 888.016719,503.874052 886.67826,505.329316 L886.461914,505.555524 L884.252474,503.333393 C885.1375,502.44331 885.625,501.258649 885.625,500.000262 C885.625,498.825767 885.200333,497.71544 884.424152,496.848998 L884.252474,496.667131 L886.461914,494.445 Z" id="Combined-Shape"></path></g></g></svg>`;
videoSpeed.innerHTML = `<svg id="svg" width="100%" viewBox="-100, -71, 600, 425" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="path0" d="M141.935 5.998 C 98.568 20.175,97.581 22.191,116.750 57.410 C 133.294 87.804,133.196 87.735,149.603 80.537 C 156.918 77.329,168.347 73.701,175.000 72.477 C 189.022 69.895,189.444 67.387,182.862 25.806 C 178.382 -2.493,174.160 -4.537,141.935 5.998 M211.528 16.513 C 210.458 26.060,209.241 41.633,208.824 51.120 L 208.065 68.369 229.032 74.157 C 240.565 77.340,252.928 80.909,256.506 82.087 C 263.931 84.533,293.036 31.080,289.417 21.647 C 286.811 14.858,253.699 2.930,231.736 0.869 L 213.473 -0.844 211.528 16.513 M300.207 65.875 C 276.522 94.862,276.541 93.591,299.427 118.485 L 317.904 138.583 345.243 122.189 C 360.279 113.173,373.243 105.160,374.052 104.384 C 379.328 99.319,333.384 41.935,324.053 41.935 C 321.697 41.935,310.966 52.708,300.207 65.875 M52.297 62.535 C 37.394 78.702,22.581 101.064,22.581 107.392 C 22.581 111.550,73.394 141.935,80.347 141.935 C 82.241 141.935,87.264 136.492,91.509 129.839 C 95.755 123.185,103.031 114.223,107.679 109.922 C 119.206 99.253,118.851 98.043,96.436 71.610 C 73.405 44.451,69.673 43.684,52.297 62.535 M353.790 145.728 L 325.322 155.538 327.433 180.188 C 330.750 218.930,327.718 216.129,366.346 216.129 L 400.000 216.129 399.938 192.742 C 399.790 137.146,394.459 131.715,353.790 145.728 M6.070 147.234 C 3.947 149.792,1.541 166.216,0.685 183.994 L -0.863 216.129 33.378 216.129 C 72.428 216.129,69.009 219.182,72.336 181.336 C 73.614 166.804,72.987 160.631,70.124 159.548 C 43.895 149.625,9.563 143.025,6.070 147.234 M109.677 147.113 C 109.677 149.961,118.971 169.921,130.330 191.468 C 141.689 213.016,152.039 237.174,153.329 245.153 C 162.554 302.194,246.832 294.511,245.958 236.708 C 245.586 212.097,232.586 196.610,207.469 190.856 C 200.700 189.305,178.039 177.663,157.112 164.986 C 117.984 141.282,109.677 138.152,109.677 147.113 " stroke="none" fill="#ffffff" fill-rule="evenodd"></path></svg>`;

//off right click menu

player.oncontextmenu = () => {
  return false;
};

// Full screen

let openFullscreen = () => {
  if (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    player.classList.remove("fullscreen-video");
    container.classList.add("container");
    controls.classList.remove("fullscreen-controls");
    screenResizer.innerHTML = `<svg width="100%" viewBox="-12 -12 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="#fff" stroke-width="1" fill="#fff" fill-rule="evenodd"><g id="p1-copy-30" transform="translate(-711.000000, -512.000000)" fill="#fff" fill-rule="nonzero"><g id="Group-Copy" transform="translate(48.000000, 296.000000)"><path d="M670.714288,229.714301 L673.285699,232.285712 L668.571418,236.999993 L671.571425,240 L663,240 L663,231.428575 L666,234.428582 L670.714288,229.714301 Z M679.285712,229.714301 L683.999993,234.428582 L687,231.428575 L687,240 L678.428575,240 L681.428582,236.999993 L676.714301,232.285712 L679.285712,229.714301 Z M687,216 L687,224.571425 L683.999993,221.571418 L679.285712,226.285699 L676.714301,223.714288 L681.428582,219 L678.428575,216 L687,216 Z M671.571425,216 L668.571418,219 L673.285699,223.714288 L670.714288,226.285699 L666,221.571418 L663,224.571425 L663,216 L671.571425,216 Z" id="Combined-Shape-Copy-2"></path></g></g></g></svg>`;
  } else {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
    player.classList.add("fullscreen-video");
    container.classList.remove("container");
    controls.classList.add("fullscreen-controls");
    screenResizer.innerHTML = `<svg width="100%" viewBox="-12 -12 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="p1-copy-30" transform="translate(-750.000000, -512.000000)" fill="#fff" fill-rule="nonzero"><g id="Group-Copy" transform="translate(48.000000, 296.000000)"><path d="M712.285699,229.714301 L712.285699,238.285726 L709.285699,235.285719 L704.571411,240 L702,237.428589 L706.714281,232.714308 L703.714274,229.714301 L712.285699,229.714301 Z M724.285726,229.714301 L721.285719,232.714308 L726,237.428589 L723.428589,240 L718.714308,235.285719 L715.714301,238.285726 L715.714301,229.714301 L724.285726,229.714301 Z M723.428589,216 L726,218.571411 L721.285719,223.285699 L724.285726,226.285699 L715.714301,226.285699 L715.714301,217.714274 L718.714308,220.714281 L723.428589,216 Z M704.571411,216 L709.285699,220.714281 L712.285699,217.714274 L712.285699,226.285699 L703.714274,226.285699 L706.714281,223.285699 L702,218.571411 L704.571411,216 Z" id="Combined-Shape-Copy-3"></path></g></g></g></svg>`;
  }
};

// Sound

let sound = () => {
  if (player.muted == false) {
    player.muted = true;
    updateVolume.style.background = "#555";
    soundBtn.innerHTML = `<svg width="100%" viewBox="-12 -11 48 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd"><path d="M7.05604167,2.04685937 L3.94481771,4.71424479 L0.016328125,4.71424479 L0.016328125,17.2857552 L3.94464583,17.2857552 L7.05604167,19.9533698 C8.59644271,21.274 10.5586823,22 12.5878385,22 L12.5878385,0 C10.5586823,0 8.59644271,0.726 7.05604167,2.04685937 Z"></path></g></svg>`;
  } else {
    player.muted = false;
    updateVolume.style.background = "#ff0000";
    soundBtn.innerHTML = `<svg width="100%" viewBox="-12 -11 48 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="p1-copy-30" transform="translate(-870.000000, -489.000000)" fill="#fff"><path d="M882.5,489 L882.5,511 C880.482292,511 878.531445,510.274131 876.99974,508.953345 L876.99974,508.953345 L873.90599,506.285714 L870,506.285714 L870.00026,493.714286 L873.90625,493.714286 L876.99974,491.046917 C878.531445,489.725869 880.482292,489 882.5,489 L882.5,489 Z M888.671419,492.221363 L890.880859,489.999298 C893.537435,492.670988 895,496.223595 895,500.000262 C895,503.646699 893.636562,507.084201 891.151407,509.721723 L890.880859,510.001226 L888.671419,507.779161 C890.737435,505.701274 891.875,502.937458 891.875,500.000262 C891.875,497.180553 890.82662,494.520633 888.914871,492.473969 L888.671419,492.221363 L890.880859,489.999298 Z M884.252474,496.667131 L886.461914,494.445 C887.9375,495.928952 888.75,497.900899 888.75,500.000262 C888.75,501.994595 888.016719,503.874052 886.67826,505.329316 L886.461914,505.555524 L884.252474,503.333393 C885.1375,502.44331 885.625,501.258649 885.625,500.000262 C885.625,498.825767 885.200333,497.71544 884.424152,496.848998 L884.252474,496.667131 L886.461914,494.445 Z" id="Combined-Shape"></path></g></g></svg>`;
  }
};

//volume

document.querySelector("#vol").value = "100"; // for first load

let volumeChange = () => {
  let vol = document.querySelector("#vol").value;
  player.volume = vol / 100;
  updateVolume.style.width = `${vol}%`;
};

volumeChange();

// The keyboard support

document.body.onkeydown = (e) => {
  if (e.keyCode === 39) {
    e.preventDefault();
    forward();
  }
  if (e.keyCode === 37) {
    e.preventDefault();
    backward();
  }
  if (e.keyCode === 32) {
    e.preventDefault();
    pausePlay();
  }
  if (e.keyCode === 77) {
    sound();
  }
};

// Speeds

let speedChanger = (speedNum) =>{
  player.playbackRate = speedNum; 
}