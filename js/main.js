const FPS = 60;
let run = true;
let fireworks = [];

animation(5, true, () => {
  if (random() < 0.1) {
    const v = scrHeight / 45;
    const vx = random(-0.5, 0.5);
    const vy = random(-v * 0.55, -v * 0.7); 
    const gra = v * 0.006;
    const r = random(2, 3);
    fireworks.push(new Firework(random(scrWidth), scrHeight, r, vx, vy, gra));
  }
})

animation(FPS, run, () => {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].self.complite && (fireworks.splice(i, 1));
  }

  background(0, 0, 0, 0.1);
  fireworks.forEach(firework => {
    firework.draw(); 
    firework.update();
  })
});

