import React, { useState } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const ImageUploadAlbum: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map(file => {
                // Rename the image based on the current date and time
                const currentDate = new Date();
                const renamedFile = new File([file], `${currentDate.getUTCFullYear()}-${currentDate.getUTCDay()}-${currentDate.getUTCHours()}-${currentDate.getUTCMinutes()}-${currentDate.getUTCSeconds()}.${file.type.split('/')[1]}`, {
                    type: file.type,
                });
                return renamedFile;
            });

            const newImagePreviews = filesArray.map(file => URL.createObjectURL(file));

            setSelectedImages(prevImages => [...prevImages, ...filesArray]);
            setImagePreviews(prevPreviews => [...prevPreviews, ...newImagePreviews]);
        }

        // Reset the input value to allow the same image to be selected again
        e.target.value = '';
    };

    const handleImageDelete = (index: number) => {
        const updatedImages = [...selectedImages];
        const updatedPreviews = [...imagePreviews];

        updatedImages.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setSelectedImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    return (
        <>
            <div className="gallery-add">
                <input type="file" name="file-2[]" onChange={handleImageChange} id="file-2" className="inputfile inputfile-2" data-multiple-caption="{count} files selected" multiple />
                <label htmlFor="file-2">
                    <FaCloudUploadAlt />
                    <span className='mx-2'>Choose a file…</span>
                </label>
                <div className='gallery'>
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className='view'>
                            <img src={preview} alt={`Preview-${index}`} />
                            <button className='close' onClick={() => handleImageDelete(index)}><FaTimes/></button>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default ImageUploadAlbum;