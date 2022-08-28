"use strict"

const SCALE = 4;
let scrWidth = window.innerWidth;
let scrHeight = window.innerHeight;
const cvs = document.createElement("canvas");
document.body.appendChild(cvs);
cvs.setAttribute("width", scrWidth * SCALE);
cvs.setAttribute("height", scrHeight * SCALE);
cvs.style.width = `${scrWidth}px`;
cvs.style.height = `${scrHeight}px`;
const ctx = cvs.getContext("2d");
ctx.scale(SCALE, SCALE);

//  resize windwo 
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;
const root = document.querySelector(":root");
root.style.setProperty("--winWidth", `${winWidth}px`);
root.style.setProperty("--winHeight", `${winHeight}px`);

window.addEventListener("resize", (e) => {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  scrHeight = window.innerHeight;
  root.style.setProperty("--winWidth", `${winWidth}px`);
  root.style.setProperty("--winHeight", `${winHeight}px`);
});




/* ---------- math ---------- */
const PI = Math.PI;
const sin = x => Math.sin(x);
const cos = y => Math.cos(y);
const atan2 = (y, x) => Math.atan2(y, x);
const abs = n => Math.abs(n);

const toRadian = degree => (degree * Math.PI) / 180;// degree convert to radian
const toDegree = radian => (radian * 180) / Math.PI;// radian convert to Degree

const random = (start = false, end = false, round = false) => {
  if (start && !end) {
    return start + (Math.random() * (end - start));
  } else if (!start && !end) {
    return Math.random() * 1;
  } else if (round) {
    return Math.round(start + (Math.random() * (end - start)));
  } else {
    return start + (Math.random() * (end - start));
  }
};

const lerp = (a, b, t) => a + (b - a) * t;

// segment intersection
const getIntersection = (a, b, c, d) => {
  const tTop = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
  const uTop = (c.y - a.y) * (a.x - b.x) - (c.x - a.x) * (a.y - b.y);
  const bottom = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

  if (bottom) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        offset: t
      }
    }
  }
  return null;
}


/* e.x 
(0 start) -------.------ (10 end) input . = 5
(10 min) ----------------.---------------- (30 max) output . = 20
*/
const map = (point, start, end, min, max) => {
  const per = (point - start) / (end - start);
  return ((max - min) * per) + min;
}


/* ------------- canvas ------------ */
const color = (r = false, g = false, b = false, a = false) => {
  if (typeof a === "number") {
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  } else if (typeof b === "number") {
    ctx.fillStyle = `rgba(${r}, ${g}, ${0}, ${b})`;
  } else if (typeof g === "number") {
    ctx.fillStyle = `rgba(${r}, ${0}, ${0}, ${g})`;
  } else if (typeof r === "string") {
    ctx.fillStyle = r;
  } else if (typeof r === "number") {
    ctx.fillStyle = `rgba(${r}, ${r}, ${r}, ${1})`;
  } else {
    ctx.fillStyle = `rgba(${0}, ${0}, ${0}, ${1})`;
  }
}

const strokeStyle = (r = false, g = false, b = false, a = false) => {
  if (typeof a === "number") {
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  } else if (typeof b === "number") {
    ctx.strokeStyle = `rgba(${r}, ${g}, ${0}, ${b})`;
  } else if (typeof g === "number") {
    ctx.strokeStyle = `rgba(${r}, ${0}, ${0}, ${g})`;
  } else if (typeof r === "string") {
    ctx.strokeStyle = r;
  } else if (typeof r === "number") {
    ctx.strokeStyle = `rgba(${r}, ${r}, ${r}, ${1})`;
  } else {
    ctx.strokeStyle = `rgba(${0}, ${0}, ${0}, ${1})`;
  }
}



