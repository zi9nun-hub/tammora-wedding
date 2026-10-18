import { FinishMethod } from '../types';

export const FINISH_METHODS: FinishMethod[] = [
  {
    id: 'heat_cut',
    name: '열재단',
    price: 0,
    priceDisplay: '기본 (0원)',
    description: '원단 사방 테두리를 열칼로 깔끔하게 마감합니다. 실내 벽면 부착이나 양면테이프 고정에 적합합니다.',
    isOutdoorAllowed: false,
    indoorSuitability: '실내 추천 (가장 기본)',
    outdoorSuitability: '실외 불가 (바람에 찢어짐 위험)',
    badge: '기본 무료',
    imageAlt: '열재단 마감 예시'
  },
  {
    id: 'eyelet_rope',
    name: '아일렛타공+줄',
    price: 2000,
    priceDisplay: '+2,000원',
    description: '사방 모서리에 금속 링(아일렛)을 펀칭하고 튼튼한 로프 끈을 동봉합니다. 난간이나 기둥에 묶을 때 추천합니다.',
    isOutdoorAllowed: false,
    indoorSuitability: '실내 난간/기둥 결속용',
    outdoorSuitability: '실외 불가 (강풍 시 타공 찢김)',
    badge: '인기 마감',
    imageAlt: '아일렛 타공 및 로프 끈 마감'
  },
  {
    id: 'eyelet_suction',
    name: '아일렛타공+큐방',
    price: 2000,
    priceDisplay: '+2,000원',
    description: '모서리 타공과 함께 매끄러운 유리창, 거울, 대리석 벽면에 흡착할 수 있는 고무 큐방(압착기)을 제공합니다.',
    isOutdoorAllowed: false,
    indoorSuitability: '실내 유리창/대리석 전용',
    outdoorSuitability: '실외 불가 (낙하 위험)',
    badge: '유리창 부착용',
    imageAlt: '아일렛 타공 및 흡착 큐방 마감'
  },
  {
    id: 'wood_rope',
    name: '사각각목+끈',
    price: 2000,
    priceDisplay: '+2,000원',
    description: '현수막 양 끝에 튼튼한 원목 각목을 덧대어 팽팽하게 펴지게 하고 상단 끈으로 견고하게 매답니다. 실외 필수 권장.',
    isOutdoorAllowed: true,
    indoorSuitability: '실내 벽면 처짐 방지',
    outdoorSuitability: '실외 권장 (바람에 강함)',
    badge: '실외 필수 추천',
    imageAlt: '사각 각목 가공 및 견고한 끈 마감'
  },
  {
    id: 'flat_band',
    name: '납작밴드 덧댐',
    price: 0,
    priceDisplay: '추가문의필요',
    description: '원단 테두리에 고강도 웨빙 밴드를 박음질 보강하여 대형 현수막의 풍압 저항력을 극대화합니다. (별도 상담 진행)',
    isOutdoorAllowed: true,
    indoorSuitability: '초대형 현수막용',
    outdoorSuitability: '실외 특수 거치용',
    badge: '상담 후 견적',
    imageAlt: '고강도 납작밴드 박음질 보강 마감'
  }
];
