import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Employee Management',
  description: 'Employee Management Tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='min-w-fit mx-auto'>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
