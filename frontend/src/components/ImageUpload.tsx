import React, { useState, useRef, useEffect } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    IconButton 
} from '@mui/material';
import { 
    CloudUpload as CloudUploadIcon, 
    Delete as DeleteIcon 
} from '@mui/icons-material';

interface ImageUploadProps {
    onImageChange: (file: File | null) => void;
    existingImage?: File | string | null;
    label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
    onImageChange, 
    existingImage, 
    label = 'Upload Image' 
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Handle existing image
        if (existingImage) {
            if (typeof existingImage === 'string') {
                setPreview(existingImage);
            } else if (existingImage instanceof File) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(existingImage);
            }
        }
    }, [existingImage]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageChange(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        onImageChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2,
            width: '100%',
            border: preview ? '2px solid #1976d2' : '2px dashed #ccc',
            borderRadius: 2,
            p: 2,
            textAlign: 'center'
        }}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="image-upload-input"
            />
            <label htmlFor="image-upload-input">
                <Button 
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                >
                    {label}
                </Button>
            </label>

            {preview && (
                <Box sx={{ 
                    position: 'relative', 
                    maxWidth: '300px', 
                    maxHeight: '300px' 
                }}>
                    <img 
                        src={preview} 
                        alt="Preview" 
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '300px', 
                            objectFit: 'contain' 
                        }} 
                    />
                    <IconButton
                        color="error"
                        sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            right: 0 
                        }}
                        onClick={handleRemoveImage}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default ImageUpload;
