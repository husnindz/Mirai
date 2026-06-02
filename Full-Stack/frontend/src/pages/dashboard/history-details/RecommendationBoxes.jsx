import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function RecommendationBoxes({ selectedHistoryItem, translateAbnormalText }) {
  const { language } = useLanguage();
  const isAi = selectedHistoryItem?.isAi;

  // Helper to parse simple markdown bold and bullet points into beautiful, styled React elements
  const renderFormattedText = (text, isAiMode) => {
    if (!text) return null;

    const lines = text.split('\n');
    return (
      <div className="space-y-2">
        {lines.map((line, idx) => {
          let currentLine = line.trim();
          if (!currentLine) return null;

          // Check if it's a bullet point
          const isBullet = currentLine.startsWith('*') || currentLine.startsWith('-');
          if (isBullet) {
            // Remove ONLY the first bullet character and its trailing space
            currentLine = currentLine.replace(/^[\*\-]\s*/, '');
          }

          // Parse **bold** markers
          const parts = [];
          const regex = /\*\*(.*?)\*\*/g;
          let lastIndex = 0;
          let match;

          while ((match = regex.exec(currentLine)) !== null) {
            if (match.index > lastIndex) {
              parts.push(currentLine.substring(lastIndex, match.index));
            }
            parts.push(
              <strong
                key={match.index}
                className={`font-semibold ${isAiMode ? 'text-purple-950 font-bold' : 'text-slate-900 font-bold'}`}
              >
                {match[1]}
              </strong>,
            );
            lastIndex = regex.lastIndex;
          }

          if (lastIndex < currentLine.length) {
            parts.push(currentLine.substring(lastIndex));
          }

          const content = parts.length > 0 ? parts : currentLine;

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-2.5 text-left pl-1">
                <span
                  className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${
                    isAiMode
                      ? 'bg-purple-600 shadow-[0_0_8px_rgba(147,51,234,0.5)]'
                      : 'bg-brand-accent'
                  }`}
                />
                <span
                  className={`text-[15px] leading-relaxed ${isAiMode ? 'text-purple-900/90' : 'text-slate-800'}`}
                >
                  {content}
                </span>
              </div>
            );
          }

          return (
            <p
              key={idx}
              className={`text-[15px] leading-relaxed text-left ${isAiMode ? 'text-purple-900/90' : 'text-slate-800'}`}
            >
              {content}
            </p>
          );
        })}
      </div>
    );
  };

  // Modern and high-end styling variants based on isAi
  const summaryCardStyle = isAi
    ? 'bg-gradient-to-br from-[#FAF5FF] via-[#F4EFFF] to-[#FAF5FF] border-2 border-purple-300/60 rounded-[20px] p-6 shadow-[0_8px_30px_rgba(168,85,247,0.08)] md:min-h-[220px] h-auto pb-6 text-left flex flex-col justify-start transition-all duration-300 hover:shadow-[0_12px_35px_rgba(168,85,247,0.16)] hover:-translate-y-0.5'
    : 'bg-[#EDFBFF] border border-[#AFAFAF]/30 rounded-[20px] p-6 shadow-lg md:min-h-[220px] h-auto pb-6 text-left flex flex-col justify-start transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5';

  const suggestionCardStyle = isAi
    ? 'bg-gradient-to-br from-[#FAF5FF] via-[#F0FDF4]/30 to-[#FAF5FF] border-2 border-purple-300/60 rounded-[20px] p-6 shadow-[0_8px_30px_rgba(168,85,247,0.08)] md:min-h-[220px] h-auto pb-6 text-left flex flex-col justify-start transition-all duration-300 hover:shadow-[0_12px_35px_rgba(168,85,247,0.16)] hover:-translate-y-0.5'
    : 'bg-[#EDFBFF] border-2 border-brand-accent rounded-[20px] p-6 shadow-lg md:min-h-[220px] h-auto pb-6 text-left flex flex-col justify-start transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full mb-12">
      {/* AI Summary Box */}
      <div className={summaryCardStyle}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h4
            className={`font-montserrat font-bold text-[22px] flex items-center gap-2 ${isAi ? 'text-purple-950' : 'text-[#262626]'}`}
          >
            ✨ {language === 'id' ? 'Ringkasan Asisten AI' : 'AI Assistant Summary'}
          </h4>
          {isAi ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-sm uppercase tracking-wider animate-pulse select-none">
              AI ACTIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 uppercase tracking-wider select-none">
              STANDARD
            </span>
          )}
        </div>
        <div className="font-montserrat font-medium flex-1 overflow-y-auto max-h-[300px] pr-2">
          {selectedHistoryItem.summary ? (
            renderFormattedText(selectedHistoryItem.summary, isAi)
          ) : (
            <p
              className={`text-[15px] leading-relaxed ${isAi ? 'text-purple-900' : 'text-[#262626]'}`}
            >
              {translateAbnormalText(selectedHistoryItem.abnormalText)}
            </p>
          )}
        </div>
      </div>

      {/* AI Suggestions Box */}
      <div className={suggestionCardStyle}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h4
            className={`font-montserrat font-bold text-[22px] flex items-center gap-2 ${isAi ? 'text-purple-950' : 'text-brand-primary'}`}
          >
            📋 {language === 'id' ? 'Rekomendasi Tindak Lanjut' : 'Follow-Up Recommendations'}
          </h4>
          {isAi ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-sm uppercase tracking-wider animate-pulse select-none">
              AI ACTIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 uppercase tracking-wider select-none">
              STANDARD
            </span>
          )}
        </div>
        <div className="font-montserrat font-medium flex-1 overflow-y-auto max-h-[300px] pr-2">
          {selectedHistoryItem.suggestion ? (
            renderFormattedText(selectedHistoryItem.suggestion, isAi)
          ) : (
            <div
              className={`text-[15px] leading-relaxed ${isAi ? 'text-purple-900' : 'text-slate-800'}`}
            >
              {selectedHistoryItem.category === 'Penyakit Dalam'
                ? language === 'id'
                  ? 'Disarankan kontrol ke dokter umum dalam 1-2 minggu, jaga pola makan rendah lemak & gula, perbanyak minum air putih, dan lakukan pemeriksaan ulang dalam 1 bulan.'
                  : 'It is recommended to consult a general practitioner within 1-2 weeks, maintain a low-fat & low-sugar diet, drink plenty of water, and repeat the examination in 1 month.'
                : language === 'id'
                  ? 'Lakukan olahraga kardio ringan secara teratur, kurangi konsumsi garam dan makanan kolesterol tinggi, kelola stress, dan periksakan tekanan darah rutin.'
                  : 'Perform light cardio exercise regularly, reduce intake of salt and high-cholesterol foods, manage stress, and check blood pressure routinely.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
