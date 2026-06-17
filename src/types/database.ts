export type UserRole = 'admin' | 'user';
export type InquiryStatus = 'pending' | 'in_progress' | 'completed';
export type PostCategory = 'notice' | 'free' | 'qna';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          phone?: string | null;
          role?: UserRole;
        };
        Update: {
          name?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          title: string;
          summary: string | null;
          description: string | null;
          thumbnail_url: string | null;
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          summary?: string | null;
          description?: string | null;
          thumbnail_url?: string | null;
          is_published?: boolean;
          sort_order?: number;
        };
        Update: {
          title?: string;
          summary?: string | null;
          description?: string | null;
          thumbnail_url?: string | null;
          is_published?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          product_id: string;
          image_url: string;
          alt_text?: string | null;
          sort_order?: number;
        };
        Update: {
          image_url?: string;
          alt_text?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      product_features: {
        Row: {
          id: string;
          product_id: string;
          title: string;
          description: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          product_id: string;
          title: string;
          description?: string | null;
          sort_order?: number;
        };
        Update: {
          title?: string;
          description?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      inquiries: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          type: string | null;
          title: string;
          content: string;
          status: InquiryStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          type?: string | null;
          title: string;
          content: string;
          status?: InquiryStatus;
        };
        Update: {
          status?: InquiryStatus;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          category: PostCategory;
          title: string;
          content: string;
          view_count: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          category?: PostCategory;
          title: string;
          content: string;
          is_published?: boolean;
        };
        Update: {
          category?: PostCategory;
          title?: string;
          content?: string;
          is_published?: boolean;
          view_count?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