const background = (r = false, g = false, b = false, a = false) => {
  if (typeof a === "number") {
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  } else if (typeof b === "number") {
    ctx.fillStyle = `rgba(${r}, ${g}, ${0}, ${b})`;
  } else if (typeof g === "number") {
    ctx.fillStyle = `rgba(${r}, ${0}, ${0}, ${g})`;
  } else if (typeof r === "string") {
    ctx.fillStyle = r;
  } else if (typeof r === "number") {
    ctx.fillStyle = `rgba(${r}, ${r}, ${r}, ${1})`;
  } else {
    ctx.fillStyle = `rgba(${0}, ${0}, ${0}, ${1})`;
  }
  ctx.fillRect(0, 0, cvs.width, cvs.height);
}




const randomColor = () => `hsl(${Math.round(Math.random() * 360)} , 100%, 50%)`;

const clrScr = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
}
const clearRect = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
}
const fill = (c = 0) => {
  color(c, c, c, 1);
  ctx.fillRect(0, 0, cvs.width, cvs.height);
}
const translate = (x, y) => {
  ctx.translate(x, y);
}
const transform = (ox, nx, oy, ny) => {
  ctx.transform(ox, nx, oy, ny);
}
const font = (font) => {
  ctx.font = font;
}
const text = (text, x, y, w) => {
  ctx.fillText(text, x, y, w);
}
const save = () => {
  ctx.save();
}
const restore = () => {
  ctx.restore();
}
const rotate = (angle) => {
  ctx.rotate(angle);
}
const scale = (x, y) => ctx.scale(x, y);
const line = (sx, sy, ex, ey, width = 1, round = false, lineDash = []) => {
  ctx.beginPath();
  ctx.lineWidth = width;
  if (round) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }
  lineDash && ctx.setLineDash(lineDash);
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.stroke();
  ctx.closePath();
}

const moveTo = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};
const lineTo = (x, y) => ctx.lineTo(x, y);

const stroke = (strokeWidth) => {
  ctx.lineWidth = strokeWidth;
  ctx.stroke();
}

const curve = (sx, sy, ex, ey, width = 1, radius = 20, fill = false) => {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.moveTo(sx, sy);
  const midx = sx + (ex - sx) / 2;
  const midy = sy + (ey - sy) / 2;
  ctx.quadraticCurveTo(midx, midy - radius, ex, ey);
  ctx.stroke();
  fill && ctx.fill();
}

const rect = (x, y, w, h, fill = true, outline = false, lineWidth = 1) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  fill && ctx.fill();
  if (outline) {
    ctx.stroke();
    ctx.lineWidth = lineWidth;
  }
  ctx.closePath();
}

const fillRect = (x, y, w, h) => {
  ctx.fillRect(x, y, w, h);
}
const arc = (x, y, r, fill = true, outline = false, lineWidth = 1) => {
  ctx.beginPath();
  const nr = outline ? r - outline : r;
  ctx.arc(x, y, nr, 0, PI * 2, false);
  ctx.closePath();
  fill && ctx.fill();
  if (outline) {
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.closePath();
}


const _$ = (givMe) => {
  const self = document.querySelectorAll(givMe);
  self.T = (text) => {
    self.forEach((all) => {
      all.innerText = text;
    });
  };
  self.O = (event, fun) => {
    self.forEach((all) => {
      all.addEventListener(event, fun);
    });
  };
  self.S = (object) => {
    const css = Object.entries(object);
    self.forEach((all) => {
      css.forEach(([prorerty, value]) => {
        all.style[prorerty] = value;
      });
    });
  };
  return self;
};

// return Id
const ID = (id) => {
  const self = document.getElementById(id);
  self.on = (event, fun) => {
    self.addEventListener(event, fun);
  };
  return self;
};

// class add in html
function addClass(array, className = "active") {
  if (array.length == undefined) {
    array.classList.forEach(() => array.classList.add(className));
  } else {
    array.forEach((element) => element.classList.add(className));
  }
}

// claass remove in html
function removeClass(array, className = "active") {
  if (array.length == undefined) {
    array.classList.forEach(() => array.classList.remove(className));
  } else {
    array.forEach((element) => element.classList.remove(className));
  }
}


const animation = (fps, run, fun) => {
  if (run) {
    setTimeout(() => {
      fun();
      animation(fps, run, fun);
    }, 1000 / fps)
  }
}