import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Layers,
  Sliders,
  Maximize2,
  Minimize2,
  RotateCcw,
  Flame,
  ArrowRight,
  ShieldCheck,
  Download,
  Calendar,
  Share2,
  Copy,
  Check,
  Building2
} from 'lucide-react';
import IntakeStudio from '../components/content-engine/IntakeStudio';
import HookRanker from '../components/content-engine/HookRanker';
import MultiFormatPreview from '../components/content-engine/MultiFormatPreview';
import ApprovalBoard from '../components/content-engine/ApprovalBoard';
import TrackingDashboard from '../components/content-engine/TrackingDashboard';
import ContentCalendarMatrix from '../components/content-engine/ContentCalendarMatrix';
import TenantSwitcher from '../components/content-engine/TenantSwitcher';
import TenantProfileManagerModal from '../components/content-engine/TenantProfileManagerModal';
import SaaSSettingsModal from '../components/content-engine/SaaSSettingsModal';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import { contentEngineService } from '../services/contentEngineService';
import { tenantManager } from '../utils/tenantConfig';

export default function ContentEnginePage({ onOpenBooking, onSelectTab }) {
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar', 'intake', 'formats', 'approval', 'tracking'
  const [intakeItems, setIntakeItems] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [trackingRows, setTrackingRows] = useState([]);
  const [activeDraft, setActiveDraft] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(contentEngineService.getSaaSSettings());
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Multi-Tenant Brand Management State
  const [activeTenant, setActiveTenant] = useState(tenantManager.getActiveTenant());
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [tenantToEdit, setTenantToEdit] = useState(null);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      const [items, loadedDrafts, rows] = await Promise.all([
        contentEngineService.getIntakeItems(),
        contentEngineService.getDrafts(),
        contentEngineService.getTrackingRows()
      ]);
      setIntakeItems(items);
      setDrafts(loadedDrafts);
      setTrackingRows(rows);
      if (loadedDrafts.length > 0) {
        setActiveDraft(loadedDrafts[0]);
      }
    }
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Tenant Handlers
  const handleSelectTenant = (tenant) => {
    tenantManager.setActiveTenantId(tenant.id);
    setActiveTenant(tenant);
    showToast(`Switched active workspace to: ${tenant.name}`);
  };

  const handleOpenTenantManager = (tenant) => {
    setTenantToEdit(tenant);
    setIsTenantModalOpen(true);
  };

  const handleCreateNewTenant = () => {
    setTenantToEdit(null);
    setIsTenantModalOpen(true);
  };

  const handleSaveTenant = (savedTenant) => {
    tenantManager.saveTenant(savedTenant);
    tenantManager.setActiveTenantId(savedTenant.id);
    setActiveTenant(savedTenant);
    showToast(`Saved brand profile: ${savedTenant.name}`);
  };

  const handleDeleteTenant = (tenantId) => {
    tenantManager.deleteTenant(tenantId);
    setActiveTenant(tenantManager.getActiveTenant());
    showToast('Deleted brand profile.');
  };

  // Handle Generation of a Single Item
  const handleGenerate = async (itemData) => {
    setIsGenerating(true);
    try {
      const savedItem = await contentEngineService.addIntakeItem({
        ...itemData,
        account: itemData.account || activeTenant.handle?.replace('@', '').toLowerCase(),
        accountHandle: itemData.accountHandle || activeTenant.handle
      });
      const generatedDraft = await contentEngineService.generatePackage(savedItem, 0);

      const [updatedItems, updatedDrafts, updatedTracking] = await Promise.all([
        contentEngineService.getIntakeItems(),
        contentEngineService.getDrafts(),
        contentEngineService.getTrackingRows()
      ]);

      setIntakeItems(updatedItems);
      setDrafts(updatedDrafts);
      setTrackingRows(updatedTracking);
      setActiveDraft(generatedDraft);
      setActiveTab('formats');
      showToast('⚡ 4-Way Multi-Format Package Generated!');
    } catch (err) {
      console.error(err);
      showToast('Error during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle 7-Day Sprint Batch Repurposer Generation
  const handleGenerateSprint = async (sprintData) => {
    setIsGenerating(true);
    try {
      const baseTitle = sprintData.sourceTitle;
      const baseContent = sprintData.sourceContent;

      const eduTopics = [
        { sub: 'Hook & Core Mistake', desc: 'The biggest mistake local small businesses make with their digital setup.' },
        { sub: '5-Slide Framework', desc: 'The 3 essentials that convert 85% of mobile traffic.' },
        { sub: 'Before vs After Case', desc: 'Why traditional retainers fail compared to lightning storefronts.' },
        { sub: 'Objection Handling', desc: 'Why you do not need 6 weeks or R15,000 for a website.' },
        { sub: 'Instant Action Checklist', desc: 'How to audit your business digital card and WhatsApp funnel today.' }
      ];

      const generatedPackages = [];

      for (let i = 0; i < eduTopics.length; i++) {
        const item = await contentEngineService.addIntakeItem({
          id: `LG-EDU-SPRINT-${Date.now().toString().slice(-4)}-0${i + 1}`,
          pillar: 'educational',
          account: activeTenant.handle?.replace('@', '').toLowerCase() || 'launchgremlin',
          accountHandle: activeTenant.handle,
          title: `${baseTitle}: ${eduTopics[i].sub}`,
          content: `${baseContent}\n\nFocus: ${eduTopics[i].desc}`
        });
        const pkg = await contentEngineService.generatePackage(item, 0);
        generatedPackages.push(pkg);
      }

      // Derive 2 Maserati Milestone Posts from proof points if in LaunchGremlin tenant
      if (activeTenant.id === 'launchgremlin') {
        await contentEngineService.deriveMaseratiPost(generatedPackages[0]);
        await contentEngineService.deriveMaseratiPost(generatedPackages[2]);
      }

      const [updatedItems, updatedDrafts, updatedTracking] = await Promise.all([
        contentEngineService.getIntakeItems(),
        contentEngineService.getDrafts(),
        contentEngineService.getTrackingRows()
      ]);

      setIntakeItems(updatedItems);
      setDrafts(updatedDrafts);
      setTrackingRows(updatedTracking);
      setActiveDraft(generatedPackages[0]);
      setActiveTab('formats');
      showToast(`🚀 7-Day Sprint Generated for ${activeTenant.name}!`);
    } catch (err) {
      console.error(err);
      showToast('Failed to generate 7-day sprint.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Hook Selection in Formats View
  const handleSelectHook = async (hookText, hookIdx) => {
    if (!activeDraft) return;
    const targetIntakeItem = intakeItems.find((i) => i.id === activeDraft.intake_id) || {
      id: activeDraft.intake_id,
      pillar: activeDraft.pillar,
      account: activeDraft.account,
      title: activeDraft.title,
      content: activeDraft.formats?.talking_clip?.scenes?.map((s) => s.audio_spoken).join(' ') || ''
    };

    const updatedPackage = await contentEngineService.generatePackage(targetIntakeItem, hookIdx);
    setActiveDraft(updatedPackage);
    const updatedDrafts = await contentEngineService.getDrafts();
    setDrafts(updatedDrafts);
    showToast(`Applied Hook #${hookIdx + 1}`);
  };

  const handleUpdateCustomHook = async (customHookText) => {
    if (!activeDraft) return;
    const updated = {
      ...activeDraft,
      chosen_hook: customHookText,
      formats: {
        ...activeDraft.formats,
        talking_clip: { ...activeDraft.formats.talking_clip, hook: customHookText },
        carousel: {
          ...activeDraft.formats.carousel,
          slides: activeDraft.formats.carousel.slides.map((sl, idx) =>
            idx === 0 ? { ...sl, headline: customHookText } : sl
          )
        }
      }
    };
    setActiveDraft(updated);
    showToast('Custom hook applied to package.');
  };

  // Handle Maserati Narrative Auto-Derivation
  const handleDeriveMaserati = async (sourcePackage) => {
    try {
      const derived = await contentEngineService.deriveMaseratiPost(sourcePackage);
      const [updatedDrafts, updatedItems, updatedTracking] = await Promise.all([
        contentEngineService.getDrafts(),
        contentEngineService.getIntakeItems(),
        contentEngineService.getTrackingRows()
      ]);
      setDrafts(updatedDrafts);
      setIntakeItems(updatedItems);
      setTrackingRows(updatedTracking);
      setActiveDraft(derived);
      setActiveTab('formats');
      showToast(`🏎️ Derived Maserati Story for @needmoney4maserati from ${sourcePackage.intake_id || sourcePackage.id}!`);
    } catch (err) {
      console.error(err);
      showToast('Failed to derive Maserati narrative post.');
    }
  };

  // Handle Schedule Item Click from 30/60/90 Matrix
  const handleSelectScheduleItem = (slot) => {
    const matchingDraft = drafts.find((d) => d.intake_id === slot.intakeId);
    if (matchingDraft) {
      setActiveDraft(matchingDraft);
      setActiveTab('formats');
      showToast(`Loaded Draft ${slot.intakeId} from 30/60/90 Schedule`);
      return;
    }

    const matchingIntake = intakeItems.find((i) => i.id === slot.intakeId);
    if (matchingIntake) {
      handleGenerate(matchingIntake);
      return;
    }

    handleGenerate({
      id: slot.intakeId,
      pillar: slot.pillar,
      account: slot.account,
      title: slot.title,
      content: `Scheduled Day ${slot.day} Content (${slot.suggestedTime}): ${slot.title}. Focus Hook: "${slot.hook}".`,
      proofPointRef: slot.proofPointRef || ''
    });
  };

  // Copy Client Review Link
  const handleCopyClientReviewLink = () => {
    if (!activeDraft) return;
    const url = `${window.location.origin}/content-engine/review/${activeDraft.intake_id || activeDraft.id}`;
    navigator.clipboard.writeText(url);
    showToast('🔗 Client Review Link Copied to Clipboard!');
  };

  // Handle Approval
  const handleApproveDraft = async (intakeId, reviewerNotes = '') => {
    setIsApproving(true);
    try {
      const approved = await contentEngineService.approveDraft(intakeId, reviewerNotes);
      const [updatedDrafts, updatedItems] = await Promise.all([
        contentEngineService.getDrafts(),
        contentEngineService.getIntakeItems()
      ]);
      setDrafts(updatedDrafts);
      setIntakeItems(updatedItems);
      if (activeDraft && activeDraft.intake_id === intakeId) {
        setActiveDraft(approved);
      }
      showToast(`✅ Package ${intakeId} Approved & Scheduled!`);
    } finally {
      setIsApproving(false);
    }
  };

  // Handle Metrics update
  const handleUpdateMetrics = async (postId, metrics) => {
    await contentEngineService.updatePostMetrics(postId, metrics);
    const updatedRows = await contentEngineService.getTrackingRows();
    setTrackingRows(updatedRows);
    showToast(`Updated performance metrics for ${postId}`);
  };

  const handleSaveSettings = (newSettings) => {
    contentEngineService.saveSaaSSettings(newSettings);
    setSettings(newSettings);
    showToast('Settings saved successfully!');
  };

  const paidCandidatesCount = trackingRows.filter((r) => r.paid_candidate === 'YES').length;
  const approvedCount = drafts.filter((d) => d.status === 'APPROVED').length;

  return (
    <div className={`min-h-screen bg-zinc-950 text-white font-sans ${isFullScreen ? 'p-4 md:p-8' : ''}`}>
      {!isFullScreen && (
        <ServiceHeroBackground
          badge="AI Content Engine · Multi-Tenant SaaS"
          badgeIcon={Sparkles}
          title="LaunchGremlin AI Content Engine"
          subtitle="Multi-tenant content production engine: Transform raw notes and calls into 4 ready-to-post formats across multiple brand workspaces."
        />
      )}

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Controls Ribbon with Brand Switcher */}
        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          {/* Tenant Switcher & Stats */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Multi-Tenant Brand Switcher */}
            <TenantSwitcher
              activeTenant={activeTenant}
              onSelectTenant={handleSelectTenant}
              onOpenTenantManager={handleOpenTenantManager}
              onCreateNewTenant={handleCreateNewTenant}
            />

            <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs hidden sm:block">
              <span className="text-zinc-500 mr-1.5 font-medium">Pipeline:</span>
              <strong className="text-white font-mono">{intakeItems.length} Sources</strong>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
              <span className="text-emerald-400 mr-1.5 font-semibold">Approved:</span>
              <strong className="text-emerald-300 font-mono">{approvedCount}</strong>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs hidden lg:block">
              <span className="text-amber-400 mr-1.5 font-semibold">🔥 Paid Winners:</span>
              <strong className="text-amber-300 font-mono">{paidCandidatesCount}</strong>
            </div>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {activeDraft && (
              <button
                type="button"
                onClick={handleCopyClientReviewLink}
                className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs text-emerald-400 font-bold flex items-center gap-1.5 transition-colors"
                title="Copy client-facing review portal link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Client Review Portal Link</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title={isFullScreen ? 'Exit Focus View' : 'Focus Full-Screen View'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs text-zinc-200 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Settings
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800/80 bg-zinc-900/50 rounded-2xl p-1.5 overflow-x-auto gap-1">
          {[
            { id: 'calendar', label: '1. 📅 30/60/90 Schedule Matrix', badge: '90 Days' },
            { id: 'intake', label: '2. 📥 Intake Studio', badge: `${intakeItems.length}` },
            { id: 'formats', label: '3. ⚡ Hook & 4-Way Formats', badge: activeDraft ? activeDraft.intake_id : null },
            { id: 'approval', label: '4. 📋 Review & Approval Board', badge: `${drafts.length}` },
            { id: 'tracking', label: '5. 📊 30/60/90 Paid Evaluator', badge: `${paidCandidatesCount} Paid` }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-zinc-950 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab Views */}
        <div className="space-y-8">
          {/* TAB 1: 30/60/90 CONTENT CALENDAR MATRIX */}
          {activeTab === 'calendar' && (
            <ContentCalendarMatrix
              onSelectScheduleItem={handleSelectScheduleItem}
              onCreateForPillar={(pillarId) => {
                setActiveTab('intake');
              }}
            />
          )}

          {/* TAB 2: INTAKE STUDIO */}
          {activeTab === 'intake' && (
            <IntakeStudio
              onGenerate={handleGenerate}
              onGenerateSprint={handleGenerateSprint}
              isGenerating={isGenerating}
              availableIntakeItems={intakeItems}
            />
          )}

          {/* TAB 3: HOOK & 4-WAY FORMAT STUDIO */}
          {activeTab === 'formats' && (
            <div className="space-y-8">
              {activeDraft ? (
                <>
                  <HookRanker
                    candidateHooks={activeDraft.candidate_hooks || []}
                    selectedHook={activeDraft.chosen_hook}
                    onSelectHook={handleSelectHook}
                    onUpdateHook={handleUpdateCustomHook}
                  />

                  <MultiFormatPreview
                    draftPackage={activeDraft}
                    onApprove={handleApproveDraft}
                    isApproving={isApproving}
                    onDeriveMaserati={handleDeriveMaserati}
                  />
                </>
              ) : (
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 text-emerald-400 animate-bounce" />
                  <h3 className="text-base font-bold text-white mb-1">No Draft Selected</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
                    Select a day from the 30/60/90 Schedule Matrix or generate a package using the Intake Studio.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('calendar')}
                      className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs"
                    >
                      View 30/60/90 Schedule 📅
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('intake')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                    >
                      Go to Intake Studio 👉
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REVIEW & APPROVAL BOARD */}
          {activeTab === 'approval' && (
            <ApprovalBoard
              drafts={drafts}
              onSelectDraft={(d) => {
                setActiveDraft(d);
                setActiveTab('formats');
              }}
              onApproveDraft={handleApproveDraft}
              activeDraftId={activeDraft?.intake_id}
              onDeriveMaserati={handleDeriveMaserati}
            />
          )}

          {/* TAB 5: 30/60/90 TRACKING DASHBOARD */}
          {activeTab === 'tracking' && (
            <TrackingDashboard
              trackingRows={trackingRows}
              onUpdateMetrics={handleUpdateMetrics}
            />
          )}
        </div>
      </div>

      {/* Brand Profile Manager Modal */}
      <TenantProfileManagerModal
        isOpen={isTenantModalOpen}
        onClose={() => setIsTenantModalOpen(false)}
        tenantToEdit={tenantToEdit}
        onSaveTenant={handleSaveTenant}
        onDeleteTenant={handleDeleteTenant}
      />

      {/* SaaS Productisation Settings Modal */}
      <SaaSSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-emerald-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
