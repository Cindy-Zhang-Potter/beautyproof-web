import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: '首页', path: '/' },
  { label: '核验台', path: '/verify' },
  { label: '证据库', path: '/evidence' },
  { label: '关于我们', path: '/about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
            <Sparkles className="size-4 text-primary" strokeWidth={2} />
          </div>
          <span className="font-serif text-xl font-medium tracking-wide text-foreground">
            BeautyProof
          </span>
        </NavLink>

        {!isMobile && (
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname === item.path ||
                    location.pathname.startsWith(`${item.path}/`);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={`relative px-4 py-2 text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </NavLink>
              );
            })}
          </nav>
        )}

        {!isMobile && (
          <NavLink to="/verify">
            <Button
              variant="outline"
              className="font-medium tracking-wide border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              开始核验
            </Button>
          </NavLink>
        )}

        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="菜单"
            className="text-foreground"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        )}
      </div>

      {isMobile && mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-background/95 backdrop-blur-md border-b border-border/60"
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-3 text-sm transition-colors rounded-md ${
                    isActive
                      ? 'text-primary font-medium bg-primary/5'
                      : 'text-foreground/80 hover:bg-accent/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/verify">
              <Button className="w-full mt-2 font-medium">开始核验</Button>
            </NavLink>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
