import { supabase } from '../lib/supabase';
import { Instructor } from '../data/instructors';

export async function createInstructorProfile(instructor: Instructor) {
  try {
    const { data, error } = await supabase
      .from('instructor_profiles')
      .upsert({
        id: instructor.id,
        email: instructor.email,
        name: '',
        phone: '',
        branch: '',
        profile_image_url: null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error creating instructor profile:', error);
    throw error;
  }
}