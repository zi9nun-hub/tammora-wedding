import React from 'react';
import { TemplateDesign, FinishMethodId, BannerStandType } from '../types';

interface HorizontalBannerProps {
  template: TemplateDesign;
  groomName: string;
  brideName: string;
  eventDateText?: string;
  weddingHall?: string;
  className?: string;
  showDimensions?: boolean;
  widthMm?: number;
  heightMm?: number;
}

export const HorizontalBannerPreview: React.FC<HorizontalBannerProps> = ({
  template,
  groomName,
  brideName,
  eventDateText = '2026. 10. 25 12:30',
  weddingHall = '그랜드 앰배서더 호텔 블리스홀',
  className = '',
  showDimensions = false,
  widthMm = 5000,
  heightMm = 900
}) => {
  const isDark = template.bgColor === '#17223B' || template.bgColor === '#242124' || template.bgColor === '#38161D';

  return (
    <div className={`relative w-full overflow-hidden rounded-xl shadow-lg border border-stone-200/80 ${className}`}>
      {/* 5000 x 900 ratio is ~ 5.55:1 */}
      <div className="w-full relative aspect-[5000/900] select-none" style={{ backgroundColor: template.bgColor }}>
        <svg
          viewBox="0 0 1000 180"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-${template.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={template.accentColor} stopOpacity="0.15" />
              <stop offset="50%" stopColor={template.accentColor} stopOpacity="0.0" />
              <stop offset="100%" stopColor={template.accentColor} stopOpacity="0.15" />
            </linearGradient>
            <filter id={`shadow-${template.id}`} x="0" y="0" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Background Gradient overlay */}
          <rect width="1000" height="180" fill={`url(#grad-${template.id})`} />

          {/* Elegant Outer Border */}
          <rect
            x="14"
            y="12"
            width="972"
            height="156"
            fill="none"
            stroke={template.accentColor}
            strokeWidth="1.2"
            strokeOpacity="0.4"
            rx="4"
          />
          <rect
            x="18"
            y="16"
            width="964"
            height="148"
            fill="none"
            stroke={template.accentColor}
            strokeWidth="0.6"
            strokeDasharray="4 3"
            strokeOpacity="0.3"
            rx="3"
          />

          {/* Corner Ornaments */}
          <g stroke={template.accentColor} strokeWidth="1" fill="none" opacity="0.6">
            <path d="M 24 32 L 24 24 L 32 24" />
            <path d="M 976 32 L 976 24 L 968 24" />
            <path d="M 24 148 L 24 156 L 32 156" />
            <path d="M 976 148 L 976 156 L 968 156" />
          </g>

          {/* Left Floral / Crest Motif */}
          <g transform="translate(60, 40)" opacity="0.85">
            <circle cx="50" cy="50" r="38" fill="none" stroke={template.accentColor} strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="50" cy="50" r="32" fill="none" stroke={template.accentColor} strokeWidth="0.6" />
            {/* Wedding rings or botanical branch */}
            <path
              d="M 32 50 C 40 38, 48 38, 56 50 C 64 62, 72 62, 80 50"
              stroke={template.accentColor}
              strokeWidth="1.4"
              fill="none"
            />
            <path
              d="M 50 30 C 50 40, 50 60, 50 70"
              stroke={template.accentColor}
              strokeWidth="0.8"
              fill="none"
            />
            <text
              x="50"
              y="54"
              textAnchor="middle"
              fill={template.accentColor}
              fontSize="11"
              fontFamily="Cormorant Garamond, serif"
              fontStyle="italic"
              fontWeight="600"
            >
              WEDDING
            </text>
          </g>

          {/* Right Floral / Crest Motif */}
          <g transform="translate(830, 40)" opacity="0.85">
            <circle cx="50" cy="50" r="38" fill="none" stroke={template.accentColor} strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="50" cy="50" r="32" fill="none" stroke={template.accentColor} strokeWidth="0.6" />
            <text
              x="50"
              y="46"
              textAnchor="middle"
              fill={template.accentColor}
              fontSize="16"
              fontFamily="Cormorant Garamond, serif"
              fontWeight="700"
            >
              {groomName.charAt(0)} &amp; {brideName.charAt(0)}
            </text>
            <text
              x="50"
              y="62"
              textAnchor="middle"
              fill={template.subTextColor}
              fontSize="7.5"
              letterSpacing="2"
              fontWeight="500"
            >
              FOREVER
            </text>
          </g>

          {/* Center Main Content */}
          {/* Subtitle / English Motto */}
          <text
            x="500"
            y="42"
            textAnchor="middle"
            fill={template.accentColor}
            fontSize="10"
            fontFamily="Noto Sans KR, sans-serif"
            fontWeight="600"
            letterSpacing="3"
          >
            {template.defaultSubheadline}
          </text>

          {/* Romantic Headline */}
          <text
            x="500"
            y="64"
            textAnchor="middle"
            fill={template.subTextColor}
            fontSize="12.5"
            fontFamily="Noto Serif KR, serif"
            letterSpacing="1"
          >
            {template.defaultHeadline}
          </text>

          {/* Groom & Bride Main Names */}
          <g transform="translate(500, 108)">
            {/* Small decorative branch lines */}
            <line x1="-220" y1="-8" x2="-140" y2="-8" stroke={template.accentColor} strokeWidth="1" strokeOpacity="0.5" />
            <line x1="140" y1="-8" x2="220" y2="-8" stroke={template.accentColor} strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="-140" cy="-8" r="2" fill={template.accentColor} />
            <circle cx="140" cy="-8" r="2" fill={template.accentColor} />

            {/* Names */}
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill={template.textColor}
              fontSize="28"
              fontFamily="Noto Serif KR, serif"
              fontWeight="700"
              letterSpacing="2"
            >
              <tspan fill={template.subTextColor} fontSize="17" fontWeight="500">신랑 </tspan>
              <tspan>{groomName}</tspan>
              <tspan fill={template.accentColor} fontSize="20" fontStyle="italic">  ♥  </tspan>
              <tspan fill={template.subTextColor} fontSize="17" fontWeight="500">신부 </tspan>
              <tspan>{brideName}</tspan>
            </text>
          </g>

          {/* Date, Time & Venue Hall */}
          <g transform="translate(500, 144)">
            <rect
              x="-180"
              y="-13"
              width="360"
              height="20"
              fill={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}
              rx="10"
            />
            <text
              x="0"
              y="1"
              textAnchor="middle"
              fill={template.textColor}
              fontSize="10"
              fontFamily="Noto Sans KR, sans-serif"
              fontWeight="500"
              letterSpacing="1"
            >
              {eventDateText} &nbsp;|&nbsp; {weddingHall}
            </text>
          </g>
        </svg>

        {/* Real-time dimension tag */}
        {showDimensions && (
          <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[12px] font-mono tracking-wider backdrop-blur-sm">
            {widthMm}mm × {heightMm}mm
          </div>
        )}
      </div>
    </div>
  );
};

