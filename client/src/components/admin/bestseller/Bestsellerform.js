import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Bestsellerform() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Basic validation
            if (!name || !author || !description || !price || !file) {
                console.error('Please fill in all fields');
                return;
            }

            // Create FormData object
            const formData = new FormData();
            formData.append('name', name);
            formData.append('author', author);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('image', file);

            // Send POST request with FormData
            const response = await axios.post('http://localhost:1500/bestsellerbook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('New book created:', response.data);

            // Clear form fields after successful submission
            setName('');
            setDescription('');
            setAuthor('');
            setPrice('');
            setFile(null);

            // Clear the file input field
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            console.error('Error creating new book:', error);
        }
    };

    const handleShow = (e) => {
        navigate('/bestsellerdata');
    }

    return (
        <div className='full05'>
            <div className='container05'>
                <h2 className='h205'>BEST SELLER BOOK ENTRY FORM</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className='box05'>
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            ref={fileInputRef}
                        />
                    </div>

                    <div className='box05'>
                        <label>Author:</label>
                        <input
                            name='id'
                            type='text'
                            className='form-control rounded-0'
                            onChange={(e) => setAuthor(e.target.value)}
                            value={author}
                        />
                    </div>

                    <div className='box05'>
                        <label>Book Name:</label>
                        <input
                            name='name'
                            className='form-control rounded-0'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className='box05'>
                        <label>Description:</label>
                        <input
                            name='description'
                            className='form-control rounded-0 two-line-input'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            maxLength={90} // Set maximum length to 80 characters
                        />
                    </div>

                    <div className='box05'>
                        <label>Price:</label>
                        <input
                            name='price'
                            type='text'
                            className='form-control rounded-0'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>
                    
                    <button type='submit' className='submit05'>Submit</button>
                    <button type='button' onClick={handleShow} className='submit05'>Show</button>
                </form>
            </div>
        </div>
    );
}

export default Bestsellerform;
