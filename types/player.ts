export type Player = {
  id: string
  slug: string
  full_name: string
  short_name: string | null

  birth_date: string | null
  nationality: string | null
  position: 'Thủ môn' | 'Hậu vệ' | 'Tiền vệ' | 'Tiền đạo' | null

  height_cm: number | null
  preferred_foot: 'left' | 'right' | 'both' | null

  current_club: string | null
  club_jersey_number: number | null
  club_id: string | null

  bio: string | null
  career_highlights: string[]

  profile_image_url: string | null

  is_verified: boolean | null
  is_active: boolean | null

  created_at: string | null
  updated_at: string | null
}
