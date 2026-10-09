import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SkillListing, SkillRequest, SwapProposal, LedgerTransaction, SwapMessage } from '../types';
import { INITIAL_USERS, INITIAL_LISTINGS, INITIAL_REQUESTS, INITIAL_SWAPS, INITIAL_TRANSACTIONS } from '../data/mockData';

interface SwapContextType {
  currentUser: User;
  users: User[];
  listings: SkillListing[];
  requests: SkillRequest[];
  swaps: SwapProposal[];
  transactions: LedgerTransaction[];
  switchUser: (userId: string) => void;
  createListing: (listing: Omit<SkillListing, 'id' | 'createdAt' | 'author' | 'vouches'>) => void;
  createRequest: (request: Omit<SkillRequest, 'id' | 'createdAt' | 'author' | 'responsesCount'>) => void;
  proposeSwap: (data: {
    listingId?: string;
    recipientId: string;
    offeredType: 'direct_swap' | 'time_credit';
    offeredSkillTitle?: string;
    requestedSkillTitle: string;
    hours: number;
    proposedDate: string;
    proposedTime: string;
    location: string;
    format: 'In-person' | 'Virtual' | 'Both';
    note: string;
  }) => SwapProposal;
  acceptSwap: (swapId: string) => void;
  declineSwap: (swapId: string) => void;
  completeSwap: (swapId: string, reviewNote?: string) => void;
  sendSwapMessage: (swapId: string, text: string) => void;
  respondToRequest: (requestId: string, offerNote: string) => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const SwapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('hourshare_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem('hourshare_current_user_id');
    return saved || 'user_maya';
  });

  const [listings, setListings] = useState<SkillListing[]>(() => {
    const saved = localStorage.getItem('hourshare_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [requests, setRequests] = useState<SkillRequest[]>(() => {
    const saved = localStorage.getItem('hourshare_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [swaps, setSwaps] = useState<SwapProposal[]>(() => {
    const saved = localStorage.getItem('hourshare_swaps');
    return saved ? JSON.parse(saved) : INITIAL_SWAPS;
  });

  const [transactions, setTransactions] = useState<LedgerTransaction[]>(() => {
    const saved = localStorage.getItem('hourshare_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('hourshare_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('hourshare_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('hourshare_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('hourshare_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('hourshare_swaps', JSON.stringify(swaps));
  }, [swaps]);

  useEffect(() => {
    localStorage.setItem('hourshare_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
  };

  const createListing = (newListingData: Omit<SkillListing, 'id' | 'createdAt' | 'author' | 'vouches'>) => {
    const newListing: SkillListing = {
      ...newListingData,
      id: `listing_${Date.now()}`,
      userId: currentUser.id,
      author: currentUser,
      createdAt: 'Just now',
      vouches: []
    };

    setListings(prev => [newListing, ...prev]);

    // Update user's offered skills
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          skillsOffered: [...u.skillsOffered, newListing.title]
        };
      }
      return u;
    }));
  };

  const createRequest = (newRequestData: Omit<SkillRequest, 'id' | 'createdAt' | 'author' | 'responsesCount'>) => {
    const newRequest: SkillRequest = {
      ...newRequestData,
      id: `req_${Date.now()}`,
      userId: currentUser.id,
      author: currentUser,
      responsesCount: 0,
      createdAt: 'Just now'
    };

    setRequests(prev => [newRequest, ...prev]);
  };

  const proposeSwap = (data: {
    listingId?: string;
    recipientId: string;
    offeredType: 'direct_swap' | 'time_credit';
    offeredSkillTitle?: string;
    requestedSkillTitle: string;
    hours: number;
    proposedDate: string;
    proposedTime: string;
    location: string;
    format: 'In-person' | 'Virtual' | 'Both';
    note: string;
  }): SwapProposal => {
    const recipient = users.find(u => u.id === data.recipientId) || INITIAL_USERS[1];

    const initialMsg: SwapMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: data.note || `Hi ${recipient.name}! I would love to trade ${data.hours} hour(s) for ${data.requestedSkillTitle}.`,
      timestamp: 'Just now'
    };

    const newProposal: SwapProposal = {
      id: `swap_${Date.now()}`,
      listingId: data.listingId,
      requesterId: currentUser.id,
      recipientId: data.recipientId,
      requester: currentUser,
      recipient: recipient,
      offeredType: data.offeredType,
      offeredSkillTitle: data.offeredSkillTitle,
      requestedSkillTitle: data.requestedSkillTitle,
      hours: data.hours,
      proposedDate: data.proposedDate,
      proposedTime: data.proposedTime,
      location: data.location,
      format: data.format,
      note: data.note,
      status: 'pending',
      messages: [initialMsg],
      createdAt: 'Just now'
    };

    setSwaps(prev => [newProposal, ...prev]);
    return newProposal;
  };

  const acceptSwap = (swapId: string) => {
    setSwaps(prev => prev.map(s => {
      if (s.id === swapId) {
        const acceptMsg: SwapMessage = {
          id: `msg_${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: `Proposal accepted! Looking forward to our session on ${s.proposedDate} at ${s.proposedTime}.`,
          timestamp: 'Just now'
        };
        return {
          ...s,
          status: 'accepted',
          messages: [...s.messages, acceptMsg]
        };
      }
      return s;
    }));
  };

  const declineSwap = (swapId: string) => {
    setSwaps(prev => prev.map(s => {
      if (s.id === swapId) {
        return { ...s, status: 'declined' };
      }
      return s;
    }));
  };

  const completeSwap = (swapId: string, reviewNote?: string) => {
    const swap = swaps.find(s => s.id === swapId);
    if (!swap || swap.status === 'completed') return;

    // Determine who was teacher/provider vs learner/receiver
    // If offeredType === 'time_credit':
    // requester pays credits, recipient receives credits
    const requesterUser = users.find(u => u.id === swap.requesterId);
    const recipientUser = users.find(u => u.id === swap.recipientId);

    if (swap.offeredType === 'time_credit') {
      const hours = swap.hours;

      // Requester spent time credits
      const requesterTx: LedgerTransaction = {
        id: `tx_${Date.now()}_req`,
        userId: swap.requesterId,
        type: 'credit_spent',
        hours: hours,
        description: `Exchanged ${hours} hr credit for ${swap.requestedSkillTitle} with ${swap.recipient.name}`,
        counterpartName: swap.recipient.name,
        timestamp: 'Today',
        swapId: swap.id
      };

      // Recipient earned time credits
      const recipientTx: LedgerTransaction = {
        id: `tx_${Date.now()}_rec`,
        userId: swap.recipientId,
        type: 'credit_earned',
        hours: hours,
        description: `Taught ${swap.requestedSkillTitle} to ${swap.requester.name}`,
        counterpartName: swap.requester.name,
        timestamp: 'Today',
        swapId: swap.id
      };

      setTransactions(prev => [requesterTx, recipientTx, ...prev]);

      setUsers(prev => prev.map(u => {
        if (u.id === swap.requesterId) {
          return {
            ...u,
            hoursBalance: Math.max(0, Number((u.hoursBalance - hours).toFixed(1))),
            swapsCompleted: u.swapsCompleted + 1
          };
        }
        if (u.id === swap.recipientId) {
          return {
            ...u,
            hoursBalance: Number((u.hoursBalance + hours).toFixed(1)),
            swapsCompleted: u.swapsCompleted + 1,
            vouchesCount: reviewNote ? u.vouchesCount + 1 : u.vouchesCount
          };
        }
        return u;
      }));
    } else {
      // Direct barter: both gave an hour, both received an hour!
      const directTx1: LedgerTransaction = {
        id: `tx_${Date.now()}_b1`,
        userId: swap.requesterId,
        type: 'credit_earned',
        hours: swap.hours,
        description: `Direct Barter: Taught ${swap.offeredSkillTitle || 'Skill'} to ${swap.recipient.name} in exchange for ${swap.requestedSkillTitle}`,
        counterpartName: swap.recipient.name,
        timestamp: 'Today',
        swapId: swap.id
      };
      const directTx2: LedgerTransaction = {
        id: `tx_${Date.now()}_b2`,
        userId: swap.recipientId,
        type: 'credit_earned',
        hours: swap.hours,
        description: `Direct Barter: Taught ${swap.requestedSkillTitle} to ${swap.requester.name} in exchange for ${swap.offeredSkillTitle || 'Skill'}`,
        counterpartName: swap.requester.name,
        timestamp: 'Today',
        swapId: swap.id
      };
      setTransactions(prev => [directTx1, directTx2, ...prev]);

      setUsers(prev => prev.map(u => {
        if (u.id === swap.requesterId || u.id === swap.recipientId) {
          return {
            ...u,
            swapsCompleted: u.swapsCompleted + 1,
            vouchesCount: reviewNote ? u.vouchesCount + 1 : u.vouchesCount
          };
        }
        return u;
      }));
    }

    // If reviewNote provided, append vouch to listing
    if (reviewNote && swap.listingId) {
      setListings(prev => prev.map(l => {
        if (l.id === swap.listingId) {
          return {
            ...l,
            vouches: [
              {
                id: `vouch_${Date.now()}`,
                authorName: currentUser.name,
                skillName: swap.requestedSkillTitle,
                text: reviewNote,
                date: 'Just now'
              },
              ...l.vouches
            ]
          };
        }
        return l;
      }));
    }

    // Mark swap as completed
    setSwaps(prev => prev.map(s => {
      if (s.id === swapId) {
        const completeMsg: SwapMessage = {
          id: `msg_${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: `Swap verified and completed! Time credits logged to both accounts.`,
          timestamp: 'Just now'
        };
        return {
          ...s,
          status: 'completed',
          messages: [...s.messages, completeMsg]
        };
      }
      return s;
    }));
  };

  const sendSwapMessage = (swapId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: SwapMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setSwaps(prev => prev.map(s => {
      if (s.id === swapId) {
        return {
          ...s,
          messages: [...s.messages, newMsg]
        };
      }
      return s;
    }));
  };

  const respondToRequest = (requestId: string, offerNote: string) => {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    // Increment responses count
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return { ...r, responsesCount: r.responsesCount + 1 };
      }
      return r;
    }));

    // Create a swap proposal directly linked to the request!
    proposeSwap({
      recipientId: req.userId,
      offeredType: 'time_credit',
      offeredSkillTitle: req.lookingFor,
      requestedSkillTitle: req.title,
      hours: req.creditsOffered,
      proposedDate: 'This weekend',
      proposedTime: 'Flexible afternoon',
      location: req.format === 'In-person' ? 'Neighbor Community Spot' : 'Virtual Call',
      format: req.format,
      note: offerNote || `Hi ${req.author.name}! I saw your request for "${req.title}" and would love to help you out.`
    });
  };

  return (
    <SwapContext.Provider
      value={{
        currentUser,
        users,
        listings,
        requests,
        swaps,
        transactions,
        switchUser,
        createListing,
        createRequest,
        proposeSwap,
        acceptSwap,
        declineSwap,
        completeSwap,
        sendSwapMessage,
        respondToRequest
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error('useSwap must be used within a SwapProvider');
  }
  return context;
};
