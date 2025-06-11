
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images:{ 
    remotePatterns: [{
      hostname:'localhost'
    }, {
      protocol: 'https',
      hostname: '**.vercel.app',
  },{
      hostname: '*.supabase.co'
    }]
  }
}

export default nextConfig