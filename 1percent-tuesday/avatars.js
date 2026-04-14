const AVATARS = [
  { id: 'sun',     emoji: '☀️',  name: 'Sunny',    color: '#ff9900', glow: '#ffcc00' },
  { id: 'moon',    emoji: '🌙',  name: 'Luna',     color: '#6633cc', glow: '#9966ff' },
  { id: 'crystal', emoji: '💎',  name: 'Crystal',  color: '#cc00ff', glow: '#ff66ff' },
  { id: 'lotus',   emoji: '🌸',  name: 'Blossom',  color: '#ff66aa', glow: '#ffaacc' },
  { id: 'rainbow', emoji: '🌈',  name: 'Prism',    color: '#0099ff', glow: '#66ccff' },
  { id: 'star',    emoji: '⭐',  name: 'Stardust', color: '#ffcc00', glow: '#ffee66' },
  { id: 'spark',   emoji: '✨',  name: 'Shimmer',  color: '#00ccaa', glow: '#66ffdd' },
  { id: 'orb',     emoji: '🔮',  name: 'Oracle',   color: '#330099', glow: '#6633cc' },
  { id: 'feather', emoji: '🕊️', name: 'Sage',     color: '#33cc99', glow: '#66ffcc' },
  { id: 'flame',   emoji: '🌟',  name: 'Spark',    color: '#ff5500', glow: '#ff8844' }
];

function getAvatar(id) {
  return AVATARS.find(a => a.id === id) || AVATARS[0];
}

function renderAvatarBadge(avatar, size = 56) {
  const a = typeof avatar === 'string' ? getAvatar(avatar) : avatar;
  return `<div class="avatar-badge" style="
    width:${size}px;height:${size}px;
    background:${a.color};
    box-shadow: 0 0 ${size/2}px ${a.glow}55;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:${size*0.5}px;line-height:1;
    border:3px solid ${a.glow}88;
    flex-shrink:0;
  ">${a.emoji}</div>`;
}
