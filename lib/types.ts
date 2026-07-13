/**
 * Domain data model (backend-ready sketch).
 *
 * These types describe the Firestore collections / Laravel resources the
 * platform will use. They are the contract between the public site, the
 * volunteer/admin dashboards, and the API routes in /app/api.
 *
 * Suggested Firestore collections:
 *   users, volunteers, members, programmes, registrations, donations,
 *   bookings (Kamar Empati), partnerships, contacts, badges, announcements.
 */

export type Role = "visitor" | "volunteer" | "member" | "admin";

export type ApplicationStatus =
  | "pending"
  | "email_verified"
  | "approved"
  | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  photoURL?: string;
  createdAt: string;
}

export interface VolunteerProfile {
  id: string;
  userId: string;
  status: ApplicationStatus;
  skills: string[];
  availability: string;
  assignedProjectIds: string[];
  totalHours: number;
  badges: string[]; // badge ids
  checkIns: { weekOf: string; note: string; mood?: number }[];
  appliedAt: string;
  approvedAt?: string;
}

export interface MemberProfile {
  id: string;
  userId: string;
  membershipNo: string; // e.g. AE-2024-0042
  status: "active" | "inactive";
  programmeHistory: { programmeId: string; attendedAt: string }[];
  badges: string[];
  joinedAt: string;
}

export interface Programme {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  startsAt?: string;
  location?: string;
  capacity?: number;
  registeredCount: number;
  published: boolean;
}

export interface Registration {
  id: string;
  programmeId: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  attended: boolean;
  createdAt: string;
}

export type DonationFrequency = "once" | "monthly";

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number; // RM
  frequency: DonationFrequency;
  reference: string;
  provider: "toyyibpay" | "fpx" | "manual";
  status: "pending" | "paid" | "failed";
  receiptRequested: boolean;
  createdAt: string;
}

export interface Counsellor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  photoURL?: string;
  languages: string[];
}

export interface Booking {
  id: string;
  counsellorId: string;
  name: string;
  email: string;
  phone: string;
  slot: string; // ISO datetime
  topic?: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  meetingUrl?: string; // Google Meet / Zoom
  createdAt: string;
}

export interface PartnershipRequest {
  id: string;
  organisation: string;
  contactName: string;
  email: string;
  type: "csr" | "research" | "university" | "government" | "speaker" | "other";
  message: string;
  status: "new" | "in_review" | "accepted" | "declined";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

/** Standard API response envelope used by /app/api routes. */
export interface ApiResult<T = unknown> {
  ok: boolean;
  message: string;
  data?: T;
}
