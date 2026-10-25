"use client";

import { useEffect, useRef, useState } from "react";
import { DotField } from "@/components/motion/dot-field";

// "Signal glitch" background: the engineering-paper dot field rendered by one
// fragment shader. A ripple on load, a slow diagonal light band, a soft roll bar,
// and a lens around a mouse pointer; every so often (and whenever the hero name
// glitches) horizontal bands tear sideways, split into amber and cyan channels
// and flicker with scanlines. Falls back to the canvas 2D field without WebGL,
// draws a still frame under reduced motion, and pauses in background tabs.

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;      // CSS px
uniform float uDpr;
uniform float uTime;    // s since start
uniform vec2 uMouse;    // CSS px, y down
uniform float uMouseOn; // 0..1
uniform float uScroll;  // CSS px of grid drift
uniform float uGlitch;  // 0..1 burst intensity
uniform float uSeed;

const float GAP = 28.0;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float dotAt(vec2 q, float r) {
  vec2 c = mod(q, GAP) - GAP * 0.5;
  return 1.0 - smoothstep(r, r + 0.9, length(c));
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;

  // Torn bands: rows of varying height shift sideways during a burst.
  float bandRow = floor(p.y / (34.0 + 40.0 * hash(vec2(floor(p.y / 90.0), uSeed))));
  float bandOn = step(0.78, hash(vec2(bandRow, uSeed + 3.1))) * uGlitch;
  float tear = (hash(vec2(bandRow, uSeed + 7.7)) - 0.5) * 150.0 * bandOn;
  vec2 q = vec2(p.x + tear, p.y);

  // Cursor lens: dots part and swell around the pointer.
  vec2 d = q - uMouse;
  float r = length(d);
  float k = pow(1.0 - smoothstep(0.0, 190.0, r), 2.0) * uMouseOn;
  vec2 s = q - (r > 0.001 ? d / r : vec2(0.0)) * k * 14.0;
  s.y += uScroll;
  float rad = 0.7 + 1.0 * k;

  float a = 0.16;
  float sweep = 0.5 + 0.5 * sin((p.x * 0.7 + p.y) / 300.0 - uTime * 0.45);
  a += 0.18 * pow(sweep, 6.0);
  float rr = length(p - vec2(uRes.x * 0.5, uRes.y * 0.42)) - uTime * 900.0;
  a += 0.45 * exp(-(rr * rr) / 9800.0) * max(0.0, 1.0 - uTime / 2.4);
  float bar = mod(uTime * 90.0, uRes.y + 400.0) - 200.0;
  float barGlow = exp(-pow((p.y - bar) / 46.0, 2.0));
  a += 0.12 * barGlow;
  a += 0.5 * k;

  vec3 ink = vec3(0.929, 0.922, 0.902);
  vec3 cyan = vec3(0.322, 0.827, 0.949);
  float base = dotAt(s, rad);
  vec3 col = ink * base * a;
  float alpha = base * a;

  // A faint cyan haze around the pointer and along the roll bar, plus a fine
  // signal grain, so the ground reads as a live screen rather than flat paint.
  float haze = 0.07 * pow(1.0 - smoothstep(0.0, 320.0, r), 2.0) * uMouseOn + 0.025 * barGlow;
  col += cyan * haze;
  alpha = max(alpha, haze);
  float grain = (hash(floor(p) + fract(uTime * 7.0)) - 0.5) * 0.035;
  col += vec3(grain);
  alpha = max(alpha, abs(grain));

  if (bandOn > 0.0) {
    float split = 5.0 + 6.0 * hash(vec2(bandRow, uSeed + 1.3));
    float am = dotAt(s + vec2(split, 0.0), rad + 0.3);
    float cy = dotAt(s - vec2(split, 0.0), rad + 0.3);
    vec3 amber = vec3(0.949, 0.663, 0.231);
    float g = 0.85 * bandOn;
    col += amber * am * g + cyan * cy * g;
    alpha = max(alpha, max(am, cy) * g);
    float blk = step(0.94, hash(floor(p / vec2(26.0, 5.0)) + uSeed));
    col += ink * blk * 0.12 * bandOn;
    alpha = max(alpha, blk * 0.12 * bandOn);
    float scan = 0.5 + 0.5 * sin(p.y * 3.14159);
    col *= mix(1.0, 0.65 + 0.35 * scan, bandOn);
  }

  gl_FragColor = vec4(col, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
  return sh;
}

export function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) {
      setFallback(true);
      return;
    }

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("link");
    } catch {
      setFallback(true);
      return;
    }
    gl.useProgram(program);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(program, n);
    const U = {
      res: u("uRes"), dpr: u("uDpr"), time: u("uTime"), mouse: u("uMouse"),
      mouseOn: u("uMouseOn"), scroll: u("uScroll"), glitch: u("uGlitch"), seed: u("uSeed"),
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;
    let last = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0, ton: 0 };
    // Burst: a list of [timeMs, intensity, seed] steps played back in order.
    let burst: [number, number, number][] = [];

    const resize = () => {
      dpr = Math.min(1.5, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const glitchNow = (now: number) => {
      if (reduce) return;
      const steps: [number, number, number][] = [];
      let t = now;
      for (const g of [1, 0.35, 0.9, 0, 0.75, 0.2, 0]) {
        steps.push([t, g, Math.random() * 100]);
        t += 45 + Math.random() * 45;
      }
      burst = steps;
    };

    const render = (now: number) => {
      const t = (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;
      mouse.on += (mouse.ton - mouse.on) * 0.08;
      let g = 0;
      let seed = 0;
      for (const [at, gi, si] of burst) if (now >= at) { g = gi; seed = si; }
      if (burst.length && now > burst[burst.length - 1][0]) burst = [];

      gl.uniform2f(U.res, w, h);
      gl.uniform1f(U.dpr, dpr);
      gl.uniform1f(U.time, reduce ? 10 : t);
      gl.uniform2f(U.mouse, mouse.x, mouse.y);
      gl.uniform1f(U.mouseOn, reduce ? 0 : mouse.on);
      gl.uniform1f(U.scroll, window.scrollY * 0.12);
      gl.uniform1f(U.glitch, g);
      gl.uniform1f(U.seed, seed);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let nextIdle = start + 9000 + Math.random() * 5000;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (now > nextIdle) {
        glitchNow(now);
        nextIdle = now + 9000 + Math.random() * 5000;
      }
      const busy = burst.length > 0 || mouse.on > 0.01 || now - start < 2600;
      if (!busy && now - last < 33) return; // idle at ~30 fps
      last = now;
      render(now);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (mouse.x < -999) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.ton = 1;
    };
    const onLeave = () => (mouse.ton = 0);
    const onNameGlitch = () => glitchNow(performance.now());
    const still = () => render(performance.now());
    const onResize = () => {
      resize();
      if (reduce) still();
    };

    resize();
    window.addEventListener("resize", onResize);
    if (reduce) {
      still();
      window.addEventListener("scroll", still, { passive: true });
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("signal:glitch", onNameGlitch);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", still);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("signal:glitch", onNameGlitch);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  if (fallback) return <DotField />;
  return (
    <>
      <canvas ref={ref} aria-hidden className="dot-field" />
      <div aria-hidden className="dot-vignette" />
    </>
  );
}
