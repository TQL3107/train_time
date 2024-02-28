import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import HeaderBar from './Components/headerBar/HeaderBar';
import SideBar from './Components/SideBar/SideBar';
import FooterBar from './Components/footer/Footer';
import dotenv from 'dotenv';

dotenv.config();

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Training time',
  description: 'Create by Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div>
          <div>
            <HeaderBar></HeaderBar>
          </div>
          <div className='fluid d-flex'>
            <div className='col-sm-2'>
              <SideBar></SideBar>
            </div>
            <div className='col ms-4 fluid'>
              {children}
            </div>
          </div>
          <FooterBar></FooterBar>
        </div>
      </body>
    </html>
  )
}
