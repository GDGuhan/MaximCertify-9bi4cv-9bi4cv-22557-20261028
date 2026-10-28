import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { InternshipData } from '@/types';
import { getSkillsForDomain } from '@/constants/skills';
import { generateCertificateDescription, getVerificationUrl } from '@/lib/certificateUtils';

interface CertificateDocumentProps {
  data: InternshipData;
  scale?: number;
}

const CertificateDocument = forwardRef<HTMLDivElement, CertificateDocumentProps>(
  ({ data, scale = 1 }, ref) => {
    const skills = getSkillsForDomain(data.domain);
    const description = generateCertificateDescription(data);
    const verifyUrl = getVerificationUrl(data.certificateId);

    return (
      <div
        ref={ref}
        id="certificate-print-zone"
        style={{
          width: '1123px',
          height: '794px',
          position: 'relative',
          background: '#ffffff',
          fontFamily: "'Inter', sans-serif",
          overflow: 'hidden',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          flexShrink: 0,
        }}
      >
        {/* Outermost Gold Border */}
        <div style={{
          position: 'absolute', inset: '8px',
          border: '4px solid #c8971c',
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* Inner Navy Border */}
        <div style={{
          position: 'absolute', inset: '18px',
          border: '2px solid #0d1b3e',
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* Decorative corner ornaments */}
        {[
          { top: 4, left: 4 }, { top: 4, right: 4 },
          { bottom: 4, left: 4 }, { bottom: 4, right: 4 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute', ...pos,
            width: 40, height: 40,
            borderTop: i < 2 ? '6px solid #c8971c' : undefined,
            borderBottom: i >= 2 ? '6px solid #c8971c' : undefined,
            borderLeft: (i === 0 || i === 2) ? '6px solid #c8971c' : undefined,
            borderRight: (i === 1 || i === 3) ? '6px solid #c8971c' : undefined,
            zIndex: 3,
          }} />
        ))}

        {/* Background pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(200,151,28,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(13,27,62,0.04) 0%, transparent 50%)`,
          zIndex: 0,
        }} />

        {/* Watermark */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          opacity: 0.04, zIndex: 0, pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '130px', fontWeight: 900,
            color: '#0d1b3e', letterSpacing: '0.1em',
            transform: 'rotate(-25deg)', whiteSpace: 'nowrap',
          }}>MAXIM CODE</span>
        </div>

        {/* Main Content */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '36px 48px 28px',
          height: '100%', display: 'flex', flexDirection: 'column',
        }}>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            {/* Logo Left */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Logo icon */}
              <div style={{
                width: 56, height: 56,
                background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3575 100%)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(13,27,62,0.3)',
                border: '2px solid #c8971c',
                flexShrink: 0,
              }}>
                <span style={{ color: '#c8971c', fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: '22px' }}>M</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '20px', fontWeight: 700,
                  color: '#0d1b3e', letterSpacing: '0.08em', lineHeight: 1.1,
                }}>MAXIM CODE</div>
                <div style={{
                  fontSize: '10px', color: '#c8971c',
                  fontWeight: 600, letterSpacing: '0.15em',
                  textTransform: 'uppercase', marginTop: '2px',
                }}>Building Future Innovators</div>
              </div>
            </div>

            {/* Right: QR + Cert ID */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                padding: '6px', background: '#fff',
                border: '2px solid #c8971c', borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(200,151,28,0.2)',
              }}>
                <QRCodeSVG
                  value={verifyUrl}
                  size={62}
                  bgColor="#ffffff"
                  fgColor="#0d1b3e"
                  level="M"
                />
              </div>
              <div style={{ fontSize: '8px', color: '#666', letterSpacing: '0.05em' }}>Scan to Verify</div>
              <div style={{
                fontSize: '9px', fontWeight: 600,
                color: '#0d1b3e', letterSpacing: '0.08em',
                background: '#f8f4e8', padding: '2px 8px',
                borderRadius: '4px', border: '1px solid #c8971c40',
              }}>{data.certificateId}</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #c8971c 20%, #0d1b3e 50%, #c8971c 80%, transparent)',
            marginBottom: '14px',
          }} />

          {/* Certificate Title */}
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.35em', color: '#c8971c',
              textTransform: 'uppercase', marginBottom: '4px',
            }}>✦ &nbsp; Proudly Presents &nbsp; ✦</div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '30px', fontWeight: 900,
              color: '#0d1b3e', letterSpacing: '0.18em',
              textTransform: 'uppercase', lineHeight: 1.1,
            }}>Certificate of Completion</div>
          </div>

          {/* Subtitle */}
          <div style={{
            textAlign: 'center', marginBottom: '8px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '14px', color: '#555', fontStyle: 'italic',
            letterSpacing: '0.05em',
          }}>
            This Certificate Is Proudly Presented To
          </div>

          {/* Name */}
          <div style={{ textAlign: 'center', marginBottom: '6px', position: 'relative' }}>
            <div style={{
              display: 'inline-block',
              borderBottom: '2px solid #c8971c',
              paddingBottom: '6px',
              paddingLeft: '16px', paddingRight: '16px',
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '38px', fontWeight: 700,
                color: '#0d1b3e', letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3575 50%, #0d1b3e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{data.name}</span>
            </div>
          </div>

          {/* Description */}
          <div style={{
            textAlign: 'center', marginBottom: '10px',
            padding: '0 48px',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px', color: '#333',
              lineHeight: 1.65, fontStyle: 'italic',
              letterSpacing: '0.02em',
            }}>
              {description}
            </p>
          </div>

          {/* Skills */}
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{
              fontSize: '9px', letterSpacing: '0.25em',
              color: '#c8971c', fontWeight: 700,
              textTransform: 'uppercase', marginBottom: '7px',
            }}>Skills Acquired</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {skills.map((skill) => (
                <span key={skill} style={{
                  padding: '3px 10px',
                  border: '1px solid #c8971c',
                  borderRadius: '20px',
                  fontSize: '11px', fontWeight: 600,
                  color: '#0d1b3e', background: '#fdf8ec',
                  letterSpacing: '0.03em',
                }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #c8971c40 30%, #c8971c 50%, #c8971c40 70%, transparent)',
            marginBottom: '10px',
          }} />

          {/* Footer Row: Signature Left | Details Center | MSME Right */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1 }}>
            {/* CEO Signature Block */}
            <div style={{ minWidth: '180px' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px', fontStyle: 'italic',
                color: '#0d1b3e', fontWeight: 700,
                letterSpacing: '0.02em',
                borderBottom: '2px solid #0d1b3e',
                paddingBottom: '4px', marginBottom: '4px',
                display: 'inline-block', minWidth: '160px',
              }}>B. Guhan</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0d1b3e', letterSpacing: '0.05em' }}>B. GUHAN</div>
              <div style={{ fontSize: '10px', color: '#c8971c', fontWeight: 600, letterSpacing: '0.08em' }}>CEO & FOUNDER</div>
              <div style={{ fontSize: '10px', color: '#666', letterSpacing: '0.05em' }}>Maxim Code</div>
            </div>

            {/* Center: Issue Date + Role */}
            <div style={{ textAlign: 'center', flex: 1, padding: '0 24px' }}>
              <div style={{
                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                padding: '8px 24px', border: '1px solid #c8971c20',
                borderRadius: '8px', background: '#fdf8ec',
              }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#999', textTransform: 'uppercase', marginBottom: '2px' }}>Date of Issue</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0d1b3e', letterSpacing: '0.05em' }}>{data.issueDate}</div>
                <div style={{ width: '40px', height: '1px', background: '#c8971c', margin: '4px 0' }} />
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#999', textTransform: 'uppercase', marginBottom: '2px' }}>Role</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#0d1b3e' }}>{data.role}</div>
              </div>
            </div>

            {/* MSME Emblem Right */}
            <div style={{ minWidth: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Ashoka Pillar SVG */}
              <svg width="48" height="44" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Lions simplified */}
                <circle cx="24" cy="8" r="6" fill="#c8971c" />
                <circle cx="16" cy="9" r="4" fill="#c8971c" opacity="0.8" />
                <circle cx="32" cy="9" r="4" fill="#c8971c" opacity="0.8" />
                <rect x="22" y="13" width="4" height="2" fill="#c8971c" />
                {/* Capital */}
                <ellipse cx="24" cy="16" rx="10" ry="3" fill="#b87d12" />
                {/* Pillar */}
                <rect x="22" y="18" width="4" height="18" fill="#c8971c" />
                {/* Base */}
                <rect x="16" y="36" width="16" height="3" rx="1" fill="#b87d12" />
                <rect x="12" y="39" width="24" height="2" rx="1" fill="#a06a0a" />
                {/* Wheel (chakra) */}
                <circle cx="24" cy="27" r="5" fill="none" stroke="#0d1b3e" strokeWidth="1" opacity="0.3" />
              </svg>
              <div style={{ fontSize: '8px', color: '#c8971c', fontWeight: 700, letterSpacing: '0.12em', marginTop: '2px' }}>GOVT. OF INDIA</div>
              <div style={{
                fontSize: '14px', fontWeight: 900,
                color: '#0d1b3e', letterSpacing: '0.15em',
                fontFamily: "'Inter', sans-serif", lineHeight: 1,
              }}>MSME</div>
              <div style={{ width: '100%', height: '1px', background: '#0d1b3e', margin: '2px 0' }} />
              <div style={{ fontSize: '6.5px', color: '#333', fontWeight: 700, letterSpacing: '0.08em', textAlign: 'center', lineHeight: 1.3 }}>
                MICRO, SMALL &<br />MEDIUM ENTERPRISES
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificateDocument.displayName = 'CertificateDocument';

export default CertificateDocument;
