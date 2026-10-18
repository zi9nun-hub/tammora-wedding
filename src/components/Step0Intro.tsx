import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { QuoteFormState } from '../types';

interface Step0Props {
  formData: QuoteFormState;
  updateFormData: (updates: Partial<QuoteFormState>) => void;
  onNext: () => void;
}

export const Step0Intro: React.FC<Step0Props> = ({
  onNext,
}) => {
  // 일정 관련 자주 묻는 질문: 처음에는 접힌 상태
  const [openFaq2, setOpenFaq2] = useState<boolean>(false);
  const [openFaq3, setOpenFaq3] = useState<boolean>(false);

  return (
    <div className="space-y-10 sm:space-y-12 animate-fadeIn pb-12 text-center">
      {/* 헤더 섹션: 타이틀과 부가설명 간격 2배 확대 (space-y-3 -> space-y-6) */}
      <section className="space-y-6 text-center">
        <h2 className="text-[26px] sm:text-[34px] font-bold text-[#A64B5A] leading-[1.2] tracking-tight">
          탐모라 웨딩 현수막 &amp; 배너 맞춤 견적
        </h2>
        <p className="text-[16px] sm:text-[17px] text-[#1A1918]/70 leading-relaxed max-w-2xl mx-auto">
          정확한 일정 조율과 원활한 제작을 위해 신청 전<br />
          아래 영업일 기준 및 제작 소요 안내를 먼저 확인해 주세요.
        </p>
      </section>

      {/* 한 컨테이너: 답답한 선 대신 자연스러운 여백으로 계층 분리 */}
      <div className="bg-[#ffffff] border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 max-w-2xl mx-auto text-center">
        {/* 컨테이너 타이틀: 숫자를 채운 원형 기호로 변경 */}
        <div className="space-y-3">
          <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1A1918] tracking-tight flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-[#1A1918] text-white text-[13px] font-bold inline-flex items-center justify-center shrink-0">
              1
            </span>
            <span>제작 소요 기간 안내</span>
          </h3>

          <div className="space-y-2 pt-1 text-center">
            <p className="text-[16px] sm:text-[17px] font-bold text-[#1A1918] leading-relaxed">
              * 주문신청 확인과 작업은 영업일 기준 2-3일 소요됩니다.
            </p>
            <p className="text-[15px] text-[#1A1918]/70 leading-relaxed">
              행사 예정일 전까지 작업이 어려운 경우 주문이 반려당할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 자주 묻는 질문: '일정 관련 자주 묻는 질문 클릭 시 상세 답변...' 문구 삭제 완료, QnA 폰트색 #666666 적용 */}
        <div className="pt-2 text-center">
          <div className="divide-y divide-stone-200/60 text-left">
            {/* FAQ 1: 영업일 기준 (폰트색 #666666) */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() => setOpenFaq2(!openFaq2)}
                className="w-full flex items-center justify-between text-left cursor-pointer group py-1"
              >
                <div className="text-[15px] font-medium text-[#666666] group-hover:text-stone-900 flex items-center gap-2">
                  <span className="text-[#A64B5A]/80 font-bold text-[14px]">Q.</span>
                  <span>영업일 기준 2-3일 기준을 알고 싶어요.</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-transform shrink-0 ${
                    openFaq2 ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq2 && (
                <div className="mt-2.5 text-[14px] text-stone-600 leading-relaxed pl-5 space-y-2.5 bg-stone-50/70 p-3.5 rounded-lg border border-stone-100">
                  <p>
                    탐모라의 영업시간은 <strong className="text-stone-800">평일 오전 9시-오후 6시</strong>입니다. 영업일 외에 신청하시는 경우, 주말을 제외한 다음 평일에 확인할 수 있는 점 참고 부탁드립니다.
                  </p>
                  <div className="space-y-1 text-[13px] text-stone-500 pt-1 border-t border-stone-200/60">
                    <div>• <strong>ex1)</strong> 월요일 20시 신청 → 화요일 09시부터 확인, 목요일까지 제작</div>
                    <div>• <strong>ex2)</strong> 금요일 17시 신청 → 당일 신청 확인, 주말 제외하여 수요일까지 제작</div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ 2: 급한 일정 문의 (폰트색 #666666) */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() => setOpenFaq3(!openFaq3)}
                className="w-full flex items-center justify-between text-left cursor-pointer group py-1"
              >
                <div className="text-[15px] font-medium text-[#666666] group-hover:text-stone-900 flex items-center gap-2">
                  <span className="text-[#A64B5A]/80 font-bold text-[14px]">Q.</span>
                  <span>급하게 필요한데 금액을 더 내서라도 일정을 빨리 할 수 없을까요?</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-transform shrink-0 ${
                    openFaq3 ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq3 && (
                <div className="mt-2.5 text-[14px] text-stone-600 leading-relaxed pl-5 space-y-1.5 bg-stone-50/70 p-3.5 rounded-lg border border-stone-100">
                  <p>
                    카카오톡 채널로 직접 문의 주시면 담당자가 일정 확인 후 가능 여부를 말씀드립니다.
                  </p>
                  <p className="text-[#A64B5A] text-[13px]">
                    ※ 제작 일정 및 내부 사정에 따라 주문이 거절될 수 있습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 다음 단계 버튼 (가운데 정렬) */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="py-4 px-10 text-[17px] font-bold transition-all flex items-center gap-3 bg-[#1A1918] text-white hover:bg-[#333230] cursor-pointer shadow-sm rounded-lg"
        >
          <span>견적 계산 시작하기</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
