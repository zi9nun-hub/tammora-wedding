import React from 'react';
import { QuoteFormState, BannerStandType } from '../types';
import { TEMPLATES } from '../data/templates';
import { VerticalBannerPreview, BannerStandImage } from './BannerGraphics';
import { formatPrice } from '../utils/calculator';
import { Check, ArrowRight, ArrowLeft, Plus } from 'lucide-react';

interface Step3Props {
  formData: QuoteFormState;
  updateFormData: (updates: Partial<QuoteFormState>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip?: () => void;
}

export const Step3BannerAddon: React.FC<Step3Props> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  const selectedTemplate =
    TEMPLATES.find((t) => t.id === formData.selectedTemplateId) || TEMPLATES[0];

  const handleSelectAddBanner = (need: boolean) => {
    updateFormData({
      addBanner: need,
      bannerStandType: need ? (formData.bannerStandType || 'none') : 'none'
    });
  };

  const handleSelectStand = (stand: BannerStandType) => {
    updateFormData({
      addBanner: true,
      bannerStandType: stand
    });
  };

  const bannerPrintPrice = 51000;
  const standPrices: Record<BannerStandType, { name: string; price: number; desc: string }> = {
    none: {
      name: '배너대 없음 (출력물 600*1800만 구매)',
      price: 0,
      desc: '기존 거치대 보유 시 권장'
    },
    indoor: {
      name: '실내 배너대',
      price: 22000,
      desc: '웨딩홀 로비, 신부대기실 실내 전용 가벼운 거치대'
    },
    outdoor_water: {
      name: '실외(물통) 배너대',
      price: 42000,
      desc: '바람에 강한 하부 물통형 중량 거치대'
    }
  };

  const currentStandPrice = formData.addBanner ? standPrices[formData.bannerStandType].price : 0;
  const currentBannerTotal = formData.addBanner ? bannerPrintPrice + currentStandPrice : 0;
  const canProceed = formData.addBanner !== null;

  return (
    <div className="space-y-10 sm:space-y-12 animate-fadeIn pb-12">
      {/* 헤더 섹션: 타이틀과 부가설명 간격 2배 확대 (space-y-6) */}
      <section className="space-y-6 text-center">
        <h2 className="text-[26px] sm:text-[34px] font-bold text-[#A64B5A] leading-[1.2] tracking-tight">
          동일 디자인 스탠딩 배너 추가 제작
        </h2>
        <p className="text-[16px] sm:text-[17px] text-[#1A1918]/70 leading-relaxed max-w-2xl mx-auto">
          같은 디자인으로 배너를 추가 제작할 수 있습니다.<br />
          필요하지 않은 경우 '안할래요'를 선택해 주세요.
        </p>
      </section>

      {/* 좌측 배너 실물 미리보기 & 우측 옵션 선택 (구분감 있는 컨테이너) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 좌측: 스탠딩 배너 실물 뷰 */}
        <div className="lg:col-span-5 bg-[#ffffff] p-6 sm:p-7 border border-stone-200/90 rounded-2xl shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-[16px] font-bold text-[#1A1918]">스탠딩 배너 실물 미리보기</span>
          </div>

          <div className="w-full flex justify-center py-2">
            <VerticalBannerPreview
              template={selectedTemplate}
              groomName={formData.groomName || '김민준'}
              brideName={formData.brideName || '이지은'}
              eventDateText={
                formData.eventDate
                  ? `${formData.eventDate.replace(/-/g, '. ')} ${formData.eventTime || '12:00'}`
                  : '2026. 10. 25 12:30'
              }
              weddingHall={formData.weddingHall || '그랜드 앰배서더 호텔'}
              showDimensions={false}
            />
          </div>

          <p className="text-[13px] text-[#1A1918]/60 text-center mt-4">
            * 선택하신 [{selectedTemplate.title}] 디자인과 동일하게 제작됩니다.
          </p>
        </div>

        {/* 우측: 배너 제작 여부 및 배너대 선택 */}
        <div className="lg:col-span-7 space-y-7">
          {/* 컨테이너 1: 필요해요/안할래요 (숫자를 채운 원형 기호) */}
          <div className="bg-[#ffffff] border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1A1918] tracking-tight mb-2 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#1A1918] text-white text-[13px] font-bold inline-flex items-center justify-center shrink-0">
                1
              </span>
              <span>배너 추가 제작 여부</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 필요해요 */}
              <button
                type="button"
                onClick={() => handleSelectAddBanner(true)}
                className={`p-5 text-left border-2 transition-all cursor-pointer rounded-xl ${
                  formData.addBanner === true
                    ? 'border-[#A64B5A] bg-[#FAF3F0] ring-2 ring-[#A64B5A]/20 shadow-xs'
                    : 'border-[#1A1918]/15 bg-white hover:border-[#1A1918]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[17px] font-bold ${formData.addBanner === true ? 'text-[#A64B5A]' : 'text-[#1A1918]'}`}>
                    필요해요
                  </span>
                  {formData.addBanner === true && <Check className="w-4 h-4 text-[#A64B5A]" />}
                </div>
                <div className="text-[13px] text-[#1A1918]/60 font-medium">
                  최대 93,000원 소요
                </div>
              </button>

