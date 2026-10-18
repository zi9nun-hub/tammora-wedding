import React from 'react';

interface SidebarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  canNavigateToStep: (step: number) => boolean;
}

const STEPS = [
  { step: 0, num: '00', title: '시작하기' },
  { step: 1, num: '01', title: '규격 및 일정' },
  { step: 2, num: '02', title: '디자인 및 마감' },
  { step: 3, num: '03', title: '스탠딩 배너' },
  { step: 4, num: '04', title: '최종 견적서' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentStep, onStepClick, canNavigateToStep }) => {
  return (
    <>
      {/* 모바일 상단 바 (배경 #fefefe) */}
      <div className="lg:hidden bg-[#fefefe] border-b border-[#1A1918]/10 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-[20px] font-bold text-[#1A1918] leading-tight">
              탐모라 웨딩
            </h1>
            <p className="text-[13px] text-[#1A1918]/60">
              웨딩 현수막 &amp; 배너 자동 견적
            </p>
          </div>
          <div className="text-right">
            <span className="text-[13px] px-2.5 py-1 border border-[#1A1918]/20 bg-white text-[#1A1918] font-bold">
              {currentStep === 0 ? '시작' : `${currentStep} / 4단계`}
            </span>
          </div>
        </div>

        {/* 모바일 스텝 바 */}
        <div className="grid grid-cols-5 gap-1 pt-1 border-t border-[#1A1918]/10">
          {STEPS.map((s) => {
            const isActive = currentStep === s.step;
            const isClickable = canNavigateToStep(s.step);
            return (
              <button
                key={s.step}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(s.step)}
                className={`py-2 px-1 text-center transition-all ${
                  isActive
                    ? 'border-b-2 border-[#1A1918] text-[#1A1918] font-bold'
                    : isClickable
                    ? 'text-[#1A1918]/60 hover:text-[#1A1918]'
                    : 'text-[#1A1918]/25 cursor-not-allowed'
                }`}
              >
                <div className="text-[12px] font-bold">{s.num}</div>
                <div className="text-[11px] truncate">{s.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 데스크톱 고정 사이드바 (배경 #fefefe) */}
      <aside className="hidden lg:flex w-[280px] bg-[#fefefe] border-r border-[#1A1918]/10 flex-col justify-between p-8 shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div>
          {/* 브랜드 영역 */}
          <div className="mb-10">
            <h1 className="text-[28px] font-bold text-[#1A1918] leading-tight tracking-tight">
              탐모라 웨딩
            </h1>
            <p className="text-[14px] text-[#1A1918]/60 mt-2 font-medium">
              웨딩 현수막 &amp; 배너 견적 계산기
            </p>
          </div>

          {/* 단계 네비게이션 */}
          <ul className="space-y-5">
            {STEPS.map((s) => {
              const isActive = currentStep === s.step;
              const isPast = currentStep > s.step;
              const isClickable = canNavigateToStep(s.step);

              return (
                <li key={s.step}>
                  <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && onStepClick(s.step)}
                    className={`w-full flex items-center gap-3.5 text-left transition-all ${
                      isActive
                        ? 'opacity-100'
                        : isClickable
                        ? 'opacity-60 hover:opacity-100 cursor-pointer'
                        : 'opacity-25 cursor-not-allowed'
                    }`}
                  >
                    <span
                      className={`text-[13px] font-bold w-8 h-8 flex items-center justify-center rounded-full border transition-all shrink-0 ${
                        isActive
                          ? 'border-[#1A1918] bg-[#1A1918] text-white shadow-xs'
                          : isPast
                          ? 'border-[#1A1918] bg-[#1A1918]/10 text-[#1A1918]'
                          : 'border-[#1A1918]/30 text-[#1A1918]/60 bg-white'
                      }`}
                    >
                      {s.num}
                    </span>
                    <div>
                      <span className="block text-[16px] font-bold text-[#1A1918] tracking-tight">
                        {s.title}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 고객 안내 푸터 */}
        <div className="pt-8 border-t border-[#1A1918]/10 space-y-1">
          <div className="text-[12px] font-bold text-[#A64B5A]">고객센터 안내</div>
          <p className="text-[15px] font-bold text-[#1A1918]">평일 09:00 - 18:00</p>
          <p className="text-[14px] text-[#1A1918]/70">카카오톡 채널: 탐모라</p>
          <p className="text-[13px] text-[#1A1918]/50 pt-1">
            원단 최대 폭: 180cm
          </p>
        </div>
      </aside>
    </>
  );
};
