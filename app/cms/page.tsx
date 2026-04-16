'use client';

import { useEffect, useMemo, useState } from 'react';
import { Database, RefreshCw, Save, ShieldCheck } from 'lucide-react';
import { cmsDefaults, type PortfolioCMSData } from '@/app/data/cms';

const pretty = (value: unknown) => JSON.stringify(value, null, 2);

export default function CmsPage() {
  const [token, setToken] = useState('');
  const [jsonText, setJsonText] = useState(pretty(cmsDefaults));
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState('');

  const stats = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText) as PortfolioCMSData;
      const totalProjects = parsed.projectCategories?.reduce((sum, category) => sum + category.projects.length, 0) ?? 0;
      return {
        categories: parsed.projectCategories?.length ?? 0,
        projects: totalProjects,
        experiences: parsed.experiences?.length ?? 0,
      };
    } catch {
      return { categories: 0, projects: 0, experiences: 0 };
    }
  }, [jsonText]);

  const loadContent = async () => {
    setIsLoading(true);
    setStatus('Loading content from CMS...');

    try {
      const response = await fetch('/api/cms/content', { cache: 'no-store' });
      const payload = (await response.json()) as { ok?: boolean; content?: unknown; warning?: string };

      if (payload.content) {
        setJsonText(pretty(payload.content));
      }

      if (payload.warning) {
        setStatus(payload.warning);
      } else {
        setStatus('CMS content loaded.');
      }
    } catch {
      setStatus('Could not reach CMS endpoint. Showing local default data.');
      setJsonText(pretty(cmsDefaults));
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setStatus('JSON is invalid. Fix syntax before saving.');
      return;
    }

    setIsSaving(true);
    setStatus('Saving CMS content...');

    try {
      const response = await fetch('/api/cms/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'x-cms-token': token } : {}),
        },
        body: JSON.stringify({ content: parsed }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string; content?: unknown };

      if (!response.ok || !payload.ok) {
        setStatus(payload.error ?? 'Save failed.');
        return;
      }

      setJsonText(pretty(payload.content));
      setStatus('CMS content saved to Vercel database.');
    } catch {
      setStatus('Save failed due to network or database configuration issues.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    void loadContent();
  }, []);

  return (
    <main className="min-h-screen liquid-bg px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6 relative z-10">
        <section className="glass-card rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                <Database className="text-amber-400" size={30} /> Portfolio CMS
              </h1>
              <p className="text-white/65 mt-2">
                Manage all website content from one JSON document stored in Vercel Postgres.
              </p>
            </div>
            <div className="text-sm text-white/70">
              <p>Categories: {stats.categories}</p>
              <p>Projects: {stats.projects}</p>
              <p>Experiences: {stats.experiences}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_auto] gap-3 items-end">
            <label className="block">
              <span className="text-white/75 text-sm flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-amber-400" /> Admin Token (optional)
              </span>
              <input
                value={token}
                onChange={(event) => setToken(event.target.value)}
                type="password"
                placeholder="CMS_ADMIN_TOKEN"
                className="w-full rounded-xl bg-black/30 border border-white/20 text-white px-3 py-2 outline-none focus:border-amber-400"
              />
            </label>

            <button
              onClick={loadContent}
              disabled={isLoading}
              className="btn-secondary text-white inline-flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} /> Reload
            </button>

            <button
              onClick={saveContent}
              disabled={isSaving}
              className="btn-primary text-white inline-flex items-center justify-center gap-2"
            >
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save to DB'}
            </button>
          </div>

          <p className="text-sm text-amber-200/90 mt-3">{status}</p>
        </section>

        <section className="glass-card rounded-3xl p-4 md:p-6">
          <textarea
            value={jsonText}
            onChange={(event) => setJsonText(event.target.value)}
            spellCheck={false}
            className="w-full min-h-[68vh] rounded-2xl bg-black/35 border border-white/20 text-white/90 p-4 font-mono text-xs md:text-sm outline-none focus:border-amber-400"
          />
        </section>
      </div>
    </main>
  );
}
