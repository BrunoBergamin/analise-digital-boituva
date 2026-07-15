/* ============================================================
   Fundo 3D (Three.js / WebGL): orbe de pontos girando.
   Adaptado do hero3d do projeto Ponto Cego para servir de plano
   de fundo da página inteira. As duas cores do gradiente vêm de
   window.BG3D = { a: 0xRRGGBB, b: 0xRRGGBB, dust: 0xRRGGBB }.
   Degrada em silêncio se o WebGL/Three.js não carregar.
   ============================================================ */
(function () {
  var canvas = document.getElementById("bg3d");
  if (!canvas) return;
  if (typeof THREE === "undefined" || !temWebGL()) return;

  var cfg = window.BG3D || {};
  var CA = new THREE.Color(cfg.a != null ? cfg.a : 0x6bb3c4);
  var CB = new THREE.Color(cfg.b != null ? cfg.b : 0x4f8fd0);
  var CDUST = new THREE.Color(cfg.dust != null ? cfg.dust : 0x5560a0);

  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fraco = (matchMedia("(pointer: coarse)").matches) || (navigator.hardwareConcurrency || 8) <= 4;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !fraco, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, fraco ? 1.5 : 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 7.4;

  var orbe = new THREE.Group();
  scene.add(orbe);

  // ---- esfera de pontos ----
  var R = 2.55;
  var geoPts = new THREE.BufferGeometry();
  var N = fraco ? 900 : 1700;
  var pos = new Float32Array(N * 3);
  var cores = new Float32Array(N * 3);
  for (var i = 0; i < N; i++) {
    var y = 1 - (i / (N - 1)) * 2;
    var rad = Math.sqrt(1 - y * y);
    var theta = 2.399963 * i;
    var x = Math.cos(theta) * rad;
    var z = Math.sin(theta) * rad;
    pos[i * 3] = x * R;
    pos[i * 3 + 1] = y * R;
    pos[i * 3 + 2] = z * R;
    var c = CA.clone().lerp(CB, (y + 1) / 2);
    cores[i * 3] = c.r; cores[i * 3 + 1] = c.g; cores[i * 3 + 2] = c.b;
  }
  geoPts.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geoPts.setAttribute("color", new THREE.BufferAttribute(cores, 3));

  var pontos = new THREE.Points(geoPts, new THREE.PointsMaterial({
    size: 0.045, vertexColors: true, transparent: true, opacity: 0.95,
    depthWrite: false, blending: THREE.AdditiveBlending
  }));
  orbe.add(pontos);

  // ---- wireframe interno sutil ----
  var wireMat = new THREE.MeshBasicMaterial({
    color: CA.clone().lerp(new THREE.Color(0x000000), 0.55).getHex(),
    wireframe: true, transparent: true, opacity: 0.3
  });
  orbe.add(new THREE.Mesh(new THREE.IcosahedronGeometry(R * 0.99, 1), wireMat));

  // ---- poeira de fundo ----
  var dustGeo = new THREE.BufferGeometry();
  var ND = fraco ? 180 : 420;
  var dpos = new Float32Array(ND * 3);
  for (var k = 0; k < ND; k++) {
    dpos[k * 3] = (Math.random() - 0.5) * 24;
    dpos[k * 3 + 1] = (Math.random() - 0.5) * 16;
    dpos[k * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
  var dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    size: 0.03, color: CDUST, transparent: true, opacity: 0.5, depthWrite: false
  }));
  scene.add(dust);

  // ---- tilt pelo mouse / giroscópio ----
  var mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener("mousemove", function (e) {
    tx = (e.clientX / window.innerWidth - 0.5);
    ty = (e.clientY / window.innerHeight - 0.5);
  });
  window.addEventListener("deviceorientation", function (e) {
    if (e.gamma != null) { tx = Math.max(-0.5, Math.min(0.5, e.gamma / 60)); ty = Math.max(-0.5, Math.min(0.5, (e.beta - 40) / 60)); }
  });

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  var abaOculta = false;
  document.addEventListener("visibilitychange", function () { abaOculta = document.hidden; });

  var t0 = 0;
  function loop(t) {
    requestAnimationFrame(loop);
    if (abaOculta) { t0 = t; return; }
    var dt = (t - t0) / 1000; t0 = t;

    if (!reduzir) {
      orbe.rotation.y += 0.0016 + dt * 0.015;
      dust.rotation.y += 0.0005;
    }
    mx += (tx - mx) * 0.05;
    my += (ty - my) * 0.05;
    orbe.rotation.y += mx * 0.015;
    orbe.rotation.x = -0.15 + my * 0.3;
    camera.position.x = mx * 1.1;
    camera.position.y = -my * 0.7;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  requestAnimationFrame(loop);

  function temWebGL() {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  }
})();
