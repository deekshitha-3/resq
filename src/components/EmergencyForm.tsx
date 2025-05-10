
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload } from 'lucide-react';

interface EmergencyFormProps {
  onDisasterTypeChange: (value: string) => void;
  onImageUpload: (file: File | null) => void;
  onMessageChange: (message: string) => void;
}

const EmergencyForm: React.FC<EmergencyFormProps> = ({
  onDisasterTypeChange,
  onImageUpload,
  onMessageChange
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full space-y-6 animate-slide-up">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="disaster-type" className="block text-sm font-medium text-gray-700">
            Type of Emergency
          </label>
        </div>
        <Select onValueChange={onDisasterTypeChange}>
          <SelectTrigger className="w-full bg-white border-gray-200 shadow-sm" id="disaster-type">
            <SelectValue placeholder="Select emergency type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="floods">Floods 🌊</SelectItem>
            <SelectItem value="wildfire">Wildfire 🔥</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Upload Image (optional)
        </label>
        <div className="relative">
          {previewImage ? (
            <div className="w-full h-48 rounded-lg overflow-hidden relative">
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => {
                  setPreviewImage(null);
                  onImageUpload(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute top-2 right-2 bg-white/80 p-1 rounded-full"
                aria-label="Remove image"
              >
                <span className="text-gray-700 text-xs">✕</span>
              </button>
            </div>
          ) : (
            <div 
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-resq-blue transition-colors duration-200"
              onClick={handleCameraClick}
            >
              <div className="flex space-x-2">
                <Camera className="h-5 w-5 text-gray-400" />
                <Upload className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-2">Upload image or take a picture (optional)</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload image"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message (optional)
        </label>
        <Textarea
          id="message"
          placeholder="Send us a message (optional)"
          className="bg-white border-gray-200 shadow-sm resize-none"
          rows={3}
          onChange={(e) => onMessageChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EmergencyForm;
