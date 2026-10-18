import React from 'react';
import { Phone, Clock, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    // footer 배경색: 밝은 회색 (#F7F6F3 / stone-100)
    <footer className="bg-stone-100/90 border-t border-stone-200/80 py-10 px-4 sm:px-8 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
        {/* 브랜드 & 기본 안내 (원단 최대폭 정보 삭제 완료) */}
        <div className="space-y-1.5">
          <div className="text-[17px] font-bold text-[#1A1918] tracking-tight">
            탐모라 웨딩 현수막
          </div>
          <p className="text-[14px] text-[#1A1918]/60">
            웨딩 현수막 &amp; 맞춤 스탠딩 배너 실시간 자동 견적 계산 시스템
          </p>
        </div>

        {/* 고객센터 안내 (테두리 박스 삭제 완료, 여백으로 깔끔하게 정돈) */}
        <div className="space-y-1 text-center sm:text-left shrink-0">
          <div className="text-[13px] font-bold text-[#A64B5A] flex items-center justify-center sm:justify-start gap-1">
            <Phone className="w-3.5 h-3.5" />
            <span>고객센터 안내</span>
          </div>
          <div className="text-[15px] font-bold text-[#1A1918] flex items-center justify-center sm:justify-start gap-1.5">
            <Clock className="w-4 h-4 text-[#1A1918]/60" />
            <span>평일 09:00 - 18:00 (주말·공휴일 휴무)</span>
          </div>
          <div className="text-[14px] text-[#1A1918]/75 flex items-center justify-center sm:justify-start gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#1A1918]/60" />
            <span>카카오톡 채널: <strong>탐모라</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 pt-4 border-t border-stone-200/60 text-center text-[12px] text-[#1A1918]/40">
        © 탐모라 웨딩. All rights reserved.
      </div>
    </footer>
  );
};
