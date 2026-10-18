import { QuoteFormState, QuoteCalculation } from '../types';
import { FINISH_METHODS } from '../data/finishMethods';

export function calculateQuote(state: QuoteFormState): QuoteCalculation {
  const widthM = (state.widthMm || 0) / 1000;
  const heightM = (state.heightMm || 0) / 1000;
  const areaM2 = widthM * heightM;

  // Formula: (m기준) 가로 * 세로 * 7700 후 결과값에 천의자리 올림
  const rawBannerCost = areaM2 * 7700;
  const bannerBasePrice = Math.ceil(rawBannerCost / 1000) * 1000;

  // Finish method cost
  const selectedFinish = FINISH_METHODS.find((f) => f.id === state.finishMethod);
  const finishCost = selectedFinish ? selectedFinish.price : 0;
  const hasSpecialInquiry = state.finishMethod === 'flat_band';

  // Banner Add-on cost
  let bannerPrintPrice = 0;
  let bannerStandPrice = 0;

  if (state.addBanner === true) {
    bannerPrintPrice = 51000; // 배너 디자인출력(600*1800): 51,000원
    if (state.bannerStandType === 'indoor') {
      bannerStandPrice = 22000; // 실내 배너대: 22,000원
    } else if (state.bannerStandType === 'outdoor_water') {
      bannerStandPrice = 42000; // 실외(물통) 배너대: 42,000원
    } else {
      bannerStandPrice = 0; // 배너대 미포함 (출력물만)
    }
  }

  const bannerTotalAddon = bannerPrintPrice + bannerStandPrice;

  // Delivery cost
  let deliveryCost = 0;
  let isQuickDelivery = false;
  if (state.deliveryMethod === 'parcel') {
    deliveryCost = 6000; // 택배배송: 6,000원
  } else if (state.deliveryMethod === 'quick') {
    deliveryCost = 0; // 퀵배송: 별도 요금 추가 (최종 견적서에 퀵배송 미포함 표시)
    isQuickDelivery = true;
  }

  const totalPrice = bannerBasePrice + finishCost + bannerTotalAddon + deliveryCost;

  return {
    widthM,
    heightM,
    areaM2,
    rawBannerCost,
    bannerBasePrice,
    finishCost,
    bannerPrintPrice,
    bannerStandPrice,
    bannerTotalAddon,
    deliveryCost,
    isQuickDelivery,
    totalPrice,
    hasSpecialInquiry
  };
}

export function calculateRemainingDays(dateStr: string, timeStr?: string): {
  days: number;
  businessDays: number;
  dDayText: string;
  isUrgentWarning: boolean;
  isThreeBusinessDaysOrLess: boolean;
  status: 'future' | 'today' | 'past';
} {
  if (!dateStr) {
    return {
      days: 0,
      businessDays: 0,
      dDayText: '날짜를 입력해주세요',
      isUrgentWarning: false,
      isThreeBusinessDaysOrLess: false,
      status: 'future'
    };
  }

  const targetDate = new Date(`${dateStr}T${timeStr || '12:00'}:00`);
  const now = new Date();

  // Reset time to start of day for clean day diff
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

  const diffMs = targetStart.getTime() - todayStart.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  // 주말(토, 일) 제외 영업일 잔여 계산
  let businessDays = 0;
  if (diffDays > 0) {
    const cur = new Date(todayStart);
    cur.setDate(cur.getDate() + 1);
    while (cur <= targetStart) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }
  }

  const isThreeBusinessDaysOrLess = diffDays <= 0 || businessDays <= 3;

  if (diffDays > 0) {
    return {
      days: diffDays,
      businessDays,
      dDayText: `D-${businessDays}`,
      isUrgentWarning: businessDays <= 3,
      isThreeBusinessDaysOrLess,
      status: 'future'
    };
  } else if (diffDays === 0) {
    return {
      days: 0,
      businessDays: 0,
      dDayText: 'D-Day',
      isUrgentWarning: true,
      isThreeBusinessDaysOrLess: true,
      status: 'today'
    };
  } else {
    return {
      days: diffDays,
      businessDays: 0,
      dDayText: '행사일 지남',
      isUrgentWarning: true,
      isThreeBusinessDaysOrLess: true,
      status: 'past'
    };
  }
}

export function formatPrice(num: number): string {
  return num.toLocaleString('ko-KR') + '원';
}
