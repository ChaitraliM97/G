"use client";

import { useState, DragEvent } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  error: string | null;
  loading: boolean;
}

export const FileUpload = ({ onFileUpload, error, loading }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div
        className={`w-full max-w-2xl p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
                    transition-colors duration-300
                    ${isDragging ? 'border-primary bg-primary/10' : 'border-primary/20 hover:border-primary/50 hover:bg-primary/5'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleFileChange}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-lg font-semibold">Analyzing your data...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <UploadCloud className="h-12 w-12 text-primary/50" />
            <p className="text-lg font-semibold">Drag & drop your dataset here</p>
            <p className="text-muted-foreground">or click to browse</p>
            <p className="text-sm text-muted-foreground mt-2">Supports CSV and XLSX files</p>
          </div>
        )}
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};
