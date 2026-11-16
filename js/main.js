// ============================================================================
// Portfolio Site — Devraj Gadhvi
// Card data, role toggle, counter animation
// ============================================================================

const FLAGSHIP_CARDS = [
  {
    title: "Multi-Tenant AI Employee Platform",
    category: "AI Automation",
    description: "n8n + FastAPI + LiteLLM + Postgres. Six workflows: support, lead capture, booking, KB ingestion. RLS multi-tenancy, idempotent webhooks, human-in-the-loop gates.",
    tags: ["n8n", "FastAPI", "LiteLLM", "Postgres RLS", "HITL"],
    status: "Live (Docker Compose)",
    repo: "https://github.com/dev4aibots/ai-automation-platform",
    demo: null,
  },
  {
    title: "PRAMAAN — Zero-Trust RAG",
    category: "Applied AI",
    description: "5-layer security pipeline for RAG: scan, authorize, prove, sanitize, audit. SQL RBAC + pgvector + PGlite. Team Madmax hackathon + solo v2 rebuild.",
    tags: ["RAG", "pgvector", "RBAC", "Next.js", "Transformers.js"],
    status: "Live Backend",
    repo: "https://github.com/dev4aibots/Pramaan",
    demo: "https://pramaan-dev4aibots.vercel.app",
  },
  {
    title: "Semantic Code Search",
    category: "Applied AI",
    description: "Repository-scale search: AST chunking + RRF hybrid fusion. Vercel API deployment. Eval benchmarks pending re-test.",
    tags: ["RAG", "AST", "RRF", "Next.js", "Vercel"],
    status: "Live Backend",
    repo: "https://github.com/dev4aibots/semantic-code-search",
    demo: "https://semantic-code-search-demo.vercel.app",
  },
  {
    title: "LLM Gateway Benchmarks",
    category: "LLM Eval",
    description: "191 models across 5 providers (OpenRouter, Groq, Cerebras, Gemini, NVIDIA NIM). Measured latency/success for LiteLLM routing.",
    tags: ["LiteLLM", "Benchmarks", "Python", "191 models"],
    status: "Offline / Measured",
    repo: "https://github.com/dev4aibots/llm-benchmarks",
    demo: null,
  },
  {
    title: "Harness² Studio",
    category: "Developer Tools",
    description: "Zero-dependency Python/Tkinter Material 3 desktop control room for Google Research Harness². 44 pytest tests, Xvfb CI, 71 audited controls.",
    tags: ["Python", "Tkinter", "pytest", "Desktop", "CI"],
    status: "Offline / Desktop",
    repo: "https://github.com/dev4aibots/harness2-studio",
    demo: null,
  },
  {
    title: "MCP Tool Registry",
    category: "Agents & MCP",
    description: "JSON-RPC MCP protocol handler with Zod validation, JWT RBAC, read/write tool separation. Real console, unverified benchmarks purged.",
    tags: ["MCP", "JSON-RPC", "JWT RBAC", "TypeScript", "Zod"],
    status: "Live (Browser)",
    repo: "https://github.com/dev4aibots/mcp-tool-registry",
    demo: "https://mcp-tool-registry-demo.vercel.app/tools",
  },
  {
    title: "Production RAG System",
    category: "Applied AI",
    description: "Production-grade RAG with verified citations, hybrid retrieval (dense + BM25 + RRF), reranking, eval regression gate (McNemar), and CI. 13 tests, all passing.",
    tags: ["RAG", "Evals", "Citations", "FastAPI", "CI"],
    status: "Live Backend",
    repo: "https://github.com/dev4aibots/production-rag-system",
    demo: null,
  },
  {
    title: "AI Agent System",
    category: "Agents & Automation",
    description: "Tool-using agent with retries, idempotency keys, human-in-the-loop approval, max-step loop guard, and hash-chained audit ledger. 13 tests, all passing.",
    tags: ["Agents", "HITL", "Idempotency", "Audit", "FastAPI"],
    status: "Live Backend",
    repo: "https://github.com/dev4aibots/ai-agent-system",
    demo: null,
  },
];