interface VerticalBannerProps {
  template: TemplateDesign;
  groomName: string;
  brideName: string;
  eventDateText?: string;
  weddingHall?: string;
  className?: string;
  showDimensions?: boolean;
}

export const VerticalBannerPreview: React.FC<VerticalBannerProps> = ({
  template,
  groomName,
  brideName,
  eventDateText = '2026. 10. 25 12:30',
  weddingHall = '그랜드 앰배서더 호텔',
  className = '',
  showDimensions = false
}) => {
  const isDark = template.bgColor === '#17223B' || template.bgColor === '#242124' || template.bgColor === '#38161D';

  return (
    <div className={`relative w-full max-w-[280px] mx-auto overflow-hidden rounded-xl shadow-xl border border-stone-200/80 ${className}`}>
      {/* 600 x 1800 ratio is 1:3 */}
      <div className="w-full relative aspect-[1/3] select-none" style={{ backgroundColor: template.bgColor }}>
        <svg
          viewBox="0 0 240 720"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`vgrad-${template.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={template.accentColor} stopOpacity="0.2" />
              <stop offset="50%" stopColor={template.accentColor} stopOpacity="0.0" />
              <stop offset="100%" stopColor={template.accentColor} stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Background subtle tint */}
          <rect width="240" height="720" fill={`url(#vgrad-${template.id})`} />

          {/* Borders */}
          <rect
            x="12"
            y="12"
            width="216"
            height="696"
            fill="none"
            stroke={template.accentColor}
            strokeWidth="1.2"
            strokeOpacity="0.4"
            rx="4"
          />
          <rect
            x="16"
            y="16"
            width="208"
            height="688"
            fill="none"
            stroke={template.accentColor}
            strokeWidth="0.6"
            strokeDasharray="4 3"
            strokeOpacity="0.3"
            rx="3"
          />

          {/* Top Emblem */}
          <g transform="translate(120, 70)" opacity="0.9">
            <circle cx="0" cy="0" r="28" fill="none" stroke={template.accentColor} strokeWidth="1" strokeDasharray="3 2" />
            <text
              x="0"
              y="-4"
              textAnchor="middle"
              fill={template.accentColor}
              fontSize="12"
              fontFamily="Cormorant Garamond, serif"
              fontStyle="italic"
              fontWeight="700"
            >
              WELCOME
            </text>
            <text
              x="0"
              y="12"
              textAnchor="middle"
              fill={template.subTextColor}
              fontSize="8"
              letterSpacing="2"
            >
              TO OUR WEDDING
            </text>
          </g>

          {/* Middle Decorative Frame / Photo Placeholder Motif */}
          <g transform="translate(120, 240)">
            <rect
              x="-80"
              y="-90"
              width="160"
              height="180"
              rx="6"
              fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'}
              stroke={template.accentColor}
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            {/* Heart & Rings Graphic inside frame */}
            <circle cx="0" cy="-20" r="28" fill={template.accentColor} fillOpacity="0.15" />
            <path
              d="M 0 -28 C -14 -42, -30 -20, 0 6 C 30 -20, 14 -42, 0 -28 Z"
              fill={template.accentColor}
              opacity="0.85"
              transform="scale(0.8) translate(0, -10)"
            />
            <text
              x="0"
              y="32"
              textAnchor="middle"
              fill={template.accentColor}
              fontSize="16"
              fontFamily="Cormorant Garamond, serif"
              fontWeight="700"
            >
              {groomName} &amp; {brideName}
            </text>
            <text
              x="0"
              y="52"
              textAnchor="middle"
              fill={template.subTextColor}
              fontSize="9"
              letterSpacing="2"
            >
              SPECIAL DAY
            </text>
          </g>

          {/* Headline Message */}
          <text
            x="120"
            y="390"
            textAnchor="middle"
            fill={template.accentColor}
            fontSize="10"
            fontWeight="700"
            letterSpacing="2"
          >
            {template.defaultSubheadline}
          </text>
          <text
            x="120"
            y="418"
            textAnchor="middle"
            fill={template.textColor}
            fontSize="13"
            fontFamily="Noto Serif KR, serif"
            fontWeight="600"
          >
            {template.defaultHeadline}
          </text>

          {/* Names in large calligraphy */}
          <g transform="translate(120, 480)">
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill={template.textColor}
              fontSize="24"
              fontFamily="Noto Serif KR, serif"
              fontWeight="700"
              letterSpacing="2"
            >
              {groomName}
            </text>
            <text
              x="0"
              y="26"
              textAnchor="middle"
              fill={template.accentColor}
              fontSize="16"
              fontFamily="Cormorant Garamond, serif"
              fontStyle="italic"
            >
              and
            </text>
            <text
              x="0"
              y="54"
              textAnchor="middle"
              fill={template.textColor}
              fontSize="24"
              fontFamily="Noto Serif KR, serif"
              fontWeight="700"
              letterSpacing="2"
            >
              {brideName}
            </text>
          </g>

          {/* Bottom Date & Venue */}
          <g transform="translate(120, 610)">
            <line x1="-60" y1="0" x2="60" y2="0" stroke={template.accentColor} strokeWidth="0.8" opacity="0.4" />
            <text
              x="0"
              y="24"
              textAnchor="middle"
              fill={template.textColor}
              fontSize="11"
              fontFamily="Noto Sans KR, sans-serif"
              fontWeight="600"
              letterSpacing="1"
            >
              {eventDateText}
            </text>
            <text
              x="0"
              y="44"
              textAnchor="middle"
              fill={template.subTextColor}
              fontSize="10"
              fontFamily="Noto Sans KR, sans-serif"
              fontWeight="500"
            >
              {weddingHall}
            </text>
          </g>
        </svg>

        {/* 600 x 1800 Ratio Tag */}
        {showDimensions && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[12px] font-mono tracking-wider backdrop-blur-sm">
            600 × 1800mm
          </div>
        )}
      </div>
    </div>
  );
};

