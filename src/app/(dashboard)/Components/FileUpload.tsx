'use client'

import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function FileUpload() {
  const [file, setFile] = useState<File>();

  const handleSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return

    try {
      const data = new FormData();
      data.set('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })

      if (!res.ok) throw new Error(await res.text())
    } catch (error:any) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
      type="file"
      name='file'
      onChange={(e) => setFile(e.target.files?.[0])}
      />
      <Button type='submit'>Upload</Button>
    </form>
    
  );
}