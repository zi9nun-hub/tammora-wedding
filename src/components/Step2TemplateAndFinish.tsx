import React, { useState, useEffect, useMemo } from 'react';
import { Lock, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { QuoteFormState, InstallationType, FinishMethodId } from '../types';
import { TEMPLATES } from '../data/templates';
import { FINISH_METHODS } from '../data/finishMethods';
import { HorizontalBannerPreview, FinishMethodImage } from './BannerGraphics';

interface Step2Props {
  formData: QuoteFormState;
  updateFormData: (updates: Partial<QuoteFormState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2TemplateAndFinish: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  const selectedTemplate =
    TEMPLATES.find((t) => t.id === formData.selectedTemplateId) || TEMPLATES[0];

  // Responsive column count for chunking rows so preview is inserted directly beneath the selected row
  const [cols, setCols] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCols(1);
      } else if (window.innerWidth < 1024) {
        setCols(2);
      } else {
        setCols(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Split templates into chunks of size `cols`
  const templateRows = useMemo(() => {
    const rows: typeof TEMPLATES[] = [];
    for (let i = 0; i < TEMPLATES.length; i += cols) {
      rows.push(TEMPLATES.slice(i, i + cols));
    }
    return rows;
  }, [cols]);

  // Outdoor rule helper:
  // 실외 선택시 열재단, 아일렛타공+줄, 아일렛타공+큐방 잠금
  const handleInstallationChange = (type: InstallationType) => {
    let nextFinish = formData.finishMethod;
    if (type === 'outdoor') {
      if (
        nextFinish === 'heat_cut' ||
        nextFinish === 'eyelet_rope' ||
        nextFinish === 'eyelet_suction'
      ) {
        nextFinish = 'wood_rope';
      }
    }
    updateFormData({ installationType: type, finishMethod: nextFinish });
  };

  const isFinishMethodAllowed = (methodId: FinishMethodId): boolean => {
    if (formData.installationType === 'outdoor') {
      return methodId === 'wood_rope' || methodId === 'flat_band';
    }
    return true;
  };

  const canProceed =
    Boolean(formData.selectedTemplateId) &&
    Boolean(formData.installationType) &&
    Boolean(formData.finishMethod);

  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn pb-12">
      {/* 헤더 섹션: 포인트 컬러 타이틀, 부가설명 간격 2배 확대 (space-y-6) */}
      <section className="space-y-6 text-center">
        <h2 className="text-[26px] sm:text-[34px] font-bold text-[#A64B5A] leading-[1.2] tracking-tight">
          템플릿 고르기 및 마감 방법 선택
        </h2>
        <p className="text-[16px] sm:text-[17px] text-[#1A1918]/70 leading-relaxed max-w-2xl mx-auto">
          원하시는 현수막 디자인 템플릿과 설치 장소에 부합하는 마감 옵션을 선택해 주세요.
        </p>
      </section>

      {/* 컨테이너 1: 숫자를 채운 원형 기호로 타이틀 변경 */}
      <div className="bg-[#ffffff] border border-stone-200/90 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
        <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1A1918] tracking-tight mb-2 flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#1A1918] text-white text-[13px] font-bold inline-flex items-center justify-center shrink-0">
            1
          </span>
          <span>현수막 템플릿 선택 (21종)</span>
        </h3>

        {/* 템플릿 목록: 선택된 템플릿이 속한 행 바로 아래에 실물 미리보기가 인라인 삽입됨 */}
        <div className="space-y-4">
          {templateRows.map((row, rIndex) => {
            const hasSelectedInRow = row.some((t) => t.id === formData.selectedTemplateId);

            return (
              <React.Fragment key={rIndex}>
                {/* 템플릿 카드 행 */}
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  }}
                >
                  {row.map((tmpl) => {
                    const isSelected = formData.selectedTemplateId === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => updateFormData({ selectedTemplateId: tmpl.id })}
                        className={`p-3.5 border transition-all cursor-pointer flex flex-col justify-between rounded-xl ${
                          isSelected
                            ? 'border-[#A64B5A] bg-[#FFFDFC] ring-2 ring-[#A64B5A]/30 shadow-xs'
                            : 'border-[#1A1918]/15 bg-white hover:border-[#1A1918]'
                        }`}
                      >
                        <div className="mb-2">
                          <HorizontalBannerPreview
                            template={tmpl}
                            groomName={formData.groomName || '김민준'}
                            brideName={formData.brideName || '이지은'}
                            weddingHall={formData.weddingHall || '웨딩홀'}
                            className="pointer-events-none"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-bold text-[15px] text-[#1A1918] truncate">
                            {tmpl.title}
                          </span>
                          <span
                            className={`text-[12px] font-bold px-2 py-0.5 border rounded ${
                              isSelected
                                ? 'bg-[#A64B5A] text-white border-[#A64B5A]'
                                : 'border-[#1A1918]/20 text-[#1A1918]/60'
                            }`}
                          >
                            선택
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 선택한 버튼 바로 아래에 삽입되는 실물 크기 미리보기 블럭 */}
                {hasSelectedInRow && (
                  <div className="bg-[#ffffff] p-5 sm:p-7 border-2 border-[#A64B5A]/40 rounded-xl space-y-3 animate-fadeIn my-2 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#1A1918]/10 pb-2.5">
                      <h4 className="text-[17px] font-bold text-[#A64B5A]">
                        {selectedTemplate.title} 실시간 미리보기
                      </h4>
                      <span className="text-[13px] text-[#1A1918]/60 font-medium">
                        5000 × 900 비율
                      </span>
                    </div>

                    <HorizontalBannerPreview
                      template={selectedTemplate}
                      groomName={formData.groomName || '김민준'}
                      brideName={formData.brideName || '이지은'}
                      eventDateText={
                        formData.eventDate
                          ? `${formData.eventDate.replace(/-/g, '. ')} ${formData.eventTime || '12:00'}`
                          : '2026. 10. 25 12:30'
                      }
                      weddingHall={formData.weddingHall || '그랜드 앰배서더 호텔 블리스홀'}
                      showDimensions={true}
                      widthMm={formData.widthMm}
                      heightMm={formData.heightMm}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 컨테이너 2: 현수막 마감방법 (숫자를 채운 원형 기호) */}
      <div className="bg-[#ffffff] border border-stone-200/90 rounded-2xl p-6 sm:p-9 shadow-xs space-y-7">
        <h3 className="text-[20px] sm:text-[22px] font-bold text-[#1A1918] tracking-tight mb-2 flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#1A1918] text-white text-[13px] font-bold inline-flex items-center justify-center shrink-0">
            2
          </span>
          <span>현수막 마감방법</span>
        </h3>

        {/* 설치 장소 선택 (실내 / 실외) */}
        <div className="space-y-3">
          <label className="block text-[15px] font-bold text-[#1A1918]">
            설치 장소 선택 (필수)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleInstallationChange('indoor')}
              className={`p-5 text-left border-2 transition-all cursor-pointer rounded-xl ${
                formData.installationType === 'indoor'
                  ? 'bg-[#FAF3F0] text-[#A64B5A] border-[#A64B5A] ring-2 ring-[#A64B5A]/20 shadow-xs'
                  : 'bg-white text-[#1A1918] border-[#1A1918]/15 hover:border-[#1A1918]'
              }`}
            >
              <div className="text-[16px] font-bold mb-1.5">
                실내 설치
              </div>
              <p
                className={`text-[14px] leading-relaxed ${
                  formData.installationType === 'indoor' ? 'text-[#8C5E4E]' : 'text-[#1A1918]/60'
                }`}
              >
                예식장 본식 홀 벽면, 신부대기실, 실내 로비, 포토테이블 부착
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleInstallationChange('outdoor')}
              className={`p-5 text-left border-2 transition-all cursor-pointer rounded-xl ${
                formData.installationType === 'outdoor'
                  ? 'bg-[#FAF3F0] text-[#A64B5A] border-[#A64B5A] ring-2 ring-[#A64B5A]/20 shadow-xs'
                  : 'bg-white text-[#1A1918] border-[#1A1918]/15 hover:border-[#1A1918]'
              }`}
            >
              <div className="text-[16px] font-bold mb-1.5">
                실외 설치
              </div>
              <p
                className={`text-[14px] leading-relaxed ${
                  formData.installationType === 'outdoor' ? 'text-[#8C5E4E]' : 'text-[#1A1918]/60'
                }`}
              >
                야외 가든 웨딩, 정원 펜스, 건물 외벽 등 바람에 노출되는 환경
              </p>
            </button>
          </div>
        </div>

        {/* 현수막 마감 옵션 5종: 1줄당 4칸 (모바일 2칸: grid-cols-2 md:grid-cols-4) */}
        {formData.installationType ? (
          <div className="space-y-4 pt-3 animate-fadeIn border-t border-[#1A1918]/10">
            <label className="block text-[15px] font-bold text-[#1A1918]">
              마감 가공 방식 선택 (5종)
            </label>

            {/* 실외 설치 시 잠금 경고 문구 */}
            {formData.installationType === 'outdoor' && (
              <div className="p-5 bg-[#FFF0F0] border-l-4 border-[#A64B5A] rounded-r-xl flex items-start gap-3.5 mb-3">
                <AlertCircle className="w-6 h-6 text-[#A64B5A] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[16px] font-bold text-[#A64B5A]">
                    실외설치일 경우 타공이 찢어질 위험이 있어 사각각목+끈부터 선택하실 수 있습니다.
                  </div>
                  <p className="text-[14px] text-[#1A1918]/80 mt-1 leading-relaxed">
                    야외 강풍 시 타공 찢어짐 위험으로 인해 열재단, 아일렛타공+줄, 아일렛타공+큐방 옵션은 선택하실 수 없습니다.
                  </p>
                </div>
              </div>
            )}

            {/* 1줄당 4칸 (모바일 2칸): grid grid-cols-2 md:grid-cols-4 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {FINISH_METHODS.map((method) => {
                const isAllowed = isFinishMethodAllowed(method.id);
                const isSelected = formData.finishMethod === method.id;

                return (
                  <div
                    key={method.id}
                    onClick={() => {
                      if (isAllowed) {
                        updateFormData({ finishMethod: method.id });
                      }
                    }}
                    className={`p-4 border transition-all flex flex-col justify-between relative rounded-xl ${
                      !isAllowed
                        ? 'bg-stone-100/70 border-[#1A1918]/10 opacity-50 cursor-not-allowed select-none'
                        : isSelected
                        ? 'bg-[#FAF3F0] border-[#A64B5A] ring-2 ring-[#A64B5A]/20 shadow-xs cursor-pointer'
                        : 'bg-white border-[#1A1918]/15 hover:border-[#1A1918] cursor-pointer'
                    }`}
                  >
                    {/* 1:1 미리보기 다이어그램 */}
                    <div className="mb-3 relative rounded-lg overflow-hidden">
                      <FinishMethodImage methodId={method.id} />
                      {!isAllowed && (
                        <div className="absolute inset-0 bg-[#1A1918]/70 flex flex-col items-center justify-center text-white p-2 text-center">
                          <Lock className="w-4 h-4 mb-1 text-rose-300" />
                          <span className="text-[12px] font-bold text-white">실외 잠금</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                        <span className="text-[16px] font-bold text-[#1A1918]">
                          {method.name}
                        </span>
                        <span className="text-[14px] font-bold text-[#A64B5A]">
                          {method.priceDisplay}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#1A1918]/70 leading-relaxed mb-3 line-clamp-2">
                        {method.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#1A1918]/10 flex items-center justify-between">
                      <span className="text-[11px] text-[#1A1918]/60 truncate">
                        {formData.installationType === 'indoor'
                          ? method.indoorSuitability
                          : method.outdoorSuitability}
                      </span>
                      <span
                        className={`text-[12px] font-bold px-2 py-0.5 border rounded ${
                          isSelected
                            ? 'bg-[#A64B5A] text-white border-[#A64B5A]'
                            : 'border-[#1A1918]/20 text-[#1A1918]/60'
                        }`}
                      >
                        {isSelected ? '선택' : '선택'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-8 border-2 border-dashed border-[#1A1918]/20 bg-stone-50/50 rounded-xl text-center">
            <p className="text-[16px] font-bold text-[#1A1918]">
              실내 또는 실외 설치 장소를 먼저 선택해 주세요
            </p>
            <p className="text-[14px] text-[#1A1918]/60 mt-1">
              장소에 부합하는 5가지 마감 가공 옵션이 나타납니다.
            </p>
          </div>
        )}
      </div>

      {/* 이전 / 다음 단계 네비게이션 */}
      <div className="pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="py-4 px-6 border border-[#1A1918]/25 bg-white hover:bg-stone-50 text-[16px] font-bold text-[#1A1918] cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>이전 단계</span>
        </button>

        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className={`py-4 px-8 text-[17px] font-bold transition-all flex items-center gap-3 ${
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
