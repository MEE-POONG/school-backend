// UpdateHeadPage.tsx
import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { HeadPage } from '@prisma/client';



const UpdateHeadPage: React.FC = (props) => {
    const [{ data: headPageData, loading, error }, refetch] = useAxios('/api/headPage');

    const [formData, setFormData] = useState<HeadPage | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        } as HeadPage);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform update using axios post request
        // Replace '/api/updateHeadPage' with your actual update endpoint
        // useAxios.post('/api/updateHeadPage', formData)
        //   .then(() => {
        //     refetch(); // Refetch the data after update
        //   })
        //   .catch(error => console.error('Error updating HeadPage data:', error));
    };

    // Initialize formData once headPageData is loaded
    useEffect(() => {
        if (headPageData && !formData) {
            setFormData(headPageData);
        }
    }, []);
    useEffect(() => {

    }, [headPageData]);

    if (loading) return <div>Loading...</div>;
    //   if (error) return <div>Error: {error.message}</div>;

    return (
        <form onSubmit={handleSubmit}>
            {/* Iterate over keys of formData to generate input fields */}
            {/* {formData && Object.keys(formData).map((key) => {
        if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'deleted_at') {
          return (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={(formData as any)[key]}
                onChange={handleInputChange}
              />
            </div>
          );
        }
        return null;
      })} */}
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateHeadPage;
