import React, { useState } from 'react';
import Image from 'next/image';
import EditableSection from './EditableSection';
import EditModal from './EditModal';

interface ImageInsertData {
  id: string;
  imageUrl: string;
  title?: string;
  altText?: string;
  linkUrl?: string;
  sizing: 'normal' | 'crop-to-fit' | 'size-to-fit';
  alignment: 'left' | 'center' | 'right';
  showBorder: boolean;
  showShadow: boolean;
  position: number; // For ordering
}

interface ImageInsertProps {
  imageData?: ImageInsertData;
  onSave: (data: ImageInsertData) => void;
  onDelete?: (id: string) => void;
  isAddButton?: boolean;
  position: number;
  sectionName: string;
}

const ImageInsert: React.FC<ImageInsertProps> = ({ 
  imageData, 
  onSave, 
  onDelete, 
  isAddButton = false, 
  position,
  sectionName 
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    // Validate that imageUrl is provided
    if (!data.imageUrl || data.imageUrl.trim() === '') {
      alert('Please provide a valid image URL');
      return;
    }
    
    const imageInsertData: ImageInsertData = {
      id: imageData?.id || `img-${Date.now()}`,
      imageUrl: data.imageUrl.trim(),
      title: data.title || '',
      altText: data.altText || data.title || 'Image',
      linkUrl: data.linkUrl || '',
      sizing: data.sizing || 'normal',
      alignment: data.alignment || 'center',
      showBorder: data.showBorder === 'true',
      showShadow: data.showShadow === 'true',
      position: position
    };
    
    onSave(imageInsertData);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (imageData?.id && onDelete) {
      onDelete(imageData.id);
      setIsEditModalOpen(false);
    }
  };

  const getSizingClasses = (sizing: string) => {
    switch (sizing) {
      case 'crop-to-fit':
        return 'w-full h-64 object-cover';
      case 'size-to-fit':
        return 'w-full h-auto object-contain';
      case 'normal':
      default:
        return 'max-w-full h-auto';
    }
  };

  const getAlignmentClasses = (alignment: string) => {
    switch (alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  if (isAddButton || !imageData) {
    return (
      <>
        <EditableSection
          sectionName={sectionName}
          onEdit={handleEdit}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 my-6 hover:border-vb-blue transition-colors"
          isAddButton={true}
        >
          <div className="text-center text-gray-500 hover:text-vb-blue transition-colors">
            <i className="fas fa-image text-3xl mb-4 block"></i>
            <p className="font-medium">Insert Image</p>
            <p className="text-sm text-gray-400">Add an image above or below this section</p>
          </div>
        </EditableSection>

        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
          title="Insert Image"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Image URL *</label>
              <input
                type="url"
                name="imageUrl"
                defaultValue=""
                className="admin-input w-full"
                placeholder="/images/your-image.jpg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title (Optional)</label>
              <input
                type="text"
                name="title"
                defaultValue=""
                className="admin-input w-full"
                placeholder="Image title or caption"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Alt Text (Accessibility)</label>
              <input
                type="text"
                name="altText"
                defaultValue=""
                className="admin-input w-full"
                placeholder="Describe the image for screen readers"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Link URL (Optional)</label>
              <input
                type="url"
                name="linkUrl"
                defaultValue=""
                className="admin-input w-full"
                placeholder="https://example.com (makes image clickable)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Image Sizing</label>
              <div className="space-y-2">
                <label className="flex items-center text-gray-300">
                  <input
                    type="radio"
                    name="sizing"
                    value="normal"
                    defaultChecked
                    className="mr-2"
                  />
                  Normal Size (original dimensions)
                </label>
                <label className="flex items-center text-gray-300">
                  <input
                    type="radio"
                    name="sizing"
                    value="crop-to-fit"
                    className="mr-2"
                  />
                  Crop to Fit (fills container, may crop)
                </label>
                <label className="flex items-center text-gray-300">
                  <input
                    type="radio"
                    name="sizing"
                    value="size-to-fit"
                    className="mr-2"
                  />
                  Size to Fit (scales to container width)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Alignment</label>
              <div className="space-y-2">
                <label className="flex items-center text-gray-300">
                  <input
                    type="radio"
                    name="alignment"
                    value="center"
                    defaultChecked
                    className="mr-2"
                  />
                  Center
                </label>
                <label className="flex items-center text-gray-300">
                  <input
                    type="radio"
                    name="alignment"
                    value="left"
                    className="mr-2"
                  />
                  Left
                </label>
                <label className="flex items-center text-gray-300">
                  <input
                    type="radio"
                    name="alignment"
                    value="right"
                    className="mr-2"
                  />
                  Right
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Styling Options</label>
              <div className="space-y-2">
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    name="showBorder"
                    value="true"
                    className="mr-2"
                  />
                  Add border
                </label>
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    name="showShadow"
                    value="true"
                    className="mr-2"
                  />
                  Add shadow
                </label>
              </div>
            </div>
          </div>
        </EditModal>
      </>
    );
  }

  const imageContent = (
    <div className={`my-6 ${getAlignmentClasses(imageData.alignment)}`}>
      <div className={`inline-block ${imageData.showBorder ? 'border-2 border-gray-200' : ''} ${imageData.showShadow ? 'shadow-lg' : ''} rounded-lg overflow-hidden`}>
        <Image
          src={imageData.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNzUgMTUwSDQyNVYyMDBIMzc1VjE1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+PHRleHQgeD0iNDAwIiB5PSIyNDAiIGZpbGw9IiM2QjczODAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3A+Cjwvc3ZnPgo='}
          alt={imageData.altText || 'Image'}
          width={800}
          height={400}
          className={getSizingClasses(imageData.sizing)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNzUgMTUwSDQyNVYyMDBIMzc1VjE1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+PHRleHQgeD0iNDAwIiB5PSIyNDAiIGZpbGw9IiM2QjczODAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3A+Cjwvc3ZnPgo=';
          }}
        />
      </div>
      {imageData.title && (
        <p className="mt-3 text-sm text-gray-600 font-medium">{imageData.title}</p>
      )}
    </div>
  );

  return (
    <>
      <EditableSection
        sectionName={`Image: ${imageData.title || 'Untitled'}`}
        onEdit={handleEdit}
        className="relative"
      >
        {imageData.linkUrl ? (
          <a href={imageData.linkUrl} target="_blank" rel="noopener noreferrer" className="block">
            {imageContent}
          </a>
        ) : (
          imageContent
        )}
      </EditableSection>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        title="Edit Image"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL *</label>
            <input
              type="url"
              name="imageUrl"
              defaultValue={imageData.imageUrl}
              className="admin-input w-full"
              placeholder="/images/your-image.jpg"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title (Optional)</label>
            <input
              type="text"
              name="title"
              defaultValue={imageData.title}
              className="admin-input w-full"
              placeholder="Image title or caption"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Alt Text (Accessibility)</label>
            <input
              type="text"
              name="altText"
              defaultValue={imageData.altText}
              className="admin-input w-full"
              placeholder="Describe the image for screen readers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Link URL (Optional)</label>
            <input
              type="url"
              name="linkUrl"
              defaultValue={imageData.linkUrl}
              className="admin-input w-full"
              placeholder="https://example.com (makes image clickable)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Image Sizing</label>
            <div className="space-y-2">
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="sizing"
                  value="normal"
                  defaultChecked={imageData.sizing === 'normal'}
                  className="mr-2"
                />
                Normal Size (original dimensions)
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="sizing"
                  value="crop-to-fit"
                  defaultChecked={imageData.sizing === 'crop-to-fit'}
                  className="mr-2"
                />
                Crop to Fit (fills container, may crop)
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="sizing"
                  value="size-to-fit"
                  defaultChecked={imageData.sizing === 'size-to-fit'}
                  className="mr-2"
                />
                Size to Fit (scales to container width)
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Alignment</label>
            <div className="space-y-2">
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="alignment"
                  value="center"
                  defaultChecked={imageData.alignment === 'center'}
                  className="mr-2"
                />
                Center
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="alignment"
                  value="left"
                  defaultChecked={imageData.alignment === 'left'}
                  className="mr-2"
                />
                Left
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="alignment"
                  value="right"
                  defaultChecked={imageData.alignment === 'right'}
                  className="mr-2"
                />
                Right
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Styling Options</label>
            <div className="space-y-2">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  name="showBorder"
                  value="true"
                  defaultChecked={imageData.showBorder}
                  className="mr-2"
                />
                Add border
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  name="showShadow"
                  value="true"
                  defaultChecked={imageData.showShadow}
                  className="mr-2"
                />
                Add shadow
              </label>
            </div>
          </div>

          {onDelete && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={handleDelete}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
                <i className="fas fa-trash mr-2"></i>Delete Image
              </button>
            </div>
          )}
        </div>
      </EditModal>
    </>
  );
};

export default ImageInsert;