interface FinishPreviewProps {
  methodId: FinishMethodId;
  className?: string;
}

export const FinishMethodImage: React.FC<FinishPreviewProps> = ({ methodId, className = '' }) => {
  return (
    <div className={`aspect-square w-full rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center border border-stone-200 relative ${className}`}>
      {methodId === 'heat_cut' && (
        <svg viewBox="0 0 200 200" className="w-full h-full p-4" xmlns="http://www.w3.org/2000/svg">
          {/* Fabric background */}
          <rect x="25" y="25" width="150" height="150" rx="4" fill="#FDFBF7" stroke="#E7E2DA" strokeWidth="2" />
          {/* Heat sealing edges */}
          <line x1="25" y1="25" x2="175" y2="25" stroke="#D97706" strokeWidth="4" strokeDasharray="6 2" opacity="0.8" />
          <line x1="175" y1="25" x2="175" y2="175" stroke="#D97706" strokeWidth="4" strokeDasharray="6 2" opacity="0.8" />
          <line x1="175" y1="175" x2="25" y2="175" stroke="#D97706" strokeWidth="4" strokeDasharray="6 2" opacity="0.8" />
          <line x1="25" y1="175" x2="25" y2="25" stroke="#D97706" strokeWidth="4" strokeDasharray="6 2" opacity="0.8" />
          {/* Heat knife icon illustration */}
          <g transform="translate(100, 100)">
            <circle cx="0" cy="0" r="42" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
            <path d="M -18 12 L 14 -20 L 22 -12 L -10 20 Z" fill="#78716C" />
            <path d="M -18 12 L -25 25 L -10 20 Z" fill="#EA580C" />
            <circle cx="16" cy="-18" r="3" fill="#D97706" />
          </g>
          <text x="100" y="162" textAnchor="middle" fill="#78716C" fontSize="12" fontWeight="600">열칼 마감 (올 풀림 방지)</text>
        </svg>
      )}

      {methodId === 'eyelet_rope' && (
        <svg viewBox="0 0 200 200" className="w-full h-full p-4" xmlns="http://www.w3.org/2000/svg">
          {/* Fabric */}
          <rect x="35" y="35" width="130" height="130" rx="4" fill="#FDFBF7" stroke="#E7E2DA" strokeWidth="2" />
          {/* Eyelet Metal Rings at 4 corners */}
          {[[52, 52], [148, 52], [52, 148], [148, 148]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="10" fill="#CA8A04" stroke="#854D0E" strokeWidth="2" />
              <circle cx={cx} cy={cy} r="5" fill="#3B2F2F" />
            </g>
          ))}
          {/* Ropes coming out from eyelets */}
          <path d="M 52 52 C 40 30, 20 25, 12 18" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <path d="M 52 52 C 40 30, 20 25, 12 18" stroke="#A8A29E" strokeWidth="3" strokeDasharray="4 2" strokeLinecap="round" />

          <path d="M 148 52 C 160 30, 180 25, 188 18" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <path d="M 148 52 C 160 30, 180 25, 188 18" stroke="#A8A29E" strokeWidth="3" strokeDasharray="4 2" strokeLinecap="round" />

          <path d="M 52 148 C 40 170, 20 175, 12 182" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <path d="M 52 148 C 40 170, 20 175, 12 182" stroke="#A8A29E" strokeWidth="3" strokeDasharray="4 2" strokeLinecap="round" />

          <path d="M 148 148 C 160 170, 180 175, 188 182" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <path d="M 148 148 C 160 170, 180 175, 188 182" stroke="#A8A29E" strokeWidth="3" strokeDasharray="4 2" strokeLinecap="round" />

          <text x="100" y="105" textAnchor="middle" fill="#57534E" fontSize="13" fontWeight="700">금속 타공링 + 끈</text>
        </svg>
      )}

      {methodId === 'eyelet_suction' && (
        <svg viewBox="0 0 200 200" className="w-full h-full p-4" xmlns="http://www.w3.org/2000/svg">
          {/* Glass background shimmer */}
          <rect x="25" y="25" width="150" height="150" rx="8" fill="#E0F2FE" opacity="0.6" stroke="#BAE6FD" strokeWidth="2" />
          <line x1="30" y1="40" x2="80" y2="25" stroke="#FFFFFF" strokeWidth="4" opacity="0.8" />
          {/* Fabric */}
          <rect x="45" y="45" width="110" height="110" rx="4" fill="#FDFBF7" stroke="#E7E2DA" strokeWidth="2" />
          {/* Suction Cups at 4 corners */}
          {[[60, 60], [140, 60], [60, 140], [140, 140]].map(([cx, cy], i) => (
            <g key={i}>
              {/* Transparent suction dome */}
              <circle cx={cx} cy={cy} r="14" fill="#7DD3FC" opacity="0.5" stroke="#0284C7" strokeWidth="1.5" />
              <circle cx={cx} cy={cy} r="7" fill="#E0F2FE" stroke="#0369A1" strokeWidth="1.5" />
              <circle cx={cx} cy={cy} r="3" fill="#CA8A04" />
            </g>
          ))}
          <text x="100" y="105" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="700">유리창 압착 큐방</text>
        </svg>
      )}

      {methodId === 'wood_rope' && (
        <svg viewBox="0 0 200 200" className="w-full h-full p-4" xmlns="http://www.w3.org/2000/svg">
          {/* Fabric */}
          <rect x="50" y="40" width="100" height="120" rx="2" fill="#FDFBF7" stroke="#E7E2DA" strokeWidth="1.5" />
          {/* Left Wood Bar */}
          <rect x="36" y="30" width="14" height="140" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
          {/* Wood grain lines */}
          <line x1="43" y1="35" x2="43" y2="165" stroke="#92400E" strokeWidth="1" strokeDasharray="8 4" />

          {/* Right Wood Bar */}
          <rect x="150" y="30" width="14" height="140" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
          <line x1="157" y1="35" x2="157" y2="165" stroke="#92400E" strokeWidth="1" strokeDasharray="8 4" />

          {/* Top Hanging Cord */}
          <path d="M 43 35 C 70 15, 130 15, 157 35" stroke="#E7E5E4" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 43 35 C 70 15, 130 15, 157 35" stroke="#78716C" strokeWidth="2" fill="none" strokeDasharray="4 2" strokeLinecap="round" />

          <text x="100" y="105" textAnchor="middle" fill="#78350F" fontSize="13" fontWeight="700">원목 각목 + 상단끈</text>
        </svg>
      )}

      {methodId === 'flat_band' && (
        <svg viewBox="0 0 200 200" className="w-full h-full p-4" xmlns="http://www.w3.org/2000/svg">
          {/* Fabric */}
          <rect x="30" y="30" width="140" height="140" rx="4" fill="#FDFBF7" stroke="#E7E2DA" strokeWidth="2" />
          {/* Reinforced heavy-duty flat webbing band stitched across top & bottom */}
          <rect x="30" y="30" width="140" height="20" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          <rect x="30" y="150" width="140" height="20" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />

          {/* Heavy stitch lines (X box patterns) */}
          {[45, 75, 105, 135].map((x) => (
            <g key={x} stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9">
              <line x1={x - 8} y1="34" x2={x + 8} y2="46" />
              <line x1={x + 8} y1="34" x2={x - 8} y2="46" />
              <line x1={x - 8} y1="154" x2={x + 8} y2="166" />
              <line x1={x + 8} y1="154" x2={x - 8} y2="166" />
            </g>
          ))}
          <text x="100" y="105" textAnchor="middle" fill="#1E40AF" fontSize="13" fontWeight="700">고강도 밴드 덧댐</text>
        </svg>
      )}
    </div>
  );
};

