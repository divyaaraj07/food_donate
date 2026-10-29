import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AdminPage: React.FC = () => {
  const {
    adminReports,
    dismissAdminReport,
    removeAdminListing,
    ngoVerifications,
    approveNGO,
    requestNGOInfo,
    showToast,
    setActiveModal,
    setModalPayload,
    firewallActive,
    setFirewallActive,
    firewallStats,
    firewallRules,
    toggleFirewallRule,
    firewallLogs,
    simulateAttack,
    blockIpAddress
  } = useApp();

  const [activeTab, setActiveTab] = useState<'firewall' | 'flagged' | 'verification' | 'feed'>('firewall');
  const [manualIpToBlock, setManualIpToBlock] = useState('');

  const handleExportAudit = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Ticket,Type,Status,ReportedBy,Date,State\nTN-9021,SAFETY_RISK,FLAGGED,Agara Foundation,2026-10-28,Tamil Nadu\nTN-9018,NO_SHOW,RESOLVED,Iyengar Bakery,2026-10-28,Tamil Nadu\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tamilnadu_foodshare_audit_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('FSSAI audit log exported as CSV', 'download', 'success');
  };

  const handleViewDoc = (docName: string, orgName: string) => {
    setModalPayload({ docName, orgName });
    setActiveModal('view_doc');
  };

  const handleManualBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualIpToBlock.trim()) return;
    blockIpAddress(manualIpToBlock.trim());
    setManualIpToBlock('');
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-10 space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between py-1 mb-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-headline text-[22px] sm:text-[26px] font-bold text-[#151d19]">
              Platform & Security Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#006b45] text-white text-[11px] font-bold shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_person
              </span>
              SUPER ADMIN
            </span>
          </div>
          <p className="text-[13px] text-[#3e4942] mt-0.5">
            Tamil Nadu community food safety, WAF firewall & dispatch integrity
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="w-10 h-10 rounded-full bg-white border border-[#bec9c0] flex items-center justify-center text-[#151d19] hover:bg-[#ecf6ee] transition-colors cursor-pointer shadow-xs"
          title="Export Audit Log (CSV)"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
        </button>
      </div>

      {/* System Vitals & Firewall Status Banner */}
      <div className="rounded-2xl bg-[#ecf6ee] p-4 sm:p-5 shadow-xs border border-[#e1ebe3]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006b45] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006b45]"></span>
            </span>
            <span className="text-[13px] font-bold text-[#151d19]">System & Firewall Vitals</span>
          </div>
          <span className="text-[12px] text-[#006b45] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            WAF Active
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#3e4942]">
          <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-[#e1ebe3]">
            <span className="material-symbols-outlined text-[18px] text-[#006b45]">cloud_done</span>
            <span className="text-[12px]">
              API Services: <strong className="text-[#151d19] font-bold">100% Operational</strong> (Tamil Nadu Region)
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-[#e1ebe3]">
            <span className="material-symbols-outlined text-[18px] text-[#875100]">security</span>
            <span className="text-[12px]">
              DDoS Mitigation: <strong className="text-[#006b45] font-bold">{firewallStats.ddosMitigationRate}</strong> (Quotas Enforced)
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Console Tabs */}
      <div className="flex bg-[#e6f0e8] p-1 rounded-2xl gap-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('firewall')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'firewall'
              ? 'bg-[#006b45] text-white shadow-xs'
              : 'text-[#3e4942] hover:text-[#151d19]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">security</span>
          <span>Firewall & WAF</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px] leading-tight font-extrabold">
            {firewallStats.threatsBlocked} Blocked
          </span>
        </button>

        <button
          onClick={() => setActiveTab('flagged')}
          className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'flagged'
              ? 'bg-white text-[#006b45] shadow-xs'
              : 'text-[#3e4942] hover:text-[#151d19]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            flag
          </span>
          <span>FSSAI Risk</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#ba1a1a] text-white text-[10px] leading-tight font-extrabold">
            {adminReports.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'verification'
              ? 'bg-white text-[#006b45] shadow-xs'
              : 'text-[#3e4942] hover:text-[#151d19]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">verified_user</span>
          <span>NGO Verify</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#dbe5dd] text-[#151d19] text-[10px] leading-tight font-bold">
            {ngoVerifications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'feed'
              ? 'bg-white text-[#006b45] shadow-xs'
              : 'text-[#3e4942] hover:text-[#151d19]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">list_alt</span>
          <span>Live Feed</span>
        </button>
      </div>

      {/* TAB 1: FIREWALL & WAF CONSOLE */}
      {activeTab === 'firewall' && (
        <div className="flex flex-col gap-5 animate-in fade-in duration-150">
          {/* Firewall Metrics Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3]">
              <span className="text-[11px] text-[#615e57] font-semibold uppercase">Total Requests Inspected</span>
              <div className="font-headline text-[22px] font-extrabold text-[#151d19] mt-1">
                {firewallStats.totalRequestsInspected.toLocaleString()}
              </div>
              <span className="text-[10px] text-[#006b45] font-bold">100% Ingress Inspected</span>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3]">
              <span className="text-[11px] text-[#615e57] font-semibold uppercase">Threats Neutralized</span>
              <div className="font-headline text-[22px] font-extrabold text-[#ba1a1a] mt-1">
                {firewallStats.threatsBlocked}
              </div>
              <span className="text-[10px] text-[#ba1a1a] font-bold">Blocked at WAF Layer</span>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3]">
              <span className="text-[11px] text-[#615e57] font-semibold uppercase">DDoS Mitigation</span>
              <div className="font-headline text-[22px] font-extrabold text-[#006b45] mt-1">
                {firewallStats.ddosMitigationRate}
              </div>
              <span className="text-[10px] text-[#006b45] font-bold">Sliding Rate Limiter</span>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3]">
              <span className="text-[11px] text-[#615e57] font-semibold uppercase">Banned Attacker IPs</span>
              <div className="font-headline text-[22px] font-extrabold text-[#875100] mt-1">
                {firewallStats.bannedIps.length}
              </div>
              <span className="text-[10px] text-[#615e57]">Blacklisted on Edge</span>
            </div>
          </div>

          {/* Firewall Threat Simulator / Live Test Panel */}
          <div className="bg-[#fff8f5] rounded-2xl p-5 border border-[#ffdcbb] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#875100]">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <h3 className="font-headline font-bold text-[15px] text-[#2b1700]">
                  Firewall Live Threat Simulator
                </h3>
              </div>
              <span className="text-[11px] text-[#875100] font-bold">Test WAF Defenses</span>
            </div>
            <p className="text-[13px] text-[#653e00]">
              Trigger simulated attack vectors to verify that FoodShare's firewall shields against database exfiltration, script injections, and scrapers.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <button
                onClick={() => simulateAttack('sqli')}
                className="btn-3d btn-3d-white h-11 text-[12px] font-bold text-[#875100] border-[#ffdcbb] flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>🧪 Test SQLi</span>
              </button>
              <button
                onClick={() => simulateAttack('xss')}
                className="btn-3d btn-3d-white h-11 text-[12px] font-bold text-[#875100] border-[#ffdcbb] flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>🧪 Test XSS Script</span>
              </button>
              <button
                onClick={() => simulateAttack('traversal')}
                className="btn-3d btn-3d-white h-11 text-[12px] font-bold text-[#875100] border-[#ffdcbb] flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>🧪 Path Traversal</span>
              </button>
              <button
                onClick={() => simulateAttack('ddos')}
                className="btn-3d btn-3d-white h-11 text-[12px] font-bold text-[#875100] border-[#ffdcbb] flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>🧪 Rate Limit Flood</span>
              </button>
            </div>
          </div>

          {/* Active Firewall Rules List */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e1ebe3] space-y-3">
            <h3 className="font-headline font-bold text-[16px] text-[#151d19] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b45] text-[20px]">tune</span>
              <span>Active Firewall Defense Rules</span>
            </h3>

            <div className="divide-y divide-[#e6f0e8]">
              {firewallRules.map(rule => (
                <div key={rule.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[14px] text-[#151d19]">{rule.name}</span>
                      <span className="px-2 py-0.2 rounded-full bg-[#ecf6ee] text-[#006b45] text-[10px] font-bold">
                        {rule.blockedCount} Threats Neutralized
                      </span>
                    </div>
                    <p className="text-[12px] text-[#615e57] mt-0.5">{rule.description}</p>
                  </div>
                  <button
                    onClick={() => toggleFirewallRule(rule.id)}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                      rule.enabled
                        ? 'bg-[#006b45] text-white shadow-xs'
                        : 'bg-[#e7e2d8] text-[#615e57]'
                    }`}
                  >
                    {rule.enabled ? 'ACTIVE' : 'DISABLED'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* IP Blacklist & Manual Block Form */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e1ebe3] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-[16px] text-[#151d19] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">block</span>
                <span>Firewall IP Blacklist</span>
              </h3>
              <span className="text-[12px] text-[#615e57]">{firewallStats.bannedIps.length} IPs Enforced</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {firewallStats.bannedIps.map(ip => (
                <span
                  key={ip}
                  className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-[12px] font-mono font-bold flex items-center gap-1.5 border border-[#ffdad6]"
                >
                  <span>{ip}</span>
                  <span className="text-[10px] font-bold bg-[#ba1a1a] text-white px-1.5 py-0.2 rounded-full">
                    BANNED
                  </span>
                </span>
              ))}
            </div>

            <form onSubmit={handleManualBlock} className="flex gap-2 pt-2">
              <input
                type="text"
                value={manualIpToBlock}
                onChange={e => setManualIpToBlock(e.target.value)}
                placeholder="Enter IP address to block (e.g. 192.168.1.100)"
                className="flex-1 h-10 px-3.5 rounded-xl bg-[#ecf6ee] text-[#151d19] text-[13px] border border-[#e1ebe3] outline-none font-mono"
              />
              <button
                type="submit"
                className="px-4 h-10 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-[12px] font-bold cursor-pointer transition-all active:scale-95"
              >
                Blacklist IP
              </button>
            </form>
          </div>

          {/* Real-time Blocked Threat Log */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e1ebe3] space-y-3">
            <h3 className="font-headline font-bold text-[16px] text-[#151d19] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b45] text-[20px]">history</span>
              <span>Recent Firewall Security Interceptions</span>
            </h3>

            <div className="divide-y divide-[#e6f0e8] overflow-hidden">
              {firewallLogs.map(log => (
                <div key={log.id} className="py-2.5 flex items-start justify-between gap-3 text-[12px]">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.2 rounded font-mono font-bold text-[10px] bg-[#ffdad6] text-[#93000a]">
                        {log.threatType}
                      </span>
                      <span className="font-mono text-[#151d19] font-bold">{log.ip}</span>
                      <span className="text-[#615e57]">{log.method} {log.path}</span>
                    </div>
                    <p className="text-[11px] text-[#3e4942] mt-0.5">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-[#615e57] shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FSSAI FOOD SAFETY RISK QUEUE */}
      {activeTab === 'flagged' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#151d19]">
              FSSAI Compliance & Moderation Queue
            </span>
            <span className="text-[12px] text-[#615e57]">Tamil Nadu Food Safety SLA: Under 15m</span>
          </div>

          {adminReports.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#e1ebe3] space-y-2">
              <span className="material-symbols-outlined text-[36px] text-[#006b45]">
                check_circle
              </span>
              <p className="font-bold text-[16px]">All flagged tickets resolved!</p>
              <p className="text-[13px] text-[#615e57]">Zero food safety violations pending review.</p>
            </div>
          ) : (
            adminReports.map(rep => (
              <div
                key={rep.id}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e1ebe3] relative overflow-hidden space-y-3"
              >
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full ${
                    rep.type === 'SAFETY RISK' ? 'bg-[#ba1a1a]' : 'bg-[#875100]'
                  }`}
                ></div>

                <div className="flex items-start justify-between gap-3 pl-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          rep.type === 'SAFETY RISK'
                            ? 'bg-[#ffdad6] text-[#93000a]'
                            : 'bg-[#e7e2d8] text-[#1d1b16]'
                        }`}
                      >
                        <span
                          className={`inline-block w-1.5 h-1.5 rounded-full ${
                            rep.type === 'SAFETY RISK' ? 'bg-[#ba1a1a]' : 'bg-[#875100]'
                          }`}
                        ></span>
                        {rep.type}
                      </span>
                      <span className="text-[11px] text-[#615e57]">Ticket #{rep.ticketNumber}</span>
                    </div>
                    <h3 className="font-headline font-bold text-[16px] text-[#151d19]">
                      {rep.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#615e57] shrink-0">{rep.timeAgo}</span>
                </div>

                {/* Details */}
                {rep.imageUrl ? (
                  <div className="grid grid-cols-2 gap-3 pl-2">
                    <div className="rounded-xl overflow-hidden h-28 relative border border-[#e1ebe3]">
                      <img
                        src={rep.imageUrl}
                        alt="Inspection view"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-[10px] font-mono">
                        Batch {rep.batchNumber}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between bg-[#ecf6ee] rounded-xl p-3 border border-[#e1ebe3]">
                      <div>
                        <span className="text-[11px] text-[#615e57] block mb-0.5">Reported By</span>
                        <div className="flex items-center gap-1 text-[#151d19] font-bold text-[13px]">
                          <span className="material-symbols-outlined text-[16px] text-[#875100]">
                            foundation
                          </span>
                          <span className="truncate">{rep.reportedBy}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-[#dbe5dd]">
                        <span className="text-[10px] text-[#615e57] block">Donor Unit</span>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-[#151d19] truncate">
                            {rep.donorIdentity}
                          </span>
                          <span className="material-symbols-outlined text-[14px] text-[#6e7a71]">
                            lock
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[13px] text-[#3e4942] pl-2">{rep.detail}</p>
                )}

                {/* Report detail pill */}
                {rep.imageUrl && (
                  <div className="bg-[#ecf6ee] rounded-xl p-3 pl-3 text-[13px] flex items-start gap-2 border border-[#e1ebe3]">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">
                      report_problem
                    </span>
                    <div className="flex-1">
                      <span className="font-bold text-[#151d19] block text-[12px]">
                        Inspection Officer Observation:
                      </span>
                      <p className="text-[12px] text-[#3e4942]">{rep.detail}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 pl-2">
                  <button
                    onClick={() => dismissAdminReport(rep.id)}
                    className="flex-1 h-10 px-2 rounded-xl bg-[#ecf6ee] hover:bg-[#e6f0e8] text-[#151d19] text-[13px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Dismiss</span>
                  </button>

                  <button
                    onClick={() =>
                      showToast(`Tamil Nadu FSSAI notice sent to ${rep.donorIdentity}`, 'mail', 'info')
                    }
                    className="flex-1 h-10 px-2 rounded-xl bg-[#ffdcbb] text-[#2b1700] text-[13px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">warning_amber</span>
                    <span>Issue Notice</span>
                  </button>

                  <button
                    onClick={() => removeAdminListing(rep.id)}
                    className="h-10 px-3.5 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-[13px] font-bold flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">block</span>
                    <span>Deactivate</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: NGO ACCREDITATION QUEUE */}
      {activeTab === 'verification' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#151d19]">
              Tamil Nadu NGO / Trust Accreditation
            </span>
            <span className="px-2.5 py-0.5 bg-[#97f6c2] text-[#002112] text-[11px] font-bold rounded-full">
              {ngoVerifications.length} Awaiting Verification
            </span>
          </div>

          {ngoVerifications.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#e1ebe3] space-y-2">
              <span className="material-symbols-outlined text-[36px] text-[#006b45]">
                verified
              </span>
              <p className="font-bold text-[16px]">All NGO trusts verified!</p>
            </div>
          ) : (
            ngoVerifications.map(ngo => (
              <div
                key={ngo.id}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e1ebe3] space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6f0e8] flex items-center justify-center text-[#006b45] shrink-0">
                    <span className="material-symbols-outlined text-[28px]">corporate_fare</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-headline font-bold text-[16px] text-[#151d19] truncate">
                        {ngo.orgName}
                      </h4>
                      <span className="material-symbols-outlined text-[#006b45] text-[18px]">
                        verified
                      </span>
                    </div>
                    <p className="text-[12px] text-[#615e57] truncate">
                      {ngo.location} • Registered {ngo.registeredTime}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-[#ecf6ee] rounded-xl p-3 space-y-1.5 text-[12px] border border-[#e1ebe3]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#615e57]">Tax Exempt Status:</span>
                    <span className="font-bold text-[#151d19]">{ngo.taxStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#615e57]">Government Portal Reg:</span>
                    <span className="font-mono font-bold text-[#151d19]">{ngo.ein}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#615e57]">Cold Storage Facility:</span>
                    <span className="font-bold text-[#151d19]">{ngo.coldStorageCapacity}</span>
                  </div>
                </div>

                {/* PDF document chip */}
                <div className="bg-white rounded-xl p-2.5 flex items-center justify-between border border-[#bec9c0]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[22px]">
                      picture_as_pdf
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#151d19] leading-tight">
                        {ngo.documentName}
                      </span>
                      <span className="text-[11px] text-[#615e57]">
                        {ngo.docSize} • Verified Hash
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewDoc(ngo.documentName, ngo.orgName)}
                    className="px-3 py-1 rounded-lg bg-[#e6f0e8] hover:bg-[#dbe5dd] text-[#151d19] text-[12px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">visibility</span>
                    <span>View Deed</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => requestNGOInfo(ngo.id)}
                    className="flex-1 h-10 px-3 rounded-xl bg-[#ecf6ee] hover:bg-[#e6f0e8] text-[#151d19] text-[13px] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">contact_support</span>
                    <span>Request Details</span>
                  </button>
                  <button
                    onClick={() => approveNGO(ngo.id)}
                    className="flex-1 h-10 px-3 rounded-xl bg-[#006b45] hover:bg-[#21865b] text-white text-[13px] font-bold flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Accredit NGO</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: TAMIL NADU LIVE RESCUE FEED */}
      {activeTab === 'feed' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#151d19]">
              Tamil Nadu Live Food Rescue Feed
            </span>
            <span className="text-[12px] text-[#615e57]">Auto-refresh: 5s</span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3] flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#bec9c0]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX-j91gIXg04ryv9jHoG9Yn_YiqBhRczuIxVPdlkTFj_biPlVjsoiIr5U2T6OMVE7o6Ry7hWLprHADbLMwFAYoOUpyF-3c4qhIDkF1AHLmEPpRj7I8nsetPf39A6sUFICS7ctxGzAZRCvM-5I8d9092vjmsa_N0D8vdAEfceDAwUG_EPmHUEA0fUB6wxsc0zZiPQhj8xbgOyWtgSYovgxvmxilCpHVXMhRxRIuVFT57_3Xj6uzUdc"
                alt="Madurai meal"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.2 rounded-full bg-[#97f6c2] text-[#002112] text-[10px] font-bold">
                  PREPARED
                </span>
                <span className="text-[11px] text-[#615e57]">#TN-4819</span>
              </div>
              <h4 className="font-headline font-bold text-[14px] text-[#151d19] truncate mt-0.5">
                120 Kalyana Mandapam Meals
              </h4>
              <p className="text-[12px] text-[#615e57] truncate">
                Meenakshi Mahal Madurai • Claimed by Agara Foundation
              </p>
            </div>
            <span className="material-symbols-outlined text-[#006b45] text-[22px]">
              local_shipping
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3] flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#bec9c0]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxTbQrg2xxdCqvONZ9QoExiXWdwz2P2CapGh7sUUOjtUh7dW9yqT75Vxt51rqohb7q3ZMF7BoOl8CXXFyhc8fAvNDK17AGENE3auO_3h_ypq3RK8gf8eCSFHpqTr0fwt2dlunItOKYw0hIdAKarPXkpeyrfsLZyj8FbwrJu95FoVuXkrBjHwOE9iW5b2ituT72E-13rXFxPt1Y8x1fncIwd5JDJ2F-RUs74Qf3Ab0S_RjLPyEkhsU"
                alt="Idlis"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.2 rounded-full bg-[#ffdcbb] text-[#2b1700] text-[10px] font-bold">
                  TIFFIN
                </span>
                <span className="text-[11px] text-[#615e57]">#TN-4820</span>
              </div>
              <h4 className="font-headline font-bold text-[14px] text-[#151d19] truncate mt-0.5">
                60 Steamed Idli Packets
              </h4>
              <p className="text-[12px] text-[#615e57] truncate">
                Murugan Idli Shop Anna Nagar • Ready for van pickup
              </p>
            </div>
            <span className="material-symbols-outlined text-[#875100] text-[22px]">schedule</span>
          </div>
        </div>
      )}
    </div>
  );
};