const WORKFLOW_CARDS = [
  {
    name: "Master Orchestrator",
    trigger: "Universal Webhook (POST)",
    routing: "LiteLLM intent: support / lead / booking",
    subflows: "SW1, SW2, SW3",
    description: "Single entry point for all AI employee requests. Intent detection routes to sub-workflows.",
  },
  {
    name: "SW1: Support Agent",
    trigger: "Execute Workflow Trigger",
    routing: "RAG + escalation",
    subflows: "SW4 (handoff)",
    description: "Answers support questions using RAG. Escalates to human when output contains 'ESCALATE'.",
  },
  {
    name: "SW2: Lead & CRM Agent",
    trigger: "Execute Workflow Trigger",
    routing: "Pydantic extraction → Postgres",
    subflows: "SW4 (notify)",
    description: "Extracts lead info (name, email, company, need) and inserts into Postgres leads table.",
  },
  {
    name: "SW3: Booking Agent",
    trigger: "Execute Workflow Trigger",
    routing: "Google Calendar + AI negotiation",
    subflows: "SW4 (notify)",
    description: "Checks free/busy, negotiates slot with AI, books event, saves to Postgres appointments.",
  },
  {
    name: "SW4: Shared Actions Engine",
    trigger: "Execute Workflow Trigger",
    routing: "Action router: crm_write / notify / handoff / audit",
    subflows: "None (shared)",
    description: "Shared side effects: CRM writes, email notifications, human handoff, audit logging.",
  },
  {
    name: "SW7: KB Ingestion",
    trigger: "Webhook (POST ingest-kb)",
    routing: "Fetch → HTML extract → chunk → embed → pgvector",
    subflows: "None",
    description: "Ingests webpages into knowledge base: fetch, extract HTML, split text, embed, insert into pgvector.",
  },
];

// ============================================================================
// Render flagship cards
// ============================================================================
function renderCards() {
  const grid = document.getElementById("card-grid");
  if (!grid) return;

  grid.innerHTML = FLAGSHIP_CARDS.map(c => `
    <article class="card">
      <div class="meta">
        <span>${c.category}</span>
        <span>${c.status}</span>
      </div>
      <h3>${c.title}</h3>
      <p>${c.description}</p>
      <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:1rem;">
        ${c.tags.map(t => `<span style="background:#e2e8f0;padding:0.2rem 0.5rem;border-radius:6px;font-size:0.75rem;color:#475569;">${t}</span>`).join("")}
      </div>
      <div style="display:flex; gap:0.5rem;">
        ${c.repo ? `<a href="${c.repo}" class="btn btn-ghost" style="font-size:0.8rem;padding:0.4rem 0.8rem;" target="_blank" rel="noopener">Source</a>` : ""}
        ${c.demo ? `<a href="${c.demo}" class="btn btn-primary" style="font-size:0.8rem;padding:0.4rem 0.8rem;" target="_blank" rel="noopener">Demo</a>` : ""}
      </div>
    </article>
  `).join("");
}

// ============================================================================
// Render n8n workflow cards
// ============================================================================
function renderWorkflows() {
  const grid = document.getElementById("workflow-grid");
  if (!grid) return;

  grid.innerHTML = WORKFLOW_CARDS.map(w => `
    <article class="card">
      <h3 style="font-size:1.05rem;">${w.name}</h3>
      <p style="font-size:0.85rem;">${w.description}</p>
      <div class="meta">
        <span style="font-size:0.7rem;">Trigger: ${w.trigger}</span>
        <span style="font-size:0.7rem;">Routing: ${w.routing}</span>
      </div>
    </article>
  `).join("");
}

// ============================================================================
// Counter animation (intersection observer)
// ============================================================================
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + (el.dataset.target.includes("+") ? "+" : "");
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll("[data-target]").forEach(el => observer.observe(el));
}

// ============================================================================
// Role toggle
// ============================================================================
function initRoleToggle() {
  const btn = document.getElementById("role-badge");
  const toggle = document.getElementById("role-toggle");
  if (!btn || !toggle) return;

  let isAutomation = false;
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    isAutomation = !isAutomation;
    btn.textContent = isAutomation ? "AI Automation Engineer" : "Applied AI Engineer";
    toggle.textContent = isAutomation ? "Switch to Applied AI view" : "Switch to AI Automation view";
  });
}

// ============================================================================
// Mobile nav
// ============================================================================
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    nav.style.display = !expanded ? "flex" : "none";
  });
}

// ============================================================================
// Init
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  renderWorkflows();
  initCounters();
  initRoleToggle();
  initNav();
});
