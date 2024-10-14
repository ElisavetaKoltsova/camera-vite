import { renderHook } from '@testing-library/react';
import { useScroll } from './use-scroll';
import ScrollProvider from '../components/scroll-provider/scroll-provider';
import { ReactNode } from 'react';

describe('Hook: useScroll', () => {
  it('should return context when component wrapped into ScrollProvider', () => {
    const wrapper = ({children}: { children: ReactNode }) => (
      <ScrollProvider>{children}</ScrollProvider>
    );
    const { result } = renderHook(() => useScroll(), { wrapper });

    expect(typeof result.current.disableScroll).toBe('function');
    expect(typeof result.current.enableScroll).toBe('function');
  });
});
