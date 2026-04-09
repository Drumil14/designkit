import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();

const defaultTheme = {
  primary: "#E8590C",
  secondary: "#1B7A6E",
  accent: "#7048E8",
  bg: "#FAF9F7",
  surface: "#FFFFFF",
  surfaceAlt: "#F3F1EE",
  text: "#1A1A19",
  textMuted: "#86827E",
  border: "#E8E4DF",
  radius: 10,
  fontScale: 1,
};

/* ── Micro Components ── */

const DSButton = ({
  variant = "primary",
  size = "md",
  disabled = false,
  label = "Button",
  theme,
}) => {
  const [hovered, setHovered] = useState(false);
  const sizes = { sm: "7px 15px", md: "10px 22px", lg: "14px 30px" };
  const fontSizes = { sm: 12.5, md: 13.5, lg: 15 };
  const variants = {
    primary: {
      background: hovered && !disabled ? "#D14B08" : theme.primary,
      color: "#fff",
      border: "none",
      boxShadow:
        hovered && !disabled
          ? "0 2px 12px " + theme.primary + "40"
          : "0 1px 3px #0001",
    },
    secondary: {
      background: hovered && !disabled ? theme.primary + "0A" : "transparent",
      color: theme.primary,
      border: `1.5px solid ${theme.primary}`,
      boxShadow: "none",
    },
    ghost: {
      background: hovered && !disabled ? theme.surfaceAlt : "transparent",
      color: theme.text,
      border: `1.5px solid ${theme.border}`,
      boxShadow: "none",
    },
    accent: {
      background: hovered && !disabled ? "#5F3DC4" : theme.accent,
      color: "#fff",
      border: "none",
      boxShadow:
        hovered && !disabled
          ? "0 2px 12px " + theme.accent + "40"
          : "0 1px 3px #0001",
    },
  };
  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...variants[variant],
        padding: sizes[size],
        fontSize: fontSizes[size] * theme.fontScale,
        borderRadius: theme.radius - 2,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        fontFamily: "inherit",
        transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
        letterSpacing: "0.01em",
      }}
    >
      {label}
    </button>
  );
};

const DSInput = ({
  placeholder = "Type here...",
  variant = "default",
  disabled = false,
  theme,
}) => {
  const [focused, setFocused] = useState(false);
  const styles = {
    default: {
      border: `1.5px solid ${focused ? theme.primary : theme.border}`,
      background: theme.surface,
    },
    filled: { border: `1.5px solid transparent`, background: theme.surfaceAlt },
    accent: {
      border: `1.5px solid ${focused ? theme.accent : theme.border}`,
      background: theme.surface,
    },
  };
  return (
    <input
      disabled={disabled}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...styles[variant],
        padding: "10px 14px",
        borderRadius: theme.radius - 2,
        color: theme.text,
        fontSize: 14 * theme.fontScale,
        fontFamily: "inherit",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        opacity: disabled ? 0.4 : 1,
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: focused ? `0 0 0 3px ${theme.primary}12` : "none",
      }}
    />
  );
};

const DSBadge = ({ label = "Badge", variant = "primary", theme }) => {
  const colors = {
    primary: { bg: theme.primary + "14", color: theme.primary },
    accent: { bg: theme.accent + "14", color: theme.accent },
    success: { bg: "#1B7A6E14", color: "#1B7A6E" },
    warning: { bg: "#E8930C14", color: "#C47A08" },
  };
  const c = colors[variant] || colors.primary;
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        padding: "3px 11px",
        borderRadius: 6,
        fontSize: 11.5 * theme.fontScale,
        fontWeight: 650,
        letterSpacing: "0.03em",
      }}
    >
      {label}
    </span>
  );
};