              {/* 안할래요 */}
              <button
                type="button"
                onClick={() => handleSelectAddBanner(false)}
                className={`p-5 text-left border-2 transition-all cursor-pointer rounded-xl ${
                  formData.addBanner === false
                    ? 'border-[#1A1918] bg-stone-50 ring-2 ring-[#1A1918]/15 shadow-xs'
                    : 'border-[#1A1918]/15 bg-white hover:border-[#1A1918]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[17px] font-bold text-[#1A1918]">
                    안할래요
                  </span>
                  {formData.addBanner === false && <Check className="w-4 h-4 text-[#1A1918]" />}
                </div>
                <div className="text-[13px] text-[#1A1918]/60 font-medium">
                  현수막만 제작
                </div>
              </button>
            </div>
          </div>

          {/* 컨테이너 2: '필요해요' 선택 시 배너대 구성 선택 (숫자를 채운 원형 기호) */}
          {formData.addBanner === true && (
            <div className="bg-[#ffffff] border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6 animate-fadeIn">
              <div className="mb-2">
                <h4 className="text-[19px] font-bold text-[#1A1918] flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#1A1918] text-white text-[13px] font-bold inline-flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>배너대 구성 선택</span>
                </h4>
                <p className="text-[14px] text-[#1A1918]/70 mt-1">
                  배너대는 기본 포함이 아니므로 추가금이 발생합니다. 배너대 구매 시 원하시는 종류를 선택해주세요.
                </p>
              </div>

              {/* 1. 배너 디자인출력 */}
              <div className="py-2 flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <div className="text-[16px] font-bold text-[#1A1918]">
                    1. 배너 디자인출력 (600 × 1800)
                  </div>
                  <div className="text-[13px] text-[#1A1918]/60 mt-0.5">
                    무광 코팅 고급 PET 원단 + 사방 타공링 마감 (필수 기본 출력물)
                  </div>
                </div>
                <span className="text-[18px] font-bold text-[#1A1918] shrink-0 ml-3">
                  51,000원
                </span>
              </div>

              {/* + 그래픽: 배경/테두리 없는 미니멀 아이콘 */}
              <div className="flex items-center justify-center py-0.5 text-[#1A1918]/30">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>

              {/* 배너대 3가지 옵션 (왼쪽에 1:1비율 참고 이미지 포함) */}
              <div className="space-y-3.5">
                <label className="block text-[14px] font-bold text-[#1A1918]">
                  배너 거치대 선택:
                </label>

                {/* 1. 배너대 없음 (왼쪽 1:1 이미지 + 우측 내용) */}
                <div
                  onClick={() => handleSelectStand('none')}
                  className={`p-4 border transition-all cursor-pointer rounded-xl flex items-center gap-4 ${
                    formData.bannerStandType === 'none'
                      ? 'border-[#A64B5A] bg-[#FAF3F0] ring-1 ring-[#A64B5A]/20 shadow-xs'
                      : 'bg-white border-[#1A1918]/15 hover:border-[#1A1918]'
                  }`}
                >
                  {/* 왼쪽 1:1 비율 참고 이미지 */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <BannerStandImage standType="none" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[16px] font-bold text-[#1A1918]">
                      배너대 없음 (출력물만 구매)
                    </div>
                    <div className="text-[13px] text-[#1A1918]/60 mt-0.5">
                      기존에 보유 중인 거치대가 있으신 경우 권장
                    </div>
                    <div className="mt-2 text-[15px] font-bold text-[#1A1918]">
                      +0원
                    </div>
                  </div>
                </div>

                {/* 2. 실내 배너대 (왼쪽 1:1 이미지 + 우측 내용) */}
                <div
                  onClick={() => handleSelectStand('indoor')}
                  className={`p-4 border transition-all cursor-pointer rounded-xl flex items-center gap-4 ${
                    formData.bannerStandType === 'indoor'
                      ? 'border-[#A64B5A] bg-[#FAF3F0] ring-1 ring-[#A64B5A]/20 shadow-xs'
                      : 'bg-white border-[#1A1918]/15 hover:border-[#1A1918]'
                  }`}
                >
                  {/* 왼쪽 1:1 비율 참고 이미지 */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <BannerStandImage standType="indoor" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[16px] font-bold text-[#1A1918]">
                      2. 실내 배너대
                    </div>
                    <div className="text-[13px] text-[#1A1918]/60 mt-0.5">
                      웨딩홀 로비, 신부대기실, 실내 입구 전용 가벼운 거치대
                    </div>
                    <div className="mt-2 text-[15px] font-bold text-[#A64B5A]">
                      +22,000원
                    </div>
                  </div>
                </div>

                {/* 3. 실외(물통) 배너대 (왼쪽 1:1 이미지 + 우측 내용) */}
                <div
                  onClick={() => handleSelectStand('outdoor_water')}
                  className={`p-4 border transition-all cursor-pointer rounded-xl flex items-center gap-4 ${
                    formData.bannerStandType === 'outdoor_water'
                      ? 'border-[#A64B5A] bg-[#FAF3F0] ring-1 ring-[#A64B5A]/20 shadow-xs'
                      : 'bg-white border-[#1A1918]/15 hover:border-[#1A1918]'
                  }`}
                >
                  {/* 왼쪽 1:1 비율 참고 이미지 */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <BannerStandImage standType="outdoor_water" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[16px] font-bold text-[#1A1918]">
                      3. 실외(물통) 배너대
                    </div>
                    <div className="text-[13px] text-[#1A1918]/60 mt-0.5">
                      야외 바람에도 넘어지지 않도록 하부에 물을 채우는 전용 거치대
                    </div>
                    <div className="mt-2 text-[15px] font-bold text-[#A64B5A]">
                      +42,000원
                    </div>
                  </div>
                </div>
              </div>

              {/* 배너 추가금 합계 */}
              <div className="p-4 bg-[#FAF8F5] border border-[#1A1918]/10 rounded-xl flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#1A1918]">배너 추가 옵션 합계:</span>
                <span className="text-[20px] font-bold text-[#A64B5A]">
                  {formatPrice(currentBannerTotal)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 이전 / 다음 단계 네비게이션 */}
      <div className="pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="py-4 px-6 border border-[#1A1918]/25 bg-white hover:bg-stone-50 text-[16px] font-bold text-[#1A1918] cursor-pointer flex items-center gap-2 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>이전 단계</span>
        </button>

        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className={`py-4 px-8 text-[17px] font-bold transition-all flex items-center gap-3 rounded-lg ${
            canProceed
              ? 'bg-[#1A1918] text-white hover:bg-[#333230] cursor-pointer shadow-sm'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <span>다음 단계로 이동</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
