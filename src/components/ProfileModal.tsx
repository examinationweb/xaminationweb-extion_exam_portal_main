import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

interface ProfileModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ user, isOpen, onClose }: ProfileModalProps) {
  const [formData, setFormData] = useState({
    address: '',
    landmark: '',
    altPhone: '',
    altEmail: '',
    college: '',
    profileImage: null as File | null
  });
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfileDetails();
    }
  }, [user]);

  const fetchProfileDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('profile_details')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfileDetails(data);
        setProfileImageUrl(data.profile_image_url);
        setFormData({
          address: data.address || '',
          landmark: data.landmark || '',
          altPhone: data.alt_phone || '',
          altEmail: data.alt_email || '',
          college: data.college || '',
          profileImage: null
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile details:', error);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      throw error;
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (!profileImageUrl) return;

      const imagePath = profileImageUrl.split('/').pop();
      if (!imagePath) return;

      const { error: deleteError } = await supabase.storage
        .from('profiles')
        .remove([`profile-images/${imagePath}`]);

      if (deleteError) throw deleteError;

      await supabase
        .from('profile_details')
        .update({ profile_image_url: null })
        .eq('id', user.id);

      setProfileImageUrl(null);
      toast.success('Profile image removed');
    } catch (error: any) {
      toast.error('Error removing profile image');
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = profileImageUrl;

      if (formData.profileImage) {
        imageUrl = await handleImageUpload(formData.profileImage);
      }

      const { error } = await supabase
        .from('profile_details')
        .upsert({
          id: user.id,
          address: formData.address,
          landmark: formData.landmark,
          alt_phone: formData.altPhone,
          alt_email: formData.altEmail,
          college: formData.college,
          profile_image_url: imageUrl
        });

      if (error) throw error;

      toast.success('Profile updated successfully');
      onClose();
      fetchProfileDetails();
    } catch (error: any) {
      toast.error('Error updating profile');
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Image */}
          <div className="flex items-center gap-4">
            {profileImageUrl ? (
              <div className="relative">
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <label className="flex-1">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFormData({ ...formData, profileImage: file });
                }}
              />
              <div className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-gray-600">Click to update profile image</span>
              </div>
            </label>
          </div>

          {/* Current Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Current Information</h3>
            <p>Name: {user.user_metadata?.name || 'Not set'}</p>
            <p>Email: {user.email || 'Not set'}</p>
            <p>Phone: {user.user_metadata?.phone || 'Not set'}</p>
            <p>Course: {user.user_metadata?.course || 'Not set'}</p>
          </div>

          {/* Additional Information Form */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address"
              className="p-3 border rounded-lg"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Landmark"
              className="p-3 border rounded-lg"
              value={formData.landmark}
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Alternative Phone"
              className="p-3 border rounded-lg"
              value={formData.altPhone}
              onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
            />
            <input
              type="email"
              placeholder="Alternative Email"
              className="p-3 border rounded-lg"
              value={formData.altEmail}
              onChange={(e) => setFormData({ ...formData, altEmail: e.target.value })}
            />
            <input
              type="text"
              placeholder="College Name"
              className="p-3 border rounded-lg col-span-2"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-400 text-white py-3 rounded-lg hover:bg-purple-500"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}