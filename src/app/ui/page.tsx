"use client";

import { useState, type ReactNode } from "react";
import { LayoutGroup, motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Tab, { TabContent } from "@/components/atoms/Tab";
import Slider from "@/components/atoms/Slider";
import Pagination from "@/components/atoms/Pagination";
import InfoTooltip from "@/components/atoms/InfoTooltip";
import Tooltip from "@/components/atoms/Tooltip";
import AlertBanner from "@/components/atoms/AlertBanner";
import StatCard from "@/components/molecules/StatCard";
import DetailRow from "@/components/molecules/DetailRow";
import NavItem from "@/components/molecules/NavItem";
import BackButton from "@/components/molecules/BackButton";
import TokenDisplay from "@/components/molecules/TokenDisplay";
import MetricValue from "@/components/molecules/MetricValue";
import TransactionStepper from "@/components/molecules/TransactionStepper";
import DataTable from "@/components/organisms/DataTable";
import DropdownMenu from "@/components/atoms/DropdownMenu";
import ProfileDrawer from "@/components/organisms/ProfileDrawer";
import { DashboardIcon, TokenIcon, ChartIcon, EarningsIcon, DonationIcon, ChevronDoubleLeft, WalletIcon } from "@/components/icons";

// ─── Section configs ─────────────────────────────────────────────

const componentSections = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "inputs", label: "Inputs" },
  { id: "select", label: "Select" },
  { id: "tabs", label: "Tabs" },
  { id: "slider", label: "Slider" },
  { id: "tooltips", label: "Tooltips" },
  { id: "alerts", label: "Alerts" },
  { id: "stepper", label: "Stepper" },
  { id: "cards", label: "Cards" },
  { id: "tables", label: "Tables" },
  { id: "dropdown", label: "Dropdown Menu" },
  { id: "navigation", label: "Navigation" },
  { id: "sidebar", label: "Sidebar & Drawer" },
];

const interactionSections = [
  { id: "i-motion-tokens", label: "Motion Tokens" },
  { id: "i-page-transition", label: "Page Transition" },
  { id: "i-fade-in-section", label: "Scroll Reveal" },
  { id: "i-button-loading", label: "Button Loading" },
  { id: "i-tab-pill", label: "Tab Pill Slide" },
  { id: "i-tab-content", label: "Tab Content Swap" },
  { id: "i-tooltip-scale", label: "Tooltip Scale" },
  { id: "i-select-dropdown", label: "Select Dropdown" },
  { id: "i-slider-spring", label: "Slider Spring" },
  { id: "i-alert-enter-exit", label: "Alert Enter/Exit" },
  { id: "i-badge-pop", label: "Badge Pop-In" },
  { id: "i-stepper", label: "Stepper Sequence" },
  { id: "i-table-stagger", label: "Table Row Stagger" },
  { id: "i-pagination", label: "Pagination Slide" },
  { id: "i-nav-indicator", label: "Nav Indicator" },
  { id: "i-sidebar-collapse", label: "Sidebar Collapse" },
  { id: "i-hover-states", label: "Hover & Focus" },
  { id: "i-profile-drawer", label: "Profile Drawer" },
  { id: "i-chain-switcher", label: "Chain Switcher" },
  { id: "i-accessibility", label: "Accessibility" },
];

// ─── Shared helpers ──────────────────────────────────────────────

function SectionHeading({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <div id={id} className="scroll-mt-8 mb-6">
      <h2 className="typo-h2 text-black-500 mb-1">{title}</h2>
      <p className="typo-sub-lg text-black-400">{description}</p>
    </div>
  );
}

function ColorSwatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`w-full h-20 rounded-lg border border-gray-200 ${className}`} />
      <span className="text-sm font-medium text-black">{name}</span>
      <span className="text-xs text-gray-500 font-mono">{hex}</span>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-2 border-b border-black-15 last:border-0">
      <span className="text-xs font-mono text-black-300">{label}</span>
      <span className="text-xs font-mono text-black-500 text-right">{value}</span>
    </div>
  );
}

function SpecTable({ children }: { children: ReactNode }) {
  return (
    <div className="border border-black-25 rounded-lg p-4 bg-white">
      {children}
    </div>
  );
}

