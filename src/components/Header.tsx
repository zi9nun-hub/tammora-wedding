import React from 'react';
import { Calendar, Layers, Sparkles, ReceiptText, Heart } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  canNavigateToStep: (step: number) => boolean;
}

const STEPS = [
  { step: 1, title: '사이즈 & 행사일', subtitle: '1p. 규격/일정', icon: Calendar },
  { step: 2, title: '템플릿 & 마감', subtitle: '2p. 디자인/설치', icon: Layers },
  { step: 3, title: '추가 배너 옵션', subtitle: '3p. 스탠딩 배너', icon: Sparkles },
  { step: 4, title: '주문 확인 & 견적', subtitle: '4p. 자동견적서', icon: ReceiptText },
];

export const Header: React.FC<StepperProps> = ({ currentStep, onStepClick, canNavigateToStep }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
        {/* Brand logo & tagline */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#EBD8CE] text-[#8C5E4E] flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 fill-current" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold tracking-wider text-[#8C5E4E] uppercase">
                  TAMMORA WEDDING
                </span>
                <span className="px-2 py-0.5 text-[12px] bg-[#EAE2D8] text-[#5C4F44] rounded-full font-medium">
                  실시간 견적 계산기
                </span>
              </div>
              <h1 className="text-[18px] sm:text-[20px] font-bold text-stone-900 leading-tight">
                웨딩 현수막 틀 미리보기 &amp; 견적 자동계산
              </h1>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-[13px] text-stone-500">탐모라 고객센터</div>
            <div className="text-[14px] font-semibold text-stone-800">평일 09:00 - 18:00</div>
          </div>
        </div>

        {/* Stepper with Step Titles */}
        <nav aria-label="진행 단계" className="pt-1">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = currentStep === s.step;
              const isPast = currentStep > s.step;
              const isClickable = canNavigateToStep(s.step);

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => isClickable && onStepClick(s.step)}
                  disabled={!isClickable}
                  className={`group relative text-left p-2 sm:p-2.5 rounded-xl transition-all duration-200 border ${
                    isActive
                      ? 'bg-white border-[#C97D89] shadow-sm ring-2 ring-[#C97D89]/20'
                      : isPast
                      ? 'bg-stone-50/80 border-stone-200 hover:bg-stone-100/90 cursor-pointer'
                      : 'bg-stone-100/50 border-stone-200/60 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <span
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[12px] sm:text-[13px] font-bold transition-colors ${
                        isActive
                          ? 'bg-[#C97D89] text-white'
                          : isPast
                          ? 'bg-stone-800 text-white'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {s.step}
                    </span>
                    <span className="hidden sm:inline-block">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C97D89]' : isPast ? 'text-stone-700' : 'text-stone-400'}`} />
                    </span>
                    <span
                      className={`text-[12px] sm:text-[13px] font-semibold line-clamp-1 ${
                        isActive ? 'text-[#A64B5A]' : isPast ? 'text-stone-800' : 'text-stone-400'
                      }`}
                    >
                      {s.subtitle}
                    </span>
                  </div>
                  <div
                    className={`text-[13px] sm:text-[15px] font-bold tracking-tight line-clamp-1 ${
                      isActive ? 'text-stone-900 font-extrabold' : isPast ? 'text-stone-700' : 'text-stone-400'
                    }`}
                  >
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