const DSCard = ({
  title = "Card Title",
  description = "Description text goes here.",
  theme,
}) => (
  <div
    style={{
      background: theme.surface,
      border: `1px solid ${theme.border}`,
      borderRadius: theme.radius + 2,
      padding: "22px 24px",
      maxWidth: 300,
      boxShadow: "0 1px 4px #0000000A",
    }}
  >
    <div
      style={{
        fontSize: 16 * theme.fontScale,
        fontWeight: 650,
        color: theme.text,
        marginBottom: 6,
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontSize: 13.5 * theme.fontScale,
        color: theme.textMuted,
        lineHeight: 1.6,
      }}
    >
      {description}
    </div>
    <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
      <DSButton variant="primary" size="sm" label="Action" theme={theme} />
      <DSButton variant="ghost" size="sm" label="Cancel" theme={theme} />
    </div>
  </div>
);

const DSToggle = ({ checked = false, theme }) => {
  const [on, setOn] = useState(checked);
  useEffect(() => setOn(checked), [checked]);
  return (
    <div
      onClick={() => setOn(!on)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 999,
        cursor: "pointer",
        background: on ? theme.primary : theme.border,
        position: "relative",
        transition: "background 0.25s cubic-bezier(.4,0,.2,1)",
        boxShadow: "inset 0 1px 3px #0000001A",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          background: "#fff",
          position: "absolute",
          top: 3,
          left: on ? 23 : 3,
          transition: "left 0.25s cubic-bezier(.4,0,.2,1)",
          boxShadow: "0 1px 4px #00000020",
        }}
      />
    </div>
  );
};

