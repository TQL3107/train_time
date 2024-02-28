import axios from 'axios'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = `C:/xampp/tmp/${file.name}`
  await writeFile(path, buffer);
  console.log(path);

  await axios.request({
    method: 'POST',
    url: 'http://localhost:8080/api/file/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'json',
    data: {
      file: path
    }
  }).then((res) => {
    console.log('File uploaded successfully:', res.data);
  }).catch((e) => {
    console.log(e);
  })

  return NextResponse.json({ success: true })
}