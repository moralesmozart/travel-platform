import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import styled from 'styled-components';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, sube solo archivos de imagen (PNG, JPG, JPEG)');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es demasiado grande. Máximo 5MB permitido.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simular progreso de carga
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Aquí normalmente subirías a Cloudinary
      // Por ahora, simulamos la subida creando una URL local
      const imageUrl = await simulateImageUpload(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        onImageUpload(imageUrl);
        setUploading(false);
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen. Por favor, intenta de nuevo.');
      setUploading(false);
      setUploadProgress(0);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false
  });

  const removeImage = () => {
    onImageUpload('');
  };

  // Simular subida de imagen (reemplazar con Cloudinary real)
  const simulateImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Crear URL local temporal
        const imageUrl = reader.result as string;
        resolve(imageUrl);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Container>
      <Label>Imagen de la Masía *</Label>
      
      {currentImage ? (
        <ImagePreview>
          <img src={currentImage} alt="Preview" />
          <RemoveButton onClick={removeImage}>
            <X size={16} />
          </RemoveButton>
        </ImagePreview>
      ) : (
        <DropzoneContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          uploading={uploading}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <UploadingContent>
              <Upload size={24} />
              <span>Subiendo imagen...</span>
              <ProgressBar>
                <ProgressFill progress={uploadProgress} />
              </ProgressBar>
              <span>{uploadProgress}%</span>
            </UploadingContent>
          ) : (
            <DropzoneContent>
              <ImageIcon size={32} />
              <span>
                {isDragActive
                  ? '¡Suelta la imagen aquí!'
                  : 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar'
                }
              </span>
              <span className="formats">Formatos: PNG, JPG, JPEG (máx. 5MB)</span>
            </DropzoneContent>
          )}
        </DropzoneContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const DropzoneContainer = styled.div<{ isDragActive: boolean; uploading: boolean }>`
  border: 2px dashed ${props => 
    props.uploading 
      ? '#4CAF50' 
      : props.isDragActive 
        ? '#2196F3' 
        : '#ddd'
  };
  border-radius: 8px;
  padding: 32px 16px;
  text-align: center;
  cursor: ${props => props.uploading ? 'not-allowed' : 'pointer'};
  background: ${props => 
    props.uploading 
      ? '#f8f9fa' 
      : props.isDragActive 
        ? '#f0f8ff' 
        : '#fafafa'
  };
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.uploading ? '#4CAF50' : '#2196F3'};
    background: ${props => props.uploading ? '#f8f9fa' : '#f0f8ff'};
  }
`;

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #666;
  
  .formats {
    font-size: 12px;
    color: #999;
  }
`;

const UploadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #4CAF50;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: #4CAF50;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  
  img {
    width: 100%;
    max-width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #ddd;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(255, 0, 0, 1);
  }
`;

export default ImageUpload;
