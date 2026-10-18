import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronDown, ArrowRight, ArrowLeft, Check, Lock } from 'lucide-react';
import { QuoteFormState } from '../types';
import { calculateRemainingDays } from '../utils/calculator';

interface Step1Props {
  formData: QuoteFormState;
  updateFormData: (updates: Partial<QuoteFormState>) => void;
  onNext: () => void;
  onPrev?: () => void;
}

export const Step1SizeAndDate: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  // 일정/사이즈 관련 자주 묻는 질문: 기본 접힌 상태
  const [openFaq1, setOpenFaq1] = useState(false);

  // Critical rule checks
  const isBothOver1800 = formData.widthMm > 1800 && formData.heightMm > 1800;
  const isUnderMinSize =
    (formData.widthMm > 0 && formData.widthMm < 300) ||
    (formData.heightMm > 0 && formData.heightMm < 300);

  // D-Day remaining calculation (주말 제외 영업일 3일 이하 여부 포함)
  const remaining = calculateRemainingDays(formData.eventDate, formData.eventTime);

  // 잔여일 5일 이하 여부 체크 (택배배송 5일 소요로 인해 잔여일 5일 이하면 택배배송 잠금)
  const isParcelDeliveryLocked =
    !formData.eventDate ||
    remaining.days <= 5 ||
    remaining.businessDays <= 5;

  useEffect(() => {
    if (isParcelDeliveryLocked && formData.deliveryMethod === 'parcel') {
      updateFormData({ deliveryMethod: 'pickup' });
    }
  }, [isParcelDeliveryLocked, formData.deliveryMethod, updateFormData]);

  // Unit conversion helpers (cm, m only - no square meters)
  const widthCm = (formData.widthMm / 10).toLocaleString('ko-KR');
  const widthM = (formData.widthMm / 1000).toLocaleString('ko-KR', { maximumFractionDigits: 2 });
  const heightCm = (formData.heightMm / 10).toLocaleString('ko-KR');
  const heightM = (formData.heightMm / 1000).toLocaleString('ko-KR', { maximumFractionDigits: 2 });

  const canProceed =
    formData.widthMm >= 300 &&
    formData.heightMm >= 300 &&
    !isBothOver1800 &&
    Boolean(formData.eventDate);

  return (
    <div className="space-y-10 sm:space-y-12 animate-fadeIn pb-12">
      {/* 헤더 섹션: 타이틀과 부가설명 간격 2배 확대 (space-y-3 -> space-y-6) */}
      <section className="space-y-6 text-center">
        <h2 className="text-[26px] sm:text-[34px] font-bold text-[#A64B5A] leading-[1.2] tracking-tight">
          현수막 사이즈 및 예식 일정 입력
        </h2>
        <p className="text-[16px] sm:text-[17px] text-[#1A1918]/70 leading-relaxed max-w-2xl mx-auto">
          제작을 원하시는 현수막의 가로·세로 규격과 예식 일정을 직접 입력해 주세요.
        </p>
      </section>

      {/* 컨테이너 1: 숫자를 채운 원형 기호로 타이틀 변경 */}
      <div className="bg-[#ffffff] border border-stone-200/90 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
        <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1A1918] tracking-tight mb-2 flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#1A1918] text-white text-[13px] font-bold inline-flex items-center justify-center shrink-0">
            1
          </span>
          <span>현수막 사이즈 직접 입력 (mm)</span>
        </h3>

        {/* 직접 입력 인풋 필드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[15px] font-bold text-[#1A1918]">
              가로 길이 (mm)
            </label>
            <div className="relative">
              <input
                type="number"
                min="300"
                max="20000"
                step="50"
                value={formData.widthMm || ''}
                onChange={(e) => {
                  const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                  updateFormData({ widthMm: val });
                }}
                className="w-full p-4 text-[20px] font-bold text-[#1A1918] bg-white border border-[#1A1918]/25 focus:border-[#1A1918] focus:outline-hidden transition-all pr-14 rounded-lg"
                placeholder="예: 5000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[15px] font-bold text-[#1A1918]/40">
                mm
              </span>
            </div>
            {formData.widthMm > 0 && (
              <div className="text-[14px] text-[#1A1918]/70 pt-1">
                단위 환산: <strong className="text-[#1A1918]">{widthCm} cm</strong> ({widthM} m)
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-[15px] font-bold text-[#1A1918]">
              세로 길이 (mm)
            </label>
            <div className="relative">
              <input
                type="number"
                min="200"
                max="10000"
                step="50"
                value={formData.heightMm || ''}
                onChange={(e) => {
                  const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                  updateFormData({ heightMm: val });
                }}
                className="w-full p-4 text-[20px] font-bold text-[#1A1918] bg-white border border-[#1A1918]/25 focus:border-[#1A1918] focus:outline-hidden transition-all pr-14 rounded-lg"
                placeholder="예: 900"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[15px] font-bold text-[#1A1918]/40">
                mm
              </span>
            </div>
            {formData.heightMm > 0 && (
              <div className="text-[14px] text-[#1A1918]/70 pt-1">
                단위 환산: <strong className="text-[#1A1918]">{heightCm} cm</strong> ({heightM} m)
              </div>
            )}
          </div>
        </div>

        {/* 규격 제약 검증 1: 가로 또는 세로가 300mm 미만인 경우 오류 메시지 */}
        {isUnderMinSize && (
          <div className="p-5 bg-[#FFF0F0] border-l-4 border-[#A64B5A] rounded-r-xl flex items-start gap-3.5">
            <AlertCircle className="w-6 h-6 text-[#A64B5A] shrink-0 mt-0.5" />
            <div>
              <div className="text-[17px] font-bold text-[#A64B5A]">
                현수막은 한 면 길이 최소 300mm 이상이어야 제작 가능합니다
              </div>
              <p className="text-[15px] text-[#1A1918]/80 mt-1 leading-relaxed">
                출력 및 후가공 공정상 가로와 세로 길이는 각각 최소 300mm(30cm) 이상이어야 제작이 가능합니다. 수치를 확인해 주세요.
              </p>
            </div>
          </div>
        )}

        {/* 규격 제약 검증 2: 가로, 세로 모두 1800mm 초과 시 오류 메시지 */}
        {isBothOver1800 && (
          <div className="p-5 bg-[#FFF0F0] border-l-4 border-[#A64B5A] rounded-r-xl flex items-start gap-3.5">
            <AlertCircle className="w-6 h-6 text-[#A64B5A] shrink-0 mt-0.5" />
            <div>
              <div className="text-[17px] font-bold text-[#A64B5A]">
                현수막은 180이하까지만 제작 가능합니다
              </div>
              <p className="text-[15px] text-[#1A1918]/80 mt-1 leading-relaxed">
                출력 원단 롤의 최대 폭이 1800mm(180cm)이므로, 가로와 세로 중 적어도 한 변은 1800mm 이하여야 단일 원단으로 제작이 가능합니다. 수치를 확인해 주세요.
              </p>
            </div>
          </div>
        )}

        {/* FAQ 1: 자주 주문하는 사이즈 (폰트 색상 #666666 적용) */}
        <div className="pt-4 border-t border-stone-200/60">
          <button
            type="button"
            onClick={() => setOpenFaq1(!openFaq1)}
            className="w-full flex items-center justify-between text-left cursor-pointer group py-1"
          >
            <div className="text-[15px] font-medium text-[#666666] group-hover:text-stone-900 flex items-center gap-2">
              <span className="text-[#A64B5A]/80 font-bold text-[14px]">Q.</span>
              <span>가장 주문이 많은 사이즈를 알고 싶어요.</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-transform ${
                openFaq1 ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openFaq1 && (
            <div className="mt-2 text-[14px] text-[#666666] leading-relaxed pl-5 bg-stone-50/70 p-3 rounded-lg border border-stone-100">
              A. 현수막 게시 장소에 따라 고객님들의 주문이 다양한 편입니다.
              구매량이 많은 사이즈는 <strong className="text-stone-800">5000*900</strong>이나, 먼저 원하시는 장소에 게시가 가능한지 확인을 권장드립니다.
            </div>
          )}
        </div>
      </div>

      {/* 컨테이너 2: 2. 행사 예정일 및 시간 입력 (숫자를 채운 원형 기호) */}
      <div className="bg-[#ffffff] border border-stone-200/90 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
        <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1A1918] tracking-tight mb-2 flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#1A1918] text-white text-[13px] font-bold inline-flex items-center justify-center shrink-0">
            2
          </span>
          <span>행사 예정일 및 시간 입력</span>
        </h3>

        {/* 행사 예정 날짜, 시간, 잔여일 자동 계산 (주말제외): 한 줄에 모두 배치 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
          <div className="space-y-2">
            <label className="block text-[15px] font-bold text-[#1A1918]">
              행사 예정 날짜
            </label>
            <input
              type="date"
              value={formData.eventDate}
              onChange={(e) => updateFormData({ eventDate: e.target.value })}
              className="w-full p-4 text-[16px] font-medium text-[#1A1918] bg-white border border-[#1A1918]/25 focus:border-[#1A1918] focus:outline-hidden rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[15px] font-bold text-[#1A1918]">
              행사 예정 시간
            </label>
            <input
              type="time"
              value={formData.eventTime}
              onChange={(e) => updateFormData({ eventTime: e.target.value })}
              className="w-full p-4 text-[16px] font-medium text-[#1A1918] bg-white border border-[#1A1918]/25 focus:border-[#1A1918] focus:outline-hidden rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[15px] font-bold text-[#1A1918]">
              행사 일정 잔여일 자동 계산 <span className="text-[13px] font-normal text-stone-500">(주말제외)</span>
            </label>
            <div className="p-4 bg-stone-50 border border-stone-200/80 rounded-lg flex items-center justify-between h-[58px]">
              <span className="text-[14px] text-stone-500 font-medium">잔여일:</span>
              <span
                className={`text-[17px] font-bold ${
                  remaining.isThreeBusinessDaysOrLess ? 'text-[#A64B5A]' : 'text-[#1A1918]'
                }`}
              >
                {formData.eventDate ? remaining.dDayText : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* 더 급하게 필요해요: 배경색 빼고 폰트를 빨간색으로 표기 */}
        <div className="pt-2">
          <div className="flex items-start gap-3 py-2">
            <input
              type="checkbox"
              id="urgent-step1"
              checked={formData.isUrgent}
              onChange={(e) => updateFormData({ isUrgent: e.target.checked })}
              className="w-5 h-5 accent-[#A64B5A] mt-0.5 cursor-pointer shrink-0"
            />
            <div>
              <label
                htmlFor="urgent-step1"
                className="text-[16px] font-bold text-[#A64B5A] cursor-pointer block leading-snug"
              >
                더 급하게 필요해요
              </label>
              <p className="text-[13px] text-[#A64B5A]/85 mt-1 leading-relaxed">
                * 추가 금액이 발생할 수 있으며, 내부 일정에 따라 주문이 거부될 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 수령방법 추가: 직접수령 / 택배배송(5일 소요) / 퀵배송 (잔여일 5일 이하 택배배송 잠금) */}
        <div className="pt-5 border-t border-stone-200/60 space-y-3.5">
          <div className="flex items-center justify-between">
            <label className="block text-[15px] font-bold text-[#1A1918]">
              수령방법 선택
            </label>
            {isParcelDeliveryLocked && (
              <span className="text-[12px] text-[#A64B5A] font-medium flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                <span>잔여일 5일 이하는 택배배송 선택 불가</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. 직접수령 */}
            <button
              type="button"
              onClick={() => updateFormData({ deliveryMethod: 'pickup' })}
              className={`p-4 text-left border-2 transition-all cursor-pointer rounded-xl flex flex-col justify-between ${
                formData.deliveryMethod === 'pickup'
                  ? 'border-[#A64B5A] bg-[#FAF3F0] ring-2 ring-[#A64B5A]/20 shadow-xs'
                  : 'border-[#1A1918]/15 bg-white hover:border-[#1A1918]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[16px] font-bold ${formData.deliveryMethod === 'pickup' ? 'text-[#A64B5A]' : 'text-[#1A1918]'}`}>
                    직접수령
                  </span>
                  {formData.deliveryMethod === 'pickup' && <Check className="w-4 h-4 text-[#A64B5A]" />}
                </div>
                <p className="text-[13px] text-[#1A1918]/60 leading-snug">
                  매장 방문 직접 수령
                </p>
              </div>
              <div className="mt-3 text-[14px] font-bold text-[#1A1918]">
                0원
              </div>
            </button>

            {/* 2. 택배배송 (5일 소요) - 6천원 (잔여일 5일 이하면 잠금) */}
            <button
              type="button"
              disabled={isParcelDeliveryLocked}
              onClick={() => {
                if (!isParcelDeliveryLocked) {
                  updateFormData({ deliveryMethod: 'parcel' });
                }
              }}
              className={`p-4 text-left border-2 transition-all rounded-xl flex flex-col justify-between ${
                isParcelDeliveryLocked
                  ? 'bg-stone-100/70 border-stone-200 text-stone-400 cursor-not-allowed opacity-60 select-none'
                  : formData.deliveryMethod === 'parcel'
                  ? 'border-[#A64B5A] bg-[#FAF3F0] ring-2 ring-[#A64B5A]/20 shadow-xs cursor-pointer'
                  : 'border-[#1A1918]/15 bg-white hover:border-[#1A1918] cursor-pointer'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[16px] font-bold ${
                    isParcelDeliveryLocked
                      ? 'text-stone-400'
                      : formData.deliveryMethod === 'parcel'
                      ? 'text-[#A64B5A]'
                      : 'text-[#1A1918]'
                  }`}>
                    택배배송(5일 소요)
                  </span>
                  {isParcelDeliveryLocked ? (
                    <Lock className="w-4 h-4 text-stone-400" />
                  ) : formData.deliveryMethod === 'parcel' ? (
                    <Check className="w-4 h-4 text-[#A64B5A]" />
                  ) : null}
                </div>
                <p className="text-[13px] text-[#1A1918]/60 leading-snug">
                  {isParcelDeliveryLocked ? '잔여일 5일 이하 잠금 (배송기간 부족)' : '영업일 기준 5일 소요'}
                </p>
              </div>
              <div className="mt-3 text-[14px] font-bold text-[#A64B5A]">
                +6,000원
              </div>
            </button>

            {/* 3. 퀵배송 - 별도 요금 추가 (급한 일정 가능) */}
            <button
              type="button"
              onClick={() => updateFormData({ deliveryMethod: 'quick' })}
              className={`p-4 text-left border-2 transition-all cursor-pointer rounded-xl flex flex-col justify-between ${
                formData.deliveryMethod === 'quick'
                  ? 'border-[#A64B5A] bg-[#FAF3F0] ring-2 ring-[#A64B5A]/20 shadow-xs'
                  : 'border-[#1A1918]/15 bg-white hover:border-[#1A1918]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[16px] font-bold ${formData.deliveryMethod === 'quick' ? 'text-[#A64B5A]' : 'text-[#1A1918]'}`}>
                    퀵배송
                  </span>
                  {formData.deliveryMethod === 'quick' && <Check className="w-4 h-4 text-[#A64B5A]" />}
                </div>
                <p className="text-[13px] text-[#1A1918]/60 leading-snug">
                  착불 또는 거리별 정산 (당일 발송)
                </p>
              </div>
              <div className="mt-3 text-[14px] font-bold text-amber-700">
                별도 요금 추가
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 이전 / 다음 단계 네비게이션 */}
      <div className="pt-4 flex items-center justify-between">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="py-4 px-6 border border-[#1A1918]/25 bg-white hover:bg-stone-50 text-[16px] font-bold text-[#1A1918] cursor-pointer flex items-center gap-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>이전 단계</span>
          </button>
        )}

        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className={`py-4 px-8 text-[17px] font-bold transition-all flex items-center gap-3 rounded-lg ${
            canProceed
              ? 'bg-[#1A1918] text-white hover:bg-[#333230] cursor-pointer shadow-sm'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          } ${!onPrev ? 'ml-auto' : ''}`}
        >
          <span>다음 단계로 이동</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
