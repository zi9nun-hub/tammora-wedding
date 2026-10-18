import React from 'react';

interface TopStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  canNavigateToStep: (step: number) => boolean;
}

const STEPS = [
  { step: 0, num: '01', title: '시작하기' },
  { step: 1, num: '02', title: '규격/일정' },
  { step: 2, num: '03', title: '디자인/마감' },
  { step: 3, num: '04', title: '스탠딩 배너' },
  { step: 4, num: '05', title: '최종 견적서' },
];

export const TopStepper: React.FC<TopStepperProps> = ({
  currentStep,
  onStepClick,
  canNavigateToStep,
}) => {
  return (
    // 스텝퍼와 타이틀 간격 지금보다 반 더 축소 (80px -> 40px)
    <div className="w-full bg-[#ffffff] pt-6 pb-10 px-4">
      <nav aria-label="진행 단계" className="max-w-2xl mx-auto">
        <ol className="flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          {STEPS.map((s, index) => {
            const isActive = currentStep === s.step;
            const isPast = currentStep > s.step;
            const isClickable = canNavigateToStep(s.step);

            return (
              <li key={s.step} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(s.step)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer group px-1 py-1 ${
                    isActive
                      ? 'text-[#1A1918]'
                      : isClickable
                      ? 'text-stone-600 hover:text-stone-900'
                      : 'text-stone-300 cursor-not-allowed'
                  }`}
                >
                  {/* 동그란 원형 배경 제거하고 순수 숫자만 표기 */}
                  <span
                    className={`text-[13px] transition-colors ${
                      isActive
                        ? 'font-bold text-[#1A1918]'
                        : isPast
                        ? 'font-semibold text-stone-700'
                        : 'font-medium text-stone-300'
                    }`}
                  >
                    {s.num}
                  </span>
                  {/* 이동된 단계는 포인트컬러 대신 검은색 폰트(#1A1918) 적용 */}
                  <span
                    className={`text-[13px] whitespace-nowrap transition-colors ${
                      isActive
                        ? 'font-bold text-[#1A1918]'
                        : isPast
                        ? 'font-medium text-stone-700'
                        : 'font-normal text-stone-300'
                    }`}
                  >
                    {s.title}
                  </span>
                </button>

                {/* 단계 간 연결선 */}
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-[1px] mx-2 transition-colors ${
                      isPast ? 'bg-[#1A1918]/25' : 'bg-stone-200'
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};
