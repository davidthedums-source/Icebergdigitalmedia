import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface QuoteRecord {
  id: string;
  category: string;
  quantity: number;
  finish: string;
  turnaround: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  notes?: string;
  status: 'pending' | 'reviewed' | 'in_production' | 'completed';
  createdAt: string;
  userId?: string;
}

export const submitQuoteInquiry = async (
  data: Omit<QuoteRecord, 'id' | 'status' | 'createdAt'>,
  userId?: string
): Promise<QuoteRecord> => {
  const quoteId = `quote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  // Strict sanitization conforming to firebase-blueprint.json
  const quoteRecord: QuoteRecord = {
    id: quoteId,
    category: data.category.substring(0, 100),
    quantity: Math.max(1, Math.min(1000000, Number(data.quantity) || 500)),
    finish: (data.finish || 'Standard Matte').substring(0, 100),
    turnaround: (data.turnaround || 'Standard (3-5 days)').substring(0, 100),
    clientName: data.clientName.trim().substring(0, 100),
    clientEmail: data.clientEmail.trim().substring(0, 150),
    clientPhone: (data.clientPhone || '').trim().substring(0, 50),
    notes: (data.notes || '').trim().substring(0, 2000),
    status: 'pending',
    createdAt: now,
    ...(userId ? { userId } : {}),
  };

  const path = `quotes/${quoteId}`;
  try {
    const docRef = doc(db, 'quotes', quoteId);
    await setDoc(docRef, quoteRecord);

    // If Supabase credentials are provided, mirror to PostgreSQL
    if (isSupabaseConfigured && supabase) {
      supabase.from('quotes').insert({
        id: quoteRecord.id,
        category: quoteRecord.category,
        quantity: quoteRecord.quantity,
        finish: quoteRecord.finish,
        turnaround: quoteRecord.turnaround,
        client_name: quoteRecord.clientName,
        client_email: quoteRecord.clientEmail,
        client_phone: quoteRecord.clientPhone,
        notes: quoteRecord.notes,
        status: quoteRecord.status,
        user_id: quoteRecord.userId,
      }).then(({ error }) => {
        if (error) console.warn('Supabase mirror notice:', error);
      });
    }

    return quoteRecord;
  } catch (error) {
    return handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const fetchUserQuotes = async (userId: string): Promise<QuoteRecord[]> => {
  const path = 'quotes';
  try {
    const q = query(
      collection(db, path),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data() as QuoteRecord);
  } catch (error) {
    return handleFirestoreError(error, OperationType.LIST, path);
  }
};

export const fetchAllQuotesAdmin = async (): Promise<QuoteRecord[]> => {
  const path = 'quotes';
  try {
    const snapshot = await getDocs(collection(db, path));
    const quotes = snapshot.docs.map(d => d.data() as QuoteRecord);
    return quotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    return handleFirestoreError(error, OperationType.LIST, path);
  }
};

export const updateQuoteStatus = async (
  quoteId: string,
  newStatus: QuoteRecord['status']
): Promise<void> => {
  const path = `quotes/${quoteId}`;
  try {
    const docRef = doc(db, 'quotes', quoteId);
    await updateDoc(docRef, { status: newStatus });

    if (isSupabaseConfigured && supabase) {
      supabase
        .from('quotes')
        .update({ status: newStatus })
        .eq('id', quoteId)
        .then(({ error }) => {
          if (error) console.warn('Supabase update notice:', error);
        });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};