export const BannerStandImage: React.FC<{ standType: BannerStandType; className?: string }> = ({
  standType,
  className = '',
}) => {
  return (
    <div className={`relative aspect-square w-full rounded-lg overflow-hidden bg-stone-50 border border-stone-200/80 flex items-center justify-center ${className}`}>
      {standType === 'none' && (
        <svg viewBox="0 0 160 160" className="w-full h-full p-2" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sheetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFDFB" />
              <stop offset="100%" stopColor="#F5ECE5" />
            </linearGradient>
          </defs>
          <rect x="44" y="18" width="72" height="116" rx="3" fill="url(#sheetGrad)" stroke="#D6C7BE" strokeWidth="1.5" />
          <rect x="52" y="28" width="56" height="34" rx="2" fill="#E8DED6" />
          <line x1="52" y1="72" x2="108" y2="72" stroke="#A64B5A" strokeWidth="1.5" />
          <line x1="56" y1="80" x2="104" y2="80" stroke="#8C7A70" strokeWidth="1" />
          <line x1="62" y1="86" x2="98" y2="86" stroke="#8C7A70" strokeWidth="0.8" />
          {[[49, 23], [111, 23], [49, 129], [111, 129]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#CA8A04" stroke="#854D0E" strokeWidth="1" />
          ))}
          <rect x="22" y="106" width="116" height="22" rx="11" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
          <text x="80" y="121" textAnchor="middle" fill="#6B7280" fontSize="11" fontWeight="700">배너대 없음 (출력물만)</text>
        </svg>
      )}

      {standType === 'indoor' && (
        <svg viewBox="0 0 160 160" className="w-full h-full p-2" xmlns="http://www.w3.org/2000/svg">
          <line x1="38" y1="20" x2="122" y2="136" stroke="#71717A" strokeWidth="2" strokeLinecap="round" />
          <line x1="122" y1="20" x2="38" y2="136" stroke="#71717A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="78" r="4.5" fill="#3F3F46" />
          <rect x="46" y="22" width="68" height="104" rx="2" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1.5" />
          <rect x="52" y="30" width="56" height="30" rx="1.5" fill="#FCE7F3" />
          <line x1="54" y1="68" x2="106" y2="68" stroke="#A64B5A" strokeWidth="1.5" />
          <line x1="58" y1="76" x2="102" y2="76" stroke="#71717A" strokeWidth="1" />
          <path d="M 80 78 L 80 144 M 64 144 L 96 144" stroke="#52525B" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="22" y="112" width="116" height="22" rx="11" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
          <text x="80" y="127" textAnchor="middle" fill="#18181B" fontSize="11" fontWeight="700">실내 X-배너 거치대</text>
        </svg>
      )}

      {standType === 'outdoor_water' && (
        <svg viewBox="0 0 160 160" className="w-full h-full p-2" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="126" width="84" height="22" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          <rect x="74" y="122" width="12" height="4" rx="1" fill="#1E40AF" />
          <path d="M 44 137 Q 58 134 72 137 T 100 137 T 116 137" stroke="#93C5FD" strokeWidth="1.5" fill="none" opacity="0.8" />
          <line x1="80" y1="126" x2="80" y2="18" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <line x1="44" y1="22" x2="116" y2="22" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="44" y1="118" x2="116" y2="118" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="46" y="24" width="68" height="92" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="52" y="32" width="56" height="28" rx="1.5" fill="#DBEAFE" />
          <line x1="54" y1="68" x2="106" y2="68" stroke="#2563EB" strokeWidth="1.5" />
          <line x1="58" y1="76" x2="102" y2="76" stroke="#64748B" strokeWidth="1" />
          <circle cx="56" cy="137" r="2.5" fill="#DBEAFE" />
          <rect x="22" y="96" width="116" height="22" rx="11" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1" />
          <text x="80" y="111" textAnchor="middle" fill="#1D4ED8" fontSize="11" fontWeight="700">실외 물통형 배너대</text>
        </svg>
      )}
    </div>
  );
};
