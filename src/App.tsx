import React, { useState, useMemo } from 'react';
import { SwapProvider, useSwap } from './context/SwapContext';
import { Category, SkillListing, User } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { ProposeSwapModal } from './components/ProposeSwapModal';
import { OfferSkillModal } from './components/OfferSkillModal';
import { PostRequestModal } from './components/PostRequestModal';
import { RequestsBoard } from './components/RequestsBoard';
import { ActiveSwapsModal } from './components/ActiveSwapsModal';
import { TimeLedgerModal } from './components/TimeLedgerModal';
import { HowItWorks } from './components/HowItWorksModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { Sparkles, ArrowRightLeft, Plus } from 'lucide-react';

function MarketplaceContent() {
  const { listings, currentUser } = useSwap();

  const [activeTab, setActiveTab] = useState<'explore' | 'requests' | 'how-it-works'>('explore');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All Neighborhoods');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [detailListing, setDetailListing] = useState<SkillListing | null>(null);
  const [proposeListing, setProposeListing] = useState<SkillListing | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showOfferModal, setShowOfferModal] = useState<boolean>(false);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [showSwapsModal, setShowSwapsModal] = useState<boolean>(false);
  const [showLedgerModal, setShowLedgerModal] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string) => {
    const id = `toast_${Date.now()}`;
    setToasts(prev => [...prev, { id, type: 'success', title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Neighborhood filter
      if (selectedNeighborhood !== 'All Neighborhoods' && item.author.neighborhood !== selectedNeighborhood) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'All' && item.format !== 'Both' && item.format !== selectedFormat) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inLooking = item.lookingForSkill.toLowerCase().includes(q);
        const inAuthor = item.author.name.toLowerCase().includes(q);
        const inTools = item.toolsProvided.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inLooking && !inAuthor && !inTools) {
          return false;
        }
      }
      return true;
    });
  }, [listings, selectedCategory, selectedNeighborhood, selectedFormat, searchQuery]);

  // Search similar skills helper: pre-fills search filter with category and keywords
  const handleSearchSimilar = (listing: SkillListing) => {
    // 1. Pre-fill category
    setSelectedCategory(listing.category);

    // 2. Extract key topical keyword from title or listing
    const title = listing.title;
    let keyword = '';
    if (/guitar/i.test(title)) keyword = 'Guitar';
    else if (/bike|bicycle/i.test(title)) keyword = 'Bike';
    else if (/sourdough|bread|baking/i.test(title)) keyword = 'Sourdough';
    else if (/pottery|ceramic/i.test(title)) keyword = 'Pottery';
    else if (/resume|portfolio|ux/i.test(title)) keyword = 'Resume';
    else if (/spanish/i.test(title)) keyword = 'Spanish';
    else if (/garden|soil/i.test(title)) keyword = 'Garden';
    else {
      // Pick first meaningful noun/word
      const words = title
        .split(/[\s,&/-]+/)
        .filter(w => w.length > 3 && !/^(with|from|your|basic|intro|learn|help)/i.test(w));
      keyword = words[0] || listing.category;
    }

    setSearchQuery(keyword);
    // Reset neighborhood and format to show all similar matches
    setSelectedNeighborhood('All Neighborhoods');
    setSelectedFormat('All');
    setActiveTab('explore');

    // Smooth scroll to catalog and search bar
    setTimeout(() => {
      const el = document.getElementById('explore-catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOfferModal={() => setShowOfferModal(true)}
        onOpenLedgerModal={() => setShowLedgerModal(true)}
        onOpenSwapsModal={() => setShowSwapsModal(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <div>
            <Hero
              onExploreClick={() => {
                const el = document.getElementById('explore-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onRequestClick={() => {
                setActiveTab('requests');
              }}
              onOpenLedger={() => setShowLedgerModal(true)}
            />

            <div id="explore-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedNeighborhood={selectedNeighborhood}
                onSelectNeighborhood={setSelectedNeighborhood}
                selectedFormat={selectedFormat}
                onSelectFormat={setSelectedFormat}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                totalCount={filteredListings.length}
              />

              {/* Listings Grid */}
              {filteredListings.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-2xl border border-stone-200/80 p-8 space-y-4 my-6">
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
                    <ArrowRightLeft className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900">No skill matches found</h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Try adjusting your category or neighborhood filters, or be the first neighbor to offer this skill!
                  </p>
                  <button
                    onClick={() => setShowOfferModal(true)}
                    className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors"
                  >
                    Offer a Skill in This Category
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 pb-14">
                  {filteredListings.map(listing => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onSelect={l => setDetailListing(l)}
                      onProposeSwap={l => setProposeListing(l)}
                      onSearchSimilar={handleSearchSimilar}
                      onSelectUser={u => setSelectedUser(u)}
                      isCurrentUser={listing.userId === currentUser.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RequestsBoard
              onOpenCreateRequest={() => setShowRequestModal(true)}
              onOpenSwaps={() => setShowSwapsModal(true)}
              onSelectUser={u => setSelectedUser(u)}
            />
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HowItWorks
              onStartOffering={() => setShowOfferModal(true)}
              onBrowseSkills={() => setActiveTab('explore')}
            />
          </div>
        )}
      </main>

      <Footer
        onExplore={() => setActiveTab('explore')}
        onRequests={() => setActiveTab('requests')}
        onHowItWorks={() => setActiveTab('how-it-works')}
        onOpenLedger={() => setShowLedgerModal(true)}
      />

      {/* Modals & Drawers */}
      <ListingDetailModal
        listing={detailListing}
        onClose={() => setDetailListing(null)}
        onProposeSwap={listing => {
          setDetailListing(null);
          setProposeListing(listing);
        }}
        onSearchSimilar={handleSearchSimilar}
        isCurrentUser={detailListing?.userId === currentUser.id}
      />

      <ProposeSwapModal
        listing={proposeListing}
        onClose={() => setProposeListing(null)}
        onSwapProposed={() => {
          setShowSwapsModal(true);
          addToast('Swap Proposal Sent!', 'Your trade request has been dispatched to your neighbor.');
        }}
      />

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSelectSkill={listing => {
            setSelectedUser(null);
            setDetailListing(listing);
          }}
          onProposeSwap={listing => {
            setSelectedUser(null);
            setProposeListing(listing);
          }}
        />
      )}

      {showOfferModal && (
        <OfferSkillModal
          onClose={() => setShowOfferModal(false)}
          onSuccess={() => {
            setActiveTab('explore');
            addToast('Skill Published!', 'Your craft is now live in the community catalog.');
          }}
        />
      )}

      {showRequestModal && (
        <PostRequestModal
          onClose={() => setShowRequestModal(false)}
          onSuccess={() => {
            setActiveTab('requests');
            addToast('Request Posted!', 'Your skill request is now visible on the Wanted Board.');
          }}
        />
      )}

      {showSwapsModal && (
        <ActiveSwapsModal onClose={() => setShowSwapsModal(false)} />
      )}

      {showLedgerModal && (
        <TimeLedgerModal onClose={() => setShowLedgerModal(false)} />
      )}

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default function App() {
  return (
    <SwapProvider>
      <MarketplaceContent />
    </SwapProvider>
  );
}
