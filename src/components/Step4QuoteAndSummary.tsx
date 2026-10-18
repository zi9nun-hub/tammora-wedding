import React, { useState } from 'react';
import { RotateCcw, Copy, MessageCircle, Eye, X } from 'lucide-react';
import { QuoteFormState } from '../types';
import { TEMPLATES } from '../data/templates';
import { FINISH_METHODS } from '../data/finishMethods';
import { calculateQuote, calculateRemainingDays, formatPrice } from '../utils/calculator';
import { HorizontalBannerPreview, VerticalBannerPreview, FinishMethodImage } from './BannerGraphics';

interface Step4Props {
  formData: QuoteFormState;
  onNavigateToStep: (step: number) => void;
  onResetAll: () => void;
}

type ModalPreviewType = 'template' | 'finish' | 'banner' | null;

export const Step4QuoteAndSummary: React.FC<Step4Props> = ({
  formData,
  onNavigateToStep,
  onResetAll,
}) => {
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ModalPreviewType>(null);

  const quote = calculateQuote(formData);
  const remaining = calculateRemainingDays(formData.eventDate, formData.eventTime);

  const selectedTemplate =
    TEMPLATES.find((t) => t.id === formData.selectedTemplateId) || TEMPLATES[0];
  const selectedFinish =
    FINISH_METHODS.find((f) => f.id === formData.finishMethod) || FINISH_METHODS[0];

  const handleCopyQuote = () => {
    let specialNotes = '';
    if (formData.isUrgent || formData.finishMethod === 'flat_band' || formData.deliveryMethod === 'quick') {
      specialNotes = `
================================
※ [특이사항]`;
      if (formData.isUrgent) {
        specialNotes += `\n★ 긴급제작요청: 행사 일정이 촉박하여 담당자 제작일정 확인 및 급행 추가금 협의가 필요합니다.`;
      }
      if (formData.finishMethod === 'flat_band') {
        specialNotes += `\n★ 밴드마감: 고강도 납작밴드 덧댐 특수 가공 방식으로 담당자와 별도 단가 상담이 필요합니다.`;
      }
      if (formData.deliveryMethod === 'quick') {
        specialNotes += `\n★ 퀵배송: 착불 또는 거리별 퀵배송 비용이 별도로 발생합니다 (견적서 금액에 미포함).`;
      }
    }

    const deliveryText =
      formData.deliveryMethod === 'pickup'
        ? '직접수령 (매장 방문 / 0원)'
        : formData.deliveryMethod === 'parcel'
        ? '택배배송 (5일 소요 / +6,000원)'
        : '퀵배송 (별도 요금 추가 / 퀵배송 미포함)';

    const quoteSummary = `[탐모라 웨딩 현수막 & 배너 견적서]
--------------------------------
1. 현수막 규격: ${formData.widthMm}mm × ${formData.heightMm}mm (${quote.widthM}m × ${quote.heightM}m)
2. 행사 예정일: ${formData.eventDate} ${formData.eventTime} (${remaining.dDayText})
3. 긴급 제작 요청: ${formData.isUrgent ? '신청함 (추가금/일정 확인 필요)' : '일반 일정'}
4. 템플릿: ${selectedTemplate.title}
5. 설치 환경: ${formData.installationType === 'indoor' ? '실내 설치' : '실외 설치'}
6. 마감 방법: ${selectedFinish.name} (${selectedFinish.priceDisplay})
7. 스탠딩 배너: ${
      formData.addBanner
        ? `신청 (${
            formData.bannerStandType === 'none'
              ? '출력물만 51,000원'
              : formData.bannerStandType === 'indoor'
              ? '실내 배너대 포함 73,000원'
              : '실외 물통 배너대 포함 93,000원'
          })`
        : '미신청'
    }
8. 수령 방법: ${deliveryText}
--------------------------------
■ 현수막 기본금: ${formatPrice(quote.bannerBasePrice)}
■ 마감 추가금: ${formatPrice(quote.finishCost)}${quote.hasSpecialInquiry ? ' (별도 문의)' : ''}
■ 배너 추가금: ${formatPrice(quote.bannerTotalAddon)}
■ 배송비: ${formData.deliveryMethod === 'parcel' ? '6,000원' : formData.deliveryMethod === 'quick' ? '별도 추가 (미포함)' : '0원 (직접수령)'}
================================
★ 최종 예상 견적: ${formatPrice(quote.totalPrice)}${
      quote.hasSpecialInquiry ? ' + 납작밴드 별도상담' : ''
    }${quote.isQuickDelivery ? ' (퀵배송 미포함)' : ''}${specialNotes}
`;

    navigator.clipboard.writeText(quoteSummary).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 4500);
    });
  };

  return (
    <div className="space-y-10 sm:space-y-12 animate-fadeIn pb-14">
      {/* 헤더 섹션: 포인트 컬러 타이틀, 부가설명 간격 2배 확대 (space-y-6) */}
      <section className="space-y-6 text-center">
        <h2 className="text-[26px] sm:text-[34px] font-bold text-[#A64B5A] leading-[1.2] tracking-tight">
          주문 확인 및 견적 안내
        </h2>
        <p className="text-[16px] sm:text-[17px] text-[#1A1918]/70 leading-relaxed max-w-2xl mx-auto">
          선택하신 주문 내역과 최종 예상 견적입니다.<br />
          각 항목 우측의 <strong>'이미지 미리보기'</strong>로 디자인을 확인하거나<br />
          <strong>'수정'</strong> 버튼으로 옵션을 변경하실 수 있습니다.
        </p>
      </section>

      {/* 주문 선택 옵션 상세 컨테이너 (숫자를 채운 원형 기호) */}
      <div className="bg-[#ffffff] border border-stone-200/90 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
        <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1A1918] tracking-tight mb-2 flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#1A1918] text-white text-[13px] font-bold inline-flex items-center justify-center shrink-0">
            1
          </span>
          <span>주문 선택 옵션 상세</span>
        </h3>

        <div className="divide-y divide-[#1A1918]/10 text-[15px] sm:text-[16px]">
          {/* 1. 현수막 규격 (폰트 굵기 완화) */}
          <div className="py-4 flex items-center justify-between gap-3">
            <div className="w-24 sm:w-32 font-medium text-[#1A1918]/70 shrink-0">
              현수막 규격
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-medium text-[#1A1918]">
                {formData.widthMm} × {formData.heightMm} mm
                <span className="text-[#1A1918]/60 font-normal ml-2">
                  ({quote.widthM}m × {quote.heightM}m)
                </span>
              </span>
              <span className="font-medium text-[#1A1918] sm:text-right">
                기본금 {formatPrice(quote.bannerBasePrice)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToStep(1)}
              className="px-3 py-1.5 border border-[#1A1918]/30 hover:bg-[#1A1918] hover:text-white text-[13px] font-bold text-[#1A1918] transition-all cursor-pointer shrink-0 rounded"
            >
              수정
            </button>
          </div>

          {/* 2. 행사 예정일 (폰트 굵기 완화) */}
          <div className="py-4 flex items-center justify-between gap-3">
            <div className="w-24 sm:w-32 font-medium text-[#1A1918]/70 shrink-0">
              행사 예정일
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-medium text-[#1A1918]">
                {formData.eventDate} {formData.eventTime}
              </span>
              <span className="font-semibold text-[#A64B5A] sm:text-right">
                {remaining.dDayText}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToStep(1)}
              className="px-3 py-1.5 border border-[#1A1918]/30 hover:bg-[#1A1918] hover:text-white text-[13px] font-bold text-[#1A1918] transition-all cursor-pointer shrink-0 rounded"
            >
              수정
            </button>
          </div>

          {/* 3. 선택 템플릿 (폰트 굵기 완화) */}
          <div className="py-4 flex items-center justify-between gap-3">
            <div className="w-24 sm:w-32 font-medium text-[#1A1918]/70 shrink-0">
              선택 템플릿
            </div>
            <div className="flex-1">
              <span className="font-medium text-[#1A1918]">
                {selectedTemplate.title}
              </span>
              <span className="text-[13px] text-[#1A1918]/60 block sm:inline sm:ml-2">
                ({selectedTemplate.tag})
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal('template')}
                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-[#555555] border border-stone-300 text-[12px] font-bold flex items-center gap-1 cursor-pointer transition-colors rounded"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>이미지 미리보기</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateToStep(2)}
                className="px-3 py-1.5 border border-[#1A1918]/30 hover:bg-[#1A1918] hover:text-white text-[13px] font-bold text-[#1A1918] transition-all cursor-pointer rounded"
              >
                수정
              </button>
            </div>
          </div>

          {/* 4. 설치 환경 (폰트 굵기 완화) */}
          <div className="py-4 flex items-center justify-between gap-3">
            <div className="w-24 sm:w-32 font-medium text-[#1A1918]/70 shrink-0">
              설치 환경
            </div>
            <div className="flex-1">
              <span className="font-medium text-[#1A1918]">
                {formData.installationType === 'indoor' ? '실내 설치' : '실외 설치'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToStep(2)}
              className="px-3 py-1.5 border border-[#1A1918]/30 hover:bg-[#1A1918] hover:text-white text-[13px] font-bold text-[#1A1918] transition-all cursor-pointer rounded"
            >
              수정
            </button>
          </div>

          {/* 5. 마감 방법 (폰트 굵기 완화) */}
          <div className="py-4 flex items-center justify-between gap-3">
            <div className="w-24 sm:w-32 font-medium text-[#1A1918]/70 shrink-0">
              마감 방법
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-medium text-[#1A1918]">
                {selectedFinish.name}
              </span>
              <span className="font-medium text-[#1A1918] sm:text-right">
                {quote.hasSpecialInquiry ? '추가 문의 필요' : selectedFinish.priceDisplay}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal('finish')}
                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-[#555555] border border-stone-300 text-[12px] font-bold flex items-center gap-1 cursor-pointer transition-colors rounded"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>이미지 미리보기</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateToStep(2)}
                className="px-3 py-1.5 border border-[#1A1918]/30 hover:bg-[#1A1918] hover:text-white text-[13px] font-bold text-[#1A1918] transition-all cursor-pointer rounded"
              >
                수정
              </button>
            </div>
          </div>

          {/* 6. 스탠딩 배너 (폰트 굵기 완화) */}
          <div className="py-4 flex items-center justify-between gap-3">
            <div className="w-24 sm:w-32 font-medium text-[#1A1918]/70 shrink-0">
              스탠딩 배너
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-medium text-[#1A1918]">
                {formData.addBanner
                  ? `신청 (${
                      formData.bannerStandType === 'none'
                        ? '배너대 미포함 / 출력물만'
                        : formData.bannerStandType === 'indoor'
                        ? '실내 배너대 포함'
                        : '실외(물통) 배너대 포함'
                    })`
                  : '미신청'}
              </span>
              <span className="font-medium text-[#1A1918] sm:text-right">
                {formData.addBanner ? formatPrice(quote.bannerTotalAddon) : '0원'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {formData.addBanner && (
                <button
                  type="button"
                  onClick={() => setActiveModal('banner')}
                  className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-[#555555] border border-stone-300 text-[12px] font-bold flex items-center gap-1 cursor-pointer transition-colors rounded"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>이미지 미리보기</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigateToStep(3)}
                className="px-3 py-1.5 border border-[#1A1918]/30 hover:bg-[#1A1918] hover:text-white text-[13px] font-bold text-[#1A1918] transition-all cursor-pointer rounded"
              >
                수정
              </button>
            </div>
          </div>

          {/* 7. 수령 방법 */}
          <div className="py-4 flex items-center justify-between gap-3">
            <div className="w-24 sm:w-32 font-medium text-[#1A1918]/70 shrink-0">
              수령 방법
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-medium text-[#1A1918]">
                {formData.deliveryMethod === 'pickup'
                  ? '직접수령 (매장 방문)'
                  : formData.deliveryMethod === 'parcel'
                  ? '택배배송 (5일 소요)'
                  : '퀵배송'}
              </span>
              <span className={`font-medium ${formData.deliveryMethod === 'quick' ? 'text-amber-700' : 'text-[#1A1918]'} sm:text-right`}>
                {formData.deliveryMethod === 'pickup'
                  ? '0원'
                  : formData.deliveryMethod === 'parcel'
                  ? '+6,000원'
                  : '별도 요금 추가 (퀵배송 미포함)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onNavigateToStep(1)}
                className="px-3 py-1.5 border border-[#1A1918]/30 hover:bg-[#1A1918] hover:text-white text-[13px] font-bold text-[#1A1918] transition-all cursor-pointer rounded"
              >
                수정
              </button>
            </div>
          </div>
        </div>

        {/* 최종 예상 견적금액 (납작밴드 및 퀵배송 미포함 표시) */}
        <div className="p-6 bg-stone-50/70 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div>
            <div className="text-[17px] font-bold text-[#1A1918]">
              최종 예상 견적 금액
            </div>
            <div className="text-[13px] text-[#1A1918]/60 mt-0.5">
              부가세(VAT) 포함 {formData.deliveryMethod === 'parcel' ? '/ 택배배송비 포함' : formData.deliveryMethod === 'quick' ? '/ 퀵배송비 별도' : '/ 직접수령'}
            </div>
          </div>
          <div className="text-[26px] font-extrabold text-[#A64B5A] tracking-tight flex flex-wrap items-center justify-end">
            <span>{formatPrice(quote.totalPrice)}</span>
            {quote.hasSpecialInquiry && (
              <span className="text-[14px] font-medium text-amber-700 ml-2">
                (+납작밴드 별도상담)
              </span>
            )}
            {quote.isQuickDelivery && (
              <span className="text-[14px] font-medium text-amber-700 ml-2">
                (퀵배송 미포함)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 복사하기 & 카톡 이동 영역 (카톡 채널 위쪽에 메시지 말풍선 디자인 팝업) */}
      <div className="relative pt-4 flex flex-col items-center gap-3">
        {/* 안내 문구 (가운데 정렬, 작게) */}
        <p className="text-[14px] text-center text-[#1A1918]/75 font-medium">
          아래 버튼으로 견적서를 복사한 후, 채널에 붙여주시면 더 원할한 문의가 가능합니다
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {/* 견적서 복사하기 버튼 */}
          <button
            type="button"
            onClick={handleCopyQuote}
            className="w-full sm:w-auto px-8 py-4 bg-[#1A1918] hover:bg-[#333230] text-white text-[17px] font-bold inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm rounded-lg"
          >
            <Copy className="w-5 h-5 text-[#FFD8B8]" />
            <span>{copySuccess ? '견적서 복사 완료!' : '견적서 복사하기'}</span>
          </button>

          {/* 카톡채널 이동하기 버튼 & 바로 위에 뜨는 메시지 디자인 말풍선 */}
          <div className="relative w-full sm:w-auto flex flex-col items-center">
            {copySuccess && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-3.5 py-1.5 bg-[#FAF8F5] border border-stone-300 text-stone-800 text-[13px] font-bold rounded-lg shadow-sm animate-bounce flex items-center gap-1.5">
                <span>💬 카톡 채널에서 복사한 내용을 붙여주세요</span>
                {/* 말풍선 아래 꼬리 */}
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#FAF8F5] border-r border-b border-stone-300 rotate-45" />
              </div>
            )}

            <a
              href="https://pf.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] text-[17px] font-bold inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm rounded-lg"
            >
              <MessageCircle className="w-5 h-5 text-[#191919]" />
              <span>카톡채널 이동하기</span>
            </a>
          </div>
        </div>
      </div>

      {/* 처음부터 다시하기 버튼 및 필수 안내 문구 (맨 밑) */}
      <div className="pt-8 border-t border-[#1A1918]/10 text-center space-y-3">
        <p className="text-[14px] text-[#1A1918]/65 font-medium">
          부분 수정이 필요한 경우 주문 확인 내역에 수정할 옵션을 클릭해주세요
        </p>

        <div>
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="px-6 py-3 border border-[#1A1918]/30 bg-white hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 text-[15px] font-bold text-[#1A1918] inline-flex items-center gap-2 transition-all cursor-pointer rounded-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>처음부터 다시하기</span>
          </button>
        </div>
      </div>

      {/* 이미지 미리보기 모달 창 */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1918]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-[#1A1918]/20 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1A1918]/10 pb-3">
              <h4 className="text-[19px] font-bold text-[#1A1918]">
                {activeModal === 'template' && `선택 템플릿: ${selectedTemplate.title}`}
                {activeModal === 'finish' && `마감 방법: ${selectedFinish.name}`}
                {activeModal === 'banner' && `스탠딩 배너: ${selectedTemplate.title}`}
              </h4>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-md text-[#1A1918]/60 hover:text-[#1A1918] hover:bg-stone-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="py-2 flex justify-center">
              {activeModal === 'template' && (
                <div className="w-full space-y-3">
                  <HorizontalBannerPreview
                    template={selectedTemplate}
                    groomName={formData.groomName || '김민준'}
                    brideName={formData.brideName || '이지은'}
                    weddingHall={formData.weddingHall || '웨딩홀'}
                    showDimensions={true}
                    widthMm={formData.widthMm}
                    heightMm={formData.heightMm}
                  />
                  <div className="text-center text-[14px] text-stone-500">
                    5000 × 900 비율 현수막 실물 그래픽
                  </div>
                </div>
              )}

              {activeModal === 'finish' && (
                <div className="flex flex-col items-center space-y-3 max-w-md w-full">
                  <div className="w-64 h-64 border border-stone-200 rounded-xl overflow-hidden shadow-xs bg-stone-50">
                    <FinishMethodImage methodId={selectedFinish.id} />
                  </div>
                  <div className="text-center">
                    <div className="text-[17px] font-bold text-[#1A1918]">
                      {selectedFinish.name} ({selectedFinish.priceDisplay})
                    </div>
                    <p className="text-[14px] text-stone-600 mt-1">
                      {selectedFinish.description}
                    </p>
                  </div>
                </div>
              )}

              {activeModal === 'banner' && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-64">
                    <VerticalBannerPreview
                      template={selectedTemplate}
                      groomName={formData.groomName || '김민준'}
                      brideName={formData.brideName || '이지은'}
                      weddingHall={formData.weddingHall || '웨딩홀'}
                      showDimensions={false}
                    />
                  </div>
                  <div className="text-center text-[14px] text-stone-500">
                    600 × 1800 비율 스탠딩 배너 실물 그래픽
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#1A1918]/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="py-2.5 px-6 bg-[#1A1918] text-white font-bold text-[15px] rounded-lg hover:bg-[#333230] transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 처음부터 다시하기 확인 모달 */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1918]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 max-w-md w-full border border-[#1A1918] text-center space-y-5 rounded-2xl shadow-xl">
            <div className="w-12 h-12 border border-[#A64B5A] text-[#A64B5A] flex items-center justify-center mx-auto rounded-full">
              <span className="text-xl font-bold">!</span>
            </div>

            <div>
              <h4 className="text-[20px] font-bold text-[#1A1918]">
                초기화 확인
              </h4>
              <p className="text-[17px] font-bold text-[#A64B5A] mt-2">
                모든 내역이 삭제되고 처음부터 다시 시작됩니다
              </p>
              <p className="text-[14px] text-[#1A1918]/70 mt-1 leading-relaxed">
                기입하신 규격, 디자인, 마감 및 배너 옵션이<br />
                모두 기본값으로 리셋됩니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="py-3 px-4 border border-[#1A1918]/30 text-[#1A1918] text-[15px] font-bold hover:bg-stone-100 cursor-pointer rounded-lg"
              >
                취소
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  onResetAll();
                }}
                className="py-3 px-4 bg-[#1A1918] text-white text-[15px] font-bold hover:bg-[#333230] cursor-pointer rounded-lg"
              >
                다시시작
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
