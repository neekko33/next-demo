'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'
export default function ImagePicker({ label, name }: { label: string, name: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handlePickClick = () => {
    imageInputRef.current?.click()
  }
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input 
          className={classes.input} 
          type="file" 
          id={name} 
          accept="image/png, image/jpeg" 
          name={name} 
          ref={imageInputRef} 
          onChange={handleImageChange} 
          required
        />
        <div className={classes.preview}>
          { !selectedFile && <p>No image picked yet.</p> }
          {
            selectedFile && (
              <Image src={URL.createObjectURL(selectedFile)} alt="Selected" fill />
            )
          }
        </div>
        <button className={classes.button} type='button' onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  )
}
