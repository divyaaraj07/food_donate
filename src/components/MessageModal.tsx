import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const MessageModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useApp();
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'sundaram'; text: string; time: string }>>([
    {
      sender: 'sundaram',
      text: 'Vanakkam! We have 120 hot banana-leaf meals with fresh sambar rice and pooris kept ready in thermal cambros at Kitchen Gate #2. Let us know when your rescue vehicle leaves!',
      time: '2:45 PM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (activeModal !== 'message_donor') return null;

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = { sender: 'user' as const, text: inputText, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'sundaram',
          text: 'Rombha nandri! We have kept the gate open for your van. Our kitchen helpers will directly load the stainless steel containers.',
          time: 'Just now'
        }
      ]);
      showToast('Sundaram Chettiar replied to your message', 'chat');
    }, 1200);
  };

  const quickPrompts = [
    'Van ETA is 12 minutes to Gate #2!',
    'Do you need clean stainless steel vessels?',
    'Is the food kept in thermal containers?'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#29322d]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-5 flex flex-col h-[520px] max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6f0e8] pb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk"
                alt="Sundaram Chettiar"
                className="w-10 h-10 rounded-full object-cover border border-[#97f6c2]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006b45] ring-2 ring-white"></span>
            </div>
            <div>
              <h4 className="font-headline font-bold text-[16px] text-[#151d19] flex items-center gap-1">
                Sundaram Chettiar
                <span className="material-symbols-outlined text-[#006b45] text-[16px]">verified</span>
              </h4>
              <p className="text-[12px] text-[#615e57]">
                Sri Meenakshi Kalyana Mandapam • Madurai
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="w-8 h-8 rounded-full bg-[#ecf6ee] flex items-center justify-center text-[#3e4942] hover:bg-[#e6f0e8]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message feed */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 px-1 no-scrollbar">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#006b45] text-white rounded-br-xs'
                    : 'bg-[#ecf6ee] text-[#151d19] rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#615e57] mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick prompt pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => setInputText(q)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#f2fcf4] border border-[#bec9c0] text-[#006b45] hover:bg-[#ecf6ee] transition-colors shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="pt-2 border-t border-[#e6f0e8] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message to Sundaram Chettiar..."
            className="flex-1 h-11 px-3.5 rounded-xl bg-[#f2fcf4] text-[#151d19] text-[14px] outline-none border border-[#e1ebe3] focus:border-[#006b45]"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-11 h-11 rounded-xl bg-[#006b45] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#21865b] active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
