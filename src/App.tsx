import React, { useState } from 'react';
import { QuoteFormState } from './types';
import { TopStepper } from './components/TopStepper';
import { Footer } from './components/Footer';
import { Step0Intro } from './components/Step0Intro';
import { Step1SizeAndDate } from './components/Step1SizeAndDate';
import { Step2TemplateAndFinish } from './components/Step2TemplateAndFinish';
import { Step3BannerAddon } from './components/Step3BannerAddon';
import { Step4QuoteAndSummary } from './components/Step4QuoteAndSummary';

const getInitialFormState = (): QuoteFormState => {
  const d = new Date();
  d.setDate(d.getDate() + 35);
  const defaultDateStr = d.toISOString().split('T')[0];

  return {
    widthMm: 5000,
    heightMm: 900,
    eventDate: defaultDateStr,
    eventTime: '12:30',
    isUrgent: false,
    deliveryMethod: 'pickup',

    selectedTemplateId: 1,
    groomName: '김민준',
    brideName: '이지은',
    weddingHall: '그랜드 앰배서더 서울 블리스홀',
    installationType: null,
    finishMethod: null,

    addBanner: null,
    bannerStandType: 'none',
  };
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<QuoteFormState>(getInitialFormState);

  const updateFormData = (updates: Partial<QuoteFormState>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const isStep1Valid =
    formData.widthMm >= 300 &&
    formData.heightMm >= 300 &&
    !(formData.widthMm > 1800 && formData.heightMm > 1800) &&
    Boolean(formData.eventDate);

  const isStep2Valid =
    isStep1Valid &&
    Boolean(formData.selectedTemplateId) &&
    Boolean(formData.installationType) &&
    Boolean(formData.finishMethod);

  const isStep3Valid = isStep2Valid && formData.addBanner !== null;

  const canNavigateToStep = (targetStep: number): boolean => {
    if (targetStep === 0) return true;
    if (targetStep === 1) return true;
    if (targetStep === 2) return isStep1Valid;
    if (targetStep === 3) return isStep2Valid;
    if (targetStep === 4) return isStep3Valid;
    return false;
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSkipStep3 = () => {
    updateFormData({ addBanner: false, bannerStandType: 'none' });
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetAll = () => {
    setFormData(getInitialFormState());
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1A1918] flex flex-col antialiased">
      {/* 1. 상단 Stepper 네비게이션 (스텝퍼 위쪽 배치, 배경 #fefefe) */}
      <TopStepper
        currentStep={currentStep}
        onStepClick={handleNavigateToStep}
        canNavigateToStep={canNavigateToStep}
      />

      {/* 2. 메인 콘텐츠 영역 (배경 #ffffff, 넉넉한 여백) */}
      <main className="flex-1 px-4 py-8 sm:px-8 sm:py-12 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto">
          {currentStep === 0 && (
            <Step0Intro
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
            />
          )}

          {currentStep === 1 && (
            <Step1SizeAndDate
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 2 && (
            <Step2TemplateAndFinish
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 3 && (
            <Step3BannerAddon
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              onSkip={handleSkipStep3}
            />
          )}

          {currentStep === 4 && (
            <Step4QuoteAndSummary
              formData={formData}
              onNavigateToStep={handleNavigateToStep}
              onResetAll={handleResetAll}
            />
          )}
        </div>
      </main>

      {/* 3. 하단 고객센터 안내 Footer (페이지 맨 밑으로 배치) */}
      <Footer />
    </div>
  );
}
