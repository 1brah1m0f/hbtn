
/**
 * Backend Service (Hybrid API/Local)
 * This module connects to the Python FastAPI backend with local fallback.
 */

export interface Resource {
  id: number;
  title: string;
  type: 'video' | 'article' | 'documentation';
  likes: number;
  author: string;
  url: string;
  tags: string[];
}

export interface Review {
  id: number;
  project: string;
  reviewer: string;
  date: string;
  avatar: string;
}

const BASE_URL = 'http://localhost:8000/api';

const DEFAULT_TOOLS: Resource[] = [
  { id: 1, title: "Mastering C Pointers - Visual Guide", type: 'video', likes: 124, author: "CodeWithTahir", url: "https://youtube.com/watch?v=zuegQmMdy8M", tags: ["C", "Pointers"] },
  { id: 2, title: "Flexbox vs Grid: Comprehensive Cheatsheet", type: 'article', likes: 89, author: "Sara_Dev", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", tags: ["CSS", "Frontend"] },
  { id: 3, title: "Understanding JS Event Loop in 5 minutes", type: 'video', likes: 210, author: "JSNinja", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", tags: ["JavaScript"] }
];

export const ApiService = {
  // --- Tool Library API ---
  async getResources(): Promise<Resource[]> {
    try {
      const response = await fetch(`${BASE_URL}/resources`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      // Fallback to local storage or default data if server is unreachable
      const localData = localStorage.getItem('holberton_tools_db');
      return localData ? JSON.parse(localData) : DEFAULT_TOOLS;
    }
  },

  async saveResource(resource: Omit<Resource, 'id' | 'likes' | 'author'>): Promise<Resource> {
    try {
      const response = await fetch(`${BASE_URL}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resource)
      });
      return await response.json();
    } catch (error) {
      // Local simulation if backend is down
      const resources = await this.getResources();
      const newRes: Resource = { ...resource, id: Date.now(), likes: 0, author: 'You (Local)' };
      localStorage.setItem('holberton_tools_db', JSON.stringify([newRes, ...resources]));
      return newRes;
    }
  },

  async likeResource(id: number): Promise<number> {
    try {
      const response = await fetch(`${BASE_URL}/resources/${id}/like`, { method: 'POST' });
      const data = await response.json();
      return data.likes;
    } catch (error) {
      // Local simulation
      const resources = await this.getResources();
      let newLikes = 0;
      const updated = resources.map(r => {
        if (r.id === id) {
          newLikes = r.likes + 1;
          return { ...r, likes: newLikes };
        }
        return r;
      });
      localStorage.setItem('holberton_tools_db', JSON.stringify(updated));
      return newLikes;
    }
  },

  // --- Reputation / Review API ---
  async getReputation() {
    try {
      const response = await fetch(`${BASE_URL}/reputation`);
      if (!response.ok) throw new Error('API unreachable');
      return await response.json();
    } catch (error) {
      return JSON.parse(localStorage.getItem('holberton_reputation_db') || '{"avg": 4.88, "count": 48}');
    }
  },

  async submitReviewRating(score: number) {
    try {
      const response = await fetch(`${BASE_URL}/reputation/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score })
      });
      return await response.json();
    } catch (error) {
      const current = await this.getReputation();
      const newCount = current.count + 1;
      const newAvg = parseFloat((((current.avg * current.count) + score) / newCount).toFixed(2));
      const result = { avg: newAvg, count: newCount };
      localStorage.setItem('holberton_reputation_db', JSON.stringify(result));
      return result;
    }
  },

  // --- Progress API ---
  async getProgress(): Promise<number> {
    try {
      const response = await fetch(`${BASE_URL}/progress`);
      const data = await response.json();
      return data.progress;
    } catch (error) {
      return parseInt(localStorage.getItem('holberton_progress_db') || '0');
    }
  },

  async updateProgress(increment: number): Promise<number> {
    try {
      const response = await fetch(`${BASE_URL}/progress/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ increment })
      });
      const data = await response.json();
      return data.progress;
    } catch (error) {
      const current = await this.getProgress();
      const newVal = Math.min(current + increment, 100);
      localStorage.setItem('holberton_progress_db', newVal.toString());
      return newVal;
    }
  }
};
