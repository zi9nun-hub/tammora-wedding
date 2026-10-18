import React from 'react';
import { QuoteFormState } from '../types';
import { calculateQuote, calculateRemainingDays, formatPrice } from '../utils/calculator';
import { TEMPLATES } from '../data/templates';
import { FINISH_METHODS } from '../data/finishMethods';

interface StickySummaryProps {
  formData: QuoteFormState;
  currentStep: number;
  onNext?: () => void;
  canProceed?: boolean;
}

export const StickySummary: React.FC<StickySummaryProps> = ({
  formData,
  currentStep,
}) => {
  const quote = calculateQuote(formData);
  const remaining = calculateRemainingDays(formData.eventDate, formData.eventTime);
  const selectedTemplate =
    TEMPLATES.find((t) => t.id === formData.selectedTemplateId) || TEMPLATES[0];
  const selectedFinish =
    FINISH_METHODS.find((f) => f.id === formData.finishMethod);

  // Check whether all required options have been selected across the entire process
  const isAllOptionsCompleted =
    formData.widthMm > 0 &&
    formData.heightMm > 0 &&
    !(formData.widthMm > 1800 && formData.heightMm > 1800) &&
    Boolean(formData.eventDate) &&
    Boolean(formData.installationType) &&
    Boolean(formData.finishMethod) &&
    formData.addBanner !== null;

  return (
    <div className="sticky top-6 space-y-4">
      <div className="text-[14px] font-bold text-[#1A1918]/70 tracking-tight">
        실시간 선택 내역
      </div>

      <div className="bg-white p-6 border border-[#1A1918]/10 shadow-xs space-y-4">
        {/* Specification rows */}
        <div className="space-y-3 text-[15px]">
          <div className="flex justify-between items-center">
            <span className="text-[#1A1918]/60 font-medium">현수막 규격</span>
            <span className="font-bold text-[#1A1918]">
              {formData.widthMm > 0 && formData.heightMm > 0
                ? `${formData.widthMm} × ${formData.heightMm} mm`
                : '입력 필요'}
            </span>
          </div>

          {formData.widthMm > 0 && formData.heightMm > 0 && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-[#1A1918]/60 font-medium">단위 환산</span>
                <span className="font-medium text-[#1A1918]">
                  {quote.widthM}m × {quote.heightM}m
                </span>
              </div>
            </>
          )}

          {/* D-Day */}
          <div className="flex justify-between items-center pt-3 border-t border-[#1A1918]/10">
            <span className="text-[#1A1918]/60 font-medium">행사 일정</span>
            <span className="font-bold text-[#A64B5A] text-right">
              {formData.eventDate ? remaining.dDayText : '미입력'}
            </span>
          </div>

          {/* Step 2 additions */}
          {currentStep >= 2 && (
            <>
              <div className="flex justify-between items-center pt-3 border-t border-[#1A1918]/10">
                <span className="text-[#1A1918]/60 font-medium">선택 템플릿</span>
                <span className="font-bold text-[#1A1918] truncate max-w-[150px] text-right">
                  {selectedTemplate.title}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#1A1918]/60 font-medium">설치 환경</span>
                <span className="font-medium text-[#1A1918]">
                  {formData.installationType === 'indoor'
                    ? '실내'
                    : formData.installationType === 'outdoor'
                    ? '실외'
                    : '미선택'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#1A1918]/60 font-medium">마감 방법</span>
                <span className="font-medium text-[#1A1918] text-right">
                  {selectedFinish ? selectedFinish.name : '미선택'}
                </span>
              </div>
            </>
          )}

          {/* Step 3 additions */}
          {currentStep >= 3 && (
            <div className="flex justify-between items-center pt-3 border-t border-[#1A1918]/10">
              <span className="text-[#1A1918]/60 font-medium">스탠딩 배너</span>
              <span className="font-medium text-[#1A1918]">
                {formData.addBanner === true
                  ? '추가 신청'
                  : formData.addBanner === false
                  ? '미신청'
                  : '선택 대기'}
              </span>
            </div>
          )}

          {/* Estimated Quote block: "예상 견적 구체적으로 나타내지말고 다 입력하기 전까지는 보여주지마. 그 전에는 '모든 항목를 선택해야 표시됩니다'라고만 써." */}
          <div className="pt-4 mt-2 border-t-2 border-[#1A1918]">
            <div className="text-[13px] font-bold text-[#1A1918]/70 mb-1">
              예상 견적 금액
            </div>
            {isAllOptionsCompleted ? (
              <div className="text-[26px] font-bold text-[#1A1918] leading-tight">
                {formatPrice(quote.totalPrice)}
              </div>
            ) : (
              <div className="p-3 bg-[#F8F7F4] border border-[#1A1918]/15 text-[15px] font-bold text-[#A64B5A] text-center">
                모든 항목을 선택해야 표시됩니다
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Production Notice */}
      <p className="text-[13px] text-[#1A1918]/60 leading-relaxed px-1">
        * 주문신청 확인과 작업은 영업일 기준 2-3일 소요됩니다. 행사 예정일 전까지 작업이 어려운 경우 주문이 반려당할 수 있습니다.
      </p>
    </div>
  );
};
