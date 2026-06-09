import { useState, useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

type ImageDropzoneProps = {
  value?: File | null;
  onChange: (file: File | null) => void;
  helperText?: string;
};

export function ImageDropzone({
  value,
  onChange,
  helperText = 'Drag & drop or click to select a trip cover image',
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file || !file.type.startsWith('image/')) return;
      onChange(file);
    },
    [onChange]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] || null;
    handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  return (
    <Box
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      sx={{
        width: 700,
        minHeight: 400,
        border: '2px dashed',
        borderColor: isDragging ? 'primary.main' : 'grey.400',
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragging ? 'action.hover' : 'white',
        transition: 'all 0.2s ease',
      }}
    >
      <Typography variant="body2">{helperText}</Typography>
      {value && (
        <Box mt={2}>
          <img src={URL.createObjectURL(value)} alt="preview" width="100%" />
        </Box>
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleInputChange} />
    </Box>
  );
}
