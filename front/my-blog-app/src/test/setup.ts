import '@testing-library/jest-dom';

// Mock fetch
global.fetch = vi.fn();

// Setup clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});