import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Splash from "./components/Splash";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import BookDetailModal from "./components/BookDetailModal";
import HomeView from "./components/HomeView";
import SearchView from "./components/SearchView";
import CategoriesView from "./components/CategoriesView";
import PublishersView from "./components/PublishersView";
import OffersView from "./components/OffersView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState("home");
  const [authOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePublisherId, setActivePublisherId] = useState<string | null>(null);

  // Read recently viewed from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("recently_viewed_books");
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (e) {
        // ignore fallback
      }
    }
  }, []);

  const handleBookClick = (id: string) => {
    setSelectedBookId(id);
    
    // Add to recently viewed
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      const updated = [id, ...filtered].slice(0, 10);
      localStorage.setItem("recently_viewed_books", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSearchLaunch = (query: string) => {
    setSearchQuery(query);
    setCurrentTab("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePublisherLaunch = (pubId: string) => {
    setActivePublisherId(pubId);
    setCurrentTab("publishers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = (name: string, role: string) => {
    setCurrentUser({ name, role });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Render current active tab
  const renderTabContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <HomeView
            onBookClick={handleBookClick}
            onCategoryClick={() => setCurrentTab("categories")}
            onPublisherClick={handlePublisherLaunch}
            onViewOffers={() => setCurrentTab("offers")}
            recentlyViewedIds={recentlyViewed}
            onSearchQuery={handleSearchLaunch}
          />
        );
      case "categories":
        return <CategoriesView onBookClick={handleBookClick} />;
      case "publishers":
        return (
          <PublishersView
            onBookClick={handleBookClick}
            initialPublisherId={activePublisherId}
          />
        );
      case "offers":
        return <OffersView onBookClick={handleBookClick} />;
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      case "search":
        return (
          <SearchView
            onBookClick={handleBookClick}
            initialQuery={searchQuery}
            key={searchQuery} // force re-render on new search
          />
        );
      default:
        return (
          <HomeView
            onBookClick={handleBookClick}
            onCategoryClick={() => setCurrentTab("categories")}
            onPublisherClick={handlePublisherLaunch}
            onViewOffers={() => setCurrentTab("offers")}
            recentlyViewedIds={recentlyViewed}
            onSearchQuery={handleSearchLaunch}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-bg antialiased">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <Splash key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <div className="flex flex-col min-h-screen">
            {/* Header / Nav */}
            <Header
              currentTab={currentTab}
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                setSearchQuery(""); // clear query on regular tab switch
                setActivePublisherId(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenAuth={() => setAuthOpen(true)}
              currentUser={currentUser}
              onLogout={handleLogout}
              onTriggerSearch={() => {
                setSearchQuery("");
                setCurrentTab("search");
              }}
            />

            {/* Main Stage Content with layout wrapper */}
            <main className="flex-grow">
              {renderTabContent()}
            </main>

            {/* Footer */}
            <Footer 
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                setSearchQuery("");
                setActivePublisherId(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }} 
            />

            {/* Account authentication modal */}
            <AnimatePresence>
              {authOpen && (
                <AuthModal
                  isOpen={authOpen}
                  onClose={() => setAuthOpen(false)}
                  onSuccess={handleAuthSuccess}
                />
              )}
            </AnimatePresence>

            {/* Book detail modal specs */}
            <AnimatePresence>
              {selectedBookId && (
                <BookDetailModal
                  bookId={selectedBookId}
                  onClose={() => setSelectedBookId(null)}
                  onBookClick={handleBookClick}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