function InteractionDemo({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border border-dashed border-black-50 rounded-lg p-6 bg-black-15/50 ${className}`}>
      {children}
    </div>
  );
}

function CodeToken({ children }: { children: ReactNode }) {
  return <code className="font-mono text-purple-500 text-xs bg-purple-50 px-1.5 py-0.5 rounded">{children}</code>;
}

// ─── Components Tab ──────────────────────────────────────────────

function ComponentsTab() {
  const [tabValue, setTabValue] = useState("tab1");
  const [sliderValue, setSliderValue] = useState(50);
  const [page, setPage] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <>
      {/* Colors */}
      <section className="mb-16">
        <SectionHeading id="colors" title="Colors" description="Theme color palette used across the application." />
        <h3 className="typo-label-sm text-black-400 mb-3">Purple</h3>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 mb-8">
          <ColorSwatch name="Purple 25" hex="#FBFAFD" className="bg-purple-25" />
          <ColorSwatch name="Purple 50" hex="#F8F5FC" className="bg-purple-50" />
          <ColorSwatch name="Purple 100" hex="#F5F2FA" className="bg-purple-100" />
          <ColorSwatch name="Purple 200" hex="#E8E0F4" className="bg-purple-200" />
          <ColorSwatch name="Purple 300" hex="#D9CCED" className="bg-purple-300" />
          <ColorSwatch name="Purple 400" hex="#C6B2E3" className="bg-purple-400" />
          <ColorSwatch name="Purple 500" hex="#4100A4" className="bg-purple-500" />
        </div>
        <h3 className="typo-label-sm text-black-400 mb-3">Black</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 mb-8">
          <ColorSwatch name="White" hex="#FFFFFF" className="bg-white border border-black-25" />
          <ColorSwatch name="Black 15" hex="#F7F7F7" className="bg-black-15" />
          <ColorSwatch name="Black 25" hex="#E5E5E5" className="bg-black-25" />
          <ColorSwatch name="Black 50" hex="#CCCCCC" className="bg-black-50" />
          <ColorSwatch name="Black 100" hex="#B2B2B2" className="bg-black-100" />
          <ColorSwatch name="Black 200" hex="#999999" className="bg-black-200" />
          <ColorSwatch name="Black 300" hex="#7F7F7F" className="bg-black-300" />
          <ColorSwatch name="Black 400" hex="#4D4D4D" className="bg-black-400" />
          <ColorSwatch name="Black 500" hex="#000000" className="bg-black-500" />
        </div>
        <h3 className="typo-label-sm text-black-400 mb-3">States</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <ColorSwatch name="Red 50 / 500" hex="#FFEBEC / #FB3748" className="bg-red-50" />
          <ColorSwatch name="Orange 50 / 500" hex="#FFF3EB / #FA7319" className="bg-orange-50" />
          <ColorSwatch name="Green 50 / 500" hex="#E0FAEC / #1FC16B" className="bg-green-50" />
          <ColorSwatch name="Blue 50 / 500" hex="#EBF1FF / #335CFF" className="bg-blue-50" />
        </div>
        <h3 className="typo-label-sm text-black-400 mb-3">Accent</h3>
        <div className="grid grid-cols-2 gap-4">
          <ColorSwatch name="Accent (app)" hex="#C6B2E3" className="bg-accent" />
          <p className="typo-p-sm text-black-400 self-center">
            Maps to purple-400 from Mode 1; use for secondary CTAs / highlights.
          </p>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <SectionHeading id="typography" title="Typography" description="Font styles and text hierarchy." />
        <p className="typo-p-md text-black-400 mb-4">
          Use utility classes from <code className="font-mono text-purple-500">globals.css</code> (–1% letter spacing on all).
        </p>
        <div className="flex flex-col gap-6 border border-black-25 rounded-lg p-6">
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-h1 text-black-500">Heading H1</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-h1 · 36px / 500</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-h2 text-black-500">Heading H2</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-h2 · 32px / 500</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-h3 text-black-500">Heading H3</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-h3 · 28px / 500</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-h4 text-black-500">Heading H4</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-h4 · 24px / 500</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-label-xl text-black-500">Label X-large</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-label-xl · 18px / 300 upper</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-label-lg text-black-500">Label Large</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-label-lg · 16px / 300 upper</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-label-sm text-black-500">Label Small</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-label-sm · 12px / 300 upper</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-label-xs text-black-500">Label X-small</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-label-xs · 10px / 300 upper</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-sub-xl text-black-500">Subheading X-large</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-sub-xl · 18px / 400</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-sub-lg text-black-500">Subheading Large</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-sub-lg · 16px / 400</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-sub-sm text-black-500">Subheading Small</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-sub-sm · 14px / 400</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-sub-xs text-black-500">Subheading X-small</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-sub-xs · 12px / 400</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-p-xl text-black-500">Paragraph X-large</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-p-xl · 18px / 400</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-p-lg text-black-500">Paragraph Large</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-p-lg · 16px / 500</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-p-md text-black-500">Paragraph Medium</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-p-md · 14px / 400</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-black-15 pb-4 gap-4">
            <span className="typo-p-sm text-black-500">Paragraph Small</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-p-sm · 12px / 400</span>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="typo-p-xs text-black-500">Paragraph X-small</span>
            <span className="typo-p-xs text-black-300 font-mono shrink-0">.typo-p-xs · 10px / 500</span>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-16">
        <SectionHeading id="buttons" title="Buttons" description="Interactive button components in all variants, sizes, and states." />

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">Variants</h3>
        <div className="flex items-center gap-3 flex-wrap mb-8">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">Sizes</h3>
        <div className="flex items-center gap-3 flex-wrap mb-8">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">States</h3>
        <div className="flex items-center gap-3 flex-wrap mb-8">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button icon={<InfoTooltip size="sm" />}>With Icon</Button>
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">Loading Transition</h3>
        <p className="text-xs text-black-300 mb-3">Click to toggle loading state — text fades up, spinner slides in from below.</p>
        <div className="flex items-center gap-3 flex-wrap mb-8">
          <Button loading={btnLoading} onClick={() => setBtnLoading(!btnLoading)}>
            {btnLoading ? "Processing..." : "Click to Load"}
          </Button>
          <Button variant="secondary" loading={btnLoading} onClick={() => setBtnLoading(!btnLoading)}>
            {btnLoading ? "Working..." : "Secondary Load"}
          </Button>
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">Pill Buttons</h3>
        <div className="flex items-center gap-2 mb-8">
          <Button variant="pill">HALF</Button>
          <Button variant="pill">MAX</Button>
          <Button variant="pill" disabled>Disabled</Button>
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">Full Width</h3>
        <div className="max-w-sm">
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="mb-16">
        <SectionHeading id="badges" title="Badges" description="Status and label badges in different variants." />
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="purple">Purple</Badge>
          <Badge variant="green">Green</Badge>
          <Badge variant="gray">Gray</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Inputs */}
      <section className="mb-16">
        <SectionHeading id="inputs" title="Inputs" description="Text input fields with various states." />
        <div className="grid grid-cols-2 gap-6 max-w-lg mb-8">
          <Input label="Default" placeholder="Enter value..." />
          <Input label="With Suffix" placeholder="0.00" suffix="USST" />
          <Input label="Error State" placeholder="Enter value..." error="This field is required" />
          <Input label="Disabled" placeholder="Disabled input" disabled />
          <Input label="With Helper" placeholder="Enter value..." helperText="Optional helper text" />
        </div>
        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">Amount Input with Actions</h3>
        <div className="max-w-sm">
          <Input
            label="Amount"
            placeholder="0.0"
            suffix="USST"
            actions={[
              { label: "HALF", onClick: () => {} },
              { label: "MAX", onClick: () => {} },
            ]}
          />
        </div>
      </section>

      {/* Select */}
      <section className="mb-16">
        <SectionHeading id="select" title="Select" description="Dropdown select component." />
        <div className="max-w-xs">
          <Select
            label="Token"
            value="usdy"
            options={[
              { value: "usdy", label: "USDY" },
              { value: "ousg", label: "OUSG" },
              { value: "usst", label: "USST" },
            ]}
            helperText="Select a token to proceed"
          />
        </div>
      </section>

      {/* Tabs */}
      <section className="mb-16">
        <SectionHeading id="tabs" title="Tabs" description="Tab navigation with sliding pill indicator and content transitions." />
        <Tab
          id="ui-demo"
          tabs={[
            { label: "Overview", value: "tab1" },
            { label: "Details", value: "tab2" },
            { label: "Settings", value: "tab3" },
          ]}
          activeTab={tabValue}
          onTabChange={setTabValue}
        />
        <div className="mt-4 p-4 border border-black-50 rounded-lg min-h-[80px]">
          <TabContent value="tab1" activeTab={tabValue}>
            <p className="text-sm text-black-400">Overview content — the pill slides smoothly between tabs, and content fades with scale + blur.</p>
          </TabContent>
          <TabContent value="tab2" activeTab={tabValue}>
            <p className="text-sm text-black-400">Details content — notice how existing content shrinks down and the new content grows in.</p>
          </TabContent>
          <TabContent value="tab3" activeTab={tabValue}>
            <p className="text-sm text-black-400">Settings content — transitions are very snappy (150ms exit, 200ms enter).</p>
          </TabContent>
        </div>
      </section>

      {/* Slider */}
      <section className="mb-16">
        <SectionHeading id="slider" title="Slider" description="Range slider with spring-animated fill for fluid tracking." />
        <div className="flex flex-col gap-6 max-w-sm">
          <Slider label="Lock Duration" min={0} max={100} value={sliderValue} onChange={setSliderValue} suffix="%" />
          <Slider label="Disabled" min={0} max={100} value={40} onChange={() => {}} suffix="%" disabled />
        </div>
      </section>

      {/* Tooltips */}
      <section className="mb-16">
        <SectionHeading id="tooltips" title="Tooltips" description="Contextual tooltips that grow from the arrow tip. Very fast (100ms)." />
        <div className="flex items-center gap-8">
          <Tooltip content="Top center tooltip" position="top" align="center">
            <span className="text-sm text-purple-500 underline cursor-default">Hover me (top)</span>
          </Tooltip>
          <Tooltip content="Bottom left tooltip" position="bottom" align="left">
            <span className="text-sm text-purple-500 underline cursor-default">Hover me (bottom-left)</span>
          </Tooltip>
          <Tooltip content="Top right aligned" position="top" align="right">
            <span className="text-sm text-purple-500 underline cursor-default">Hover me (top-right)</span>
          </Tooltip>
        </div>
      </section>

      {/* Alerts */}
      <section className="mb-16">
        <SectionHeading id="alerts" title="Alert Banners" description="Contextual alerts with enter/exit animations. Click dismiss to see exit transition." />
        <div className="flex flex-col gap-3 max-w-lg">
          <AlertBanner variant="default">This is a default notification message.</AlertBanner>
          <AlertBanner variant="info">Your transaction has been submitted for processing.</AlertBanner>
          <AlertBanner variant="success">Collateral deposited successfully!</AlertBanner>
          <AlertBanner variant="warning">Your stake is about to expire in 3 days.</AlertBanner>
          <AlertBanner
            variant="error"
            dismissible
            visible={alertVisible}
            onDismiss={() => setAlertVisible(false)}
          >
            Transaction failed. Please try again.
          </AlertBanner>
          {!alertVisible && (
            <button
              type="button"
              onClick={() => setAlertVisible(true)}
              className="text-xs text-purple-500 underline self-start cursor-pointer"
            >
              Show error alert again
            </button>
          )}
        </div>
      </section>

      {/* Transaction Stepper */}
      <section className="mb-16">
        <SectionHeading id="stepper" title="Transaction Stepper" description="Multi-step transaction flow indicator with animated step transitions." />
        <div className="max-w-sm">
          <TransactionStepper
            steps={[
              { label: "Approve USDY", description: "Allow contract to use your tokens", status: "completed" },
              { label: "Deposit Collateral", description: "Lock your collateral in the vault", status: "active" },
              { label: "Mint USST", description: "Receive USST tokens", status: "pending" },
              { label: "Confirmation", description: "Transaction complete", status: "pending" },
            ]}
          />
        </div>
      </section>

      {/* Cards */}
      <section className="mb-16">
        <SectionHeading id="cards" title="Cards" description="Card components with hover interactions — StatCard brackets grow outward on hover." />

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">StatCard</h3>
        <p className="text-xs text-black-300 mb-3">Hover to see the card lift and corner brackets grow outward.</p>
        <div className="flex gap-4 mb-8 overflow-visible">
          <StatCard value="$0.99" label="USST Price" className="w-[200px]" />
          <StatCard value="$2.709M" label="Collateral Available" showInfo infoText="Total collateral value across all vaults" className="w-[200px]" />
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">MetricValue</h3>
        <div className="flex gap-8 mb-8">
          <MetricValue value="$138.02" label="Total Rewards" color="green" size="md" />
          <MetricValue value="$2.674M" label="USST Minted" color="purple" size="md" />
          <MetricValue value="12D 0H" label="Remaining" color="black" size="sm" />
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">TokenDisplay</h3>
        <div className="flex gap-4 mb-8">
          <TokenDisplay token="USDY" size="md" />
          <TokenDisplay token="OUSG" size="md" />
          <TokenDisplay token="USST" size="sm" />
          <TokenDisplay token="STBL" size="sm" />
          <TokenDisplay token="ETH" size="sm" />
          <TokenDisplay token="BNB" size="sm" />
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">DetailRow</h3>
        <div className="max-w-sm flex flex-col gap-2 border border-gray-200 rounded-lg p-4">
          <DetailRow label="Collateral Locked" value="$500.12" />
          <DetailRow label="USST Minted" value="$290.77" showInfo infoText="Total USST minted from collateral" />
          <DetailRow label="Maturity Date" value="23/04/25" />
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mt-8 mb-3">InfoTooltip</h3>
        <p className="text-xs text-black-300 mb-3">Hover the icons to see tooltips appear from the arrow tip.</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <span className="text-sm">Small</span>
            <InfoTooltip size="sm" tooltip="Small tooltip info" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">Medium</span>
            <InfoTooltip size="md" tooltip="Medium tooltip with more detail" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">Large</span>
            <InfoTooltip size="lg" tooltip="Large tooltip for extended information" />
          </div>
        </div>
      </section>

      {/* Tables */}
      <section className="mb-16">
        <SectionHeading id="tables" title="Tables" description="Data tables with sorting and pagination." />
        <div className="bg-white rounded-xl p-6">
          <DataTable
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "Name", sortable: true },
              { key: "value", label: "Value", sortable: true },
              { key: "status", label: "Status" },
            ]}
            data={[
              { id: "001", name: "USDY", value: "$500.12", status: "Active" },
              { id: "002", name: "OUSG", value: "$290.77", status: "Pending" },
              { id: "003", name: "USST", value: "$1,200.00", status: "Active" },
              { id: "004", name: "STBL", value: "$800.50", status: "Completed" },
            ]}
            totalItems={4}
            pageSize={10}
          />
        </div>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mt-8 mb-3">Pagination (standalone)</h3>
        <Pagination currentPage={page} totalItems={940} pageSize={10} onPageChange={setPage} />
      </section>

      {/* Dropdown Menu */}
      <section className="mb-16">
        <SectionHeading id="dropdown" title="Dropdown Menu" description="Contextual menu for selecting from a list of options." />
        <div className="max-w-[240px]">
          <DropdownMenu
            items={[
              { value: "bnb", label: "BNB Chain" },
              { value: "ethereum", label: "Ethereum" },
              { value: "polygon", label: "Polygon" },
              { value: "arbitrum", label: "Arbitrum", disabled: true },
            ]}
            selectedValue="bnb"
            onSelect={() => {}}
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="mb-16">
        <SectionHeading id="navigation" title="Navigation" description="Navigation components for sidebar and page routing." />

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">NavItem</h3>
        <p className="text-xs text-black-300 mb-3">Click between items — the active indicator slides smoothly via layoutId.</p>
        <LayoutGroup id="nav-demo">
          <div
            className="max-w-[260px] flex flex-col gap-1 border border-gray-200 rounded-lg p-4 mb-8"
            onClick={(e) => e.preventDefault()}
          >
            <div onClick={() => setActiveNav("dashboard")} className="cursor-pointer">
              <NavItem label="Dashboard" icon={<DashboardIcon className="w-5 h-5" />} href="#" active={activeNav === "dashboard"} layoutGroup="ui-demo" />
            </div>
            <div onClick={() => setActiveNav("mint")} className="cursor-pointer">
              <NavItem label="Mint" icon={<TokenIcon className="w-5 h-5" />} href="#" active={activeNav === "mint"} layoutGroup="ui-demo" />
            </div>
            <div onClick={() => setActiveNav("portfolio")} className="cursor-pointer">
              <NavItem label="Portfolio" icon={<ChartIcon className="w-5 h-5" />} href="#" active={activeNav === "portfolio"} layoutGroup="ui-demo" />
            </div>
          </div>
        </LayoutGroup>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">BackButton</h3>
        <div className="flex items-center gap-4">
          <BackButton href="#" label="Back" />
          <BackButton href="#" label="Back to Portfolio" />
        </div>
      </section>
    </>
  );
}

// ─── Interactions Tab ────────────────────────────────────────────

function InteractionReplayButton({ onClick, label = "Replay" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs text-purple-500 underline cursor-pointer mt-2"
    >
      {label}
    </button>
  );
}

function InteractionsTab() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [demoTab, setDemoTab] = useState("a");
  const [alertVisible, setAlertVisible] = useState(true);
  const [badgeKey, setBadgeKey] = useState(0);
  const [stepperKey, setStepperKey] = useState(0);
  const [tableKey, setTableKey] = useState(0);
  const [page, setPage] = useState(1);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sliderVal, setSliderVal] = useState(30);

  return (
    <>
      {/* Motion Tokens */}
      <section className="mb-16">
        <SectionHeading
          id="i-motion-tokens"
          title="Motion Tokens"
          description="Centralized animation values defined in src/lib/motion.ts. All components reference these tokens for consistency."
        />

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3">Spring Presets</h3>
        <SpecTable>
          <SpecRow label="spring.default" value="0.45s, bounce: 0 — UI enter/exit" />
          <SpecRow label="spring.interactive" value="0.3s, bounce: 0.15 — buttons, cards" />
          <SpecRow label="spring.snappy" value="0.15s, ease-out — tabs, toggles" />
          <SpecRow label="spring.gentle" value="0.6s, bounce: 0.05 — onboarding" />
          <SpecRow label="spring.physical" value="stiffness: 300, damping: 30 — drag/gesture" />
        </SpecTable>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3 mt-6">Enter/Exit Presets</h3>
        <SpecTable>
          <SpecRow label="enter.default" value="opacity: 0, y: 8, blur(4px)" />
          <SpecRow label="enter.subtle" value="opacity: 0, y: 4, blur(2px)" />
          <SpecRow label="enter.scale" value="opacity: 0, scale: 0.95, blur(4px)" />
          <SpecRow label="enter.fade" value="opacity: 0, blur(4px)" />
          <SpecRow label="exit.default" value="opacity: 0, y: 4, blur(4px)" />
          <SpecRow label="exit.scale" value="opacity: 0, scale: 0.95, blur(4px)" />
        </SpecTable>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3 mt-6">Duration by Frequency</h3>
        <SpecTable>
          <SpecRow label="high (100+/day)" value="0.15s — instant feedback" />
          <SpecRow label="medium (10–100/day)" value="0.3s — purposeful, brisk" />
          <SpecRow label="low (<10/day)" value="0.45s — can breathe" />
          <SpecRow label="rare (one-time)" value="0.6s — dramatic" />
        </SpecTable>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3 mt-6">Easing Curves</h3>
        <SpecTable>
          <SpecRow label="ease.out" value="[0.25, 0.1, 0.25, 1] — default deceleration" />
          <SpecRow label="ease.inOut" value="[0.4, 0, 0.2, 1] — toggles, switches" />
          <SpecRow label="ease.fastOut" value="[0, 0, 0.2, 1] — dismissals" />
          <SpecRow label="ease.gentleOut" value="[0.16, 1, 0.3, 1] — celebrations" />
        </SpecTable>

        <h3 className="text-sm font-medium text-black-400 uppercase tracking-wide mb-3 mt-6">Stagger Delays</h3>
        <SpecTable>
          <SpecRow label="stagger.list" value="0.05s between items" />
          <SpecRow label="stagger.section" value="0.1s between sections" />
          <SpecRow label="stagger.grid" value="0.03s between grid cards" />
        </SpecTable>
      </section>

      {/* Page Transition */}
      <section className="mb-16">
        <SectionHeading
          id="i-page-transition"
          title="Page Transition"
          description="Every route wraps content in PageTransition — a soft blur entry on mount."
        />
        <SpecTable>
          <SpecRow label="Initial" value="opacity: 0, blur(2px)" />
          <SpecRow label="Animate" value="opacity: 1, blur(0px)" />
          <SpecRow label="Duration" value="0.15s" />
          <SpecRow label="Easing" value="[0.25, 0.1, 0.25, 1]" />
          <SpecRow label="Component" value="PageTransition.tsx" />
        </SpecTable>
        <p className="text-xs text-black-300 mt-3">Applied via <CodeToken>DashboardLayout</CodeToken> wrapping all page content. No exit animation — forward-only.</p>
      </section>

      {/* Scroll Reveal */}
      <section className="mb-16">
        <SectionHeading
          id="i-fade-in-section"
          title="Scroll Reveal (FadeInSection)"
          description="Sections fade up into view when they enter the viewport, triggered by IntersectionObserver."
        />
        <SpecTable>
          <SpecRow label="Trigger" value="IntersectionObserver, margin: -60px" />
          <SpecRow label="Initial" value="opacity: 0, y: 16" />
          <SpecRow label="Animate" value="opacity: 1, y: 0" />
          <SpecRow label="Duration" value="0.4s" />
          <SpecRow label="Easing" value="[0.25, 0.1, 0.25, 1]" />
          <SpecRow label="Once" value="true — only triggers once" />
          <SpecRow label="Custom delay" value="Supports delay prop for stagger" />
        </SpecTable>
        <p className="text-xs text-black-300 mt-3">Used on portfolio and earnings pages to stagger section reveals as the user scrolls.</p>
      </section>

      {/* Button Loading */}
      <section className="mb-16">
        <SectionHeading
          id="i-button-loading"
          title="Button Loading Transition"
          description="Text slides up and blurs out; spinner slides up from below. Uses AnimatePresence mode='wait'."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Content exit" value="y: 0 → -10, opacity: 0, blur(3px)" />
            <SpecRow label="Spinner enter" value="y: 10 → 0, opacity: 0 → 1, blur → clear" />
            <SpecRow label="Duration" value="0.15s (high frequency)" />
            <SpecRow label="Mode" value="AnimatePresence wait" />
            <SpecRow label="Hover (primary)" value="inset shadow 150ms" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click to toggle loading state:</p>
            <div className="flex gap-3">
              <Button loading={btnLoading} onClick={() => setBtnLoading(!btnLoading)}>
                {btnLoading ? "Processing..." : "Click me"}
              </Button>
              <Button variant="secondary" loading={btnLoading} onClick={() => setBtnLoading(!btnLoading)}>
                {btnLoading ? "Working..." : "Secondary"}
              </Button>
            </div>
          </InteractionDemo>
        </div>
      </section>

      {/* Tab Pill Slide */}
      <section className="mb-16">
        <SectionHeading
          id="i-tab-pill"
          title="Tab Pill Slide"
          description="Active indicator slides between tabs using Framer Motion layoutId — a shared layout animation."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Mechanism" value="layoutId (shared layout)" />
            <SpecRow label="Spring" value="0.3s, bounce: 0.15" />
            <SpecRow label="Horizontal" value="White pill slides inside bg-black-15 track" />
            <SpecRow label="Vertical" value="Purple bg + left accent bar slide" />
            <SpecRow label="Token" value="spring.interactive" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click between tabs — pill slides smoothly:</p>
            <Tab
              id="interaction-demo-pill"
              tabs={[
                { label: "One", value: "a" },
                { label: "Two", value: "b" },
                { label: "Three", value: "c" },
              ]}
              activeTab={demoTab}
              onTabChange={setDemoTab}
            />
          </InteractionDemo>
        </div>
      </section>

      {/* Tab Content Swap */}
      <section className="mb-16">
        <SectionHeading
          id="i-tab-content"
          title="Tab Content Swap"
          description="When the active tab changes, old content exits and new content enters with coordinated blur + slide."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Enter" value="opacity: 0, y: 6, blur(3px) → clear" />
            <SpecRow label="Exit" value="opacity: 0, y: -6, blur(3px)" />
            <SpecRow label="Duration" value="0.12s" />
            <SpecRow label="Easing" value="[0.25, 0.1, 0.25, 1]" />
            <SpecRow label="Mode" value="AnimatePresence wait" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Switch tabs to see content crossfade:</p>
            <Tab
              id="interaction-demo-content"
              tabs={[
                { label: "Alpha", value: "a" },
                { label: "Beta", value: "b" },
              ]}
              activeTab={demoTab}
              onTabChange={setDemoTab}
            />
            <div className="mt-3 p-3 border border-black-50 rounded-lg min-h-[48px]">
              <TabContent value="a" activeTab={demoTab}>
                <p className="text-sm text-black-400">Alpha content — enters from below with blur.</p>
              </TabContent>
              <TabContent value="b" activeTab={demoTab}>
                <p className="text-sm text-black-400">Beta content — exits upward with blur.</p>
              </TabContent>
            </div>
          </InteractionDemo>
        </div>
      </section>

      {/* Tooltip Scale */}
      <section className="mb-16">
        <SectionHeading
          id="i-tooltip-scale"
          title="Tooltip Scale-From-Tip"
          description="Tooltips grow outward from their arrow tip using asymmetric scaleX/scaleY with a bouncy cubic-bezier."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Show opacity" value="60ms ease-out" />
            <SpecRow label="Show transform" value="100ms cubic-bezier(0.175, 0.885, 0.32, 1.275)" />
            <SpecRow label="Hidden scale" value="scaleY(0.3) scaleX(0.7)" />
            <SpecRow label="Visible scale" value="scaleY(1) scaleX(1)" />
            <SpecRow label="Hide opacity" value="50ms ease-in" />
            <SpecRow label="Hide transform" value="50ms ease-in" />
            <SpecRow label="Transform origin" value="Arrow tip position (dynamic)" />
            <SpecRow label="Render" value="Portal to document.body, fixed position" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Hover each to see the tooltip grow from its arrow:</p>
            <div className="flex items-center gap-6 mt-4">
              <Tooltip content="From the top" position="top" align="center">
                <span className="text-sm text-purple-500 underline cursor-default">Top</span>
              </Tooltip>
              <Tooltip content="From below" position="bottom" align="left">
                <span className="text-sm text-purple-500 underline cursor-default">Bottom-left</span>
              </Tooltip>
              <Tooltip content="Right aligned" position="top" align="right">
                <span className="text-sm text-purple-500 underline cursor-default">Top-right</span>
              </Tooltip>
            </div>
          </InteractionDemo>
        </div>
      </section>

      {/* Select Dropdown */}
      <section className="mb-16">
        <SectionHeading
          id="i-select-dropdown"
          title="Select Dropdown"
          description="Dropdown scales in from top with staggered item entry. Chevron rotates 180 degrees on open."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Dropdown enter" value="scale(0.95) → scale(1), opacity 0 → 1" />
            <SpecRow label="Duration" value="100ms ease-out" />
            <SpecRow label="Transform origin" value="top" />
            <SpecRow label="Item stagger" value="index × 20ms delay" />
            <SpecRow label="Item enter" value="translateY(-4px) → 0, opacity 0 → 1" />
            <SpecRow label="Chevron" value="rotate(0deg) → rotate(180deg), 100ms" />
            <SpecRow label="Keyboard" value="Arrow keys, Enter, Escape" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click to open — items stagger in:</p>
            <div className="max-w-[200px]">
              <Select
                value="usdy"
                options={[
                  { value: "usdy", label: "USDY" },
                  { value: "ousg", label: "OUSG" },
                  { value: "usst", label: "USST" },
                ]}
              />
            </div>
          </InteractionDemo>
        </div>
      </section>

      {/* Slider Spring */}
      <section className="mb-16">
        <SectionHeading
          id="i-slider-spring"
          title="Slider Spring Fill"
          description="Fill bar uses a spring-connected motion value for fluid tracking."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Fill spring" value="stiffness: 180, damping: 24" />
            <SpecRow label="Drag" value="Immediate value, spring follows" />
            <SpecRow label="Thumb hover" value="scale: 1.1, 150ms" />
            <SpecRow label="Keyboard" value="Arrows, PgUp/Dn, Home/End" />
            <SpecRow label="Token" value="spring.physical" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Drag the slider — fill tracks with spring physics:</p>
            <div className="max-w-[280px]">
              <Slider
                label="Duration"
                min={0}
                max={100}
                value={sliderVal}
                onChange={(v) => setSliderVal(v)}
                suffix="%"
              />
            </div>
          </InteractionDemo>
        </div>
      </section>

      {/* Alert Enter/Exit */}
      <section className="mb-16">
        <SectionHeading
          id="i-alert-enter-exit"
          title="Alert Enter / Exit"
          description="Alerts spring in from below with blur; dismiss slides them up and fades out."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Enter" value="opacity: 0, y: 8, blur(4px) → clear" />
            <SpecRow label="Exit" value="opacity: 0, y: -8, blur(4px) + height collapse" />
            <SpecRow label="Timing" value="height 0.35s ease-out, content 0.25s" />
            <SpecRow label="Token" value="spring.default + enter.default" />
            <SpecRow label="Dismiss icon" value="opacity 0.7 → 1 on hover" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click dismiss to see exit, then replay:</p>
            <div className="max-w-[320px]">
              <AlertBanner
                variant="error"
                dismissible
                visible={alertVisible}
                onDismiss={() => setAlertVisible(false)}
              >
                Transaction failed.
              </AlertBanner>
              {!alertVisible && (
                <InteractionReplayButton onClick={() => setAlertVisible(true)} label="Show alert again" />
              )}
            </div>
          </InteractionDemo>
        </div>
      </section>

      {/* Badge Pop-In */}
      <section className="mb-16">
        <SectionHeading
          id="i-badge-pop"
          title="Badge Pop-In"
          description="Badges scale up from 80% with a quick pop when animate=true."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Initial" value="opacity: 0, scale: 0.8" />
            <SpecRow label="Animate" value="opacity: 1, scale: 1" />
            <SpecRow label="Duration" value="0.2s" />
            <SpecRow label="Easing" value="[0.25, 0.1, 0.25, 1]" />
            <SpecRow label="Optional" value="animate={false} disables" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click replay to re-trigger the pop-in:</p>
            <div className="flex gap-3 items-center">
              <Badge key={`badge-purple-${badgeKey}`} variant="purple">Active</Badge>
              <Badge key={`badge-green-${badgeKey}`} variant="green">Success</Badge>
              <Badge key={`badge-gray-${badgeKey}`} variant="gray">Pending</Badge>
            </div>
            <InteractionReplayButton onClick={() => setBadgeKey((k) => k + 1)} />
          </InteractionDemo>
        </div>
      </section>

      {/* Stepper Sequence */}
      <section className="mb-16">
        <SectionHeading
          id="i-stepper"
          title="Stepper Sequence"
          description="Multi-layered animation: staggered step entry, status-specific indicator animations, and connector line growth."
        />
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-medium text-black-400 uppercase tracking-wide">Step Container</h4>
            <SpecTable>
              <SpecRow label="Enter" value="opacity: 0, x: -8 → clear" />
              <SpecRow label="Stagger" value="index × 0.08s" />
              <SpecRow label="Duration" value="0.2s" />
              <SpecRow label="Easing" value="[0.25, 0.1, 0.25, 1]" />
            </SpecTable>

            <h4 className="text-xs font-medium text-black-400 uppercase tracking-wide">Completed Step</h4>
            <SpecTable>
              <SpecRow label="Scale" value="0.5 → 1" />
              <SpecRow label="Spring" value="0.35s, bounce: 0.3" />
              <SpecRow label="Checkmark" value="SVG pathLength 0 → 1, 0.3s" />
            </SpecTable>

            <h4 className="text-xs font-medium text-black-400 uppercase tracking-wide">Active Step</h4>
            <SpecTable>
              <SpecRow label="Pulse ring" value="scale [1, 1.4, 1], opacity [0.3, 0, 0.3]" />
              <SpecRow label="Duration" value="1.5s infinite" />
            </SpecTable>

            <h4 className="text-xs font-medium text-black-400 uppercase tracking-wide">Error Step</h4>
            <SpecTable>
              <SpecRow label="Shake" value="x: [0, -3, 3, -2, 2, 0]" />
              <SpecRow label="Duration" value="0.4s" />
            </SpecTable>

            <h4 className="text-xs font-medium text-black-400 uppercase tracking-wide">Connector Line</h4>
            <SpecTable>
              <SpecRow label="Enter" value="scaleY: 0 → 1 from top" />
              <SpecRow label="Delay" value="index × 0.08 + 0.15s" />
              <SpecRow label="Duration" value="0.3s ease-out" />
            </SpecTable>
          </div>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click replay to re-run the full sequence:</p>
            <div className="max-w-[280px]" key={stepperKey}>
              <TransactionStepper
                steps={[
                  { label: "Approve USDY", description: "Allow contract access", status: "completed" },
                  { label: "Deposit", description: "Lock collateral", status: "active" },
                  { label: "Mint USST", description: "Receive tokens", status: "pending" },
                  { label: "Confirm", description: "Done", status: "pending" },
                ]}
              />
            </div>
            <InteractionReplayButton onClick={() => setStepperKey((k) => k + 1)} />
          </InteractionDemo>
        </div>
      </section>

      {/* Table Row Stagger */}
      <section className="mb-16">
        <SectionHeading
          id="i-table-stagger"
          title="Table Row Stagger"
          description="Each table row fades and slides up on mount, staggered by index for a cascade effect."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Initial" value="opacity: 0, y: 6" />
            <SpecRow label="Animate" value="opacity: 1, y: 0" />
            <SpecRow label="Stagger" value="index × 0.03s" />
            <SpecRow label="Duration" value="0.2s" />
            <SpecRow label="Easing" value="[0.25, 0.1, 0.25, 1]" />
            <SpecRow label="Row hover" value="bg-black-15, transition-colors" />
            <SpecRow label="Sort arrow" value="rotate 180deg, 150ms" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click replay to re-run the row stagger:</p>
            <div key={tableKey}>
              <DataTable
                columns={[
                  { key: "name", label: "Token", sortable: true },
                  { key: "value", label: "Value", sortable: true },
                ]}
                data={[
                  { name: "USDY", value: "$500" },
                  { name: "OUSG", value: "$290" },
                  { name: "USST", value: "$1,200" },
                ]}
                totalItems={3}
                pageSize={10}
              />
            </div>
            <InteractionReplayButton onClick={() => setTableKey((k) => k + 1)} />
          </InteractionDemo>
        </div>
      </section>

      {/* Pagination Slide */}
      <section className="mb-16">
        <SectionHeading
          id="i-pagination"
          title="Pagination Active Slide"
          description="The active page indicator slides between page buttons using layoutId with a bouncy spring."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Mechanism" value="layoutId (shared layout)" />
            <SpecRow label="Spring" value="0.25s, bounce: 0.1" />
            <SpecRow label="Button hover" value="bg-black-15, border-black-200, 150ms" />
            <SpecRow label="Button active" value="scale: 0.95" />
            <SpecRow label="Disabled" value="opacity: 0.3, cursor: not-allowed" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click page numbers — indicator slides:</p>
            <Pagination
              currentPage={page}
              totalItems={50}
              pageSize={10}
              onPageChange={setPage}
              id="interaction-demo"
            />
          </InteractionDemo>
        </div>
      </section>

      {/* Nav Indicator */}
      <section className="mb-16">
        <SectionHeading
          id="i-nav-indicator"
          title="Nav Active Indicator"
          description="Sidebar nav items use dual layoutId elements — a background fill and a left accent bar — that slide between items."
        />
        <div className="grid grid-cols-2 gap-6">
          <SpecTable>
            <SpecRow label="Background" value="layoutId nav-bg — purple-100 fill" />
            <SpecRow label="Left bar" value="layoutId nav-bar — purple-500, 4px wide" />
            <SpecRow label="Click feedback" value="scale: 0.98" />
            <SpecRow label="Text collapse" value="width/opacity 300ms ease-in-out" />
            <SpecRow label="Icon opacity" value="150ms transition" />
          </SpecTable>
          <InteractionDemo>
            <p className="text-xs text-black-300 mb-3">Click between items — indicator slides:</p>
            <LayoutGroup id="interaction-nav-demo">
              <div className="max-w-[240px] flex flex-col gap-1">
                <div onClick={() => setActiveNav("dashboard")} className="cursor-pointer">
                  <NavItem label="Dashboard" icon={<DashboardIcon className="w-5 h-5" />} href="#" active={activeNav === "dashboard"} layoutGroup="i-demo" />
                </div>
                <div onClick={() => setActiveNav("mint")} className="cursor-pointer">
                  <NavItem label="Mint" icon={<TokenIcon className="w-5 h-5" />} href="#" active={activeNav === "mint"} layoutGroup="i-demo" />
                </div>
                <div onClick={() => setActiveNav("portfolio")} className="cursor-pointer">
                  <NavItem label="Portfolio" icon={<ChartIcon className="w-5 h-5" />} href="#" active={activeNav === "portfolio"} layoutGroup="i-demo" />
                </div>
              </div>
            </LayoutGroup>
          </InteractionDemo>
        </div>
      </section>

      {/* Sidebar Collapse */}
      <section className="mb-16">
        <SectionHeading
          id="i-sidebar-collapse"
          title="Sidebar Collapse"
          description="The sidebar width transitions between expanded (272px) and collapsed (88px), with content fading in sync."
        />
        <SpecTable>
          <SpecRow label="Expanded" value="width: 272px" />
          <SpecRow label="Collapsed" value="width: 88px" />
          <SpecRow label="Duration" value="300ms ease-in-out" />
          <SpecRow label="Content margin" value="Adjusts in sync via CSS transition" />
          <SpecRow label="Logo" value="opacity + width fade over 300ms" />
          <SpecRow label="Nav text" value="opacity 0, width 0 when collapsed" />
          <SpecRow label="Persistence" value="localStorage saves collapse state" />
        </SpecTable>
        <p className="text-xs text-black-300 mt-3">Use the collapse button in the app sidebar to see this in action.</p>
      </section>

      {/* Hover & Focus */}
      <section className="mb-16">
        <SectionHeading
          id="i-hover-states"
          title="Hover & Focus States"
          description="CSS-driven micro-interactions at 150ms for immediate tactile feedback."
        />
        <SpecTable>
          <SpecRow label="Button primary hover" value="inset shadow rgba(255,255,255,0.1), 150ms" />
          <SpecRow label="Button secondary hover" value="bg-purple-100, 150ms" />
          <SpecRow label="Button pill hover" value="border-black-200, 150ms" />
          <SpecRow label="Input focus" value="border-purple-500, shadow 0_0_0_3px purple/10, 150ms" />
          <SpecRow label="Input error focus" value="border-red-500, shadow 0_0_0_3px red/10, 150ms" />
          <SpecRow label="Select chevron" value="rotate(180deg), 100ms" />
          <SpecRow label="Table row hover" value="bg-black-15, transition-colors" />
          <SpecRow label="Pagination hover" value="bg-black-15, border-black-200, 150ms" />
          <SpecRow label="InfoTooltip icon" value="opacity 50% → 80%, 150ms" />
          <SpecRow label="BackButton hover" value="bg-black-15, transition-colors" />
          <SpecRow label="Alert dismiss hover" value="opacity 70% → 100%" />
        </SpecTable>
      </section>

      {/* Accessibility */}
      <section className="mb-16">
        <SectionHeading
          id="i-accessibility"
          title="Accessibility"
          description="All motion respects prefers-reduced-motion and components provide full keyboard support."
        />
        <SpecTable>
          <SpecRow label="Reduced motion" value="All Framer Motion components use useReducedMotion()" />
          <SpecRow label="Fallback" value="Instant opacity change, no blur/translate" />
          <SpecRow label="Focus rings" value="Keyboard-only via :focus-visible" />
          <SpecRow label="Slider keyboard" value="Arrows, PgUp/Dn, Home/End" />
          <SpecRow label="Select keyboard" value="Arrows, Enter, Space, Escape" />
          <SpecRow label="Tab keyboard" value="Standard button focus" />
          <SpecRow label="ARIA" value="role=slider, role=combobox, role=alert" />
        </SpecTable>
        <p className="text-xs text-black-300 mt-3">
          Enable <CodeToken>prefers-reduced-motion: reduce</CodeToken> in your OS accessibility settings to see all animations gracefully degrade to simple opacity fades.
        </p>
      </section>
    </>
  );
}

// ─── Main Page ───────────────────────────────────────────────────

export default function UIPage() {
  const [activeTopTab, setActiveTopTab] = useState<"components" | "interactions">("components");

  const sidebarSections = activeTopTab === "components" ? componentSections : interactionSections;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar Nav */}
      <aside className="fixed top-0 left-0 w-[220px] h-screen border-r border-gray-200 bg-white p-6 overflow-y-auto z-10">
        <h1 className="typo-h4 mb-4 text-black-500">STBL Design System</h1>

        {/* Top-level tab switcher */}
        <div className="flex gap-1 mb-6 bg-black-15 rounded-full p-0.5">
          <button
            type="button"
            onClick={() => setActiveTopTab("components")}
            className={`flex-1 text-xs font-medium py-1.5 rounded-full transition-colors duration-150 cursor-pointer ${
              activeTopTab === "components"
                ? "bg-white text-black-500 shadow-sm"
                : "text-black-300 hover:text-black-400"
            }`}
          >
            Components
          </button>
          <button
            type="button"
            onClick={() => setActiveTopTab("interactions")}
            className={`flex-1 text-xs font-medium py-1.5 rounded-full transition-colors duration-150 cursor-pointer ${
              activeTopTab === "interactions"
                ? "bg-white text-black-500 shadow-sm"
                : "text-black-300 hover:text-black-400"
            }`}
          >
            Interactions
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {sidebarSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-black-400 hover:text-purple-500 py-1.5 px-2 rounded hover:bg-purple-100"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-[220px] flex-1 p-12 max-w-[960px]">
        {activeTopTab === "components" ? <ComponentsTab /> : <InteractionsTab />}
      </main>
    </div>
  );
}
