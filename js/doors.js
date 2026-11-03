// Doors, drawn. Each door is a frame, a panel that swings (scaleX from its hinge),
// and something glimpsed beyond. All share a 200×320 box standing on y=312.
const floor = '<path class="d-floor" d="M0 312.5H200"/>';

export const DOORS = {
  // Dancefloor: a tall arch, a round window flickering with party light, light spilling under the door.
  arch: () => `<svg class="door-svg" viewBox="0 0 200 320" aria-hidden="true">
    <defs>
      <clipPath id="clip-arch"><path d="M44 312V128a56 56 0 0 1 112 0v184z"/></clipPath>
      <radialGradient id="beyond-arch" cx=".5" cy=".75" r=".9"><stop offset="0" stop-color="#FFD27A"/><stop offset=".45" stop-color="#E8459B"/><stop offset="1" stop-color="#2B1660"/></radialGradient>
    </defs>
    <g clip-path="url(#clip-arch)">
      <rect class="beyond" x="44" y="60" width="112" height="252" fill="url(#beyond-arch)"/>
      <g class="panel">
        <rect class="d-panel" x="44" y="60" width="112" height="252"/>
        <path class="d-mould" d="M60 300V170h80v130M60 156v-28a40 40 0 0 1 80 0v28z"/>
        <circle class="d-win party" cx="100" cy="132" r="17"/>
        <path class="d-mould" d="M83 132h34M100 115v34"/>
        <circle class="d-knob" cx="143" cy="222" r="4.5"/>
      </g>
    </g>
    <path class="d-frame" d="M36 312V128a64 64 0 0 1 128 0v184"/>
    <path class="spill party-spill" d="M46 311.5h108"/>
    ${floor}
  </svg>`,

  // Ship: a riveted porthole hatch set into the wall, with the sea moving behind the glass.
  porthole: () => {
    const rivets = Array.from({ length: 14 }, (_, i) => {
      const a = i / 14 * Math.PI * 2;
      return `<circle cx="${(100 + Math.cos(a) * 79).toFixed(1)}" cy="${(176 + Math.sin(a) * 79).toFixed(1)}" r="2.6"/>`;
    }).join('');
    return `<svg class="door-svg" viewBox="0 0 200 320" aria-hidden="true">
    <defs>
      <clipPath id="clip-port"><circle cx="100" cy="176" r="72"/></clipPath>
      <clipPath id="clip-glass"><circle cx="100" cy="168" r="30"/></clipPath>
      <linearGradient id="beyond-port" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4EBD3"/><stop offset=".55" stop-color="#9CC9C4"/><stop offset="1" stop-color="#1F5B6A"/></linearGradient>
    </defs>
    <g clip-path="url(#clip-port)">
      <rect class="beyond" x="28" y="104" width="144" height="144" fill="url(#beyond-port)"/>
      <g class="panel">
        <rect class="d-panel" x="28" y="104" width="144" height="144"/>
        <circle class="d-glass" cx="100" cy="168" r="30"/>
        <g clip-path="url(#clip-glass)"><path class="d-wave" d="M40 176q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0v40H40z"/><path class="d-wave w2" d="M40 186q10-5 20 0t20 0 20 0 20 0 20 0 20 0 20 0v40H40z"/></g>
        <circle class="d-ring" cx="100" cy="168" r="34"/>
        <path class="d-mould" d="M134 216l14 10"/><circle class="d-knob" cx="150" cy="227" r="5"/>
      </g>
    </g>
    <circle class="d-frame" cx="100" cy="176" r="79"/>
    <g class="d-rivets">${rivets}</g>
    ${floor}
  </svg>`;
  },

  // Permits: a narrow municipal door, frosted glass with stencilled lettering, a ticket dispenser on the wall.
  office: () => `<svg class="door-svg" viewBox="0 0 200 320" aria-hidden="true">
    <defs>
      <clipPath id="clip-office"><rect x="58" y="72" width="84" height="240"/></clipPath>
      <linearGradient id="beyond-office" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6D8"/><stop offset="1" stop-color="#C9C29A"/></linearGradient>
    </defs>
    <g clip-path="url(#clip-office)">
      <rect class="beyond" x="58" y="72" width="84" height="240" fill="url(#beyond-office)"/>
      <g class="panel">
        <rect class="d-panel" x="58" y="72" width="84" height="240"/>
        <rect class="d-frost" x="70" y="88" width="60" height="78" rx="2"/>
        <text class="d-stencil" x="100" y="118" text-anchor="middle">PERMISSIONS</text>
        <text class="d-stencil sm" x="100" y="132" text-anchor="middle">4TH FLOOR</text>
        <text class="d-stencil sm" x="100" y="154" text-anchor="middle">KNOCK, THEN WAIT</text>
        <path class="d-mould" d="M70 186h60v110H70z"/>
        <path class="d-lever" d="M134 206h-12"/><circle class="d-knob" cx="134" cy="206" r="3.5"/>
      </g>
    </g>
    <rect class="d-frame" x="52" y="66" width="96" height="246"/>
    <g class="d-dispenser">
      <rect x="158" y="160" width="26" height="34" rx="4"/>
      <path class="d-ticket" d="M164 194h14v18l-3.5-2.5-3.5 2.5-3.5-2.5-3.5 2.5z"/>
      <text x="171" y="174" text-anchor="middle">TAKE</text><text x="171" y="183" text-anchor="middle">A No.</text>
    </g>
    ${floor}
  </svg>`,

  // A door still being built: dashed outline, scaffold, a hand-lettered sign.
  building: () => `<svg class="door-svg" viewBox="0 0 200 320" aria-hidden="true">
    <path class="d-plan" d="M56 312V96h88v216"/>
    <path class="d-plan thin" d="M56 96l88 216M144 96l-88 216"/>
    <g class="d-scaffold">
      <path d="M34 312V60M166 312V60M30 70h140M30 150h140M30 230h140M34 70l132 80M166 150l-132 80"/>
    </g>
    <g class="d-sign"><path class="d-string" d="M84 70l16-22 16 22"/><rect x="66" y="70" width="68" height="34" rx="3"/><text x="100" y="93" text-anchor="middle">NOT YET</text></g>
    <path class="d-ladder" d="M150 312l12-110M168 312l12-110M152 292h18M155 262h18M158 232h18"/>
    ${floor}
  </svg>`,

  // The reading room: a low hatch at floor level, a brass plate, a lean of books.
  hatch: () => `<svg class="door-svg" viewBox="0 0 200 320" aria-hidden="true">
    <defs>
      <clipPath id="clip-hatch"><path d="M72 312v-58a28 28 0 0 1 56 0v58z"/></clipPath>
      <linearGradient id="beyond-hatch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7B0"/><stop offset="1" stop-color="#B9772F"/></linearGradient>
    </defs>
    <rect class="d-plate" x="76" y="200" width="48" height="13" rx="2"/>
    <text class="d-plate-t" x="100" y="209.5" text-anchor="middle">READING ROOM</text>
    <g clip-path="url(#clip-hatch)">
      <rect class="beyond" x="72" y="226" width="56" height="86" fill="url(#beyond-hatch)"/>
      <g class="panel"><rect class="d-panel" x="72" y="226" width="56" height="86"/><path class="d-mould" d="M80 304v-46a20 20 0 0 1 40 0v46z"/><circle class="d-knob" cx="120" cy="284" r="3"/></g>
    </g>
    <path class="d-frame" d="M66 312v-58a34 34 0 0 1 68 0v58"/>
    <g class="d-books"><rect x="146" y="282" width="9" height="30"/><rect x="156" y="276" width="7" height="36"/><rect x="165" y="286" width="10" height="26" transform="rotate(14 170 312)"/></g>
    ${floor}
  </svg>`
};
