import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

// Mock fetch
globalThis.fetch = vi.fn();

// Setup clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});