const DSAvatar = ({ name = "Drumil", size = "md", theme }) => {
  const s = { sm: 30, md: 40, lg: 56 };
  const fs = { sm: 11, md: 15, lg: 20 };
  return (
    <div
      style={{
        width: s[size],
        height: s[size],
        borderRadius: 999,
        background: theme.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fs[size] * theme.fontScale,
        fontWeight: 700,
        color: "#fff",
        letterSpacing: "-0.02em",
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

const DSAlert = ({
  variant = "info",
  message = "This is an alert message.",
  theme,
}) => {
  const styles = {
    info: { border: theme.accent, icon: "i", bg: theme.accent + "08" },
    success: { border: "#1B7A6E", icon: "✓", bg: "#1B7A6E08" },
    warning: { border: "#E8930C", icon: "!", bg: "#E8930C08" },
    error: { border: "#E03131", icon: "×", bg: "#E0313108" },
  };
  const s = styles[variant];
  return (
    <div
      style={{
        background: s.bg,
        borderLeft: `3px solid ${s.border}`,
        borderRadius: theme.radius - 4,
        padding: "12px 16px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        fontSize: 13.5 * theme.fontScale,
        color: theme.text,
        lineHeight: 1.5,
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 999,
          background: s.border,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 800,
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {s.icon}
      </span>
      <span>{message}</span>
    </div>
  );
};

const DSProgressBar = ({ value = 65, theme }) => (
  <div
    style={{
      width: "100%",
      height: 6,
      background: theme.surfaceAlt,
      borderRadius: 999,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${value}%`,
        height: "100%",
        background: theme.primary,
        borderRadius: 999,
        transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
      }}
    />
  </div>
);

const DSTooltip = ({ label = "Hover me", tip = "Tooltip text", theme }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span
        style={{
          color: theme.primary,
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 14 * theme.fontScale,
          borderBottom: `1.5px dashed ${theme.primary}50`,
        }}
      >
        {label}
      </span>
      {show && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: theme.text,
            color: theme.bg,
            padding: "6px 12px",
            borderRadius: 7,
            fontSize: 12 * theme.fontScale,
            whiteSpace: "nowrap",
            fontWeight: 500,
            boxShadow: "0 4px 20px #0003",
          }}
        >
          {tip}
        </div>
      )}
    </div>
  );
};

/* ── Registry ── */
const componentRegistry = [
  {
    id: "button",
    name: "Button",
    desc: "Flexible actions with multiple variants and sizes.",
    a11y: 94,
    controls: [
      {
        key: "variant",
        type: "select",
        options: ["primary", "secondary", "ghost", "accent"],
        default: "primary",
      },
      {
        key: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        default: "md",
      },
      { key: "disabled", type: "toggle", default: false },
      { key: "label", type: "text", default: "Click Me" },
    ],
    render: (p, t) => <DSButton {...p} theme={t} />,
    code: (p) =>
      `<Button variant="${p.variant}" size="${p.size}"${p.disabled ? " disabled" : ""}>\n  ${p.label}\n</Button>`,
  },
  {
    id: "input",
    name: "Input",
    desc: "Text input field with default, filled, and accent styles.",
    a11y: 91,
    controls: [
      {
        key: "variant",
        type: "select",
        options: ["default", "filled", "accent"],
        default: "default",
      },
      { key: "placeholder", type: "text", default: "Enter text..." },
      { key: "disabled", type: "toggle", default: false },
    ],
    render: (p, t) => <DSInput {...p} theme={t} />,
    code: (p) =>
      `<Input variant="${p.variant}" placeholder="${p.placeholder}"${p.disabled ? " disabled" : ""} />`,
  },
  {
    id: "badge",
    name: "Badge",
    desc: "Compact labels for status and categories.",
    a11y: 98,
    controls: [
      {
        key: "variant",
        type: "select",
        options: ["primary", "accent", "success", "warning"],
        default: "primary",
      },
      { key: "label", type: "text", default: "New" },
    ],
    render: (p, t) => <DSBadge {...p} theme={t} />,
    code: (p) => `<Badge variant="${p.variant}">${p.label}</Badge>`,
  },
  {
    id: "card",
    name: "Card",
    desc: "Content container with heading, body, and action slots.",
    a11y: 89,
    controls: [
      { key: "title", type: "text", default: "Project Update" },
      {
        key: "description",
        type: "text",
        default:
          "The latest sprint delivered 3 new features ahead of schedule.",
      },
    ],
    render: (p, t) => <DSCard {...p} theme={t} />,
    code: (p) => `<Card title="${p.title}">\n  ${p.description}\n</Card>`,
  },
  {
    id: "toggle",
    name: "Toggle",
    desc: "Binary on/off switch for settings.",
    a11y: 86,
    controls: [{ key: "checked", type: "toggle", default: false }],
    render: (p, t) => <DSToggle {...p} theme={t} />,
    code: (p) => `<Toggle checked={${p.checked}} onChange={handleChange} />`,
  },
  {
    id: "avatar",
    name: "Avatar",
    desc: "User identity display with initial-based fallback.",
    a11y: 95,
    controls: [
      { key: "name", type: "text", default: "Drumil" },
      {
        key: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        default: "md",
      },
    ],
    render: (p, t) => <DSAvatar {...p} theme={t} />,
    code: (p) => `<Avatar name="${p.name}" size="${p.size}" />`,
  },
  {
    id: "alert",
    name: "Alert",
    desc: "Contextual feedback banners with severity levels.",
    a11y: 92,
    controls: [
      {
        key: "variant",
        type: "select",
        options: ["info", "success", "warning", "error"],
        default: "info",
      },
      {
        key: "message",
        type: "text",
        default: "Your changes have been saved.",
      },
    ],
    render: (p, t) => <DSAlert {...p} theme={t} />,
    code: (p) => `<Alert variant="${p.variant}">\n  ${p.message}\n</Alert>`,
  },
  {
    id: "progress",
    name: "Progress",
    desc: "Linear progress indicator for loading and completion.",
    a11y: 88,
    controls: [{ key: "value", type: "range", min: 0, max: 100, default: 65 }],
    render: (p, t) => (
      <div style={{ width: 320 }}>
        <DSProgressBar {...p} theme={t} />
      </div>
    ),
    code: (p) => `<ProgressBar value={${p.value}} />`,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    desc: "Hover-triggered contextual hint.",
    a11y: 82,
    controls: [
      { key: "label", type: "text", default: "Hover me" },
      { key: "tip", type: "text", default: "Extra context here" },
    ],
    render: (p, t) => <DSTooltip {...p} theme={t} />,
    code: (p) => `<Tooltip content="${p.tip}">\n  ${p.label}\n</Tooltip>`,
  },
];

/* ── Sub-components ── */
function ControlPanel({ controls, values, onChange, theme }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {controls.map((c) => (
        <div
          key={c.key}
          style={{ display: "flex", alignItems: "center", gap: 14 }}
        >
          <label
            style={{
              fontSize: 12,
              color: theme.textMuted,
              fontWeight: 600,
              width: 80,
              flexShrink: 0,
            }}
          >
            {c.key}
          </label>
          {c.type === "select" && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {c.options.map((o) => (
                <button
                  key={o}
                  onClick={() => onChange(c.key, o)}
                  style={{
                    padding: "5px 13px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    border:
                      values[c.key] === o
                        ? `1.5px solid ${theme.primary}`
                        : `1.5px solid ${theme.border}`,
                    background:
                      values[c.key] === o
                        ? theme.primary + "0C"
                        : "transparent",
                    color:
                      values[c.key] === o ? theme.primary : theme.textMuted,
                    transition: "all 0.15s",
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
          {c.type === "toggle" && (
            <div
              onClick={() => onChange(c.key, !values[c.key])}
              style={{
                width: 38,
                height: 20,
                borderRadius: 999,
                cursor: "pointer",
                background: values[c.key] ? theme.primary : theme.border,
                position: "relative",
                transition: "background 0.2s",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#fff",
                  position: "absolute",
                  top: 3,
                  left: values[c.key] ? 21 : 3,
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px #0002",
                }}
              />
            </div>
          )}
          {c.type === "text" && (
            <input
              value={values[c.key]}
              onChange={(e) => onChange(c.key, e.target.value)}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: 7,
                border: `1.5px solid ${theme.border}`,
                background: theme.surface,
                color: theme.text,
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = theme.primary)}
              onBlur={(e) => (e.target.style.borderColor = theme.border)}
            />
          )}
          {c.type === "range" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <input
                type="range"
                min={c.min}
                max={c.max}
                value={values[c.key]}
                onChange={(e) => onChange(c.key, Number(e.target.value))}
                style={{ flex: 1, accentColor: theme.primary, height: 4 }}
              />
              <span
                style={{
                  fontSize: 13,
                  color: theme.text,
                  fontWeight: 650,
                  minWidth: 28,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {values[c.key]}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ code, theme }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div
      style={{
        position: "relative",
        background: "#1E1E1E",
        borderRadius: theme.radius,
        padding: "20px 22px",
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 12.5,
        color: "#D4D4D4",
        lineHeight: 1.75,
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        border: "1px solid #2A2A2A",
      }}
    >
      <button
        onClick={copy}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "#333",
          border: "1px solid #444",
          color: copied ? "#7EE8A0" : "#999",
          padding: "4px 12px",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 11,
          fontFamily: "inherit",
          fontWeight: 600,
          transition: "color 0.2s",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      {code}
    </div>
  );
}

function ThemeEditor({ theme, setTheme }) {
  const colors = [
    { key: "primary", label: "Primary" },
    { key: "secondary", label: "Secondary" },
    { key: "accent", label: "Accent" },
    { key: "bg", label: "Background" },
    { key: "surface", label: "Surface" },
    { key: "text", label: "Text" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: theme.textMuted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Colors
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {colors.map(({ key, label }) => (
          <label
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <div style={{ position: "relative", width: 28, height: 28 }}>
              <input
                type="color"
                value={theme[key]}
                onChange={(e) => setTheme({ ...theme, [key]: e.target.value })}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              />
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: theme[key],
                  border: "2px solid " + theme.border,
                  boxShadow: "0 1px 4px #0001",
                }}
              />
            </div>
            <span style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>
              {label}
            </span>
            <span
              style={{
                fontSize: 11,
                color: theme.textMuted,
                fontFamily: "monospace",
                marginLeft: "auto",
              }}
            >
              {theme[key]}
            </span>
          </label>
        ))}
      </div>
      <div style={{ height: 1, background: theme.border }} />
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: theme.textMuted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Tokens
      </div>
      {[
        {
          key: "radius",
          label: "Radius",
          min: 0,
          max: 24,
          step: 1,
          fmt: (v) => v + "px",
        },
        {
          key: "fontScale",
          label: "Font Scale",
          min: 0.8,
          max: 1.3,
          step: 0.05,
          fmt: (v) => v.toFixed(2),
        },
      ].map(({ key, label, min, max, step, fmt }) => (
        <div
          key={key}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <span
            style={{
              fontSize: 13,
              color: theme.text,
              fontWeight: 500,
              width: 72,
            }}
          >
            {label}
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={theme[key]}
            onChange={(e) =>
              setTheme({ ...theme, [key]: Number(e.target.value) })
            }
            style={{ flex: 1, accentColor: theme.primary, height: 4 }}
          />
          <span
            style={{
              fontSize: 12,
              color: theme.textMuted,
              fontFamily: "monospace",
              minWidth: 36,
              textAlign: "right",
            }}
          >
            {fmt(theme[key])}
          </span>
        </div>
      ))}
      <button
        onClick={() => setTheme(defaultTheme)}
        style={{
          marginTop: 4,
          padding: "9px 0",
          border: `1.5px solid ${theme.border}`,
          background: "transparent",
          color: theme.textMuted,
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "inherit",
        }}
      >
        Reset to defaults
      </button>
    </div>
  );
}

/* ── Main ── */
export default function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [activeComp, setActiveComp] = useState("button");
  const [themeOpen, setThemeOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [controlValues, setControlValues] = useState({});

  const comp = componentRegistry.find((c) => c.id === activeComp);

  useEffect(() => {
    if (comp) {
      const d = {};
      comp.controls.forEach((c) => {
        d[c.key] = c.default;
      });
      setControlValues(d);
      setCodeOpen(false);
    }
  }, [activeComp]);

  const handleControl = (k, v) =>
    setControlValues((prev) => ({ ...prev, [k]: v }));

  return (
    <ThemeContext.Provider value={theme}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0)} }
        * { scrollbar-width: thin; scrollbar-color: ${theme.border} transparent; }
        ::selection { background: ${theme.primary}22; }
      `}</style>

      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          background: theme.bg,
          color: theme.text,
          minHeight: "100vh",
          display: "flex",
        }}
      >
        {/* ── Sidebar ── */}
        <nav
          style={{
            width: 232,
            flexShrink: 0,
            background: theme.surface,
            borderRight: `1px solid ${theme.border}`,
            display: "flex",
            flexDirection: "column",
            userSelect: "none",
          }}
        >
          <div
            style={{
              padding: "26px 22px 22px",
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: theme.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Instrument Serif',serif",
                  fontStyle: "italic",
                }}
              >
                d
              </div>
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                  }}
                >
                  designkit
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: theme.textMuted,
                    fontWeight: 500,
                  }}
                >
                  {componentRegistry.length} components
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: theme.textMuted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 14px 10px",
              }}
            >
              Library
            </div>
            {componentRegistry.map((c) => {
              const active = activeComp === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveComp(c.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "9px 14px",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: active ? theme.primary + "0C" : "transparent",
                    color: active ? theme.primary : theme.text,
                    fontWeight: active ? 650 : 450,
                    fontSize: 13.5,
                    fontFamily: "inherit",
                    textAlign: "left",
                    transition: "all 0.12s",
                    marginBottom: 1,
                    lineHeight: 1.3,
                    borderLeft: active
                      ? `2.5px solid ${theme.primary}`
                      : "2.5px solid transparent",
                  }}
                >
                  {c.name}
                </button>
              );
            })}
          </div>

          <div
            style={{
              padding: "12px 10px",
              borderTop: `1px solid ${theme.border}`,
            }}
          >
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              style={{
                width: "100%",
                padding: "9px 14px",
                border: "none",
                borderRadius: 8,
                background: themeOpen ? theme.accent + "0C" : "transparent",
                color: themeOpen ? theme.accent : theme.textMuted,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 8,
                textAlign: "left",
                transition: "all 0.12s",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              Customize
            </button>
          </div>
        </nav>

        {/* ── Main Panel ── */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <header
            style={{
              padding: "24px 40px",
              borderBottom: `1px solid ${theme.border}`,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              background: theme.surface,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.035em",
                    fontFamily: "'Instrument Serif','DM Sans',serif",
                    fontStyle: "italic",
                  }}
                >
                  {comp?.name}
                </h1>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: theme.textMuted,
                    background: theme.surfaceAlt,
                    padding: "2px 8px",
                    borderRadius: 5,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  v1.0
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  color: theme.textMuted,
                  lineHeight: 1.4,
                }}
              >
                {comp?.desc}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: theme.textMuted,
                  letterSpacing: "0.04em",
                }}
              >
                A11Y
              </div>
              <div
                style={{
                  padding: "3px 10px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                  background:
                    comp?.a11y >= 90
                      ? "#1B7A6E12"
                      : comp?.a11y >= 80
                        ? "#E8930C12"
                        : "#E0313112",
                  color:
                    comp?.a11y >= 90
                      ? "#1B7A6E"
                      : comp?.a11y >= 80
                        ? "#C47A08"
                        : "#E03131",
                }}
              >
                {comp?.a11y}/100
              </div>
            </div>
          </header>

          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "32px 40px", overflowY: "auto" }}>
              {/* Preview */}
              <section>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 650,
                    color: theme.textMuted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Preview
                </div>
                <div
                  style={{
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: theme.radius + 4,
                    padding: "56px 40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 160,
                    position: "relative",
                    backgroundImage: `radial-gradient(circle, ${theme.border}80 0.8px, transparent 0.8px)`,
                    backgroundSize: "16px 16px",
                    boxShadow: "0 1px 4px #0000000A",
                  }}
                >
                  <div
                    key={activeComp + JSON.stringify(controlValues)}
                    style={{ animation: "fadeIn 0.3s ease" }}
                  >
                    {comp && comp.render(controlValues, theme)}
                  </div>
                </div>
              </section>

              {/* Controls */}
              <section style={{ marginTop: 32 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 650,
                    color: theme.textMuted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Props
                </div>
                <div
                  style={{
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: theme.radius + 2,
                    padding: "22px 24px",
                    boxShadow: "0 1px 4px #0000000A",
                  }}
                >
                  <ControlPanel
                    controls={comp?.controls || []}
                    values={controlValues}
                    onChange={handleControl}
                    theme={theme}
                  />
                </div>
              </section>

              {/* Code */}
              <section style={{ marginTop: 28, paddingBottom: 40 }}>
                <button
                  onClick={() => setCodeOpen(!codeOpen)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: "transparent",
                    border: `1.5px solid ${theme.border}`,
                    color: codeOpen ? theme.text : theme.textMuted,
                    padding: "8px 16px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 12.5,
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {"</>"}
                  </span>
                  {codeOpen ? "Hide code" : "Show code"}
                </button>
                {codeOpen && (
                  <div
                    style={{ marginTop: 14, animation: "fadeIn 0.25s ease" }}
                  >
                    <CodeBlock
                      code={comp?.code(controlValues) || ""}
                      theme={theme}
                    />
                  </div>
                )}
              </section>
            </div>

            {/* Theme Panel */}
            {themeOpen && (
              <aside
                style={{
                  width: 260,
                  background: theme.surface,
                  borderLeft: `1px solid ${theme.border}`,
                  padding: "28px 22px",
                  overflowY: "auto",
                  flexShrink: 0,
                  animation: "slideIn 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    marginBottom: 24,
                    fontFamily: "'Instrument Serif','DM Sans',serif",
                    fontStyle: "italic",
                  }}
                >
                  Customize
                </div>
                <ThemeEditor theme={theme} setTheme={setTheme} />
              </aside>
            )}
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
